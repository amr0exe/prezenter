import React, { useRef, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { usePDF } from '../context/PDFContext';
import PDFNavigation from './PDFNavigation';
import PDFPageControls from './PDFPageControls';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFullscreen } from '../hooks/useFullscreen';
import PDFLoadingState from './PDFLoadingState';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file, onFileChange }) => {
  const { 
    currentPage, 
    numPages, 
    setNumPages,
    nextPage,
    prevPage,
    loaded,
    setLoaded,
    error,
    setError
  } = usePDF();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
  // Initialize keyboard navigation
  useKeyboardNavigation({
    onNext: nextPage,
    onPrev: prevPage,
    onFullscreen: toggleFullscreen
  });

  // Update container size when container changes or enters fullscreen
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({
          width: rect.width,
          height: isFullscreen ? rect.height : rect.height - 80 // Account for toolbar when not fullscreen
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, [isFullscreen, containerRef.current]);

  // Reset state when file changes
  useEffect(() => {
    setLoaded(false);
    setError(null);
  }, [file, setLoaded, setError]);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoaded(true);
  };

  const handleDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF. Please ensure it is a valid PDF file.');
    setLoaded(true);
  };

  // Calculate optimal PDF size
  const getPDFSize = () => {
    if (!containerSize.width || !containerSize.height) return {};
    
    if (isFullscreen) {
      // In fullscreen, use nearly the entire screen
      return {
        width: containerSize.width * 0.95,
        height: containerSize.height * 0.95
      };
    } else {
      // In normal mode, use 80% of viewport width for better visibility
      const viewportWidth = window.innerWidth;
      return {
        width: Math.min(viewportWidth * 0.8, containerSize.width * 0.9)
      };
    }
  };

  const pdfSize = getPDFSize();

  return (
    <div 
      ref={containerRef}
      className={`
        relative flex flex-col items-center w-full
        ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'min-h-[calc(100vh-100px)] bg-gray-900 rounded-xl overflow-hidden'}
      `}
    >
      {!loaded && (
        <PDFLoadingState />
      )}

      {error && (
        <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => onFileChange(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try another file
          </button>
        </div>
      )}

      {file && !error && (
        <>
          <div className={`
            w-full flex items-center justify-center overflow-hidden relative
            ${isFullscreen ? 'h-full' : 'flex-1'}
          `}>
            <Document
              file={file}
              onLoadSuccess={handleDocumentLoadSuccess}
              onLoadError={handleDocumentLoadError}
              loading={<PDFLoadingState />}
              className="flex items-center justify-center"
            >
              <Page 
                pageNumber={currentPage}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="transition-opacity duration-300"
                loading={<PDFLoadingState />}
                {...pdfSize}
              />
            </Document>

            {/* Overlay controls that appear on hover */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={prevPage}
                disabled={currentPage <= 1}
                className="p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all disabled:opacity-0"
                aria-label="Previous page"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage >= numPages}
                className="p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all disabled:opacity-0"
                aria-label="Next page"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Fullscreen overlay toolbar */}
            {isFullscreen && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onFileChange(null)}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors text-white"
                    >
                      Change PDF
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors text-white"
                    >
                      Exit Fullscreen
                    </button>
                  </div>
                  
                  {loaded && (
                    <div className="flex items-center gap-4">
                      <PDFPageControls />
                      <PDFNavigation />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Regular toolbar - only show when not in fullscreen */}
          {!isFullscreen && (
            <div className="w-full bg-gradient-to-br from-black to-slate-700 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => onFileChange(null)}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                >
                  Change PDF
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                >
                  Fullscreen
                </button>
              </div>
              
              {loaded && (
                <div className="flex items-center gap-4">
                  <PDFPageControls />
                  <PDFNavigation />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PDFViewer;
