import React from 'react';
import './analytics.css';
import Header from "../../components/header-admin-analytics";
import tickets from "../../data/tickets";
import barChart from './assets/bar-chart.png';

const Analytics = () => {
    return (
        <>
            <Header />
        <div className="analytics-container">

            <h2 className="title">Analytics</h2>

            <div className="metrics-grid">
                <div className="metric-card">
                    <h2>18,537</h2>
                    <p>Total Tickets</p>
                    <span>8% Up since last week</span>
                </div>
                <div className="metric-card">
                    <h2>86%</h2>
                    <p>Ticket Turnover Rate</p>
                    <span>21% Up since last week</span>
                </div>
                <div className="metric-card">
                    <h2>32%</h2>
                    <p>Avg Bounce Rate</p>
                    <span>1% Down since last week</span>
                </div>
                <div className="metric-card">
                    <h2>168 sec</h2>
                    <p>Avg Session Duration</p>
                    <span>4% Down since last week</span>
                </div>
            </div>
            <div className="analytics-sections">

            <div className="tickets-section">
                <h2>Tickets</h2>
                <table className="tickets-table">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Subject</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            <tr key={index}>
                                <td>{ticket.id}</td>
                                <td>{ticket.subject}</td>
                                <td>{ticket.category}</td>
                                <td>{ticket.priority}</td>
                                <td>{ticket.handler}</td>
                                <td>{ticket.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="chart-section">
                <h2>Tickets by Status</h2>
                <img className="chart" src={barChart} />
            </div>
        </div>
        </div>
        </>
    );
};

export default Analytics;
