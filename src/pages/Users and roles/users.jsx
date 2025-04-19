import React from 'react';
import Header from "../../components/header-admin-users";
import './users.css';

const Users = () => {
    return (
        <>
            <Header />
        <div className="analytics-container">

            <h2 className="title">Users and Roles</h2>

            <div className="metrics-grid">
                <div className="metric-card">
                    <h2>12</h2>
                    <p>Total Costumer Service Agents</p>
                </div>
                <div className="metric-card">
                    <h2>164</h2>
                    <p>Total Logged in Members</p>
                </div>
                <div className="metric-card">
                    <h2>96%</h2>
                    <p>Avg Customer Satisfaction</p>
                </div>
                <div className="metric-card">
                    <h2>9.6 min</h2>
                    <p>Avg Agent Response Time</p>
                </div>
            </div>
            <div className="analytics-sections">

            <div className="agents-section">
                <h2>Customer Service Agents</h2>
                <table className="agents-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Tickets  Resolved</th>
                            <th>Avg. Response Time</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td>Agent 1</td>
                                <td>agent1@gmail.com</td>
                                <td>8</td>
                                <td>7.6</td>
                            </tr>
                            <tr>
                                <td>Agent 2</td>
                                <td>agent2@gmail.com</td>
                                <td>6</td>
                                <td>5.8</td>
                            </tr>
                            <tr>
                                <td>Agent 3</td>
                                <td>agent3@gmail.com</td>
                                <td>16</td>
                                <td>3.9</td>
                            </tr>
                            <tr>
                                <td>Agent 4</td>
                                <td>agent4@gmail.com</td>
                                <td>11</td>
                                <td>4.7</td>
                            </tr>
                    </tbody>
                </table>
            </div>

            <div className="cust-section">
            <h2>Customer Members</h2>
                <table className="cust-table">
                    <thead>
                        <tr>
                            <th>Member ID</th>
                            <th>Name</th>
                            <th>Total Tickets Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td>1001</td>
                                <td>Tim Buck</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>1002</td>
                                <td>John Cey Na</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>1003</td>
                                <td>Ben Dover</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>1004</td>
                                <td>Hawk Jeff Tuah</td>
                                <td>3</td>
                            </tr>
                    </tbody>
                </table>
                </div>
        </div>
        </div>
        </>
    );
};

export default Users;
