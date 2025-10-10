import React from 'react';
import './AdminPage.css';
import Sidebar from './sidebar';

function AdminPage() {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to Admin Panel</h1>
        <h2>Admin Capabilities</h2>
        <p>As an admin, you have the following responsibilities:</p>
        <ol>
          <li>
            <strong>Monitor Events:</strong> Keep track of all events within the system. This includes reviewing event details, checking the status of upcoming and past events, and ensuring they adhere to platform standards.
          </li>
          <li>
            <strong>Manage Users:</strong> Oversee user activity, verify user accounts, and handle user requests. This includes approving or rejecting user registrations and addressing any issues reported by users.
          </li>
          <li>
            <strong>Verify Events:</strong> Review event submissions from users. Ensure that the details provided are accurate, complete, and meet the platform’s requirements before they are made public.
          </li>
          <li>
            <strong>Add Events Based on User Requests:</strong> Create new events based on user requests. Review the details submitted by users and input them into the system if they meet the necessary criteria.
          </li>
          <li>
            <strong>Update and Delete Records:</strong> Make necessary changes to event or user records as required. This includes updating details or deleting records based on administrative decisions.
          </li>
        </ol>
        <p>
          These responsibilities ensure the platform remains well-managed and efficient, providing a smooth experience for all users.
        </p>
      </div>
    </div>
  );
}

export default AdminPage;
