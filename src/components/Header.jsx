import { Link, useLocation } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { Palette, Ticket, Calendar, ShieldCheck, LogIn } from 'lucide-react';

const Header = () => {
    const location = useLocation();
    const { bookings } = useEvents();
    const { user } = useAuth();

    // Helper to check active route
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="logo">
                    <Palette className="logo-icon" size={28} />
                    <h1>CultureHub</h1>
                </Link>
                <nav className="nav">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>
                        Home
                    </Link>
                    <Link to="/events" className={`nav-link ${isActive('/events')}`}>
                        <Calendar size={18} /> Events
                    </Link>
                    <Link to="/bookings" className={`nav-link ${isActive('/bookings')}`}>
                        <Ticket size={18} /> My Bookings
                        {bookings.length > 0 && <span className="badge">{bookings.length}</span>}
                    </Link>

                    {user ? (
                        <Link to="/admin" className={`nav-link ${isActive('/admin')} admin-link`}>
                            <ShieldCheck size={18} /> Admin
                        </Link>
                    ) : (
                        <Link to="/login" className="nav-link">
                            <LogIn size={18} /> Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
