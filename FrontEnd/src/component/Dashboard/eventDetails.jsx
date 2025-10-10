import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './eventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registeredCount, setRegisteredCount] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const userId = Number(localStorage.getItem('user_id')); // Ensure conversion to number
        console.log('User ID:', userId); // Debugging

        const response = await fetch(`http://localhost:8080/host-events/detail/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch event: ${errorText}`);
        }
        const data = await response.json();
        setEvent(data);

        // Check if the user is already registered for the event
        const checkResponse = await fetch(`http://localhost:8080/event/check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: id,
            userId: userId,
          }),
        });

        if (!checkResponse.ok) {
          const errorText = await checkResponse.text();
          throw new Error(`Failed to check registration: ${errorText}`);
        }

        const { isRegistered, registeredCount } = await checkResponse.json();
        setIsRegistered(isRegistered);
        setRegisteredCount(registeredCount);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      const userId = Number(localStorage.getItem('user_id')); // Ensure conversion to number
      console.log('User ID during registration:', userId); // Debugging

      const response = await fetch(`http://localhost:8080/event/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: id,
          userId: userId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to register for event: ${errorText}`);
      }

      setRegisterSuccess(true);
      setIsRegistered(true);

      // No navigation needed; just update state to show success message
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const imageSrc = event.hostProof ? `data:image/jpeg;base64,${event.hostProof}` : '';

  return (
    <div className="event-details-page">
      <h1>{event.eventName}</h1>
      {imageSrc && (
        <img src={imageSrc} alt={event.eventName} className="event-details-image" />
      )}
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Details:</strong> {event.eventDetails}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Start Time:</strong> {event.startTime}</p>
      <p><strong>End Time:</strong> {event.endTime}</p>
      <p><strong>Capacity:</strong> {event.capacity}</p>
      <p><strong>Contact Number:</strong> {event.contactNumber}</p>
      <p><strong>Registration Deadline:</strong> {event.eventDeadline}</p>
      {event.days > 1 && (
        <>
          <p><strong>Start Date:</strong> {event.startDate}</p>
          <p><strong>End Date:</strong> {event.endDate}</p>
        </>
      )}
      <p><strong>Event Link:</strong> {event.eventLink}</p>
      <p><strong>Members Registered:</strong> {registeredCount}</p>

      {!isRegistered ? (
        <button className="register-button" onClick={handleRegister}>
          Add to Interest
        </button>
      ) : (
        <button className="register-button" disabled>
          Interested
        </button>
      )}
      
      {registerSuccess && <p>Registration Successful!</p>}
    </div>
  );
};

export default EventDetails;
