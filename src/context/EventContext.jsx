import { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

// Mock data as fallback
const INITIAL_EVENTS = [
    {
        id: 1,
        title: "Rhythm Revolution",
        category: "dance",
        date: "2026-02-25",
        time: "18:00",
        venue: "Open Air Auditorium",
        price: 150,
        availableSeats: 200,
        totalSeats: 300,
        image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80",
        description: "A spectacular showcase of contemporary and classical dance performances by our talented students.",
        performers: ["Dance Club", "Classical Society"]
    },
    {
        id: 2,
        title: "Acoustic Nights",
        category: "music",
        date: "2026-03-05",
        time: "19:30",
        venue: "Vel Murugan Auditorium",
        price: 100,
        availableSeats: 150,
        totalSeats: 150,
        image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&q=80",
        description: "An evening of soulful melodies featuring acoustic performances, live bands, and solo artists.",
        performers: ["Music Society", "The Indie Collective"]
    },
    {
        id: 3,
        title: "Shakespeare Reimagined",
        category: "drama",
        date: "2026-03-12",
        time: "17:00",
        venue: "Drama Hall",
        price: 120,
        availableSeats: 80,
        totalSeats: 100,
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
        description: "A modern adaptation of classic Shakespearean plays with a contemporary twist.",
        performers: ["Theatre Arts Club"]
    },
    {
        id: 4,
        title: "Beat Battle 2026",
        category: "dance",
        date: "2026-03-18",
        time: "16:00",
        venue: "Convocation Hall",
        price: 180,
        availableSeats: 250,
        totalSeats: 400,
        image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80",
        description: "Hip-hop and street dance competition featuring crews from different departments.",
        performers: ["B-Boy Alliance", "Street Dancers United"]
    },
    {
        id: 5,
        title: "Classical Fusion Concert",
        category: "music",
        date: "2026-03-22",
        time: "18:30",
        venue: "Vel Murugan Auditorium",
        price: 200,
        availableSeats: 100,
        totalSeats: 200,
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80",
        description: "An extraordinary fusion of Indian classical music with western orchestral arrangements.",
        performers: ["Classical Music Society", "Orchestra Ensemble"]
    },
    {
        id: 6,
        title: "One Act Play Festival",
        category: "drama",
        date: "2026-03-28",
        time: "15:00",
        venue: "Drama Hall",
        price: 80,
        availableSeats: 60,
        totalSeats: 60,
        image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80",
        description: "A series of compelling one-act plays exploring contemporary social themes.",
        performers: ["Drama Society", "Experimental Theatre Group"]
    }
];

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem('cultural_events_data');
        return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    });

    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem('cultural_events_bookings');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist Events
    useEffect(() => {
        localStorage.setItem('cultural_events_data', JSON.stringify(events));
    }, [events]);

    // Persist Bookings
    useEffect(() => {
        localStorage.setItem('cultural_events_bookings', JSON.stringify(bookings));
    }, [bookings]);

    // Actions
    const addEvent = (newEvent) => {
        setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    };

    const deleteEvent = (id) => {
        setEvents(prev => prev.filter(event => event.id !== id));
    };

    const bookTicket = (bookingDetails, ticketsToDeduct) => {
        setBookings(prev => [bookingDetails, ...prev]);

        setEvents(prev => prev.map(evt =>
            evt.id === bookingDetails.eventId
                ? { ...evt, availableSeats: evt.availableSeats - ticketsToDeduct }
                : evt
        ));
    };

    return (
        <EventContext.Provider value={{
            events,
            bookings,
            addEvent,
            deleteEvent,
            bookTicket
        }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) throw new Error('useEvents must be used within an EventProvider');
    return context;
};
