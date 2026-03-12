import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardStats, testReports } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import './Dashboard.css';

// PUBLIC_INTERFACE
/**
 * Dashboard page component displaying a summary overview of test execution results.
 * Shows key metrics (total tests, pass rate, browsers), recent suite results,
 * and quick navigation links to other sections.
 */
function Dashboard() {
  const navigate = useNavigate();

  /**
   * Formats an ISO timestamp string into a human-readable locale string.
   * @param {string} ts - ISO 8601 timestamp
   * @returns {string} Formatted date/time string
   */
  const formatDate = (ts) => {
    return new Date(ts).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="dashboard-page">
      {/* Page header */}
      <div className="page-header">
        <h2 className="page-title">Dashboard</h2>
        <p className="page-description">
          Overview of cross-browser login test results
        </p>
      </div>

      {/* Summary stat cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🧪</span>
          <div className="stat-info">
            <span className="stat-value">{dashboardStats.totalTests}</span>
            <span className="stat-label">Total Tests</span>
          </div>
        </div>
        <div className="stat-card stat-card--success">
          <span className="stat-icon">✅</span>
          <div className="stat-info">
            <span className="stat-value">{dashboardStats.totalPassed}</span>
            <span className="stat-label">Passed</span>
          </div>
        </div>
        <div className="stat-card stat-card--error">
          <span className="stat-icon">❌</span>
          <div className="stat-info">
            <span className="stat-value">{dashboardStats.totalFailed}</span>
            <span className="stat-label">Failed</span>
          </div>
        </div>
        <div className="stat-card stat-card--accent">
          <span className="stat-icon">📈</span>
          <div className="stat-info">
            <span className="stat-value">{dashboardStats.passRate}%</span>
            <span className="stat-label">Pass Rate</span>
          </div>
        </div>
      </div>

      {/* Info row */}
      <div className="info-row">
        <div className="info-card">
          <h3 className="info-card-title">Run Info</h3>
          <div className="info-card-body">
            <div className="info-item">
              <span className="info-item-label">Last Run</span>
              <span className="info-item-value">{formatDate(dashboardStats.lastRunTimestamp)}</span>
            </div>
            <div className="info-item">
              <span className="info-item-label">Avg Duration</span>
              <span className="info-item-value">{dashboardStats.averageDuration}</span>
            </div>
            <div className="info-item">
              <span className="info-item-label">Test Suites</span>
              <span className="info-item-value">{dashboardStats.totalSuites}</span>
            </div>
            <div className="info-item">
              <span className="info-item-label">Browsers</span>
              <span className="info-item-value">{dashboardStats.browsers.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Pass rate visual bar */}
        <div className="info-card">
          <h3 className="info-card-title">Pass Rate Breakdown</h3>
          <div className="info-card-body">
            <div className="progress-bar-container">
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill progress-bar-fill--passed"
                  style={{ width: `${(dashboardStats.totalPassed / dashboardStats.totalTests) * 100}%` }}
                  title={`Passed: ${dashboardStats.totalPassed}`}
                />
                <div
                  className="progress-bar-fill progress-bar-fill--failed"
                  style={{ width: `${(dashboardStats.totalFailed / dashboardStats.totalTests) * 100}%` }}
                  title={`Failed: ${dashboardStats.totalFailed}`}
                />
              </div>
              <div className="progress-legend">
                <span className="legend-item legend-item--passed">● Passed ({dashboardStats.totalPassed})</span>
                <span className="legend-item legend-item--failed">● Failed ({dashboardStats.totalFailed})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent test suites */}
      <div className="section-card">
        <div className="section-card-header">
          <h3 className="section-card-title">Recent Test Suites</h3>
          <button className="link-button" onClick={() => navigate('/reports')}>
            View All Reports →
          </button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Suite Name</th>
                <th>Browser</th>
                <th>Status</th>
                <th>Passed</th>
                <th>Failed</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {testReports.map((report) => (
                <tr key={report.id}>
                  <td className="cell-primary">{report.suiteName}</td>
                  <td>{report.browser} {report.browserVersion}</td>
                  <td><StatusBadge status={report.status} /></td>
                  <td className="cell-number">{report.passed}</td>
                  <td className="cell-number">{report.failed}</td>
                  <td>{report.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick links */}
      <div className="quick-links-grid">
        <button className="quick-link-card" onClick={() => navigate('/documentation')}>
          <span className="quick-link-icon">📄</span>
          <span className="quick-link-label">Documentation</span>
          <span className="quick-link-desc">Framework guides & setup</span>
        </button>
        <button className="quick-link-card" onClick={() => navigate('/reports')}>
          <span className="quick-link-icon">📋</span>
          <span className="quick-link-label">Reports</span>
          <span className="quick-link-desc">Detailed test results</span>
        </button>
        <button className="quick-link-card" onClick={() => navigate('/screenshots')}>
          <span className="quick-link-icon">📸</span>
          <span className="quick-link-label">Screenshots</span>
          <span className="quick-link-desc">Visual test artifacts</span>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
