import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  BarChart3,
  Building,
  CalendarDays,
  CheckCircle2,
  Database,
  Download,
  Eye,
  EyeOff,
  FileText,
  MailCheck,
  MapPin,
  Mic,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from 'lucide-react';
import { mockDealers, mockReports, mockSalesReps, mockVendors } from '../data/mockData';

const observations = [
  {
    type: 'Replacement Opportunity',
    manufacturer: 'Northstar Replacement Units',
    product: 'Replacement units',
    visible: 'Three aging Brand X units likely to be replaced in the next 6-9 months.',
    internal: 'Purchasing contact said budget is not approved yet. Do not share timing confidence externally.',
    confidence: 91,
    value: '$185k',
    tag: 'Opportunity',
  },
  {
    type: 'Product Issue',
    manufacturer: 'ClearFlow Filtration',
    product: 'Cartridge filtration',
    visible: 'Maintenance reported recurring cartridge failures and requested technical support.',
    internal: 'Possible installation issue; rep should verify before escalating as defect.',
    confidence: 84,
    value: '$24k',
    tag: 'Issue',
  },
  {
    type: 'Competitor Sighting',
    manufacturer: 'Apex Motion Components',
    product: 'Motion components',
    visible: 'Customer is comparing Apex against a lower-cost competitor for the new line.',
    internal: 'Rep believes Apex can win if lead time is protected.',
    confidence: 76,
    value: '$72k',
    tag: 'Competitor',
  },
];

const representedManufacturers = [
  ['Apex Industrial', 'Shelf facings are strong; buyer asked about spring promotion pricing.'],
  ['Brixton Controls', 'Competitor end-cap display is visible near checkout.'],
  ['Stratos Filtration', 'Store manager reported two damaged packages in the filtration aisle.'],
  ['Northstar Replacement Units', 'Purchasing lead asked for a compact display option.'],
];

const retailerProfiles = [
  {
    name: 'Riverside Market',
    address: '420 Main St, Dayton, OH 45402',
    gps: '39.7589, -84.1916',
    owner: 'Mike Scott · 937-555-0198 · mike@riversidemarket.com',
    buyer: 'Pam Beesly · 937-555-0142 · purchasing@riversidemarket.com',
    revenue: '$8.4M annual revenue',
  },
  {
    name: 'Northpoint Retail Center',
    address: '1180 Commerce Dr, Vandalia, OH 45377',
    gps: '39.8906, -84.1988',
    owner: 'Dwight Schrute · 937-555-0171 · owner@northpointretail.com',
    buyer: 'Angela Martin · 937-555-0184 · buyer@northpointretail.com',
    revenue: '$11.2M annual revenue',
  },
];

const manufacturerProfiles = [
  {
    name: 'Apex Industrial',
    president: 'Pat Powers · pat@apex.example · 614-555-0101',
    marketing: 'Meredith Lane · meredith@apex.example · 614-555-0102',
    revenue: '$42M annual revenue',
  },
  {
    name: 'Brixton Controls',
    president: 'Jordan Jensen · jordan@brixton.example · 312-555-0130',
    marketing: 'Kelly Kapoor · kelly@brixton.example · 312-555-0131',
    revenue: '$26M annual revenue',
  },
  {
    name: 'Stratos Filtration',
    president: 'Stan Hudson · stan@stratos.example · 216-555-0150',
    marketing: 'Oscar Martinez · oscar@stratos.example · 216-555-0151',
    revenue: '$18M annual revenue',
  },
];

const roles = [
  ['Sales Rep', 'Map-based visit start, voice capture, AI review'],
  ['Sales Manager', 'Full visibility across visits, follow-ups, and pipeline'],
  ['Manufacturer', 'Scoped portal with only approved product-line notes'],
  ['Admin', 'Master data, access maps, audit log, premium reporting'],
];

