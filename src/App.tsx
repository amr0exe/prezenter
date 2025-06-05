import { useState } from 'react';
import PDFViewer from './components/PDFViewer';
import { FileUploadButton } from './components/FileUploadButton';
import { PDFProvider } from './context/PDFContext';
import { Video } from 'lucide-react';

function App() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-900 to-black text-white">
      <main className="container mx-auto py-10 flex justify-center min-h-screen">
        {!file ? (
          <div className="max-w-2xl font-mono flex flex-col items-center mt-28">
            <p className="text-9xl font-bold tracking-widest text-blue-800">POWERPOINT</p>

            <p className='text-8xl tracking-widest font-semibold text-slate-300 -mt-2 pr-10 underline unde'>On <span className='underline text-black'>WEB</span></p>

            <div className='flex justify-center items-center my-16'>
              <FileUploadButton onFileSelected={handleFileChange} />

               <div className="mx-6 h-14 w-px bg-slate-100"></div>

              <button
                className="group relative overflow-hidden px-10 py-4 bg-blue-600 rounded-lg text-white font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors ml-5"
              >
                <Video size={20}/>
                Watch Demo
              </button>
            </div>

            <p className='text-slate-300 text-3xl'>"Present your slides with <span className='text-slate-300 font-semibold'>Prezenter</span>"</p>
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto px-4">
            <PDFProvider>
              <PDFViewer file={file} onFileChange={handleFileChange} />
            </PDFProvider>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;