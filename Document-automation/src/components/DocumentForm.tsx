import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { DocumentType, FormData, TemplateType } from '../types';

interface DocumentFormProps {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
}

export function DocumentForm({ onSubmit, initialData }: DocumentFormProps) {
  const [formData, setFormData] = React.useState<FormData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addParty = () => {
    setFormData(prev => ({
      ...prev,
      parties: [...prev.parties, '']
    }));
  };

  const removeParty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      parties: prev.parties.filter((_, i) => i !== index)
    }));
  };

  const updateParty = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      parties: prev.parties.map((party, i) => i === index ? value : party)
    }));
  };

  const getTemplateDescription = (template: TemplateType) => {
    switch (template) {
      case 'standard':
        return 'A balanced template with essential sections and moderate detail';
      case 'detailed':
        return 'Comprehensive template with extensive sections and detailed clauses';
      case 'simple':
        return 'Minimalist template focusing on core information only';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Document Type</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.documentType}
            onChange={e => setFormData(prev => ({ ...prev, documentType: e.target.value as DocumentType }))}
          >
            <option value="agreement">Agreement</option>
            <option value="contract">Contract</option>
            <option value="affidavit">Affidavit</option>
            <option value="declaration">Declaration</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Template Style</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.templateType}
            onChange={e => setFormData(prev => ({ ...prev, templateType: e.target.value as TemplateType }))}
          >
            <option value="standard">Standard</option>
            <option value="detailed">Detailed</option>
            <option value="simple">Simple</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            {getTemplateDescription(formData.templateType)}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Client Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.clientName}
          onChange={e => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Case Number</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.caseNumber}
          onChange={e => setFormData(prev => ({ ...prev, caseNumber: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.date}
          onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Parties Involved</label>
        {formData.parties.map((party, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={party}
              onChange={e => updateParty(index, e.target.value)}
              placeholder={`Party ${index + 1}`}
              required
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeParty(index)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <Minus className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addParty}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Party
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Generate Document
      </button>
    </form>
  );
}