

const EventCard = ({ event, onBook }) => {

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'dance': return '💃';
            case 'music': return '🎵';
            case 'drama': return '🎭';
            default: return '🎪';
        }
    };

    const isSoldOut = event.availableSeats === 0;

    return (
        <div className="event-card">
            <div className="event-image-container">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-category-badge">
                    {getCategoryIcon(event.category)} {event.category}
                </div>
            </div>
            <div className="event-content">
                <h4 className="event-title">{event.title}</h4>
                <p className="event-description">{event.description}</p>

                <div className="event-meta">
                    <div className="meta-item">
                        <span className="meta-icon">📅</span>
                        <span>{new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-icon">🕐</span>
                        <span>{event.time}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-icon">📍</span>
                        <span>{event.venue}</span>
                    </div>
                </div>

                <div className="event-performers">
                    {event.performers.map((performer, idx) => (
                        <span key={idx} className="performer-tag">{performer}</span>
                    ))}
                </div>

                <div className="event-footer">
                    <div className="price-section">
                        <span className="price">₹{event.price}</span>
                        <span className="seats-available">
                            {event.availableSeats} / {event.totalSeats} seats left
                        </span>
                    </div>
                    <button
                        className="book-btn"
                        onClick={() => onBook(event)}
                        disabled={isSoldOut}
                    >
                        {isSoldOut ? 'Sold Out' : 'Book Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
