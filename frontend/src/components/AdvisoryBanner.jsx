import React, { useEffect, useState } from "react";

export default function AdvisoryBanner() {
  const [advisories, setAdvisories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/advisories")
      .then((res) => res.json())
      .then((data) => setAdvisories(data.advisories || []))
      .catch(() => setAdvisories([]));
  }, []);

  return (
    <div className="advisory-banner">
      <span className="advisory-title">🔔 Latest Advisory</span>

      <div className="advisory-scroll-container">
        <div className="advisory-scroll-text">
          {advisories.length > 0
            ? advisories.map(item => item.title).join("   ➤  ")
            : "Loading latest cybersecurity advisories..."}
        </div>
      </div>
    </div>
  );
}
