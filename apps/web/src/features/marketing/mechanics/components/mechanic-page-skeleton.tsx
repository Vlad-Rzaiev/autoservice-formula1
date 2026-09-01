import React from 'react';

export interface MechanicPageSkeletonProps {
  children?: React.ReactNode;
}

export default function MechanicPageSkeleton({}: MechanicPageSkeletonProps) {
  return <div>LOADING...................</div>;
}
