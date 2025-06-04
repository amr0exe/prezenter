import React from 'react';
import { usePDF } from '../context/PDFContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const PDFNavigation: React.FC = () => {
  const { currentPage, numPages, nextPage, prevPage } = usePDF();

  return (
    <div className="flex items-center">
      <button
        onClick={prevPage}
        disabled={currentPage <= 1}
        className={cn(
          "p-2 rounded-l-md bg-gray-700 text-white transition-colors",
          currentPage > 1 ? "hover:bg-gray-600" : "opacity-50 cursor-not-allowed"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextPage}
        disabled={currentPage >= numPages}
        className={cn(
          "p-2 rounded-r-md bg-gray-700 text-white transition-colors",
          currentPage < numPages ? "hover:bg-gray-600" : "opacity-50 cursor-not-allowed"
        )}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default PDFNavigation;