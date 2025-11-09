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
import Footer from "../components/Footer";

const COLORS = ["#7DD3FC", "#A78BFA"];

export default function NudgesWarnings() {
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/engagement")
      .then(res => res.json())
      .then(data => setPieData(data));

    fetch("http://localhost:5000/api/dashboard/weeklynudges")
      .then(res => res.json())
      .then(data => setLineData(data));
  }, []);

  return (
    <div className="nudges-wrapper">
      <Header />

      <main className="nudges-container">
        <div className="nudges-header">
          <h1>Nudges & Engagement</h1>
          <p>Overview of weekly activity and engagement</p>
        </div>

        <div className="nudges-content">
          {/* Pie Chart */}
          <div className="chart-card">
            <h2>Engagement Statistics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend">
  {pieData.map((entry, index) => (
    <p key={index}>
      <span
        className="legend-dot"
        style={{ backgroundColor: COLORS[index % COLORS.length] }}
      ></span>
      {entry.name}
    </p>
  ))}
</div>

          </div>

          {/* Line Chart */}
          <div className="chart-card">
            <h2>Nudges Sent (Weekly)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#7DD3FC" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
