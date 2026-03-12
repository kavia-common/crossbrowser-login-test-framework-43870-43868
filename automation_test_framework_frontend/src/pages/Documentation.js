import React, { useState, useMemo } from 'react';
import { documentationItems } from '../data/mockData';
import './Documentation.css';

// PUBLIC_INTERFACE
/**
 * Documentation page component that displays framework documentation entries.
 * Supports category filtering and expandable content panels for each doc item.
 */
function Documentation() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  // Derive unique categories from documentation items
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(documentationItems.map((d) => d.category))];
    return cats;
  }, []);

  // Filter items by selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return documentationItems;
    return documentationItems.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  /**
   * Toggle expand/collapse of a documentation entry.
   * @param {string} id - The documentation item ID to toggle
   */
  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="documentation-page">
      {/* Page header */}
      <div className="page-header">
        <h2 className="page-title">Documentation</h2>
        <p className="page-description">
          Framework guides, architecture details, and configuration references
        </p>
      </div>

      {/* Category filter pills */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${selectedCategory === cat ? 'filter-pill--active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documentation cards */}
      <div className="doc-list">
        {filteredItems.map((doc) => (
          <div key={doc.id} className={`doc-card ${expandedId === doc.id ? 'doc-card--expanded' : ''}`}>
            <button
              className="doc-card-header"
              onClick={() => toggleExpand(doc.id)}
              aria-expanded={expandedId === doc.id}
            >
              <div className="doc-card-header-left">
                <span className="doc-category-tag">{doc.category}</span>
                <h3 className="doc-card-title">{doc.title}</h3>
                <p className="doc-card-desc">{doc.description}</p>
              </div>
              <div className="doc-card-header-right">
                <span className="doc-updated">Updated {doc.lastUpdated}</span>
                <span className={`doc-expand-icon ${expandedId === doc.id ? 'doc-expand-icon--open' : ''}`}>
                  ▾
                </span>
              </div>
            </button>
            {expandedId === doc.id && (
              <div className="doc-card-body">
                <div className="doc-content-render">
                  {/* Render content as preformatted markdown-style text */}
                  <pre className="doc-content-text">{doc.content}</pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>No documentation found for this category.</p>
        </div>
      )}
    </div>
  );
}

export default Documentation;
