// components/ScrollContainer.jsx
import React from "react";

const ScrollContainer = ({ children }) => {
  return (
    <div 
      style={{ 
        height: "100vh",      // Screen ki height
        overflowY: "auto",    // Scroll bar yahan active hoga
        width: "100%" 
      }}
      className="scroll-wrapper" // Aap yahan Tailwind bhi use kar sakte hain
    >
      {children}
    </div>
  );
};

export default ScrollContainer;