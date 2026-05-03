import React, { useEffect, useState } from "react";
import Header from "../components/Header";
// Footer import removed
import "../styles/Users.css"; 

export default function NudgesWarnings() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUserData = () => {
    fetch("http://localhost:5000/api/nudges")
      .then((res) => res.json())
      .then((items) => setData(items))
      .catch((err) => console.log("Fetch Error:", err));
  };

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(fetchUserData, 30000); 
    return () => clearInterval(interval);
  }, []);

  const filteredData = data.filter((item) =>
    (item.id && item.id.toLowerCase().includes(search.toLowerCase())) ||
    (item.name && item.name.toLowerCase().includes(search.toLowerCase()))
  );

  const formatDate = (dateString) => {
    if (!dateString) return "No Activity";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric"
    });
  };

  return (
    <div className="nudges-wrapper">
      <Header />
      <div className="nudges-container">
        <h1>User & Scores</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="nudges-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Hygiene Score</th>
              {/* ✅ Nudges Sent column header removed */}
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.name}</strong></td>
                  <td>
                    <span className={`role-badge ${item.role}`}>
                      {item.role}
                    </span>
                  </td>
                  <td style={{ 
                    color: item.score > 50 ? '#2ecc71' : '#e74c3c', 
                    fontWeight: 'bold' 
                  }}>
                    {item.score}%
                  </td>
                  {/* ✅ Nudges Sent data cell removed */}
                  <td>{formatDate(item.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                {/* ✅ colSpan reduced to 4 because one column is deleted */}
                <td colSpan="4" style={{ textAlign: "center", padding: "40px" }}>
                  {data.length === 0 ? "Loading from database..." : "No matching record found..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Footer component removed */}
    </div>
  );
}