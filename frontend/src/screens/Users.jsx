import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Users.css";

export default function NudgesWarnings() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/nudges")
      .then((res) => res.json())
      .then((items) => setData(items))
      .catch((err) => console.log("Fetch Error:", err));
  }, []);

  // Filter data based on search
  const filteredData = data.filter((item) =>
    item.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="nudges-wrapper">
      <Header />

      <div className="nudges-container">
        <h1>Nudges & Warnings</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="nudges-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Nudges Sent</th>
              <th>Warnings Triggered</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.user}</td>
                  <td>{item.nudges}</td>
                  <td>{item.warnings}</td>
                  <td>{item.lastActivity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No matching user found...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}