const lifecycleSteps = [
  ['Create Draft', 'Salesman selects retailer and visit date; Python server creates a Draft call report in MySQL.'],
  ['Manufacturer Fields', 'Each represented manufacturer has a distinct text box with optional speech-to-text capture.'],
  ['AI Process', 'Monthly and per-report AI logic structures manufacturer-specific notes, general notes, tags, value, urgency, and follow-ups.'],
  ['Rep Review', 'Salesman edits summary, manufacturer mapping, visible notes, internal-only notes, and confidence flags.'],
  ['Approve', 'Approved reports lock edits and mark every observation as approved for downstream portals.'],
  ['Publish', 'Manufacturer portals, CSV export, filters, and stored monthly summaries receive only approved scoped records.'],
];

const adminCoverage = [
  ['Salesman Accounts', 'Admin creates salesman accounts; email is the unique login and must be verified by hyperlink.'],
  ['Manufacturer Accounts', 'Admin creates manufacturer accounts and limits portal access to that manufacturer only.'],
  ['Retail Sites', 'Store name, street, city, state, zip, GPS from address, owner contact, purchasing contact, and revenue size.'],
  ['Manufacturer Profiles', 'Manufacturer name, president contact, marketing VP contact, and approximate revenue size.'],
  ['Manufacturer Access', 'Grant or revoke manufacturer-user access to manufacturer and product-line scopes.'],
  ['Python + MySQL', 'Server-side Python writes accounts, retailers, reports, notes, verification tokens, and AI summaries to SQL tables.'],
  ['Upgrade Requests', 'Review pricing-page upgrade requests and change their status.'],
  ['Audit Log', 'Inspect create, update, transcribe, AI process, approve, export, and digest events.'],
];

const HeaderBlock = ({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) => (
  <div className="mb-8 border-b border-slate-900 pb-5">
    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">{eyebrow}</p>
    <h1 className="mt-2 text-3xl font-medium tracking-normal text-slate-900 md:text-4xl">{title}</h1>
    <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500">{copy}</p>
  </div>
);

const Card = ({ children, dark = false }: { children: ReactNode; dark?: boolean; key?: string }) => (
  <div className={`${dark ? 'bg-[#0a192f] text-white border-[#0a192f]' : 'bg-white text-slate-900 border-slate-300'} border p-5 md:p-6`}>
    {children}
  </div>
);

const StatusPill = ({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'green' | 'blue' | 'amber' }) => {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    green: 'bg-emerald-50 text-emerald-700',
    blue: 'bg-blue-50 text-blue-700',
    amber: 'bg-amber-50 text-amber-800',
  };
  return <span className={`font-mono text-[10px] uppercase tracking-[0.06em] px-2 py-1 ${tones[tone]}`}>{children}</span>;
};

