import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/StatisticsReports.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function StatisticsReports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((stats) => setData(stats))
      .catch((err) => console.error("Stats Fetch Error:", err));
  }, []);

  return (
    <div className="stats-wrapper">
      <Header />

      <main className="stats-container">
        <div className="stats-header">
          <h2 className="stats-title">Statistics & Reports</h2>
          <p className="stats-subtitle">Suspicious Links Detected (Weekly)</p>
        </div>

        <div className="chart-card">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#64748B" fontSize={13} />
              <YAxis stroke="#64748B" fontSize={13} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  color: "#1E293B",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7DD3FC"
                strokeWidth={3}
                dot={{ r: 5, fill: "#A78BFA" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
