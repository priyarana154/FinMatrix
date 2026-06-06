// 📂 Frontend/src/components/Sidebar.jsx (Snippet for the profile badge area)
import React, { useState, useEffect } from "react";

const SidebarProfileBadge = () => {
   const [name, setName] = useState(
    localStorage.getItem("userName") || "User",
  );
  const [photo, setPhoto] = useState(
    localStorage.getItem("userPhoto") ||
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  );

  useEffect(() => {
    const handleStorageSync = () => {
      setName(localStorage.getItem("userName") || "User");
      setPhoto(
        localStorage.getItem("userPhoto") ||
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      );
    };

     window.addEventListener("storage", handleStorageSync);
    return () => window.removeEventListener("storage", handleStorageSync);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
      }}
    >
      <img
        src={photo}
        alt="User Avatar"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <div>
        <div style={{ fontWeight: "600", fontSize: "14px" }}>{name}</div>
        <div style={{ fontSize: "11px", color: "#10b981", fontWeight: "700" }}>
          Pro Member
        </div>
      </div>
    </div>
  );
};
