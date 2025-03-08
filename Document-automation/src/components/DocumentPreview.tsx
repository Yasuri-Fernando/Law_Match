import React from 'react';
import { FormData } from '../types';

interface DocumentPreviewProps {
  data: FormData;
  visible: boolean;
}

export function DocumentPreview({ data, visible }: DocumentPreviewProps) {
  if (!visible) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        Fill out the form to preview your document
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStandardTemplate = () => (
    <>
      <div className="text-right mb-8">
        <p>{formatDate(data.date)}</p>
        <p>Case Number: {data.caseNumber}</p>
      </div>

      <h1 className="text-center uppercase mb-8">{data.documentType}</h1>

      <div className="mb-8">
        <p>This {data.documentType} is made and entered into on {formatDate(data.date)} by and between:</p>
        <ul>
          {data.parties.map((party, index) => (
            <li key={index}>{party}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2>PURPOSE</h2>
        <p>{data.description}</p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-2 gap-8">
          {data.parties.map((party, index) => (
            <div key={index} className="border-t border-gray-300 pt-8">
              <p className="font-bold mb-4">{party}</p>
              <p className="mb-2">Signature: _____________________</p>
              <p>Date: _____________________</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderDetailedTemplate = () => (
    <>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold uppercase mb-4">{data.documentType}</h1>
        <p className="text-gray-600">CASE NUMBER: {data.caseNumber}</p>
        <p className="text-gray-600">DATE: {formatDate(data.date)}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">PARTIES TO THE {data.documentType.toUpperCase()}</h2>
        <p className="mb-4">This {data.documentType} (hereinafter referred to as "the Document") is made and entered into on {formatDate(data.date)} by and between the following parties:</p>
        {data.parties.map((party, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">Party {index + 1}</h3>
            <p>{party}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">RECITALS</h2>
        <p className="mb-4">WHEREAS, the parties wish to enter into this {data.documentType} for the following purpose:</p>
        <p className="italic">{data.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">TERMS AND CONDITIONS</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>The parties agree that this Document constitutes the entire agreement between them.</li>
          <li>Any modifications to this Document must be made in writing and signed by all parties.</li>
          <li>This Document shall be governed by the applicable laws of the jurisdiction.</li>
        </ol>
      </div>

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
    </>
  );

  const renderSimpleTemplate = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center mb-4">{data.documentType}</h1>
        <p className="text-center text-gray-600">Case: {data.caseNumber}</p>
        <p className="text-center text-gray-600">{formatDate(data.date)}</p>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold mb-2">Parties:</h2>
        <ul className="list-disc pl-6">
          {data.parties.map((party, index) => (
            <li key={index}>{party}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold mb-2">Purpose:</h2>
        <p>{data.description}</p>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-2 gap-4">
          {data.parties.map((party, index) => (
            <div key={index} className="border-t border-gray-300 pt-4">
              <p>{party}</p>
              <p className="mt-4">Signature: _____________________</p>
            </div>
          ))}
        </div>
      </div>
    </>
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
    <div className="prose max-w-none">
      {renderTemplate()}
    </div>
  );
}