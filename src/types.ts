export type DocumentType = 'agreement' | 'contract' | 'affidavit' | 'declaration';

export type TemplateType = 'standard' | 'detailed' | 'simple';

export interface FormData {
  clientName: string;
  caseNumber: string;
  documentType: DocumentType;
  templateType: TemplateType;
  date: string;
  parties: string[];
  description: string;
}