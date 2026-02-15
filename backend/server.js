// backend/server.js
// Simple Node.js + Express backend for Razorpay payment integration

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CultureHub Payment API is running' });
});

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const options = {
      amount: amount * 100, // Convert to paise (1 INR = 100 paise)
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    
    console.log('Order created:', order.id);
    
    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create order',
      message: error.message 
    });
  }
});

// Verify Payment Signature
app.post('/api/verify-payment', (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = req.body;

    // Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing payment details' 
      });
    }

    // Generate signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    // Verify signature
    if (razorpay_signature === expectedSign) {
      console.log('Payment verified:', razorpay_payment_id);
      
      // Here you can:
      // 1. Save booking to database
      // 2. Send confirmation email
      // 3. Update seat availability
      // 4. Generate ticket PDF
      
      res.json({
        success: true,
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id
      });
    } else {
      console.error('Signature verification failed');
      res.status(400).json({
        success: false,
        error: 'Payment verification failed'
      });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Verification error',
      message: error.message
    });
  }
});

// Fetch Payment Details
app.get('/api/payment/:payment_id', async (req, res) => {
  try {
    const { payment_id } = req.params;
    
    const payment = await razorpay.payments.fetch(payment_id);
    
    res.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount / 100, // Convert back to rupees
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        email: payment.email,
        contact: payment.contact,
        created_at: payment.created_at
      }
    });

  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment details'
    });
  }
});

// Process Refund
app.post('/api/refund', async (req, res) => {
  try {
    const { payment_id, amount, notes } = req.body;

    if (!payment_id) {
      return res.status(400).json({ 
        success: false,
        error: 'Payment ID required' 
      });
    }

    const refund = await razorpay.payments.refund(payment_id, {
      amount: amount ? amount * 100 : undefined, // Partial or full refund
      notes: notes || { reason: 'Booking cancelled' }
    });

    console.log('Refund processed:', refund.id);

    res.json({
      success: true,
      refund_id: refund.id,
      amount: refund.amount / 100,
      status: refund.status
    });

  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({
      success: false,
      error: 'Refund failed',
      message: error.message
    });
  }
});

// Webhook Handler (for automatic payment notifications)
app.post('/api/webhook', (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature === expectedSignature) {
      const event = req.body.event;
      const payload = req.body.payload.payment.entity;

      console.log('Webhook received:', event);

      // Handle different webhook events
      switch (event) {
        case 'payment.authorized':
          // Payment authorized, capture it if needed
          console.log('Payment authorized:', payload.id);
          break;

        case 'payment.captured':
          // Payment successfully captured
          console.log('Payment captured:', payload.id);
          // Update database, send email, etc.
          break;

        case 'payment.failed':
          // Payment failed
          console.log('Payment failed:', payload.id);
          // Notify user, update booking status
          break;

        case 'refund.created':
          // Refund initiated
          console.log('Refund created:', payload.id);
          break;

        default:
          console.log('Unhandled event:', event);
      }

      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, error: 'Invalid signature' });
    }

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
});

// Get All Orders (for admin)
app.get('/api/orders', async (req, res) => {
  try {
    const { count = 10, skip = 0 } = req.query;
    
    const orders = await razorpay.orders.all({
      count: parseInt(count),
      skip: parseInt(skip)
    });

    res.json({
      success: true,
      count: orders.items.length,
      orders: orders.items.map(order => ({
        id: order.id,
        amount: order.amount / 100,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at
      }))
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}`);
  console.log(`🔒 Payment gateway: Razorpay`);
});

module.exports = app;
