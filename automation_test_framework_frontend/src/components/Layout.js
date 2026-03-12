import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

// PUBLIC_INTERFACE
/**
 * Layout component providing the app shell with sidebar navigation and main content area.
 * Uses React Router's Outlet to render nested route content.
 */
function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content" role="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
