import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PDFContextType {
  currentPage: number;
  numPages: number;
  loaded: boolean;
  error: string | null;
  setCurrentPage: (page: number) => void;
  setNumPages: (pages: number) => void;
  setLoaded: (loaded: boolean) => void;
  setError: (error: string | null) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}

const PDFContext = createContext<PDFContextType | undefined>(undefined);

interface PDFProviderProps {
  children: ReactNode;
}

export const PDFProvider: React.FC<PDFProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
    }
  };

  const value: PDFContextType = {
    currentPage,
    numPages,
    loaded,
    error,
    setCurrentPage,
    setNumPages,
    setLoaded,
    setError,
    nextPage,
    prevPage,
    goToPage,
  };

  return <PDFContext.Provider value={value}>{children}</PDFContext.Provider>;
};

export const usePDF = (): PDFContextType => {
  const context = useContext(PDFContext);
  if (context === undefined) {
    throw new Error('usePDF must be used within a PDFProvider');
  }
  return context;
};