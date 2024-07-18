import React from 'react';

const SpinnerLoading = () => {
  return (
    <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <span className="loader" />
    </div>
  );
};

export default SpinnerLoading;