export const Dashboard = () => {
  const [selected, setSelected] = useState(mockDealers[0].id);
  const selectedSite = mockDealers.find((site) => site.id === selected) || mockDealers[0];
  const selectedProfile = retailerProfiles.find((retailer) => retailer.name === selectedSite.name) || retailerProfiles[0];

  return (
    <div>
      <HeaderBlock
        eyebrow="Rep workflow"
        title="Start every visit from the retailer."
        copy="Salesmen choose a retail site, record the visit date, then enter short manufacturer-specific observations from the phone."
      />

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">Retail site map</p>
              <h2 className="mt-1 text-2xl font-medium text-slate-900">Territory retailers</h2>
            </div>
            <button className="cw-pill bg-[#0a192f] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.04em] text-white">
              <Plus className="mr-2 inline h-4 w-4" /> New Retailer
            </button>
          </div>

          <div className="relative h-[420px] overflow-hidden border border-slate-200 bg-[#eef3f6]">
            <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(#cbd5e1_1px,transparent_1px),linear-gradient(90deg,#cbd5e1_1px,transparent_1px)] [background-size:42px_42px]" />
            {mockDealers.slice(0, 5).map((site, index) => (
              <button
                key={site.id}
                onClick={() => setSelected(site.id)}
                className={`absolute flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white transition ${selected === site.id ? 'border-[#0a192f] text-[#0a192f] scale-110' : 'border-white text-blue-700'}`}
                style={{
                  left: `${18 + (index * 17) % 68}%`,
                  top: `${18 + (index * 23) % 58}%`,
                }}
                title={site.name}
              >
                <MapPin className="h-5 w-5" />
              </button>
            ))}
            <div className="absolute bottom-4 left-4 right-4 border border-slate-200 bg-white/90 p-4 backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Selected retailer</p>
              <p className="mt-1 text-lg font-medium text-slate-900">{selectedSite.name}</p>
              <p className="text-sm text-slate-500">{selectedSite.city}, {selectedSite.state}</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          <Card dark>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">Next action</p>
            <h2 className="mt-3 text-2xl font-medium">Enter call report</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">The mobile form records the visit date and gives each represented manufacturer its own text/speech field.</p>
            <Link to="/app/reports" className="cw-pill mt-6 inline-flex bg-white px-5 py-3 font-mono text-[11px] uppercase tracking-[0.04em] text-[#0a192f]">
              Open AI Review
            </Link>
          </Card>

          {mockDealers.slice(0, 3).map((site) => (
            <button
              key={site.id}
              onClick={() => setSelected(site.id)}
              className={`border p-4 text-left transition ${selected === site.id ? 'border-[#0a192f] bg-white' : 'border-slate-200 bg-white/70 hover:bg-white'}`}
            >
              <p className="font-medium text-slate-900">{site.name}</p>
              <p className="mt-1 text-sm text-slate-500">{site.city}, {site.state}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <div className="flex items-start gap-3">
            <Store className="mt-1 h-5 w-5 text-[#0a192f]" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">Retailer record</p>
              <h2 className="mt-2 text-2xl font-medium text-slate-900">{selectedProfile.name}</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm">
            {[
              ['Address', selectedProfile.address],
              ['GPS derived from address', selectedProfile.gps],
              ['Owner', selectedProfile.owner],
              ['Head of purchasing', selectedProfile.buyer],
              ['Approx. store size', selectedProfile.revenue],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-slate-100 pb-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">{label}</p>
                <p className="mt-1 text-slate-700">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">Today's mobile form</p>
          <h2 className="mt-2 text-2xl font-medium text-slate-900">Manufacturer note fields</h2>
          <div className="mt-5 grid gap-3">
            {representedManufacturers.slice(0, 3).map(([name, note]) => (
              <div key={name} className="border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">{name}</p>
                  <Mic className="h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export const CallReports = () => {
  const [phase, setPhase] = useState<'idle' | 'recording' | 'ready'>('idle');
  const [showInternal, setShowInternal] = useState(true);
  const [visitDate, setVisitDate] = useState('2026-05-11');
  const [generalNotes, setGeneralNotes] = useState('Store traffic was high; purchasing lead requested follow-up next week.');
  const [manufacturerNotes, setManufacturerNotes] = useState(() =>
    representedManufacturers.map(([name, note]) => ({ name, note }))
  );
  const [saveState, setSaveState] = useState<'draft' | 'saved'>('draft');

  return (
    <div>
      <HeaderBlock
        eyebrow="Mobile call report"
        title="One retailer visit, distinct manufacturer notes."
        copy="The demo shows the required form logic: visit date, general notes, and separate text or speech-to-text inputs for each represented manufacturer."
      />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">Visit details</p>
            <StatusPill><CalendarDays className="mr-1 inline h-3 w-3" /> {visitDate}</StatusPill>
          </div>
          <div className="mt-5 grid gap-3">
            <label className="grid gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Retailer</span>
              <select className="border border-slate-200 bg-white px-4 py-3 text-sm">
                {retailerProfiles.map((retailer) => (
                  <option key={retailer.name}>{retailer.name}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Visit date</span>
              <input value={visitDate} onChange={(event) => setVisitDate(event.target.value)} type="date" className="border border-slate-200 bg-white px-4 py-3 text-sm" />
            </label>
          </div>
          <div className="mt-6 flex flex-col items-center text-center">
            <button
              onClick={() => setPhase(phase === 'recording' ? 'ready' : 'recording')}
              className={`flex h-32 w-32 items-center justify-center rounded-full ${phase === 'recording' ? 'bg-rose-600' : 'bg-[#0a192f]'} text-white transition`}
            >
              <Mic className="h-14 w-14" />
            </button>
            <p className="mt-6 text-4xl font-medium text-slate-900">{phase === 'recording' ? '0:18' : 'Ready'}</p>
            <p className="mt-2 text-sm text-slate-500">{phase === 'recording' ? 'Tap again to stop speech capture.' : 'Tap any manufacturer field to simulate speech-to-text.'}</p>
          </div>
          <div className="mt-8 space-y-3">
            {manufacturerNotes.map((entry, index) => (
              <div key={entry.name} className="border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">{entry.name}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setPhase('recording');
                      setManufacturerNotes((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, note: `${row.note} Voice note captured.` } : row));
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0a192f]"
                    title={`Speech to text for ${entry.name}`}
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                </div>
                <textarea
                  value={entry.note}
                  onChange={(event) => {
                    const next = event.target.value;
                    setManufacturerNotes((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, note: next } : row));
                  }}
                  className="min-h-24 w-full resize-y rounded border border-slate-200 bg-white p-3 text-sm leading-relaxed text-slate-600 outline-none focus:border-[#0a192f]"
                />
              </div>
            ))}
            <div className="border border-slate-200 bg-white p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">General notes</p>
              <textarea value={generalNotes} onChange={(event) => setGeneralNotes(event.target.value)} className="mt-2 min-h-24 w-full resize-y border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-600 outline-none focus:border-[#0a192f]" />
            </div>
          </div>
          <button onClick={() => { setPhase('ready'); setSaveState('saved'); }} className="cw-pill mt-5 w-full bg-[#0a192f] px-5 py-4 font-mono text-[11px] uppercase tracking-[0.04em] text-white">
            <Sparkles className="mr-2 inline h-4 w-4" /> {saveState === 'saved' ? 'Saved to demo' : 'Save call report'}
          </button>
          <div className="mt-5 border-t border-slate-200 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Backend parity</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">Designed for a Python server writing visit dates, retailer IDs, manufacturer note rows, and general notes to MySQL.</p>
          </div>
        </Card>

        <Card>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">Stored report view</p>
              <h2 className="mt-1 text-2xl font-medium text-slate-900">Manufacturer-tagged notes</h2>
            </div>
            <button onClick={() => setShowInternal(!showInternal)} className="cw-pill border border-slate-300 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.04em] text-slate-700">
              {showInternal ? <EyeOff className="mr-2 inline h-4 w-4" /> : <Eye className="mr-2 inline h-4 w-4" />}
              Internal Notes
            </button>
          </div>

          <div className="space-y-4">
            {observations.map((observation, index) => (
              <div key={observation.type} className="border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill tone={index === 0 ? 'green' : index === 1 ? 'amber' : 'blue'}>{observation.tag}</StatusPill>
                  <StatusPill>AI {observation.confidence}%</StatusPill>
                  <StatusPill>{observation.value}</StatusPill>
                </div>
                <h3 className="mt-3 text-lg font-medium text-slate-900">{observation.type}</h3>
                <p className="mt-1 text-sm text-slate-500">{observation.manufacturer} · {observation.product}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{observation.visible}</p>
                {showInternal && <p className="mt-3 border-l-2 border-slate-300 pl-3 text-xs leading-relaxed text-slate-500">{observation.internal}</p>}
              </div>
            ))}
          </div>

          <button className="cw-pill mt-5 w-full bg-[#0a192f] px-5 py-4 font-mono text-[11px] uppercase tracking-[0.04em] text-white">
            <CheckCircle2 className="mr-2 inline h-4 w-4" /> Approve report
          </button>
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-medium text-slate-900">Lifecycle logic represented</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {lifecycleSteps.map(([title, copy], index) => (
            <div key={title} className="border border-slate-200 bg-slate-50 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">0{index + 1}</p>
              <p className="mt-2 font-medium text-slate-900">{title}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{copy}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export const RepsList = () => (
  <div>
    <HeaderBlock
      eyebrow="Manager oversight"
      title="Full visibility across visits, value, and follow-ups."
      copy="Managers see the full internal view: draft quality, opportunities, issues, competitor sightings, and follow-up accountability."
    />
    <div className="grid gap-4 md:grid-cols-4">
      {[
        ['12', 'Visits this week'],
        ['$281k', 'Open opportunity value'],
        ['7', 'Follow-ups due'],
        ['3', 'Manufacturer issues'],
      ].map(([value, label]) => (
        <Card key={label}>
          <p className="text-3xl font-medium text-slate-900">{value}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-500">{label}</p>
        </Card>
      ))}
    </div>

    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.85fr]">
      <Card>
        <h2 className="text-2xl font-medium text-slate-900">Recent visit intelligence</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#0a192f] font-mono text-[10px] uppercase tracking-[0.06em] text-white">
              <tr>
                <th className="p-4">Site</th>
                <th className="p-4">Rep</th>
                <th className="p-4">Signal</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map((report) => {
                const site = mockDealers.find((dealer) => dealer.id === report.dealerId);
                const rep = mockSalesReps.find((salesRep) => salesRep.id === report.repId);
                return (
                  <tr key={report.id} className="border-b border-slate-100">
                    <td className="p-4 font-medium text-slate-900">{site?.name}</td>
                    <td className="p-4 text-slate-600">{rep?.name}</td>
                    <td className="p-4 text-slate-600">{report.preamble}</td>
                    <td className="p-4"><StatusPill tone={report.status === 'VALIDATED' ? 'green' : 'slate'}>{report.status}</StatusPill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <Card dark>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">Top opportunity</p>
        <h2 className="mt-3 text-2xl font-medium text-white">Brand X replacement package</h2>
        <p className="mt-4 text-sm leading-relaxed text-white/65">ABC Manufacturing has three aging units and a Q3 budget window. Northstar visibility is approved; internal timing confidence remains manager-only.</p>
      </Card>
    </div>
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {[
        ['Follow-ups endpoint', 'Tasks are filtered by role; reps only see tasks tied to their own call reports.'],
        ['Visit detail', 'Internal users can open the full report with transcript, observations, and tasks.'],
        ['RBAC checks', 'Reps cannot access manager dashboard, audit log, or other reps reports.'],
      ].map(([title, copy]) => (
        <Card key={title}>
          <p className="font-medium text-slate-900">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{copy}</p>
        </Card>
      ))}
    </div>
  </div>
);

export const DealersList = () => (
  <ManufacturerPortalView />
);

const ManufacturerPortalView = () => {
  const [dateRange, setDateRange] = useState('1 month');
  const [radius, setRadius] = useState('10 miles');
  const [stateFilter, setStateFilter] = useState('OH');
  const [zip, setZip] = useState('45402');
  const visibleObservations = observations.filter((item) => item.manufacturer.includes('ClearFlow') || item.manufacturer.includes('Northstar') || item.manufacturer.includes('Apex'));

  return (
    <div>
      <HeaderBlock
        eyebrow="Manufacturer portal"
        title="Scoped intelligence without internal leakage."
        copy="Manufacturer users only see approved observations mapped to their product lines. Internal notes, unrelated manufacturers, and full transcripts stay hidden."
      />
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
      <Card dark>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">Signed in as</p>
        <h2 className="mt-2 text-2xl font-medium text-white">Apex Industrial</h2>
        <p className="mt-4 text-sm leading-relaxed text-white/65">Portal filters include recent week, recent month, state, and 5/10/25 mile radius from retailer zip.</p>
        <p className="mt-4 border-l border-white/20 pl-4 text-xs leading-relaxed text-white/55">Manufacturer users cannot access /call-reports, full transcripts, internal-only notes, unrelated manufacturers, or audit/admin data.</p>
        <button className="cw-pill mt-6 bg-white px-5 py-3 font-mono text-[11px] uppercase tracking-[0.04em] text-[#0a192f]">
          <Download className="mr-2 inline h-4 w-4" /> Export CSV
        </button>
      </Card>
      <Card>
        <div className="mb-5 grid gap-3 md:grid-cols-4">
          <label className="grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Range</span>
            <select value={dateRange} onChange={(event) => setDateRange(event.target.value)} className="border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
              <option>1 week</option>
              <option>1 month</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Radius</span>
            <select value={radius} onChange={(event) => setRadius(event.target.value)} className="border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
              <option>5 miles</option>
              <option>10 miles</option>
              <option>25 miles</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Zip</span>
            <input value={zip} onChange={(event) => setZip(event.target.value)} className="border border-slate-200 bg-slate-50 px-3 py-2 text-sm" />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">State</span>
            <input value={stateFilter} onChange={(event) => setStateFilter(event.target.value)} className="border border-slate-200 bg-slate-50 px-3 py-2 text-sm" />
          </label>
        </div>
        <h2 className="text-2xl font-medium text-slate-900">Approved observations</h2>
        <p className="mt-2 text-sm text-slate-500">Showing {visibleObservations.length} records for {dateRange}, {radius} of {zip}, state {stateFilter}.</p>
        <div className="mt-5 space-y-4">
          {visibleObservations.map((item) => (
            <div key={item.type} className="border border-slate-200 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill tone={item.tag === 'Issue' ? 'amber' : 'green'}>{item.tag}</StatusPill>
                <StatusPill>{item.value}</StatusPill>
              </div>
              <h3 className="mt-3 font-medium text-slate-900">{item.manufacturer}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.visible}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="flex items-start gap-3">
          <Sparkles className="mt-1 h-5 w-5 text-[#0a192f]" />
          <div>
            <h2 className="text-2xl font-medium text-slate-900">Monthly AI summary</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">After a calendar month ends, the Python job calculates each manufacturer's summary once from that manufacturer's note rows and stores the summary text in MySQL for later portal display.</p>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
};

export const VendorsList = () => {
  const [tab, setTab] = useState<'accounts' | 'retailers' | 'manufacturers' | 'schema'>('accounts');
  const tabs = [
    ['accounts', 'Accounts'],
    ['retailers', 'Retailers'],
    ['manufacturers', 'Manufacturers'],
    ['schema', 'Schema'],
  ] as const;

  return (
    <div>
      <HeaderBlock
        eyebrow="Admin console"
        title="Build the account, retailer, and manufacturer system."
        copy="Internal admins manage verified accounts, retailer records, manufacturer records, access scope, billing ownership, and stored AI summaries."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`cw-pill border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.04em] ${tab === id ? 'border-[#0a192f] bg-[#0a192f] text-white' : 'border-slate-200 bg-white text-slate-600'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'accounts' && (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <div className="flex items-start gap-3">
              <MailCheck className="mt-1 h-5 w-5 text-[#0a192f]" />
              <div>
                <h2 className="text-2xl font-medium text-slate-900">Create verified accounts</h2>
                <p className="mt-2 text-sm text-slate-500">Email is the unique login. New users receive a verification link before the account is active.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ['admin@callwizard.com', 'InternalAdmin', 'Verified · primary billing owner'],
                ['rep@callwizard.com', 'Salesman', 'Verified · can create retailer records and call reports'],
                ['mfga@manufacturer.com', 'Manufacturer', 'Pending invite · scoped to Apex Industrial'],
              ].map(([email, role, status]) => (
                <div key={email} className="grid gap-2 border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1.2fr_0.7fr_1fr]">
                  <span className="font-medium text-slate-900">{email}</span>
                  <span className="text-sm text-slate-600">{role}</span>
                  <span className="text-sm text-slate-500">{status}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-2xl font-medium text-slate-900">Role matrix</h2>
            <div className="mt-5 space-y-3">
              {roles.map(([role, description]) => (
                <div key={role} className="flex items-start gap-3 border-b border-slate-100 pb-3">
                  <Users className="mt-1 h-4 w-4 text-[#0a192f]" />
                  <div>
                    <p className="font-medium text-slate-900">{role}</p>
                    <p className="text-sm text-slate-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'retailers' && (
        <div className="grid gap-5 lg:grid-cols-2">
          {retailerProfiles.map((retailer) => (
            <Card key={retailer.name}>
              <Store className="h-5 w-5 text-[#0a192f]" />
              <h2 className="mt-3 text-2xl font-medium text-slate-900">{retailer.name}</h2>
              <div className="mt-5 grid gap-3 text-sm">
                {[
                  ['Address', retailer.address],
                  ['GPS', retailer.gps],
                  ['Owner', retailer.owner],
                  ['Head of purchasing', retailer.buyer],
                  ['Revenue size', retailer.revenue],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-slate-100 pb-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">{label}</p>
                    <p className="mt-1 text-slate-700">{value}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'manufacturers' && (
        <div className="grid gap-5 lg:grid-cols-3">
          {manufacturerProfiles.map((manufacturer) => (
            <Card key={manufacturer.name}>
              <Building className="h-5 w-5 text-[#0a192f]" />
              <h2 className="mt-3 text-xl font-medium text-slate-900">{manufacturer.name}</h2>
              <div className="mt-5 grid gap-3 text-sm">
                {[
                  ['President', manufacturer.president],
                  ['Marketing VP', manufacturer.marketing],
                  ['Company size', manufacturer.revenue],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-slate-100 pb-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">{label}</p>
                    <p className="mt-1 text-slate-700">{value}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'schema' && (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-medium text-slate-900">Admin CRUD + premium logic</h2>
            <div className="mt-5 grid gap-3">
              {adminCoverage.map(([title, copy]) => (
                <div key={title} className="border-b border-slate-100 pb-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{copy}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card dark>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">Implementation target</p>
        <h2 className="mt-3 text-2xl font-medium text-white">Python + MySQL schema</h2>
        <div className="mt-5 grid gap-3">
          {[
            ['users', 'email login, role, verification token, active state'],
            ['retail_sites', 'address, derived GPS, owner, purchasing contact, revenue size'],
            ['manufacturers', 'president, marketing VP, contacts, revenue size'],
            ['call_reports', 'salesman, retailer, visit_date, general_notes'],
            ['manufacturer_notes', 'one row per report/manufacturer note'],
            ['monthly_ai_summaries', 'manufacturer/month summary text calculated once'],
          ].map(([table, purpose]) => (
            <div key={table} className="border-b border-white/10 pb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">{table}</p>
              <p className="mt-1 text-sm text-white/70">{purpose}</p>
            </div>
          ))}
        </div>
          </Card>
        </div>
      )}

      <div className="mt-5">
        <Card>
          <h2 className="text-2xl font-medium text-slate-900">Audit log</h2>
          <div className="mt-5 space-y-3">
            {[
              ['Admin', 'sent email verification', 'mfga@manufacturer.com'],
              ['Riley Rep', 'created retailer call report', 'Riverside Market'],
              ['AI Summary Job', 'generated monthly summary', 'Apex Industrial · April 2026'],
              ['Manufacturer Portal', 'filtered observations', 'ZIP 45402 · 10 miles'],
            ].map(([actor, action, target]) => (
              <div key={`${actor}-${action}`} className="grid gap-2 border-b border-slate-100 pb-3 text-sm md:grid-cols-[1fr_1fr_1fr]">
                <span className="font-medium text-slate-900">{actor}</span>
                <span className="text-slate-500">{action}</span>
                <span className="text-slate-500">{target}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export const PendingReports = () => (
  <div>
    <HeaderBlock
      eyebrow="Publishing queue"
      title="Approve manufacturer-safe records."
      copy="Only approved product-line observations are released into manufacturer portals and digest emails."
    />
    <Card dark>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-3xl font-medium text-white">1 report ready</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-white/45">Internal-only notes excluded</p>
        </div>
        <button className="cw-pill bg-white px-6 py-4 font-mono text-[11px] uppercase tracking-[0.04em] text-[#0a192f]">
          <Send className="mr-2 inline h-4 w-4" /> Publish queue
        </button>
      </div>
    </Card>
    <div className="mt-6 grid gap-4">
      {observations.slice(0, 2).map((item) => (
        <Card key={item.type}>
          <div className="flex flex-wrap items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <StatusPill tone="green">Approved</StatusPill>
            <StatusPill>{item.manufacturer}</StatusPill>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.visible}</p>
          <p className="mt-3 flex items-center gap-2 text-xs text-slate-500"><AlertTriangle className="h-4 w-4" /> Internal-only note removed before publication.</p>
        </Card>
      ))}
    </div>
  </div>
);
