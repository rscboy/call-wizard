import { Customer, Manufacturer, SalesRep, CallReport } from '../types';

export const mockCustomers: Customer[] = [
  { id: 'd1', name: 'Acme Tractor Supply', city: 'Dallas', state: 'TX', status: 'ACTIVE', yearAdded: 2012 },
  { id: 'd2', name: 'Midwest Ag Equipment', city: 'Omaha', state: 'NE', status: 'ACTIVE', yearAdded: 2015 },
  { id: 'd3', name: 'Coastal Rural King', city: 'Savannah', state: 'GA', status: 'ACTIVE', yearAdded: 2018 },
  { id: 'd4', name: 'Northern Implements', city: 'Fargo', state: 'ND', status: 'ACTIVE', yearAdded: 2009 },
  { id: 'd5', name: 'Pacific Parts House', city: 'Sacramento', state: 'CA', status: 'INACTIVE', yearAdded: 2020 },
];

export const mockManufacturers: Manufacturer[] = [
  { id: 'v1', name: 'BorgWarner / Delco', status: 'ACTIVE' },
  { id: 'v2', name: 'Bosch Power', status: 'ACTIVE' },
  { id: 'v3', name: 'Heavy Duty Axles LLC', status: 'ACTIVE' },
];

export const mockSalesReps: SalesRep[] = [
  { id: 'r1', name: 'Bill Henderson', territories: ['TX', 'OK'], status: 'ACTIVE' },
  { id: 'r2', name: 'Gary Smith', territories: ['NE', 'ND', 'SD'], status: 'ACTIVE' },
  { id: 'r3', name: 'Susan Davis', territories: ['GA', 'FL', 'SC'], status: 'ACTIVE' },
];

export const mockReports: CallReport[] = [
  {
    id: 'cr1',
    visitDate: '2026-04-18',
    customerId: 'd1',
    repId: 'r1',
    status: 'UNVALIDATED',
    preamble: 'Discussed Q2 booking orders and new Delco line.',
    narrative: 'Met with Jim the purchasing manager. He mentioned they are running low on heavy duty axles for the spring season. Needs an updated catalog for Bosch Power tools. The overall floor traffic has been slower than expected this month.',
    contactsMet: 'Jim Halpert, Pam Beesly',
    manufacturersRelevant: ['v1', 'v2', 'v3'],
    followUpItems: 'Send Jim the updated Bosch pricing sheet.',
  },
  {
    id: 'cr2',
    visitDate: '2026-04-20',
    customerId: 'd3',
    repId: 'r3',
    status: 'VALIDATED',
    preamble: 'Routine check-in, addressed warranty concerns.',
    narrative: 'The customer is very happy with the standard line, but had three returns last week on the new BorgWarner parts. Needs tech support to call the service manager to discuss whether it is an installation issue or a defect.',
    contactsMet: 'Mike Scott',
    manufacturersRelevant: ['v1'],
    followUpItems: 'Have tech support call Mike tomorrow morning.',
  },
  {
    id: 'cr3',
    visitDate: '2026-04-15',
    customerId: 'd2',
    repId: 'r2',
    status: 'SENT',
    preamble: 'Closed big order for Midwest expansion.',
    narrative: 'Fantastic visit. They are opening two new locations and want to standardize on our heavy duty axles across all stores. Need to arrange a bulk discount agreement.',
    contactsMet: 'Dwight Schrute',
    manufacturersRelevant: ['v3'],
    followUpItems: 'Prepare bulk discount proposal for Friday.',
  }
];
