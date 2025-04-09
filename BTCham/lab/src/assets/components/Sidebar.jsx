// Sidebar.js
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div className="p-3">
    <NavLink to="/" className={({ isActive }) => isActive ? 'fw-bold text-primary' : 'text-dark'}>Dashboard</NavLink>
    <NavLink to="/projects" className="d-block mt-2">Projects</NavLink>
    {/* other links */}
  </div>
);
