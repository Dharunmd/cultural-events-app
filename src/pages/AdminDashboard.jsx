import { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Calendar, MapPin, DollarSign, Users, X, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const { events, bookings, addEvent, deleteEvent } = useEvents();
    const { logout, user } = useAuth();

    const [showAddModal, setShowAddModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        category: 'music',
        date: '',
        time: '',
        venue: '',
        price: '',
        availableSeats: '',
        totalSeats: '',
        image: '',
        description: '',
        performers: ''
    });

    const handleAddEvent = (e) => {
        e.preventDefault();
        const eventToAdd = {
            ...newEvent,
            price: Number(newEvent.price),
            availableSeats: Number(newEvent.availableSeats),
            totalSeats: Number(newEvent.totalSeats),
            performers: newEvent.performers.split(',').map(p => p.trim())
        };
        addEvent(eventToAdd);
        setShowAddModal(false);
        setNewEvent({
            title: '', category: 'music', date: '', time: '', venue: '', price: '',
            availableSeats: '', totalSeats: '', image: '', description: '', performers: ''
        });
    };

    return (
        <div className="admin-dashboard container">
            <div className="admin-header">
                <div>
                    <h1 className="page-title">Admin Dashboard</h1>
                    <p className="welcome-text">Welcome back, {user?.name}</p>
                </div>
                <div className="admin-actions">
                    <button onClick={() => setShowAddModal(true)} className="cta-button primary">
                        <Plus size={18} /> Add New Event
                    </button>
                    <button onClick={logout} className="cta-button secondary">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Events</h3>
                    <p className="stat-value">{events.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Bookings</h3>
                    <p className="stat-value">{bookings.length}</p>
                </div>
            </div>

            <h2 className="section-title">Manage Events</h2>
            <div className="events-list-admin">
                {events.map(event => (
                    <div key={event.id} className="admin-event-row">
                        <img src={event.image} alt={event.title} className="admin-event-img" />
                        <div className="admin-event-info">
                            <h4>{event.title}</h4>
                            <p>{new Date(event.date).toLocaleDateString()} at {event.venue}</p>
                        </div>
                        <div className="admin-event-seats">
                            <Users size={16} /> {event.availableSeats} / {event.totalSeats}
                        </div>
                        <button onClick={() => deleteEvent(event.id)} className="delete-btn">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content admin-modal">
                        <button className="close-btn" onClick={() => setShowAddModal(false)}><X /></button>
                        <h2>Add New Event</h2>
                        <form onSubmit={handleAddEvent} className="booking-form">
                            <div className="form-group">
                                <label>Event Title</label>
                                <input required type="text" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select value={newEvent.category} onChange={e => setNewEvent({ ...newEvent, category: e.target.value })}>
                                        <option value="music">Music</option>
                                        <option value="dance">Dance</option>
                                        <option value="drama">Drama</option>
                                        <option value="workshop">Workshop</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Price (₹)</label>
                                    <input required type="number" value={newEvent.price} onChange={e => setNewEvent({ ...newEvent, price: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input required type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Time</label>
                                    <input required type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Venue</label>
                                <input required type="text" value={newEvent.venue} onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input required type="url" value={newEvent.image} onChange={e => setNewEvent({ ...newEvent, image: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Total Seats</label>
                                <input required type="number" value={newEvent.totalSeats} onChange={e => setNewEvent({ ...newEvent, availableSeats: e.target.value, totalSeats: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea required value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
                            </div>
                            <button type="submit" className="confirm-btn">Create Event</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
