import React, { useState, useMemo } from 'react';
import { screenshots } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import './Screenshots.css';

// PUBLIC_INTERFACE
/**
 * Screenshots page component displaying test artifact screenshots in a card grid.
 * Supports filtering by type (failure/baseline) and browser, and shows a detail
 * modal/panel when a screenshot card is selected.
 */
function Screenshots() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [browserFilter, setBrowserFilter] = useState('All');
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  // Derive unique browsers from screenshot data
  const browsers = useMemo(() => {
    return ['All', ...new Set(screenshots.map((s) => s.browser))];
  }, []);

  // Filter screenshots
  const filteredScreenshots = useMemo(() => {
    return screenshots.filter((s) => {
      const matchType = typeFilter === 'All' || s.type === typeFilter;
      const matchBrowser = browserFilter === 'All' || s.browser === browserFilter;
      return matchType && matchBrowser;
    });
  }, [typeFilter, browserFilter]);

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

  /**
   * Generates a deterministic color based on the screenshot type for the placeholder.
   * @param {string} type - The screenshot type
   * @returns {string} CSS background color
   */
  const getPlaceholderColor = (type) => {
    return type === 'failure' ? '#fef2f2' : '#f0f9ff';
  };

  return (
    <div className="screenshots-page">
      {/* Page header */}
      <div className="page-header">
        <h2 className="page-title">Screenshots</h2>
        <p className="page-description">
          Visual test artifacts including failure captures and baseline screenshots
        </p>
      </div>

      {/* Filters */}
      <div className="screenshots-filters">
        <div className="filter-group">
          <label className="filter-label" htmlFor="type-filter">Type</label>
          <select
            id="type-filter"
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="failure">Failure</option>
            <option value="baseline">Baseline</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label" htmlFor="ss-browser-filter">Browser</label>
          <select
            id="ss-browser-filter"
            className="filter-select"
            value={browserFilter}
            onChange={(e) => setBrowserFilter(e.target.value)}
          >
            {browsers.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="filter-summary">
          Showing {filteredScreenshots.length} of {screenshots.length} screenshots
        </div>
      </div>

      {/* Screenshot grid */}
      <div className="screenshots-grid">
        {filteredScreenshots.map((ss) => (
          <button
            key={ss.id}
            className="screenshot-card"
            onClick={() => setSelectedScreenshot(ss)}
            aria-label={`View details for screenshot: ${ss.testName}`}
          >
            {/* Placeholder image area */}
            <div
              className="screenshot-preview"
              style={{ backgroundColor: getPlaceholderColor(ss.type) }}
            >
              <span className="screenshot-placeholder-icon">
                {ss.type === 'failure' ? '🔴' : '🔵'}
              </span>
              <span className="screenshot-placeholder-text">{ss.dimensions}</span>
            </div>
            <div className="screenshot-info">
              <div className="screenshot-info-top">
                <h4 className="screenshot-test-name">{ss.testName}</h4>
                <StatusBadge status={ss.type} />
              </div>
              <div className="screenshot-meta">
                <span>🌐 {ss.browser}</span>
                <span>📅 {formatDate(ss.timestamp)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredScreenshots.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>No screenshots match the selected filters.</p>
        </div>
      )}

      {/* Detail modal/panel */}
      {selectedScreenshot && (
        <div
          className="screenshot-modal-overlay"
          onClick={() => setSelectedScreenshot(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot detail"
        >
          <div className="screenshot-modal" onClick={(e) => e.stopPropagation()}>
            <div className="screenshot-modal-header">
              <h3 className="screenshot-modal-title">{selectedScreenshot.testName}</h3>
              <button
                className="screenshot-modal-close"
                onClick={() => setSelectedScreenshot(null)}
                aria-label="Close detail view"
              >
                ✕
              </button>
            </div>
            <div className="screenshot-modal-body">
              {/* Large placeholder preview */}
              <div
                className="screenshot-modal-preview"
                style={{ backgroundColor: getPlaceholderColor(selectedScreenshot.type) }}
              >
                <span className="screenshot-modal-placeholder-icon">
                  {selectedScreenshot.type === 'failure' ? '🔴' : '🔵'}
                </span>
                <span className="screenshot-modal-placeholder-label">
                  Screenshot Preview ({selectedScreenshot.dimensions})
                </span>
              </div>

              {/* Details */}
              <div className="screenshot-modal-details">
                <div className="detail-row">
                  <span className="detail-label">Test Name</span>
                  <span className="detail-value">{selectedScreenshot.testName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Browser</span>
                  <span className="detail-value">{selectedScreenshot.browser}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Type</span>
                  <span className="detail-value"><StatusBadge status={selectedScreenshot.type} /></span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Captured</span>
                  <span className="detail-value">{formatDate(selectedScreenshot.timestamp)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Dimensions</span>
                  <span className="detail-value">{selectedScreenshot.dimensions}</span>
                </div>
                <div className="detail-row detail-row--full">
                  <span className="detail-label">Description</span>
                  <span className="detail-value">{selectedScreenshot.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Screenshots;
