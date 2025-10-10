import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './update.css';

const UpdateEventForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        eventName: '',
        date: '',
        location: '',
        startTime: '',
        endTime: '',
        description: '',
        institutionName: '',
        hostProof: '',
        aadhar: '',
        eventLink: '',
        days: '',
        startDate: '',
        endDate: '',
        hostAddress: '',
        purpose: '',
        poster: '',
        capacity: '',
        contactNumber: '',
        activities: '',
        eventDeadline: '',
        eventCategory: '',
        otherCategory: '',
        eventImage: '',
        imageDescription: '',
        eventDetails: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/host-events/detail/${id}`);
                setEvent(response.data);
            } catch (error) {
                setError('Failed to fetch event data.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/host-events/${id}`, event);
            navigate('/manage-events');
        } catch (error) {
            setError('Failed to update event.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="update-event-form">
            <h2>Update Event</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Event Name:
                    <input
                        type="text"
                        name="eventName"
                        value={event.eventName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={event.date.split('T')[0]}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Start Time:
                    <input
                        type="time"
                        name="startTime"
                        value={event.startTime}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="time"
                        name="endTime"
                        value={event.endTime}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Institution Name:
                    <input
                        type="text"
                        name="institutionName"
                        value={event.institutionName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Host Proof:
                    <input
                        type="text"
                        name="hostProof"
                        value={event.hostProof}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Aadhar:
                    <input
                        type="text"
                        name="aadhar"
                        value={event.aadhar}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Event Link:
                    <input
                        type="text"
                        name="eventLink"
                        value={event.eventLink}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Days:
                    <input
                        type="text"
                        name="days"
                        value={event.days}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={event.startDate}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={event.endDate}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Host Address:
                    <input
                        type="text"
                        name="hostAddress"
                        value={event.hostAddress}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Purpose:
                    <input
                        type="text"
                        name="purpose"
                        value={event.purpose}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Poster:
                    <input
                        type="text"
                        name="poster"
                        value={event.poster}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Capacity:
                    <input
                        type="number"
                        name="capacity"
                        value={event.capacity}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Contact Number:
                    <input
                        type="text"
                        name="contactNumber"
                        value={event.contactNumber}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Activities:
                    <textarea
                        name="activities"
                        value={event.activities}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Event Deadline:
                    <input
                        type="date"
                        name="eventDeadline"
                        value={event.eventDeadline}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Event Category:
                    <input
                        type="text"
                        name="eventCategory"
                        value={event.eventCategory}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Other Category:
                    <input
                        type="text"
                        name="otherCategory"
                        value={event.otherCategory}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Event Image:
                    <input
                        type="text"
                        name="eventImage"
                        value={event.eventImage}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Image Description:
                    <textarea
                        name="imageDescription"
                        value={event.imageDescription}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Event Details:
                    <textarea
                        name="eventDetails"
                        value={event.eventDetails}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
};

export default UpdateEventForm;
