import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

const MyBookings = ({ bookings, onBack }) => {
    return (
        <section className="bookings-section">
            <div className="container">
                <motion.h3
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My Bookings
                </motion.h3>
                {bookings.length === 0 ? (
                    <motion.div
                        className="no-bookings"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p>You haven&apos;t booked any tickets yet</p>
                        <button className="back-btn" onClick={onBack}>
                            Browse Events
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        className="bookings-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {bookings.map(booking => (
                            <motion.div
                                key={booking.id}
                                className="booking-card ticket-stub"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, rotate: 1 }}
                            >
                                <div className="booking-header">
                                    <h4>{booking.eventTitle}</h4>
                                    <span className="booking-id">#{booking.id}</span>
                                </div>
                                <div className="booking-content">
                                    <div className="booking-details">
                                        <div className="detail-row">
                                            <span className="label">Name:</span>
                                            <span className="value">{booking.userName}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Email:</span>
                                            <span className="value">{booking.userEmail}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Phone:</span>
                                            <span className="value">{booking.userPhone}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Tickets:</span>
                                            <span className="value">{booking.tickets}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Total Price:</span>
                                            <span className="value price-highlight">₹{booking.totalPrice}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Payment ID:</span>
                                            <span className="value payment-id">{booking.paymentId}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Payment Status:</span>
                                            <span className="value success-badge">{booking.paymentStatus}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Event Date:</span>
                                            <span className="value">
                                                {new Date(booking.eventDate).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Venue:</span>
                                            <span className="value">{booking.venue}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Booked On:</span>
                                            <span className="value">
                                                {new Date(booking.bookingDate).toLocaleDateString('en-US')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="qr-code-section">
                                        <div className="qr-code-container">
                                            <QRCode
                                                size={120}
                                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                value={JSON.stringify({
                                                    id: booking.id,
                                                    event: booking.eventTitle,
                                                    name: booking.userName,
                                                    tickets: booking.tickets,
                                                    date: new Date(booking.eventDate).toLocaleDateString(),
                                                    time: new Date(booking.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                    venue: booking.venue,
                                                    status: "CONFIRMED"
                                                })}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </div>
                                        <p className="qr-label">Scan for Entry</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default MyBookings;
