# 💳 Payment Integration Guide - Razorpay

This guide explains how to set up and use the Razorpay payment gateway integration in the CultureHub application.

## 🎯 Overview

The application now includes **Razorpay Payment Gateway** integration, allowing users to make secure online payments for event tickets using:
- Credit/Debit Cards
- UPI (Google Pay, PhonePe, Paytm, etc.)
- Net Banking
- Digital Wallets

## 🚀 Quick Setup (Test Mode)

### Step 1: Get Razorpay Account

1. **Sign up for Razorpay**: https://razorpay.com/
2. Click "Sign Up" and create an account (free)
3. Complete the KYC process (for production use)

### Step 2: Get API Keys

1. Log in to your Razorpay Dashboard
2. Go to **Settings** → **API Keys**
3. Generate Keys (or use existing ones)
4. You'll see two keys:
   - **Key ID** (starts with `rzp_test_` for test mode)
   - **Key Secret** (keep this secure, don't share)

### Step 3: Configure the Application

Open `src/App.jsx` and find this line (around line 118):

```javascript
const RAZORPAY_KEY_ID = 'rzp_test_1234567890'; // Replace with your key
```

**Replace it with your actual Razorpay Key ID:**

```javascript
const RAZORPAY_KEY_ID = 'rzp_test_YOUR_ACTUAL_KEY_HERE';
```

### Step 4: Test the Payment

1. Start your application: `npm run dev`
2. Book a ticket for any event
3. Click "Proceed to Payment"
4. Use Razorpay test cards:

**Test Card Details:**
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
Name: Any name
```

**Test UPI:**
```
UPI ID: success@razorpay
```

## 🔒 Security Best Practices

### ⚠️ IMPORTANT: Never Expose Your Key Secret

The Key Secret should **NEVER** be in your frontend code. It should only be on your backend server.

### Current Implementation (Frontend Only)

The current implementation is suitable for:
- ✅ Development and testing
- ✅ Learning and demonstration
- ✅ College projects and prototypes

### For Production Use

You **MUST** implement a backend server to:
1. Generate Razorpay orders securely
2. Verify payment signatures
3. Store payment records in a database
4. Send confirmation emails

## 🏗️ Production-Ready Backend (Node.js Example)

### Install Razorpay SDK on Backend

```bash
npm install razorpay
```

### Backend Code (server.js)

```javascript
const Razorpay = require('razorpay');
const crypto = require('crypto');
const express = require('express');
const app = express();

app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: 'rzp_test_YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET' // Keep this secure on server only
});

