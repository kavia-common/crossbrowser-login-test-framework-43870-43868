import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// PUBLIC_INTERFACE
/**
 * Sidebar navigation component for the application.
 * Provides navigation links to Dashboard, Documentation, Reports, and Screenshots pages.
 * Uses NavLink for active-state highlighting.
 */
function Sidebar() {
  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      {/* Application branding */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon" role="img" aria-label="Test framework logo">🧪</span>
          <div className="sidebar-title-block">
            <h1 className="sidebar-title">Test Framework</h1>
            <span className="sidebar-subtitle">Playwright Automation</span>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
              aria-label="Navigate to Dashboard"
            >
              <span className="nav-icon">📊</span>
              <span className="nav-label">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/documentation"
              className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
              aria-label="Navigate to Documentation"
            >
              <span className="nav-icon">📄</span>
              <span className="nav-label">Documentation</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
              aria-label="Navigate to Reports"
            >
              <span className="nav-icon">📋</span>
              <span className="nav-label">Reports</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/screenshots"
              className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
              aria-label="Navigate to Screenshots"
            >
              <span className="nav-icon">📸</span>
              <span className="nav-label">Screenshots</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer info */}
      <div className="sidebar-footer">
        <p className="sidebar-footer-text">v1.0.0 • Cross-Browser</p>
      </div>
    </aside>
  );
}

export default Sidebar;
