import React, { useState, useMemo } from 'react';
import { testReports } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import './Reports.css';

// PUBLIC_INTERFACE
/**
 * Reports page component displaying detailed test report results.
 * Supports filtering by browser and status, with expandable suite details
 * showing individual test case results and error messages.
 */
function Reports() {
  const [browserFilter, setBrowserFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedSuiteId, setExpandedSuiteId] = useState(null);

  // Available browser options derived from report data
  const browsers = useMemo(() => {
    return ['All', ...new Set(testReports.map((r) => r.browser))];
  }, []);

  // Filter reports by browser and status
  const filteredReports = useMemo(() => {
    return testReports.filter((r) => {
      const matchBrowser = browserFilter === 'All' || r.browser === browserFilter;
      const matchStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchBrowser && matchStatus;
    });
  }, [browserFilter, statusFilter]);

  /**
   * Toggle the expanded state of a test suite to show/hide individual test cases.
   * @param {string} id - The report suite ID to toggle
   */
  const toggleSuite = (id) => {
    setExpandedSuiteId((prev) => (prev === id ? null : id));
  };

  /**
   * Formats an ISO timestamp to a readable date string.
   * @param {string} ts - ISO 8601 timestamp
   * @returns {string} Formatted date string
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
    <div className="reports-page">
      {/* Page header */}
      <div className="page-header">
        <h2 className="page-title">Test Reports</h2>
        <p className="page-description">
          Detailed cross-browser login test results with individual test case breakdowns
        </p>
      </div>

      {/* Filters */}
      <div className="reports-filters">
        <div className="filter-group">
          <label className="filter-label" htmlFor="browser-filter">Browser</label>
          <select
            id="browser-filter"
            className="filter-select"
            value={browserFilter}
            onChange={(e) => setBrowserFilter(e.target.value)}
          >
            {browsers.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label" htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="filter-summary">
          Showing {filteredReports.length} of {testReports.length} suites
        </div>
      </div>

      {/* Report suite cards */}
      <div className="reports-list">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className={`report-card ${expandedSuiteId === report.id ? 'report-card--expanded' : ''}`}
          >
            {/* Suite header (clickable) */}
            <button
              className="report-card-header"
              onClick={() => toggleSuite(report.id)}
              aria-expanded={expandedSuiteId === report.id}
            >
              <div className="report-card-main">
                <div className="report-card-top-row">
                  <h3 className="report-suite-name">{report.suiteName}</h3>
                  <StatusBadge status={report.status} />
                </div>
                <div className="report-meta">
                  <span className="report-meta-item">🌐 {report.browser} {report.browserVersion}</span>
                  <span className="report-meta-item">⏱ {report.duration}</span>
                  <span className="report-meta-item">📅 {formatDate(report.timestamp)}</span>
                </div>
              </div>
              <div className="report-card-stats">
                <div className="report-stat report-stat--pass">
                  <span className="report-stat-num">{report.passed}</span>
                  <span className="report-stat-label">Passed</span>
                </div>
                <div className="report-stat report-stat--fail">
                  <span className="report-stat-num">{report.failed}</span>
                  <span className="report-stat-label">Failed</span>
                </div>
                <div className="report-stat">
                  <span className="report-stat-num">{report.totalTests}</span>
                  <span className="report-stat-label">Total</span>
                </div>
                <span className={`report-expand-icon ${expandedSuiteId === report.id ? 'report-expand-icon--open' : ''}`}>
                  ▾
                </span>
              </div>
            </button>

            {/* Expanded: individual test cases */}
            {expandedSuiteId === report.id && (
              <div className="report-card-body">
                <table className="test-case-table">
                  <thead>
                    <tr>
                      <th>Test Case</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.tests.map((test, idx) => (
                      <React.Fragment key={idx}>
                        <tr className={test.status === 'failed' ? 'row--failed' : ''}>
                          <td className="cell-primary">{test.name}</td>
                          <td>
                            <span className={`category-tag category-tag--${test.category}`}>
                              {test.category}
                            </span>
                          </td>
                          <td><StatusBadge status={test.status} /></td>
                          <td>{test.duration}</td>
                        </tr>
                        {test.error && (
                          <tr className="error-row">
                            <td colSpan="4">
                              <div className="error-message">
                                <span className="error-label">Error:</span> {test.error}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>No reports match the selected filters.</p>
        </div>
      )}
    </div>
  );
}

export default Reports;
