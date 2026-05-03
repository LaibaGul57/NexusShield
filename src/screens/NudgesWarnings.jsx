import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/NudgesWarnings.css";
import Header from "../components/Header";
// Footer import remove kar diya gaya hai

const PIE_COLORS = [" #d6ceee", "#7DD3FC", "#a78bfa"];

export default function NudgesWarnings() {
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/engagement")
      .then((res) => res.json())
      .then((data) => {
        setPieData(data.filter(item => item.value > 0));
      })
      .catch((err) => console.error("Pie Chart Error:", err));

    fetch("http://localhost:5000/api/dashboard/weeklynudges")
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Line Chart Error:", err));
  }, []);

  return (
    <div className="nudges-wrapper">
      <Header />
      <main className="nudges-container">
        <h1>Knowledge Status </h1>

        <div className="nudges-content">
          <div className="chart-card">
            <h2>Knowledge Status (based on Score)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="chart-legend">
              {pieData.map((entry, index) => (
                <p key={index}>
                  <span className="legend-dot" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                  {entry.name}: <strong>{entry.value} Users</strong>
                </p>
              ))}
            </div>
          </div>

          {/* Line Chart remains same... */}
        </div>
      </main>
      {/* Footer component yahan se remove kar diya gaya hai */}
    </div>
  );
}