import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Documentation from './pages/Documentation';
import Reports from './pages/Reports';
import Screenshots from './pages/Screenshots';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Root application component for the Automation Test Framework Frontend.
 * Sets up client-side routing with React Router and renders the app layout
 * with sidebar navigation and page content.
 *
 * Routes:
 * - / : Dashboard overview
 * - /documentation : Framework documentation browser
 * - /reports : Detailed test report viewer
 * - /screenshots : Screenshot artifact gallery
 */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="reports" element={<Reports />} />
            <Route path="screenshots" element={<Screenshots />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
