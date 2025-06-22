import React from 'react';

const ProgressBar = ({ value, max }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div style={{ width: '100%', backgroundColor: '#e0e0de', borderRadius: '4px' }}>
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: '#76c7c0',
          height: '20px',
          borderRadius: '4px',
          textAlign: 'right',
        }}
      >
        <span style={{ padding: '5px', color: 'white' }}>
          {value} / {max}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
