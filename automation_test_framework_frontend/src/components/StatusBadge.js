import React from 'react';
import './StatusBadge.css';

// PUBLIC_INTERFACE
/**
 * StatusBadge component for displaying test result status.
 * @param {Object} props
 * @param {'passed'|'failed'|'skipped'|'baseline'|'failure'} props.status - The status to display.
 */
function StatusBadge({ status }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`status-badge status-badge--${status}`} aria-label={`Status: ${label}`}>
      {label}
    </span>
  );
}

export default StatusBadge;
