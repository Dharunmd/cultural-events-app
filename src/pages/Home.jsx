import { useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import { ArrowRight, Music, Calendar, Star } from 'lucide-react';

const Home = () => {
    const { events } = useEvents();
    const navigate = useNavigate();

    // Get next 3 upcoming events
    const featuredEvents = events
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    const handleBookClick = (event) => {
        // Navigate to events page or open modal (implementation choice)
        // For now, let's redirect to events page with filter or details
        navigate('/events');
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background"></div>
                <div className="hero-content">
                    <h1 className="hero-title fade-in-up">
                        Experience the Magic of <br />
                        <span className="highlight">College Culture</span>
                    </h1>
                    <p className="hero-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Book tickets for the most anticipated cultural events, concerts, and performances of the year.
                    </p>
                    <div className="hero-actions fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <Link to="/events" className="cta-button primary">
                            Explore Events <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <Calendar size={32} className="stat-icon" />
                            <h3>50+</h3>
                            <p>Events this Year</p>
                        </div>
                        <div className="stat-card">
                            <Music size={32} className="stat-icon" />
                            <h3>20+</h3>
                            <p>Live Performances</p>
                        </div>
                        <div className="stat-card">
                            <Star size={32} className="stat-icon" />
                            <h3>5k+</h3>
                            <p>Happy Attendees</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section id="featured" className="events-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Events</h2>
                        <Link to="/events" className="view-all-link">
                            View All Events <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="events-grid">
                        {featuredEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onBook={handleBookClick}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
