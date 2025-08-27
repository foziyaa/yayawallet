import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const KPICardSkeleton = () => {
  return (
    <div className="kpi-card">
      {/* Mimics the 'h3' title */}
      <h3><Skeleton width={120} /></h3>
      {/* Mimics the 'p' value */}
      <p><Skeleton width={80} height={36} /></p>
    </div>
  );
};

export default KPICardSkeleton;