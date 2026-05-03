import React, { useEffect, useState } from "react";
import Header from "../components/Header";
// Footer import remove kar diya gaya hai
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";
import "../styles/NUDGEScreen.css";

export default function NUDGEScreen() {
  const [data, setData] = useState({ 
    pieChartData: [], 
    lineChartData: [], 
    userCategoryData: [], 
    totalRecords: 0 
  });
  const [loading, setLoading] = useState(true);

  // ✨ Updated Palette: Dark Blue, Sky Blue, Soft Purple, Lavender, Pastel Blue
  const COLORS = ["#1e3a8a", "#87ceeb", "#a78bfa", "#d6ceee", "#b9d9eb"];

  useEffect(() => {
    fetch("http://localhost:5000/api/nudge-analytics/stats")
      .then(res => {
        if (!res.ok) throw new Error("Server response error");
        return res.json();
      })
      .then(json => {
        setData({
          pieChartData: json.pieChartData || [],
          lineChartData: json.lineChartData || [],
          userCategoryData: json.userCategoryData || [],
          totalRecords: json.totalRecords || 0
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="nudge-screen-wrapper">
      <Header />
      <main className="nudge-screen-container">
        <div className="dashboard-header">
          <h2 className="page-title">Nudge Analytics</h2>
        </div>

        {loading ? (
          <div className="loading-state">Loading Security Metrics...</div>
        ) : (
          <>
            <div className="stats-grid">
              {/* Card 1 - Dark Blue */}
              <div className="stat-card" style={{borderLeftColor: '#1e3a8a'}}>
                <p>TOTAL NUDGES</p>
                <h3>{data.totalRecords}</h3>
              </div>
              {/* Card 2 - Sky Blue */}
              <div className="stat-card" style={{borderLeftColor: '#87ceeb'}}>
                <p>ACTIVE USERS</p>
                <h3>{data.userCategoryData?.length || 0}</h3>
              </div>
              {/* Card 3 - Soft Purple */}
              <div className="stat-card" style={{borderLeftColor: '#a78bfa'}}>
                <p>CATEGORIES</p>
                <h3>{data.pieChartData?.length || 0}</h3>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-container full-width">
                <h3 className="chart-title">User Engagement by Category</h3>
                <div style={{ width: '100%', height: 350, minWidth: 0 }}>
                  <ResponsiveContainer>
                    <BarChart data={data.userCategoryData || []} barSize={30}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: '#f8fafc'}} />
                      <Legend iconType="circle" />
                      {(data.pieChartData || []).map((cat, index) => (
                        <Bar 
                          key={`bar-${index}`} 
                          dataKey={cat.name} 
                          stackId="a" 
                          fill={COLORS[index % COLORS.length]} 
                          radius={index === (data.pieChartData.length - 1) ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-container">
                <h3 className="chart-title">Top Users Detail</h3>
                <div className="user-list-box">
                  <table className="modern-table">
                    <thead>
                      <tr><th>User</th><th>Total Nudges</th></tr>
                    </thead>
                    <tbody>
                      {(data.userCategoryData || []).map((user, i) => (
                        <tr key={`user-${i}`}>
                          <td>
                            <div className="user-avatar">{user.name ? user.name[0] : "?"}</div>
                            {user.name}
                          </td>
                          <td><strong>{user.total}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="chart-container">
                <h3 className="chart-title">Risk Distribution</h3>
                <div style={{ width: '100%', height: 300, minWidth: 0 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie 
                        data={data.pieChartData || []} 
                        innerRadius={70} 
                        outerRadius={100} 
                        paddingAngle={8} 
                        dataKey="value"
                      >
                        {(data.pieChartData || []).map((e, i) => (
                          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      {/* Footer component yahan se remove kar diya gaya hai */}
    </div>
  );
}