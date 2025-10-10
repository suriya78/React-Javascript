import React, { useState } from 'react';
import './hostEvent.css';

const HostEventForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    institutionName: '',
    location: '',
    eventLink: '',
    date: '',
    days: 1,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    hostAddress: '',
    purpose: '',
    capacity: '',
    description: '',
    contactNumber: '',
    activities: '',
    eventDeadline: '',
    eventDetails: '',
    eventCategory: '',
    otherCategory: '', // Field for custom category
    imageDescription: '', // New field for image description
  });

  const [files, setFiles] = useState({
    hostProof: null,
    aadhar: null,
    eventImage: null,
  });
  const userId = Number(localStorage.getItem("user_id"));
  const [showPopup, setShowPopup] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files: fileList } = e.target;

    if (type === 'file') {
      setFiles({
        ...files,
        [name]: fileList[0],
      });
    } else if (type === 'radio' || type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked ? 'yes' : value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.eventDeadline) >= new Date(formData.date)) {
      alert('Event deadline must be before the event date.');
      return;
    }

    const filesBase64 = {};
    for (const key in files) {
      if (files[key]) {
        try {
          filesBase64[key] = await fileToBase64(files[key]);
        } catch (error) {
          console.error('Error converting file to base64:', error);
          return;
        }
      }
    }

    const jsonData = {
      ...formData,
      ...filesBase64,
      userId: userId,
    };

    try {
      const response = await fetch('http://localhost:8080/host-events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      const data = await response.text();

      if (response.ok) {
        console.log('Form data submitted successfully:', data);
        setSubmitMessage('Request has been sent to Admin');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);

        // Reset form
        setFormData({
          eventName: '',
          institutionName: '',
          location: '',
          eventLink: '',
          date: '',
          days: 1,
          startDate: '',
          endDate: '',
          startTime: '',
          endTime: '',
          hostAddress: '',
          purpose: '',
          capacity: '',
          description: '',
          contactNumber: '',
          activities: '',
          eventDeadline: '',
          eventDetails: '',
          eventCategory: '',
          otherCategory: '', // Reset the custom category field
          imageDescription: '', // Reset the new field
        });

        setFiles({
          hostProof: null,
          aadhar: null,
          eventImage: null, // Reset the new field
        });
      } else {
        console.error('Failed response:', data);
        alert('Failed to submit form data: ' + data);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('An error occurred while submitting the form: ' + error.message);
    }
  };

  return (
    <div className="host-event-container">
      <div className="form-instructions">
        <h2>Instructions for Filling Out the Form</h2>
        <p>Please provide the following details to host your event:</p>
        <ul>
          <li><strong>Event Name:</strong> Enter the name of the event (e.g., "Annual Tech Conference").</li>
          <li><strong>Institution/Organization Name:</strong> Enter the name of the institution or organization hosting the event.</li>
          <li><strong>Host Proof (ID):</strong> Upload a file verifying the host’s identity (e.g., government-issued ID).</li>
          <li><strong>Aadhar:</strong> Upload the Aadhar card or equivalent identification document.</li>
          <li><strong>Location:</strong> Enter the physical address where the event will take place.</li>
          <li><strong>Event Link:</strong> Provide a link to the event's page for more details.</li>
          <li><strong>Date:</strong> Select the main date for the event. If the event spans multiple days, additional dates will be required.</li>
          <li><strong>Number of Days:</strong> Choose how many days the event will last (1, 2, 3, etc.).</li>
          {formData.days > 1 && (
            <>
              <li><strong>Start Date:</strong> Specify the start date if the event spans multiple days.</li>
              <li><strong>End Date:</strong> Specify the end date if the event spans multiple days.</li>
            </>
          )}
          <li><strong>Start Time:</strong> Enter the time when the event will start.</li>
          <li><strong>End Time:</strong> Enter the time when the event will end.</li>
          <li><strong>Host Address:</strong> Provide the full address of the host or organizing body.</li>
          <li><strong>Purpose:</strong> Describe the purpose of the event (e.g., "To discuss emerging technologies").</li>
          <li><strong>Poster Upload:</strong> Upload a promotional poster for the event.</li>
          <li><strong>Capacity:</strong> Enter the maximum number of attendees expected at the event.</li>
          <li><strong>Description:</strong> Provide a detailed description of the event.</li>
          <li><strong>Contact Number:</strong> Enter a contact number for event-related inquiries.</li>
          <li><strong>Activities:</strong> List any activities or sessions planned during the event.</li>
          <li><strong>Event Deadline:</strong> Specify the deadline for event registration or other key activities. (Must be before the event date.)</li>
          <li><strong>Event Details:</strong> Provide additional details about the event (e.g., special instructions or requirements).</li>
          <li><strong>Event Category:</strong> Select the category that best fits your event (e.g., Conference, Workshop, or Other).</li>
          {formData.eventCategory === 'Other' && (
            <li><strong>Specify Other Category:</strong> If "OTHER" is selected, please specify the category.</li>
          )}
          <li><strong>Image Upload:</strong> Upload an image related to the event.</li>
          <li><strong>Image Description:</strong> Provide a description for the image.</li> {/* New instruction */}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="host-event-form">
        {/* Existing form fields */}
        <div className="form-group">
          <label className="form-label">Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Institution/Organization Name:</label>
          <input
            type="text"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Event Link:</label>
          <input
            type="url"
            name="eventLink"
            value={formData.eventLink}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Number of Days:</label>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            className="form-input"
            min="1"
            max="7"
          />
        </div>
        {formData.days > 1 && (
          <>
            <div className="form-group">
              <label className="form-label">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label className="form-label">Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">End Time:</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Host Address:</label>
          <textarea
            name="hostAddress"
            value={formData.hostAddress}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Purpose:</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Contact Number:</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="form-input"
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Activities:</label>
          <textarea
            name="activities"
            value={formData.activities}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Event Deadline:</label>
          <input
            type="date"
            name="eventDeadline"
            value={formData.eventDeadline}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Event Details:</label>
          <textarea
            name="eventDetails"
            value={formData.eventDetails}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Event Category:</label>
          <select
            name="eventCategory"
            value={formData.eventCategory}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Category</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {formData.eventCategory === 'Other' && (
          <div className="form-group">
            <label className="form-label">Specify Other Category:</label>
            <input
              type="text"
              name="otherCategory"
              value={formData.otherCategory}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Host Proof (ID):</label>
          <input
            type="file"
            name="hostProof"
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Aadhar:</label>
          <input
            type="file"
            name="aadhar"
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Event Image:</label>
          <input
            type="file"
            name="eventImage"
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Image Description:</label>
          <textarea
            name="imageDescription"
            value={formData.imageDescription}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {showPopup && (
        <div className="popup-message">
          <p>{submitMessage}</p>
        </div>
      )}
    </div>
  );
};

export default HostEventForm;
