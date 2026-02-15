# 🚀 Quick Setup Guide

## Step-by-Step Installation

### 1. Extract the Project
Extract all files while maintaining the folder structure:
```
cultural-events-app/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── .eslintrc.cjs
├── .gitignore
└── README.md
```

### 2. Install Node.js
If you don't have Node.js installed:
- Download from: https://nodejs.org/
- Choose the LTS (Long Term Support) version
- Install with default settings

### 3. Open Terminal/Command Prompt
- **Windows**: Press `Win + R`, type `cmd`, press Enter
- **Mac**: Press `Cmd + Space`, type `terminal`, press Enter
- **Linux**: Press `Ctrl + Alt + T`

### 4. Navigate to Project Directory
```bash
cd path/to/cultural-events-app
```

### 5. Install Dependencies
```bash
npm install
```
This will download and install all required packages (React, Vite, etc.)

### 6. Start Development Server
```bash
npm run dev
```

### 7. Open in Browser
The app will automatically open at `http://localhost:3000`
If it doesn't, manually open your browser and go to that URL.

## 🎯 What You'll See

1. **Home Page**: Displays all cultural events in a beautiful grid
2. **Category Filters**: Click Dance, Music, or Drama to filter events
3. **Search Bar**: Search for events by name or description
4. **Event Cards**: Each shows event details, images, and available seats
5. **Book Now Button**: Click to open the booking modal
6. **My Bookings**: View all your confirmed bookings

## 🛠️ Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically use 3001, 3002, etc.

### Installation Errors
Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Module Not Found
Delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

## 📝 Making Your First Booking

1. Browse events on the home page
2. Click "Book Now" on any event
3. Fill in:
   - Your name
   - Email address
   - Number of tickets
4. Review the total price
5. Click "Confirm Booking"
6. Check "My Bookings" to see your confirmation

## 🎨 Customizing for Your College

### Change College Name
Edit `src/App.jsx` line 145:
```javascript
<h1>CultureHub</h1>  // Change to your college name
```

### Add Your Events
Edit `src/App.jsx` starting at line 7 in the `INITIAL_EVENTS` array.

### Change Colors
Edit `src/App.css` starting at line 3 in the `:root` section.

### Change Event Images
Update the `image` property in each event with your own image URLs.

## 🚀 Deploying to Production

### Build for Production
```bash
npm run build
```

This creates a `dist` folder with optimized files.

### Deploy Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **Your Server**: Upload `dist` contents to your web hosting

## 📚 Learning Resources

- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
- CSS Tricks: https://css-tricks.com/
- MDN Web Docs: https://developer.mozilla.org/

## 💡 Next Steps

1. Add real event data from your college
2. Integrate with a backend API
3. Add user authentication
4. Implement payment processing
5. Add email notifications
6. Create an admin panel

## 🤔 Need Help?

Common commands:
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm install` - Install dependencies

---

**Enjoy building your cultural events platform! 🎉**
