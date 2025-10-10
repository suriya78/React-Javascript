import React, { useEffect, useState } from "react";
import './profile.css'; 
import profile from '../pics/profile.png'; // Default profile image

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        phoneNumber: ''
    });
    const [profileImage, setProfileImage] = useState(profile); // Default image
    const [imageFile, setImageFile] = useState(null);

    const userId = localStorage.getItem('user_id'); // Replace with actual method to get user_id

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                setError('No user ID found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/users/provide/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                setUser(data);
                setFormData({
                    userName: data.userName,
                    email: data.email,
                    phoneNumber: data.phoneNumber
                });
                setProfileImage(data.profileImage || profile); // Update profile image
                setLoading(false);
            } catch (error) {
                setError(`Error fetching user data: ${error.message}`);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Handle form submit, but don't send the image to the backend
        try {
            const response = await fetch(`http://localhost:8080/users/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            setEditMode(false);
        } catch (error) {
            setError(`Error updating user data: ${error.message}`);
        }
    };

    return (
        <div className="profile-container">
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : user ? (
                <div className="profile-card">
                    <div className="profile-image-container">
                        <img 
                            src={profileImage} 
                            alt={user.userName}
                            className="profile-image"
                        />
                        {editMode && (
                            <div className="image-upload">
                                <label htmlFor="imageUpload" className="upload-button">+</label>
                                <input 
                                    type="file" 
                                    id="imageUpload" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="profile-details">
                        {editMode ? (
                            <form onSubmit={handleFormSubmit}>
                                <label>
                                    Username:
                                    <input
                                        type="text"
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Phone Number:
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <h1>Welcome, {user.userName}</h1>
                                <p>Email: {user.email}</p>
                                <p>Username: {user.userName}</p>
                                <p>Phone Number: {user.phoneNumber}</p>
                                <button onClick={() => setEditMode(true)}>Edit Details</button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <h1>No user data found</h1>
            )}
        </div>
    );
}

export default Profile;
