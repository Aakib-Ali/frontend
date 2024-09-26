import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/MeetingInput.css'; // Import the CSS file for styling
import zoomLogo from './Zoom-Logo.png';

const MeetingSignIn = () => {
    const [meetingId, setMeetingId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (meetingId) {
            navigate(`/dashboard/${meetingId}`); // Redirecting to dashboard with meeting ID
        }
    };

    return (
        <div className="signin-container">
            <img src={zoomLogo} alt="Zoom Logo" className="zoom-logo" />
            <h2>Zoom Attendance Tracker</h2>
            <form onSubmit={handleSubmit} className="signin-form">
                <input
                    type="text"
                    value={meetingId}
                    onChange={(e) => setMeetingId(e.target.value)}
                    placeholder="Meeting ID"
                    required
                    className="meeting-input"
                /><br/>
                <button type="submit" className="submit-button">Attendence</button>
            </form>
        </div>
    );
};

export default MeetingSignIn;
