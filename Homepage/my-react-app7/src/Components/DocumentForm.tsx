import { Minus, Plus } from 'lucide-react';
import React from 'react';
import { DocumentType, FormData, TemplateType } from '../types';
import './DocumentForm.css'; // Import the CSS for DocumentForm

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
    <form onSubmit={handleSubmit} className="document-form">
      <div className="form-group">
        <label>Document Type</label>
        <select
          value={formData.documentType}
          onChange={e => setFormData(prev => ({ ...prev, documentType: e.target.value as DocumentType }))}
        >
          <option value="agreement">Agreement</option>
          <option value="contract">Contract</option>
          <option value="affidavit">Affidavit</option>
          <option value="declaration">Declaration</option>
        </select>
      </div>

      <div className="form-group">
        <label>Template Style</label>
        <select
          value={formData.templateType}
          onChange={e => setFormData(prev => ({ ...prev, templateType: e.target.value as TemplateType }))}
        >
          <option value="standard">Standard</option>
          <option value="detailed">Detailed</option>
          <option value="simple">Simple</option>
        </select>
        <p>{getTemplateDescription(formData.templateType)}</p>
      </div>

      <div className="form-group">
        <label>Client Name</label>
        <input
          type="text"
          value={formData.clientName}
          onChange={e => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label>Case Number</label>
        <input
          type="text"
          value={formData.caseNumber}
          onChange={e => setFormData(prev => ({ ...prev, caseNumber: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label>Parties Involved</label>
        {formData.parties.map((party, index) => (
          <div key={index} className="party-input">
            <input
              type="text"
              value={party}
              onChange={e => updateParty(index, e.target.value)}
              placeholder={`Party ${index + 1}`}
              required
            />
            {index > 0 && (
              <button type="button" onClick={() => removeParty(index)}>
                <Minus />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addParty}>
          <Plus />
          Add Party
        </button>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <button type="submit">Generate Document</button>
    </form>
  );
}
