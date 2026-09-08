import {
  MdOutlineDashboard,
  MdBarChart,
  MdPersonOutline,
} from "react-icons/md";
import { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const handleChange = (item) => {
    setActiveItem(item);
  };
  return (
    <aside className="sidebar">
      <a href="/" className="logo">
        Job<span>Tracker</span>
      </a>

      <nav className="nav" aria-label="Navigation principale">
        <a
          href="/"
          className={`nav-item ${activeItem === "dashboard" ? "active" : ""}`}
          onClick={() => handleChange("dashboard")}
        >
          <MdOutlineDashboard aria-hidden="true" />
          <span>Tableau de bord</span>
        </a>

        <a
          href="/statistics"
          className={`nav-item ${activeItem === "statistics" ? "active" : ""}`}
          onClick={() => handleChange("statistics")}
        >
          <MdBarChart aria-hidden="true" />
          <span>Statistiques</span>
        </a>

        <a
          href="/profile"
          className={`nav-item ${activeItem === "profile" ? "active" : ""}`}
          onClick={() => handleChange("profile")}
        >
          <MdPersonOutline aria-hidden="true" />
          <span>Profil</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">U</div>
        <div className="user__information">
          <span className="name">User</span>
          <span className="role">Recherche active</span>
        </div>
      </div>
    </aside>
  );
}
