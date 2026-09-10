import { NavLink } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdBarChart,
  MdPersonOutline,
} from "react-icons/md";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="logo">
        Job<span>Tracker</span>
      </NavLink>

      <nav className="nav" aria-label="Navigation principale">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <MdOutlineDashboard aria-hidden="true" />
          <span>Tableau de bord</span>
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <MdBarChart aria-hidden="true" />
          <span>Statistiques</span>
        </NavLink>

        <NavLink
          to="/profil"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <MdPersonOutline aria-hidden="true" />
          <span>Profil</span>
        </NavLink>
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