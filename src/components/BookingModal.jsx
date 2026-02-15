import { useState } from 'react';
import QRCode from 'react-qr-code';

const BookingModal = ({ selectedEvent, onClose, onPaymentSuccess }) => {
    // Local state for form fields
    const [tickets, setTickets] = useState(1);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [showPaymentQR, setShowPaymentQR] = useState(false);

    const handleProceedToPay = (e) => {
        e.preventDefault();

        // Validation
        if (!userName || !userEmail || !userPhone) {
            alert('Please fill in all details');
            return;
        }

        if (tickets > selectedEvent.availableSeats) {
            alert('Not enough seats available');
            return;
        }

        if (userPhone.length !== 10) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        setShowPaymentQR(true);
    };

    const handlePaymentConfirmation = () => {
        const amount = tickets * selectedEvent.price;

        const bookingDetails = {
            id: Date.now(),
            eventId: selectedEvent.id,
            eventTitle: selectedEvent.title,
            tickets: tickets,
            totalPrice: amount,
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            bookingDate: new Date().toISOString(),
            eventDate: selectedEvent.date,
            venue: selectedEvent.venue,
            paymentId: `UPI-${Date.now()}`,
            paymentStatus: 'Success'
        };

        onPaymentSuccess(bookingDetails, tickets);
    };

    const totalAmount = tickets * selectedEvent.price;
    // UPI URL format: upi://pay?pa=merchant@upi&pn=MerchantName&am=Amount&cu=INR
    // Using a test VPA since we don't have a real merchant account
    const upiUrl = `upi://pay?pa=culturehub@upi&pn=CultureHub&am=${totalAmount}&cu=INR`;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h3 className="modal-title">
                    {showPaymentQR ? 'Scan to Pay' : 'Book Tickets'}
                </h3>

                <div className="modal-event-info">
                    <h4>{selectedEvent.title}</h4>
                    <p>{new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}</p>
                    <p>Total Amount: <strong>₹{totalAmount}</strong></p>
                </div>

                {!showPaymentQR ? (
                    <form onSubmit={handleProceedToPay} className="booking-form">
                        <div className="form-group">
                            <label>Your Name *</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                                type="tel"
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                placeholder="10-digit mobile number"
                                pattern="[0-9]{10}"
                                maxLength="10"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Number of Tickets</label>
                            <input
                                type="number"
                                min="1"
                                max={selectedEvent.availableSeats}
                                value={tickets}
                                onChange={(e) => setTickets(parseInt(e.target.value))}
                                required
                            />
                            <small>{selectedEvent.availableSeats} seats available</small>
                        </div>

                        <div className="booking-summary">
                            <div className="summary-row">
                                <span>Price per ticket:</span>
                                <span>₹{selectedEvent.price}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total Amount:</span>
                                <span>₹{totalAmount}</span>
                            </div>
                        </div>

                        <button type="submit" className="confirm-btn">
                            Proceed to Pay
                        </button>
                    </form>
                ) : (
                    <div className="payment-qr-section">
                        <div className="upi-qr-container">
                            <QRCode
                                size={200}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={upiUrl}
                                viewBox={`0 0 256 256`}
                            />
                        </div>

                        <p className="scan-instruction">Scan with any UPI App</p>

                        <div className="upi-apps">
                            <span className="upi-badge">GPay</span>
                            <span className="upi-badge">Paytm</span>
                            <span className="upi-badge">BHIM</span>
                            <span className="upi-badge">PhonePe</span>
                        </div>

                        <div className="payment-actions">
                            <button
                                className="confirm-btn success"
                                onClick={handlePaymentConfirmation}
                            >
                                I have completed payment
                            </button>
                            <button
                                className="back-btn-outline"
                                onClick={() => setShowPaymentQR(false)}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
