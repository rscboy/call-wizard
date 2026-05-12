import { Dealer, Vendor, SalesRep, CallReport } from '../types';

export const mockDealers: Dealer[] = [
  { id: 'd1', name: 'Riverside Market', city: 'Dayton', state: 'OH', status: 'ACTIVE', yearAdded: 2012 },
  { id: 'd2', name: 'Northpoint Retail Center', city: 'Vandalia', state: 'OH', status: 'ACTIVE', yearAdded: 2015 },
  { id: 'd3', name: 'Coastal Home Supply', city: 'Savannah', state: 'GA', status: 'ACTIVE', yearAdded: 2018 },
  { id: 'd4', name: 'Northern Hardware Co-op', city: 'Fargo', state: 'ND', status: 'ACTIVE', yearAdded: 2009 },
  { id: 'd5', name: 'Pacific Parts Outlet', city: 'Sacramento', state: 'CA', status: 'INACTIVE', yearAdded: 2020 },
];

export const mockVendors: Vendor[] = [
  { id: 'v1', name: 'Apex Industrial', status: 'ACTIVE' },
  { id: 'v2', name: 'Brixton Controls', status: 'ACTIVE' },
  { id: 'v3', name: 'Stratos Filtration', status: 'ACTIVE' },
];

export const mockSalesReps: SalesRep[] = [
  { id: 'r1', name: 'Bill Henderson', territories: ['TX', 'OK', 'Replacement Units'], status: 'ACTIVE' },
  { id: 'r2', name: 'Gary Smith', territories: ['NE', 'ND', 'Motion Components'], status: 'ACTIVE' },
  { id: 'r3', name: 'Susan Davis', territories: ['GA', 'FL', 'Filtration'], status: 'ACTIVE' },
];

export const mockReports: CallReport[] = [
  {
    id: 'cr1',
    visitDate: '2026-04-18',
    dealerId: 'd1',
    repId: 'r1',
    status: 'UNVALIDATED',
    preamble: 'Draft: shelf visibility, damaged packaging, and competitor display noted.',
    narrative: 'Visited Riverside Market and checked manufacturer shelf presence. Apex facings were strong, Brixton had a competitor end-cap nearby, and Stratos had two damaged packages reported by the store manager.',
    contactsMet: 'Pam Beesly, Head of Purchasing',
    vendorsRelevant: ['v1', 'v2', 'v3'],
    followUpItems: 'Send Apex promotion sheet, photograph Brixton competitor display, and alert Stratos rep about package damage.',
  },
  {
    id: 'cr2',
    visitDate: '2026-04-20',
    dealerId: 'd3',
    repId: 'r3',
    status: 'VALIDATED',
    preamble: 'Validated issue: Stratos shelf damage and buyer follow-up.',
    narrative: 'Store manager reported damaged Stratos units on the shelf and asked for replacement inventory before the weekend.',
    contactsMet: 'Mike Scott, Store Owner',
    vendorsRelevant: ['v2'],
    followUpItems: 'Have Stratos marketing VP send replacement display collateral and resolve shelf damage.',
  },
  {
    id: 'cr3',
    visitDate: '2026-04-15',
    dealerId: 'd2',
    repId: 'r2',
    status: 'SENT',
    preamble: 'Submitted: Apex promotion opportunity across retail sites.',
    narrative: 'Northpoint Retail Center wants to run an Apex spring promotion if pricing and display material can be approved this month.',
    contactsMet: 'Dwight Schrute, Purchasing Lead',
    vendorsRelevant: ['v3'],
    followUpItems: 'Prepare promotion pricing and display timeline by Friday.',
  }
];
