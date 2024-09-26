import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { fakeAttendanceData } from './fakeData';
import html2pdf from 'html2pdf.js';
import './CSS/AttendanceDashboard.css';

Chart.register(ArcElement, Tooltip, Legend);

const AttendanceDashboard = () => {
    const { meetingId } = useParams();
    const participants = fakeAttendanceData.participants;
    const reportRef = useRef();

    const presentCount = participants.filter(p => p.attendanceStatus === 'Present').length;
    const absentCount = participants.filter(p => p.attendanceStatus === 'Absent').length;

    const pieData = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                data: [presentCount, absentCount],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            }
        ]
    };

    const handleDownload = () => {
        const element = reportRef.current;
        html2pdf()
            .from(element)
            .save(`attendance_report_${meetingId}.pdf`);
    };

    return (
        <div className="dashboard-container">
            <h2>Attendance for Meeting ID: {meetingId}</h2>
            <div className="chart-and-table">
                <div className="chart-container">
                    <h3>Today's Attendance</h3>
                    <Pie data={pieData} />
                </div>
                <div className="table-container">
                    <h3>Participants List</h3>
                    <div className="table-wrapper">
                        <div className="scrollable-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Score</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {participants.map(participant => (
                                        <tr key={participant.name}>
                                            <td>{participant.name}</td>
                                            <td>{participant.attendanceStatus}</td>
                                            <td>{participant.score}</td>
                                
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button onClick={handleDownload} className="download-btn">Download PDF</button>
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <div ref={reportRef}>
                    <h2>Attendance Report</h2>
                    <h3>Meeting ID: {meetingId}</h3>
                    <h4>Today's Attendance</h4>
                    <p>Present: {presentCount}</p>
                    <p>Absent: {absentCount}</p>
                    <h4>Participants List</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.map(participant => (
                                <tr key={participant.name}>
                                    <td>{participant.name}</td>
                                    <td>{participant.attendanceStatus}</td>
                                    <td>{participant.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceDashboard;