// Create Order Endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    
    const options = {
      amount: amount * 100, // amount in paise
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Payment Endpoint
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', 'YOUR_KEY_SECRET')
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      // Save to database, send email, etc.
      res.json({ status: 'success' });
    } else {
      res.status(400).json({ status: 'verification_failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

### Updated Frontend Code (App.jsx)

```javascript
const handlePayment = async (e) => {
  e.preventDefault();
  
  if (!userName || !userEmail || !userPhone) {
    alert('Please fill in all details');
    return;
  }

  setIsProcessingPayment(true);

  try {
    // Step 1: Create order on backend
    const orderResponse = await fetch('http://localhost:3001/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: tickets * selectedEvent.price,
        currency: 'INR',
        receipt: `booking_${Date.now()}`,
        notes: {
          event_id: selectedEvent.id,
          event_name: selectedEvent.title,
          tickets: tickets,
          user_email: userEmail
        }
      })
    });

    const order = await orderResponse.json();

    // Step 2: Open Razorpay checkout
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'CultureHub',
      description: `Booking for ${selectedEvent.title}`,
      order_id: order.id, // From backend
      handler: async function (response) {
        // Step 3: Verify payment on backend
        const verifyResponse = await fetch('http://localhost:3001/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response)
        });

        const result = await verifyResponse.json();
        
        if (result.status === 'success') {
          handlePaymentSuccess(response);
        } else {
          alert('Payment verification failed');
        }
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: userPhone,
      },
      theme: {
        color: '#FF6B35',
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    alert('Error creating order: ' + error.message);
    setIsProcessingPayment(false);
  }
};
```

## 📱 Payment Flow

### User Journey

1. **Browse Events** → User views available events
2. **Select Event** → User clicks "Book Now"
3. **Fill Details** → User enters name, email, phone, and ticket quantity
4. **Proceed to Payment** → User clicks the payment button
5. **Razorpay Checkout** → Payment popup opens
6. **Choose Method** → User selects payment method (Card/UPI/Net Banking)
7. **Complete Payment** → User completes the payment
8. **Confirmation** → Success message + booking confirmation
9. **My Bookings** → User can view booking with payment ID

### Backend Flow (Production)

```
Frontend → Backend → Razorpay → Backend → Frontend
   ↓          ↓          ↓          ↓         ↓
Select    Create     Process   Verify    Confirm
Event     Order      Payment   Payment   Booking
```

## 🧪 Testing

### Test Cards

| Card Type | Number | Result |
|-----------|--------|--------|
| Mastercard Success | 5267 3181 8797 5449 | Success |
| Visa Success | 4111 1111 1111 1111 | Success |
| Rupay Success | 6074 6500 0000 0018 | Success |
| Failed Card | 4012 0010 3714 1112 | Failure |

### Test UPI IDs

- `success@razorpay` - Success
- `failure@razorpay` - Failure

### Test Net Banking

Use any bank from the list in test mode - all transactions will succeed.

## 💰 Pricing

### Razorpay Fees (as of 2024)

- **Domestic Cards**: 2% per transaction
- **Domestic Net Banking**: ₹10-15 per transaction
- **UPI**: 0% (free for payments < ₹2000)
- **International Cards**: 3% + currency conversion fees

**Settlement**: T+2 to T+7 days (after verification)

## 🔧 Customization

### Change Payment Button Text

In `App.jsx`, modify:

```javascript
<button type="submit" className="confirm-btn">
  Pay ₹{tickets * selectedEvent.price}
</button>
```

### Add Payment Methods Filter

```javascript
const options = {
  // ... other options
  config: {
    display: {
      hide: [
        {method: 'emi'},
        {method: 'wallet'}
      ]
    }
  }
};
```

### Change Theme Color

```javascript
theme: {
  color: '#FF6B35', // Your brand color
  backdrop_color: 'rgba(0, 0, 0, 0.5)'
}
```

## 📊 Webhooks (Advanced)

For production, set up webhooks to handle:
- Payment success/failure notifications
- Refund notifications
- Subscription events

### Setup Webhook

1. Go to Razorpay Dashboard → Webhooks
2. Add endpoint URL: `https://your-domain.com/api/webhook`
3. Select events to track
4. Implement webhook handler on backend

## ❓ Troubleshooting

### Payment Button Not Working

**Check:**
1. ✅ Razorpay script loaded: Check browser console
2. ✅ Valid Key ID: Check `RAZORPAY_KEY_ID` value
3. ✅ Form validation: All fields filled correctly

### Payment Popup Not Opening

**Solutions:**
- Disable popup blockers
- Use HTTPS in production
- Check browser console for errors

### Payment Success But Booking Not Created

**Issue:** Handler function error

**Fix:** Check `handlePaymentSuccess` function implementation

## 📚 Resources

- **Razorpay Docs**: https://razorpay.com/docs/
- **API Reference**: https://razorpay.com/docs/api/
- **Integration Guide**: https://razorpay.com/docs/payments/
- **Test Credentials**: https://razorpay.com/docs/payments/payments/test-card-details/

## 🎓 Going Live

### Pre-Launch Checklist

- [ ] Complete KYC verification
- [ ] Implement backend order creation
- [ ] Add payment verification
- [ ] Set up database for bookings
- [ ] Configure webhooks
- [ ] Test with real cards (small amounts)
- [ ] Add email notifications
- [ ] Implement refund policy
- [ ] Set up customer support

### Switch to Live Mode

1. Get Live API keys from Razorpay dashboard
2. Replace `rzp_test_` with `rzp_live_` key
3. Update backend with live credentials
4. Test thoroughly before launch

## 🛡️ Important Notes

⚠️ **Never commit API keys to Git**
⚠️ **Use environment variables for secrets**
⚠️ **Always verify payments on backend**
⚠️ **Implement proper error handling**
⚠️ **Log all transactions**
⚠️ **Follow PCI compliance for card data**

## 💡 Enhancement Ideas

1. **Add Payment History** - Show all transactions
2. **Refund System** - Allow booking cancellations
3. **Partial Payments** - Support installments
4. **Multiple Payment Methods** - Add more gateways
5. **Payment Receipt** - Generate PDF receipts
6. **Email Notifications** - Auto-send confirmations
7. **SMS Alerts** - Send booking confirmations via SMS

---

**Need Help?** Contact Razorpay support or check their extensive documentation.

**Happy Coding! 💻✨**
