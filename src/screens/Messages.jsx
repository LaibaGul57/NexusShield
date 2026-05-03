import React, { useEffect, useState } from "react";
import Header from "../components/Header";
// Footer import remove kar diya gaya hai
import "../styles/Messages.css"; 

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/messages/all")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);

  return (
    <div className="messages-wrapper">
      <Header />
      <main className="messages-container">
        <h1>User Messages</h1>
        
        <div className="table-responsive">
          <table className="messages-table"> 
            <thead>
              <tr>
                <th>User Details</th>
                <th>User ID</th>
                <th>Message Content</th>
                <th>Time Received</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg._id} className="message-row">
                    {/* User Profile Column */}
                    <td>
                      <div className="user-profile-info">
                        <span className="avatar-icon">
                          {msg.userName?.charAt(0).toUpperCase() || "U"}
                        </span>
                        <span className="user-name-text">{msg.userName || "N/A"}</span>
                      </div>
                    </td>

                    {/* ID Cell with Badge look */}
                    <td className="id-cell">
                      <span className="id-badge">{msg.userId}</span>
                    </td>

                    {/* Colorful Message Bubble */}
                    <td>
                      <div className="message-bubble-text">
                        {msg.message}
                      </div>
                    </td>

                    {/* Attractive Timestamp */}
                    <td>
                      <div className="timestamp-wrapper">
                        <span className="date-badge">{new Date(msg.timestamp).toLocaleDateString()}</span>
                        <span className="time-text">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{textAlign: "center", padding: "30px"}}>No messages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      {/* Footer component yahan se remove kar diya gaya hai */}
    </div>
  );
}