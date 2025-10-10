import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './manageevents.css';
import Sidebar from './sidebar';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/host-events/all')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    console.error('Unexpected data structure:', response.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (eventId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8080/host-events/${eventId}`)
                .then(() => {
                    setEvents(events.filter(event => event.id !== eventId));
                })
                .catch(error => {
                    console.error('There was an error deleting the event!', error);
                });
        }
    };

    const handleUpdate = (eventId) => {
        navigate(`/update/${eventId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='manage'>
            <Sidebar />
            <div className="manage-events">
                <h2>Manage Events</h2>
                <div className="events-section">
                    <ul>
                        {events.map(event => (
                            <li key={event.id}>
                                <div className="event">
                                    <h4>{event.eventName}</h4>
                                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                    <p>Location: {event.location}</p>
                                    <p>Start Time: {event.startTime}</p>
                                    <p>End Time: {event.endTime}</p>
                                    <p>Description: {event.description}</p>
                                    <div className="event-buttons">
                                        <button onClick={() => handleUpdate(event.id)}>Edit</button>
                                        <button onClick={() => handleDelete(event.id)}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ManageEvents;
