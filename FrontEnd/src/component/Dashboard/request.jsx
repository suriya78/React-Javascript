import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './request.css';

const Request = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/host-events/pending');  // Updated URL
        if (!response.ok) {
          throw new Error('Failed to fetch events');
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

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/host-events/accept/${id}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to accept event');
      }
      setEvents(events.filter(event => event.id !== id));
      setSuccessMessage('Event accepted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleIgnore = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/host-events/ignore/${id}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to ignore event');
      }
      setEvents(events.filter(event => event.id !== id));
      setSuccessMessage('Event ignored');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="request-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h1>New Event Requests</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.eventName}</h2>
              <p><strong>Host Name:</strong> {event.hostName}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Start Date:</strong> {event.startDate}</p>
              <p><strong>End Date:</strong> {event.endDate}</p>
              <p><strong>Start Time:</strong> {event.startTime}</p>
              <p><strong>End Time:</strong> {event.endTime}</p>
              <p><strong>Host Address:</strong> {event.hostAddress}</p>
              <p><strong>Purpose:</strong> {event.purpose}</p>
              <p><strong>Capacity:</strong> {event.capacity}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Contact Number:</strong> {event.contactNumber}</p>
              <p><strong>Activities:</strong> {event.activities}</p>
              <p><strong>Event Deadline:</strong> {event.eventDeadline}</p>
              <button className="accept" onClick={() => handleAccept(event.id)}>Accept</button>
              <button className="ignore" onClick={() => handleIgnore(event.id)}>Ignore</button>
            </div>
          ))
        ) : (
          <p>No new events found</p>
        )}
      </div>
    </div>
  );
};

export default Request;
