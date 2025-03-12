import html2pdf from 'html2pdf.js'; // Import html2pdf.js
import { ArrowRight, BookOpen, Clock, Download, Eye, FileText, Gavel, Scale, Shield, Sparkles } from 'lucide-react';
import { useState } from 'react';
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

  const [showGenerator, setShowGenerator] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (data: FormData) => {
    setFormData(data);
    setShowPreview(true);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('document-preview'); // Get the document preview element
    if (element) {
      const options = {
        margin: 10,
        filename: 'legal-document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      html2pdf().from(element).set(options).save(); // Generate and save the PDF
    }
  };

  const features = [
    {
      icon: <Scale className="h-8 w-8 text-amber-400" />,
      title: "Legal Compliance",
      description: "All documents are generated in compliance with legal standards and requirements, ensuring validity and enforceability."
    },
    {
      icon: <Clock className="h-8 w-8 text-amber-400" />,
      title: "Time Efficiency",
      description: "Reduce document preparation time from hours to minutes with our automated generation system."
    },
    {
      icon: <Shield className="h-8 w-8 text-amber-400" />,
      title: "Document Security",
      description: "Built-in security measures ensure your legal documents remain confidential and protected."
    }
  ];

  const testimonials = [
    {
      icon: <Sparkles className="h-8 w-8 text-amber-400" />,
      title: "Streamlined Workflow",
      description: "Experience a seamlessly integrated document generation process that adapts to your needs."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-amber-400" />,
      title: "Comprehensive Templates",
      description: "Access a wide range of professionally crafted templates for various legal documents."
    },
    {
      icon: <Gavel className="h-8 w-8 text-amber-400" />,
      title: "Expert-Backed System",
      description: "Our templates are developed and regularly reviewed by experienced legal professionals."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {!showGenerator ? (
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-black rounded-2xl shadow-xl mb-16 border border-amber-400/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] opacity-5"></div>
            <div className="relative px-8 py-24 text-center">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      Transform Your <span className="text-amber-400">Legal Documentation</span> Process
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                      Experience the future of legal document automation. Create professional, compliant documents in minutes with our advanced AI-powered platform.
                    </p>
                    <button
                      onClick={() => setShowGenerator(true)}
                      className="inline-flex items-center gap-2 bg-amber-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-amber-300 transition-colors text-lg shadow-lg"
                    >
                      Start Creating Documents
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="hidden md:block">
                    <img 
                      src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Legal Documents"
                      className="rounded-lg shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 border-4 border-amber-400/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              Enterprise-Grade <span className="text-amber-400">Document Automation</span>
            </h2>
            <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
              Our platform combines advanced technology with legal expertise to deliver a premium document generation experience trusted by leading law firms worldwide.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300 border border-amber-400/20">
                  <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((item, index) => (
                <div key={index} className="bg-black rounded-xl p-8 shadow-lg border border-amber-400/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button
              onClick={() => setShowGenerator(true)}
              className="inline-flex items-center gap-2 bg-amber-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-amber-300 transition-colors text-lg shadow-lg"
            >
              Experience Premium Document Generation
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="h-10 w-10 text-amber-400" />
              <h1 className="text-4xl font-bold text-white">Legal Document Generator</h1>
            </div>
            <p className="text-xl text-gray-300">Create professional legal documents with enterprise-grade automation</p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-amber-400/20">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white">
                <FileText className="h-6 w-6 text-amber-400" />
                Document Details
              </h2>
              <DocumentForm onSubmit={handleSubmit} initialData={formData} />
            </div>

            <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-amber-400/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-white">
                  <Eye className="h-6 w-6 text-amber-400" />
                  Preview
                </h2>
                {showPreview && (
                  <button
                    className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-black rounded-lg hover:bg-amber-300 transition-colors shadow-md"
                    onClick={handleDownloadPDF} // Download PDF functionality
                  >
                    <Download className="h-5 w-5" />
                    Download PDF
                  </button>
                )}
              </div>
              <div id="document-preview">
                <DocumentPreview data={formData} visible={showPreview} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
