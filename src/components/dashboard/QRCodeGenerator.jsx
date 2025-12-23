import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import { qrCodeAPI } from '../../services/api';

const QRCodeGenerator = () => {
  const [count, setCount] = useState(100);
  const [clientId, setClientId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBatch, setGeneratedBatch] = useState(null);

  const handleGenerate = async () => {
    if (!clientId.trim()) {
      toast.error('Please enter a client ID');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await qrCodeAPI.generateBatch(count, clientId);
      setGeneratedBatch(result);
      toast.success(`Generated ${count} QR codes successfully!`);
    } catch (error) {
      toast.error('Failed to generate QR codes');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    if (!generatedBatch) return;
    
    try {
      const pdfBlob = await qrCodeAPI.exportBatchPDF(generatedBatch.batchId);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `qr-codes-${generatedBatch.batchId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download PDF');
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6">Generate QR Codes</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Codes
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="input-field"
              placeholder="Enter number of codes"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client/Product ID
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="input-field"
              placeholder="e.g., nike_airmax_2024"
            />
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              'Generate QR Codes'
            )}
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          {generatedBatch ? (
            <div className="text-center">
              <div className="mb-4">
                <QRCodeSVG 
                  value={generatedBatch.qrCodeUrls[0]}
                  size={150}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Sample QR Code (1 of {generatedBatch.count})
              </p>
              <button
                onClick={handleExportPDF}
                className="btn-secondary flex items-center gap-2"
              >
                <HiDocumentReport className="w-4 h-4" />
                Download PDF ({generatedBatch.count} codes)
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <HiQrcode className="w-12 h-12 text-gray-400" />
              </div>
              <p>Generated QR codes will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;