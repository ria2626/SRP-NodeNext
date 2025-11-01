import React from 'react';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-lime-600 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-lime-600 rounded-full animate-bounce delay-200"></div>
      <div className="w-3 h-3 bg-lime-600 rounded-full animate-bounce delay-400"></div>
    </div>
  </div>
  );
};

export default FullPageLoader;
