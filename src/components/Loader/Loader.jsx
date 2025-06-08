import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p className="loading-text">در حال بارگذاری...</p>
    </div>
  );
}
