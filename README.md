# 🎨 CultureHub - College Cultural Events Booking Platform

A modern, feature-rich React application for viewing and booking tickets to internal cultural events such as dance, music, and drama competitions conducted within a college department.

## ✨ Features

### Core Functionality
- **Event Browsing**: View all upcoming cultural events with detailed information
- **Category Filtering**: Filter events by category (Dance, Music, Drama)
- **Search Functionality**: Search events by title or description
- **Ticket Booking**: Book multiple tickets for any event
- **Payment Integration**: Secure online payments via Razorpay (Cards, UPI, Net Banking, Wallets)
- **Booking Management**: View all your bookings with payment details
- **Real-time Availability**: See available seats update in real-time

### Event Details
Each event includes:
- Event title and description
- Date, time, and venue information
- Ticket price
- Available seats counter
- Performer/artist information
- High-quality event images
- Category badges

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Modern UI**: Distinctive design with custom color palette and typography
- **Intuitive Navigation**: Easy switching between events and bookings
- **Form Validation**: Ensures all booking details are properly filled

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Razorpay account (for payment integration) - Sign up at https://razorpay.com

### Installation

1. **Navigate to the project directory**:
```bash
cd cultural-events-app
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure Razorpay (Important for Payment)**:

Open `src/App.jsx` and replace the Razorpay Key ID (around line 118):

```javascript
const RAZORPAY_KEY_ID = 'rzp_test_YOUR_KEY_ID_HERE';
```

Get your Razorpay Key ID from:
- Sign up at https://razorpay.com
- Go to Settings → API Keys
- Copy your Key ID (starts with `rzp_test_` for test mode)

**See `PAYMENT_INTEGRATION_GUIDE.md` for detailed payment setup instructions**

4. **Start the development server**:
```bash
npm run dev
```

5. **Open your browser**:
The app will automatically open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
cultural-events-app/
├── src/
│   ├── App.jsx           # Main application component (with payment integration)
│   ├── App.css           # Application styles
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── backend/              # Backend API for payment processing
│   ├── server.js         # Express server with Razorpay integration
│   ├── package.json      # Backend dependencies
│   ├── .env.example      # Environment variables template
│   └── README.md         # Backend setup guide
├── index.html            # HTML template
├── package.json          # Frontend dependencies and scripts
├── vite.config.js        # Vite configuration
├── PAYMENT_INTEGRATION_GUIDE.md  # Detailed payment setup guide
├── SETUP_GUIDE.md        # Quick setup instructions
└── README.md            # Project documentation
```

## 🎯 How to Use

### Browsing Events
1. View all available events on the home page
2. Use category filters to see specific types of events (Dance, Music, Drama)
3. Use the search bar to find events by name or description
4. Click on any event card to see more details

### Booking Tickets
1. Click the "Book Now" button on any event
2. Fill in your details:
   - Your name
   - Email address
   - Phone number (10 digits)
   - Number of tickets
3. Review the total price
4. Click "Proceed to Payment"
5. Complete payment via Razorpay:
   - Choose payment method (Card/UPI/Net Banking/Wallet)
   - Complete the payment
6. Receive booking confirmation with Payment ID

**Test Payment (Development Mode):**
- Test Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date
- Or use Test UPI: success@razorpay

### Viewing Bookings
1. Click "My Bookings" in the navigation
2. See all your confirmed bookings
3. Each booking shows:
   - Event details
   - Your information (name, email, phone)
   - Number of tickets
   - Total price
   - Payment ID
   - Payment status
   - Booking ID

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `src/App.css`:

```css
:root {
  --primary: #FF6B35;      /* Main brand color */
  --secondary: #F7931E;    /* Secondary color */
  --accent: #C1292E;       /* Accent color */
  /* ... other variables */
}
```

### Adding New Events
In `src/App.jsx`, modify the `INITIAL_EVENTS` array:

```javascript
const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Your Event Title",
    category: "dance", // or "music" or "drama"
    date: "2026-03-15",
    time: "18:00",
    venue: "Main Hall",
    price: 150,
    availableSeats: 200,
    totalSeats: 200,
    image: "image-url",
    description: "Event description",
    performers: ["Performer 1", "Performer 2"]
  },
  // ... more events
];
```

### Modifying Categories
To add new event categories:
1. Add the category to the filter buttons array
2. Add an emoji icon in the `getCategoryIcon` function
3. Update the category filter logic if needed

## 🛠️ Technologies Used

- **React 18**: UI library for building the interface
- **Vite**: Fast build tool and development server
- **Razorpay**: Payment gateway for secure online payments
- **CSS3**: Modern styling with animations and transitions
- **Google Fonts**: Custom typography (Playfair Display & DM Sans)
- **Unsplash**: High-quality event images

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

## 🎭 Event Categories

- **Dance**: Contemporary, classical, hip-hop, and street dance performances
- **Music**: Live bands, acoustic nights, classical concerts, and fusion performances
- **Drama**: Theatre plays, one-act plays, and dramatic performances

## 💡 Future Enhancements

Potential features to add:
- ✅ **Payment gateway integration** (COMPLETED - Razorpay)
- User authentication and login
- Backend order creation and verification (sample included in `/backend`)
- Email confirmation for bookings
- QR code tickets
- Event ratings and reviews
- Admin panel for event management
- Social media sharing
- Reminder notifications
- Seat selection interface
- Multiple venue support
- Event calendar view
- Wishlist functionality
- Refund management system
- Analytics dashboard

## 🤝 Contributing

Feel free to fork this project and customize it for your college's cultural events!

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Developer Notes

### State Management
The app uses React's `useState` hook for state management. For larger applications, consider:
- Context API for global state
- Redux or Zustand for complex state management
- React Query for server state

### Data Persistence
Currently, booking data is stored in component state. To persist data:
- Use `localStorage` for client-side persistence (temporary solution)
- **Integrate with a backend API** (sample backend provided in `/backend` folder)
- Use a database (MongoDB, PostgreSQL) for production
- Store payment records securely
- Implement webhook handlers for payment notifications

### Image Optimization
For production:
- Host images on a CDN
- Use WebP format for better compression
- Implement lazy loading for images
- Add proper alt texts for accessibility

## 🎉 Acknowledgments

- Event images from Unsplash
- Icons and emojis from Unicode standard
- Design inspiration from modern event booking platforms

---

**Happy Coding! 🚀**

For questions or support, feel free to reach out or open an issue.
