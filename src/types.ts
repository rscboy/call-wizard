export interface Dealer {
  id: string;
  name: string;
  city: string;
  state: string;
  status: 'ACTIVE' | 'INACTIVE';
  yearAdded: number;
}

export interface Vendor {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface SalesRep {
  id: string;
  name: string;
  territories: string[];
  status: 'ACTIVE' | 'INACTIVE';
}

export type ReportStatus = 'DRAFT' | 'UNVALIDATED' | 'VALIDATED' | 'SENT';

export interface CallReport {
  id: string;
  visitDate: string;
  dealerId: string;
  repId: string;
  status: ReportStatus;
  preamble: string;
  narrative: string;
  contactsMet: string;
  vendorsRelevant: string[];
  followUpItems: string;
}
