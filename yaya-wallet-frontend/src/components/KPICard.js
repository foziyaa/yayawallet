import React from 'react';

const KPICard = ({ title, value, icon }) => {
  return (
    <div className="kpi-card dashboard-card">
      <div className="icon-wrapper">
        <i className={icon}></i>
      </div>
      <div className="text-wrapper">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default KPICard;