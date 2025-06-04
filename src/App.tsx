import { useState } from 'react';
import PDFViewer from './components/PDFViewer';
import { FileUploadButton } from './components/FileUploadButton';
import { PDFProvider } from './context/PDFContext';

function App() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-900 to-black text-white">
      <main className="container mx-auto px-4 py-8">
        {!file ? (
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <h1 className="text-4xl font-bold mb-6">PDF Slideshow Viewer</h1>
            <p className="text-xl mb-8 text-gray-300">
              Upload a PDF to start your presentation. Navigate with arrow keys or space bar.
            </p>
            <FileUploadButton onFileSelected={handleFileChange} />
            
            <div className="mt-12 p-6 bg-gray-800 bg-opacity-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Keyboard Controls</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 px-3 py-1 rounded">→</div>
                  <span>Next slide</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 px-3 py-1 rounded">←</div>
                  <span>Previous slide</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 px-3 py-1 rounded">Space</div>
                  <span>Next slide</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-700 px-3 py-1 rounded">F</div>
                  <span>Toggle fullscreen</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <PDFProvider>
            <PDFViewer file={file} onFileChange={handleFileChange} />
          </PDFProvider>
        )}
      </main>
    </div>
  );
}

export default App;