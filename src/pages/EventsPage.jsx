import { useState } from 'react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import BookingModal from '../components/BookingModal';
import { Search, Filter } from 'lucide-react';

const EventsPage = () => {
    const { events, bookTicket } = useEvents();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);

    const categories = [
        { id: 'all', label: 'All Events' },
        { id: 'music', label: 'Music' },
        { id: 'dance', label: 'Dance' },
        { id: 'drama', label: 'Drama' },
        { id: 'workshop', label: 'Workshops' }
    ];

    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleBookClick = (event) => {
        setSelectedEvent(event);
        setBookingModalOpen(true);
    };

    const handlePaymentSuccess = (bookingDetails, ticketsToDeduct) => {
        bookTicket(bookingDetails, ticketsToDeduct); // Use Context Action

        alert(`Payment Successful! 🎉\n\nBooking confirmed for ${bookingDetails.eventTitle}\nPayment ID: ${bookingDetails.paymentId}\n\nCheck your email for the ticket confirmation.`);

        setBookingModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <div className="events-page">
            <div className="container">

                {/* Filters Header */}
                <div className="filters-header">
                    <h1 className="page-title">Discover Events</h1>

                    <div className="search-bar">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search events, artists, venues..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="category-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Events Grid */}
                <div className="events-grid">
                    {filteredEvents.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onBook={handleBookClick}
                        />
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="no-events-state">
                        <div className="no-events-icon"><Filter size={48} /></div>
                        <h3>No events found</h3>
                        <p>Try adjusting your search or category filter.</p>
                    </div>
                )}
            </div>

            {bookingModalOpen && selectedEvent && (
                <BookingModal
                    selectedEvent={selectedEvent}
                    onClose={() => setBookingModalOpen(false)}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
};

export default EventsPage;
