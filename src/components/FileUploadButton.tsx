import React, { useRef } from 'react';
import { FileUp } from 'lucide-react';

interface FileUploadButtonProps {
  onFileSelected: (file: File) => void;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClick}
        className="group relative overflow-hidden px-6 py-3 bg-blue-600 rounded-lg text-white font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
      >
        <FileUp size={20} />
        Upload PDF
        <div className="absolute inset-0 w-full h-full transition-all duration-300 ease-out translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-blue-500 to-transparent opacity-30"></div>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
      />
      <p className="mt-4 text-gray-400 text-sm">
        Supported format: PDF
      </p>
    </div>
  );
};