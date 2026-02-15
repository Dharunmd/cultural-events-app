import { useEvents } from '../context/EventContext';
import { useNavigate } from 'react-router-dom';
import MyBookings from '../components/MyBookings'; // Reusing existing component
import { ArrowLeft } from 'lucide-react';

const MyBookingsPage = () => {
    const { bookings } = useEvents();
    const navigate = useNavigate();

    return (
        <div className="bookings-page">
            {/* We can wrap standard MyBookings or reuse it directly */}
            {/* Since MyBookings component has its own 'back' handling, we might need to adjust it or wrap it */}

            {bookings.length === 0 ? (
                <div className="container empty-bookings-page">
                    <h2>No Bookings Yet</h2>
                    <p>You haven't booked any tickets yet. Explore events and save your spot!</p>
                    <button onClick={() => navigate('/events')} className="cta-button primary">
                        Browse Events
                    </button>
                </div>
            ) : (
                <MyBookings
                    bookings={bookings}
                    onBack={() => navigate('/events')} // Redirect to events instead of home toggle
                />
            )}
        </div>
    );
};

export default MyBookingsPage;
