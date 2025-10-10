import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './registeredEvents.css';

const RegisteredEvents = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const fromEventDetails = location.state?.fromEventDetails || false;

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            try {
                const userId = Number(localStorage.getItem('user_id')); // Fetch userId from localStorage
                const response = await fetch('http://localhost:8080/host-events/all', { // Adjusted endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }), // Send userId as an object
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch registered events');
                }

                const data = await response.json();
                setEvents(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchRegisteredEvents();
    }, [fromEventDetails]);

    return (
        <div className="registered-events-container">
            <h1>Registered Events</h1>
            {error && <p className="error-message">Error: {error}</p>}
            <div className="cards-container">
                {events.map(event => (
                    <div className="event-card" key={event.id}>
                        <h2>{event.eventName}</h2>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                    </div>
                ))}
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default RegisteredEvents;
