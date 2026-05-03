import React, { useEffect, useState } from "react";
import Header from "../components/Header";
// Footer import removed
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import "../styles/RiskReport.css";

export default function RiskReport() {
  const [riskData, setRiskData] = useState([]);
  const [activityData, setActivityData] = useState([]);

  // Professional Security Palette
  const COLORS = ["#3b82f6", "#8b5cf6", "#ef4444"]; 

  useEffect(() => {
    fetch("http://localhost:5000/api/riskreport/risk-levels")
      .then((res) => res.json())
      .then((data) => setRiskData(data || []))
      .catch((err) => console.error("Error:", err));

    fetch("http://localhost:5000/api/riskreport/user-activity")
      .then((res) => res.json())
      .then((data) => setActivityData(data || []))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="risk-report-wrapper">
      <Header />
      <main className="risk-report-container">
        <div className="report-header-section">
          <h2 className="page-title">Security Training Analytics</h2>
          <p className="subtitle">Real-time monitoring of user risk levels and engagement</p>
        </div>

        {/* 🟣 Top Section: Donut Chart & Stats Combined */}
        <div className="hero-chart-section">
          <div className="report-card donut-container">
            <h3 className="section-title">User Risk Distribution</h3>
            <div className="donut-flex">
              <ResponsiveContainer width="60%" height={300}>
                <PieChart>
                  <Pie 
                    data={riskData} 
                    dataKey="value" 
                    innerRadius={80} 
                    outerRadius={110} 
                    paddingAngle={8}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="donut-stats-legend">
                {riskData.map((item, i) => (
                  <div key={i} className="stat-pill">
                    <span className="dot" style={{backgroundColor: COLORS[i]}}></span>
                    <div className="stat-info">
                      <span className="label">{item.name}</span>
                      <span className="value">{item.value} Users</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 🔵 Bottom Section: Wide Bar Chart */}
        <div className="report-card full-width">
          <h3 className="section-title">User Performance Breakdown</h3>
          <p className="chart-desc">Lessons vs Quizzes per user (Scrollable if users increase)</p>
          <div className="bar-chart-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart 
                data={activityData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  angle={-40} 
                  textAnchor="end" 
                  interval={0} 
                  tick={{ fontSize: 11, fontWeight: 600, fill: '#475569' }} 
                />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Legend verticalAlign="top" align="right" wrapperStyle={{paddingBottom: '20px'}} />
                <Bar dataKey="lessons" name="Lessons" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="quizzes" name="Quizzes" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
      {/* Footer component removed */}
    </div>
  );
}