import React, { useEffect, useState } from "react";
import Header from "../components/Header";
// Footer import remove kar diya gaya hai
import "../styles/UserInfo.css"; 

export default function UserInfo() {
  const [trainingLogs, setTrainingLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // 🔍 Search state

  const fetchLogs = () => {
    fetch("http://localhost:5000/api/userinfo")
      .then((res) => res.json())
      .then((data) => {
        setTrainingLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); 
    return () => clearInterval(interval);
  }, []);

  // ✨ Filter logic: Name ya ID dono se search karega
  const filteredLogs = trainingLogs.filter((log) =>
    (log.userName && log.userName.toLowerCase().includes(search.toLowerCase())) ||
    (log.userId && log.userId.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="userinfo-wrapper">
      <Header />
      <main className="userinfo-container">
        <h1>Quizzes Data Logs</h1>
        
        {/* 🔍 Search Bar Section */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Name or User ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="loading-text">Loading data from Atlas...</p>
        ) : (
          <div className="table-card">
            <table className="userinfo-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>User ID</th>
                  <th>Lessons Completed</th>
                  <th>Quiz Score</th>
                  <th>Quizzes Attempted</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="user-name-cell">{log.userName}</td>
                      <td className="id-cell">{log.userId}</td>
                      <td>{log.lessons}</td>
                      <td style={{ 
                        color: log.score < 50 ? "#e74c3c" : "#2ecc71", 
                        fontWeight: "bold" 
                      }}>
                        {log.score}%
                      </td>
                      <td>{log.attempts}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      {trainingLogs.length === 0 ? "No data found." : "No matching records found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
      {/* Footer component yahan se remove kar diya gaya hai */}
    </div>
  );
}