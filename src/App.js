import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MeetingInput from './components/MeetingInput';
import AttendanceDashboard from './components/AttendanceDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MeetingInput />} />
                <Route path="/dashboard/:meetingId" element={<AttendanceDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
