import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/host-events/all');
        if (!response.ok) {
          const errorText = await response.text(); // Capture error details
          throw new Error(`Failed to fetch events: ${errorText}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="events-page">
      <h1>All Events</h1>
      <div className="event-cards">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              {event.eventImage && (
                <img
                  src={`data:image/jpeg;base64,${event.eventImage}`} // Assuming JPEG format
                  alt={event.imageDescription}
                  className="event-image"
                />
              )}
              <div className="event-details">
                <h3>{event.eventName}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
                <p><strong>Deadline:</strong> {event.eventDeadline}</p>
               
                <Link to={`/event-details/${event.id}`} className="details-link">View Details</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default Events;
