import React from 'react';
import { FormData } from '../types';
import './DocumentPreview.css'; // Import the custom CSS

interface DocumentPreviewProps {
  data: FormData;
  visible: boolean;
}

export function DocumentPreview({ data, visible }: DocumentPreviewProps) {
  if (!visible) {
    return (
      <div className="preview-placeholder">
        Fill out the form to preview your document
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStandardTemplate = () => (
    <div className="preview-template standard-template">
      <div className="document-header">
        <p>{formatDate(data.date)}</p>
        <p>Case Number: {data.caseNumber}</p>
      </div>

      <h1>{data.documentType}</h1>

      <div>
        <p>This {data.documentType} is made and entered into on {formatDate(data.date)} by and between:</p>
        <ul>
          {data.parties.map((party, index) => (
            <li key={index}>{party}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>PURPOSE</h2>
        <p>{data.description}</p>
      </div>

      {/* Removed signature section here */}
      
      {/* "IN WITNESS WHEREOF" Section */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">IN WITNESS WHEREOF</h2>
        <p className="mb-8">The parties hereto have executed this {data.documentType} as of the date first above written.</p>
        <div className="grid grid-cols-2 gap-8">
          {data.parties.map((party, index) => (
            <div key={index} className="border-t border-gray-300 pt-8">
              <p className="font-bold mb-4">{party}</p>
              <p className="mb-2">Signature: _____________________</p>
              <p className="mb-2">Date: _____________________</p>
              <p>Name (Printed): _____________________</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDetailedTemplate = () => (
    <div className="preview-template detailed-template">
      <div className="document-header">
        <p>{formatDate(data.date)}</p>
        <p>Case Number: {data.caseNumber}</p>
      </div>

      <h1>{data.documentType}</h1>

      <div>
        <h2>PARTIES TO THE {data.documentType.toUpperCase()}</h2>
        <p>This {data.documentType} is made and entered into on {formatDate(data.date)} by and between the following parties:</p>
        {data.parties.map((party, index) => (
          <div key={index}>
            <p>{party}</p>
          </div>
        ))}
      </div>

      <div>
        <h2>RECITALS</h2>
        <p>WHEREAS, the parties wish to enter into this {data.documentType} for the following purpose:</p>
        <p className="italic">{data.description}</p>
      </div>

      <div>
        <h2>TERMS AND CONDITIONS</h2>
        <ol>
          <li>The parties agree that this Document constitutes the entire agreement between them.</li>
          <li>Any modifications to this Document must be made in writing and signed by all parties.</li>
          <li>This Document shall be governed by the applicable laws of the jurisdiction.</li>
        </ol>
      </div>

      {/* Removed signature section here */}
      
      {/* "IN WITNESS WHEREOF" Section */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">IN WITNESS WHEREOF</h2>
        <p className="mb-8">The parties hereto have executed this {data.documentType} as of the date first above written.</p>
        <div className="grid grid-cols-2 gap-8">
          {data.parties.map((party, index) => (
            <div key={index} className="border-t border-gray-300 pt-8">
              <p className="font-bold mb-4">{party}</p>
              <p className="mb-2">Signature: _____________________</p>
              <p className="mb-2">Date: _____________________</p>
              <p>Name (Printed): _____________________</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSimpleTemplate = () => (
    <div className="preview-template simple-template">
      <h1>{data.documentType}</h1>
      <p>Case: {data.caseNumber}</p>
      <p>{formatDate(data.date)}</p>

      <div>
        <h2>Parties:</h2>
        <ul>
          {data.parties.map((party, index) => (
            <li key={index}>{party}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Purpose:</h2>
        <p>{data.description}</p>
      </div>

      {/* Removed signature section here */}
      
      {/* "IN WITNESS WHEREOF" Section */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">IN WITNESS WHEREOF</h2>
        <p className="mb-8">The parties hereto have executed this {data.documentType} as of the date first above written.</p>
        <div className="grid grid-cols-2 gap-8">
          {data.parties.map((party, index) => (
            <div key={index} className="border-t border-gray-300 pt-8">
              <p className="font-bold mb-4">{party}</p>
              <p className="mb-2">Signature: _____________________</p>
              <p className="mb-2">Date: _____________________</p>
              <p>Name (Printed): _____________________</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (data.templateType) {
      case 'detailed':
        return renderDetailedTemplate();
      case 'simple':
        return renderSimpleTemplate();
      default:
        return renderStandardTemplate();
    }
  };

  return (
    <div className="preview-template">
      {renderTemplate()}
    </div>
  );
}
