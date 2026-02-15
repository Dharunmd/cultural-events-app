# 🔧 Backend Setup Guide

Backend API for CultureHub payment processing using Razorpay.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Razorpay account (https://razorpay.com)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your Razorpay credentials:

```env
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
PORT=3001
```

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:3001`

## 📡 API Endpoints

### 1. Health Check
```
GET /
Response: { message: "CultureHub Payment API is running" }
```

### 2. Create Order
```
POST /api/create-order
Content-Type: application/json

Body:
{
  "amount": 500,
  "currency": "INR",
  "receipt": "booking_123",
  "notes": {
    "event_id": "1",
    "event_name": "Rhythm Revolution",
    "tickets": 2
  }
}

Response:
{
  "success": true,
  "order_id": "order_xxxxx",
  "amount": 50000,
  "currency": "INR",
  "receipt": "booking_123"
}
```

### 3. Verify Payment
```
POST /api/verify-payment
Content-Type: application/json

Body:
{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx"
}

Response:
{
  "success": true,
  "message": "Payment verified successfully",
  "payment_id": "pay_xxxxx"
}
```

### 4. Get Payment Details
```
GET /api/payment/:payment_id

Response:
{
  "success": true,
  "payment": {
    "id": "pay_xxxxx",
    "amount": 500,
    "currency": "INR",
    "status": "captured",
    "method": "card",
    "email": "user@example.com",
    "contact": "9876543210"
  }
}
```

### 5. Process Refund
```
POST /api/refund
Content-Type: application/json

Body:
{
  "payment_id": "pay_xxxxx",
  "amount": 500,  // Optional: for partial refund
  "notes": {
    "reason": "Booking cancelled"
  }
}

Response:
{
  "success": true,
  "refund_id": "rfnd_xxxxx",
  "amount": 500,
  "status": "processed"
}
```

### 6. Webhook Handler
```
POST /api/webhook
Headers:
  x-razorpay-signature: signature_from_razorpay

Body: Razorpay webhook payload

Response:
{
  "success": true
}
```

### 7. Get All Orders (Admin)
```
GET /api/orders?count=10&skip=0

Response:
{
  "success": true,
  "count": 10,
  "orders": [...]
}
```

## 🔐 Security

### Environment Variables
Never commit `.env` file to version control. Always use `.env.example` as a template.

### API Key Protection
- Keep `RAZORPAY_KEY_SECRET` secure
- Never expose it in frontend code
- Use environment variables on server

### CORS Configuration
Update CORS settings in `server.js` for production:

```javascript
app.use(cors({
  origin: 'https://your-production-domain.com',
  credentials: true
}));
```

## 🧪 Testing

### Test with cURL

**Create Order:**
```bash
curl -X POST http://localhost:3001/api/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "currency": "INR",
    "receipt": "test_receipt_1"
  }'
```

**Verify Payment:**
```bash
curl -X POST http://localhost:3001/api/verify-payment \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_order_id": "order_xxxxx",
    "razorpay_payment_id": "pay_xxxxx",
    "razorpay_signature": "signature_xxxxx"
  }'
```

### Test with Postman

1. Import the API endpoints
2. Set environment variables
3. Test each endpoint

## 🌐 Frontend Integration

Update your frontend to use the backend API:

```javascript
// src/App.jsx

const handlePayment = async (e) => {
  e.preventDefault();
  setIsProcessingPayment(true);

  try {
    // Step 1: Create order on backend
    const response = await fetch('http://localhost:3001/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: tickets * selectedEvent.price,
        currency: 'INR',
        receipt: `booking_${Date.now()}`,
        notes: {
          event_id: selectedEvent.id,
          event_name: selectedEvent.title,
          tickets: tickets
        }
      })
    });

    const order = await response.json();

    if (!order.success) {
      throw new Error('Order creation failed');
    }

    // Step 2: Open Razorpay checkout
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.order_id,
      name: 'CultureHub',
      description: `Booking for ${selectedEvent.title}`,
      handler: async function (paymentResponse) {
        // Step 3: Verify payment
        const verifyResponse = await fetch('http://localhost:3001/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentResponse)
        });

        const result = await verifyResponse.json();

        if (result.success) {
          handlePaymentSuccess(paymentResponse);
        } else {
          alert('Payment verification failed');
        }
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: userPhone
      },
      theme: {
        color: '#FF6B35'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    setIsProcessingPayment(false);
  }
};
```

## 📦 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create culturehub-api

# Set environment variables
heroku config:set RAZORPAY_KEY_ID=rzp_live_xxxxx
heroku config:set RAZORPAY_KEY_SECRET=your_secret

# Deploy
git push heroku main
```

### Deploy to Vercel/Netlify

These platforms support serverless functions. Adapt the code accordingly.

### Deploy to VPS

```bash
# Install Node.js on server
# Clone repository
git clone your-repo-url
cd backend

# Install dependencies
npm install --production

# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name culturehub-api
pm2 startup
pm2 save
```

## 🔄 Webhooks Setup

1. Go to Razorpay Dashboard → Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhook`
3. Select events:
   - payment.authorized
   - payment.captured
   - payment.failed
   - refund.created
4. Copy the webhook secret to `.env`

## 📊 Database Integration (Optional)

To persist bookings, integrate a database:

### With MongoDB

```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const BookingSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  amount: Number,
  eventId: String,
  tickets: Number,
  userEmail: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', BookingSchema);
```

### With PostgreSQL

```bash
npm install pg
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
# Linux/Mac:
lsof -ti:3001 | xargs kill -9

# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### CORS Errors
Update CORS configuration in `server.js` to allow your frontend origin.

### Payment Verification Fails
- Check if `RAZORPAY_KEY_SECRET` is correct
- Ensure signature is being sent correctly from frontend

## 📚 Resources

- [Razorpay API Docs](https://razorpay.com/docs/api/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🤝 Support

For issues or questions:
- Check Razorpay documentation
- Review server logs
- Contact Razorpay support

---

**Happy Coding! 🚀**
