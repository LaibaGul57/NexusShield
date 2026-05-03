import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../styles/RiskReport.css";

export default function RiskReport() {
  const [nudgeData, setNudgeData] = useState([]);
  const [quizData, setQuizData] = useState([]);

  const COLORS = ["#7DD3FC", "#A78BFA", "#C4B5FD"];

  useEffect(() => {
    // ✅ Fetch Pie Chart Data (Nudge Categories)
    fetch("http://localhost:5000/api/riskreport/categories")
      .then((res) => res.json())
      .then((data) => setNudgeData(data))
      .catch((err) => console.log("Error fetching nudge data:", err));

    // ✅ Fetch Bar Chart Data (Quiz Scores)
    fetch("http://localhost:5000/api/riskreport/quizscores")
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.log("Error fetching quiz data:", err));
  }, []);

  return (
    <div className="risk-report-wrapper">
      <Header />

      <main className="risk-report-container">
        <h2 className="page-title">Risk Report</h2>

        {/* Layout */}
        <div className="report-grid">

          {/* 🟣 Pie Chart */}
          <div className="report-card">
            <h3 className="section-title">Nudge Categories</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={nudgeData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {nudgeData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="category-list">
              {nudgeData.map((item, i) => (
                <div key={i} className="category-item">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 🔵 Bar Chart */}
          <div className="report-card">
            <h3 className="section-title">Awareness Quiz Scores</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={quizData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis domain={[0, 200]} />
                <Tooltip />
                <Bar dataKey="score" fill="#7DD3FC" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
