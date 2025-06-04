import React from 'react';

const PDFLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 p-8">
      <div className="relative h-24 w-24 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18H17V16H7V18Z" fill="#E2E8F0"/>
            <path d="M17 14H7V12H17V14Z" fill="#E2E8F0"/>
            <path d="M7 10H11V8H7V10Z" fill="#E2E8F0"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM5 5C5 4.44772 5.44772 4 6 4H14V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5ZM16 4.41421C16.5944 4.78929 17.1499 5.24472 17.6398 5.80368C17.8099 6.01782 17.9621 6.23958 18.1 6.46947V7H16V4.41421Z" fill="#E2E8F0"/>
          </svg>
        </div>
        <div className="animate-spin absolute inset-0 rounded-full border-t-2 border-blue-500 opacity-75"></div>
      </div>
      <p className="text-gray-300 text-lg font-medium">Loading PDF...</p>
      <p className="text-gray-400 text-sm mt-2">This may take a moment</p>
    </div>
  );
};

export default PDFLoadingState;