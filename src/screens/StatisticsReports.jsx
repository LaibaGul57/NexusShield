import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend
} from "recharts";
import "../styles/StatisticsReports.css";
import Header from "../components/Header";
// Footer removed

export default function StatisticsReports() {
  const [stats, setStats] = useState({ 
    totals: { totalChecked: 0, safe: 0, partial: 0, phishing: 0 }, 
    userBreakdown: [] 
  });

  useEffect(() => {
    // 🛡️ Sahi API Endpoint for General Reports
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.totals) {
          setStats(data);
        }
      })
      .catch((err) => console.error("Stats Fetch Error:", err));
  }, []);

  const totals = stats?.totals || {};
  const userBreakdown = stats?.userBreakdown || [];

  return (
    <div className="stats-wrapper">
      <Header />

      <main className="stats-container">
        <div className="stats-header">
          <h2 className="stats-title">Security Statistics & Insights</h2>
          <p className="stats-subtitle">Real-time analysis of scanned links across all users</p>
        </div>

        <div className="stats-cards-grid">
          <div className="stat-card-item total">
            <div className="card-glass-effect"></div>
            <span>Total Checked</span>
            <h3>{totals.totalChecked ?? 0}</h3>
          </div>
          <div className="stat-card-item safe">
            <div className="card-glass-effect"></div>
            <span>Safe Links</span>
            <h3>{totals.safe ?? 0}</h3>
          </div>
          <div className="stat-card-item partial">
            <div className="card-glass-effect"></div>
            <span>Partial Risk</span>
            <h3>{totals.partial ?? 0}</h3>
          </div>
          <div className="stat-card-item danger">
            <div className="card-glass-effect"></div>
            <span>Phishing Detected</span>
            <h3>{totals.phishing ?? 0}</h3>
          </div>
        </div>

        <div className="chart-section shadow-premium">
          <h3 className="chart-label">User-wise Link Analysis</h3>
          <div className="chart-card">
            {userBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={userBreakdown} barSize={35} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} />
                  <YAxis fontSize={12} stroke="#94a3b8" axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{
                      borderRadius: '12px', border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(167, 139, 250, 0.2)',
                      background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)'
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
                  
                  <Bar dataKey="safe" name="Safe Links" stackId="a" fill="#87CEEB" /> 
                  <Bar dataKey="partial" name="Partial Risk" stackId="a" fill="#B9D9EB" />
                  <Bar dataKey="phishing" name="Phishing" stackId="a" fill="#D6CEEE" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="loading-text">Loading analytics data...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}