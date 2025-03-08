import React, { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { DocumentForm } from './components/DocumentForm';
import { DocumentPreview } from './components/DocumentPreview';
import { DocumentType, FormData, TemplateType } from './types';

function App() {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    caseNumber: '',
    documentType: 'agreement' as DocumentType,
    templateType: 'standard' as TemplateType,
    date: new Date().toISOString().split('T')[0],
    parties: [''],
    description: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (data: FormData) => {
    setFormData(data);
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Legal Document Generator</h1>
          </div>
          <p className="text-gray-600">Generate professional legal documents with ease</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Document Details
            </h2>
            <DocumentForm onSubmit={handleSubmit} initialData={formData} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Preview
              </h2>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => window.print()}
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>
            <DocumentPreview data={formData} visible={showPreview} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;