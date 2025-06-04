import React, { useState, useRef, useEffect } from 'react';
import { usePDF } from '../context/PDFContext';

const PDFPageControls: React.FC = () => {
  const { currentPage, numPages, goToPage } = usePDF();
  const [inputValue, setInputValue] = useState(currentPage.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  // Update input when current page changes
  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(inputValue);
    if (isNaN(pageNumber)) {
      setInputValue(currentPage.toString());
      return;
    }
    goToPage(pageNumber);
    inputRef.current?.blur();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setInputValue(currentPage.toString());
  };

  return (
    <div className="flex items-center text-sm font-medium">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-12 h-8 bg-gray-700 text-center text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Current page"
        />
        <span className="mx-2 text-gray-300">of {numPages}</span>
      </form>
    </div>
  );
};

export default PDFPageControls;