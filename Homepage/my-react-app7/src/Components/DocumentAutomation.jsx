import { ArrowRight, CheckCircle, Clock, Download, FileText, Shield } from 'lucide-react';
import React, { useState } from 'react';
import './DocumentAutomation.css';
import { DocumentForm } from './DocumentForm.tsx';
import { DocumentPreview } from './DocumentPreview.tsx';

export function DocumentAutomation() {
  const [formData, setFormData] = useState({
    clientName: '',
    caseNumber: '',
    documentType: 'agreement',
    templateType: 'standard',
    date: new Date().toISOString().split('T')[0],
    parties: [''],
    description: '',
  });

  const [showGenerator, setShowGenerator] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const features = [
    {
      icon: <Shield size={32} />,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and security protocols ensure your sensitive legal documents remain confidential and protected.",
      color: "#4CAF50"
    },
    {
      icon: <Clock size={32} />,
      title: "Lightning-Fast Generation",
      description: "Our advanced AI-powered system generates complex legal documents in seconds, saving you valuable billable hours.",
      color: "#2196F3"
    },
    {
      icon: <CheckCircle size={32} />,
      title: "100% Legal Compliance",
      description: "Stay compliant with automatically updated templates that adhere to the latest legal standards and regulations.",
      color: "#9C27B0"
    },
    {
      icon: <FileText size={32} />,
      title: "Smart Templates",
      description: "Access hundreds of pre-built, customizable templates crafted by experienced legal professionals.",
      color: "#FF9800"
    }
  ];

  const handleSubmit = (data) => {
    setFormData(data);
    setShowPreview(true);
  };

  const handleDownloadPDF = () => {
    // PDF generation logic here
  };

  return (
    <div className="document-automation-container">
      {!showGenerator ? (
        <>
          <div className="hero-section">
            <div className="hero-content">
              <div className="hero-badge">Enterprise Solution</div>
              <h1>Transform Your Legal Documentation Process</h1>
              <p className="hero-subtitle">Create sophisticated, court-ready documents with our premium automation platform</p>
              <button className="start-create" onClick={() => setShowGenerator(true)}>
                Start Creating Documents <ArrowRight size={20} className="button-icon" />
              </button>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80" alt="Legal documents" />
            </div>
          </div>

          <div className="features-section">
            <h2>Premium Features</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Templates</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Documents Generated</span>
            </div>
          </div>
        </>
      ) : (
        <div className="generator-section">
          
            <h1 className="generator-header">Premium Document Generator</h1>
            <p>Create court-ready legal documents with enterprise-grade automation</p>
          
          
          <div className="workspace-container">
            <DocumentForm onSubmit={handleSubmit} initialData={formData} />
            <div className="preview-container" id="document-preview">
              {showPreview && <DocumentPreview data={formData} visible={showPreview} />}
            </div>
          </div>
          
          {showPreview && (
            <button className="download-button" onClick={handleDownloadPDF}>
              <Download size={20} className="button-icon" />
              Download PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default DocumentAutomation;