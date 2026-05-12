import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Outlet, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';
import { ShieldAlert, LogIn, LineChart, FileText, Users, Building, Truck, Send, Mic as Microphone, MapPin, Sparkles, CheckCircle2, Radio, ChevronRight, LockKeyhole, CalendarDays, Store } from 'lucide-react';
import { Overview, Benefits, Download, Pricing, Demo } from './pages/MarketingPages';
import { Dashboard, CallReports, DealersList, VendorsList, RepsList, PendingReports } from './pages/PortalPages';
import { ClientLogin, Privacy, Terms } from './pages/UtilityPages';
import { db } from './lib/firebase';
import { doc, getDocFromServer } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { canAccessPortalRoute, defaultPortalRoute, getDemoUser, roleLabel, signOutDemoUser } from './lib/demoAuth';
import type { DemoUser } from './lib/demoAuth';

const sessionStorageFallback = new Map<string, string>();

const safeSessionStorage = {
  getItem(key: string) {
    try {
      return window.sessionStorage.getItem(key) ?? sessionStorageFallback.get(key) ?? null;
    } catch {
      return sessionStorageFallback.get(key) ?? null;
    }
  },
  setItem(key: string, value: string) {
    sessionStorageFallback.set(key, value);
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      // Storage can be unavailable in some embedded/private browser contexts.
    }
  },
};

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const MobileSignOut = ({ onSignOut }: { onSignOut: () => void }) => (
  <button
    type="button"
    onClick={onSignOut}
    className="rounded-full border border-white/15 bg-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.06em] text-white/70"
  >
    Sign out
  </button>
);

const MobileRolePanel = ({ user, onSignOut }: { user: DemoUser; onSignOut: () => void }) => {
  if (user.role === 'ManufacturerUser') {
    return (
      <div className="cw-mobile-sandbox lg:hidden min-h-screen w-screen max-w-[100vw] overflow-x-hidden bg-[#eef3f6] text-[#0f172a] pb-8">
        <header className="box-border bg-[#0a192f] px-5 py-6 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">Manufacturer Portal</p>
              <h1 className="mt-2 text-[2rem] leading-none font-medium">{user.companyName}</h1>
            </div>
            <MobileSignOut onSignOut={onSignOut} />
          </div>
          <p className="mt-3 text-sm text-white/60">Approved, scoped product-line intelligence only.</p>
        </header>
        <main className="cw-mobile-frame space-y-4 px-0 py-4">
          <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
            <div className="flex items-start gap-3">
              <LockKeyhole className="mt-1 h-5 w-5 text-emerald-700" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-emerald-700">RBAC enforced</p>
                <h2 className="mt-2 text-2xl font-medium">No internal leakage.</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">This account cannot open internal call reports, admin data, full transcripts, unrelated manufacturers, or internal-only notes.</p>
              </div>
            </div>
          </section>
          <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Portal filters</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {['1 week', '1 month', '5 mi', '25 mi', 'ZIP radius', 'State'].map((filter) => (
                <span key={filter} className="rounded-full bg-slate-100 px-3 py-2 text-center text-slate-600">{filter}</span>
              ))}
            </div>
          </section>
          {['Replacement Opportunity', 'Product Issue'].map((item, index) => (
            <article key={item} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">{item}</p>
              <h3 className="mt-2 text-lg font-medium">{index === 0 ? 'Apex heavy-duty pump replacement' : 'Approved service issue'}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{index === 0 ? 'Three aging units on-site; customer plans replacement in 6-9 months.' : 'Customer requested technical support on a recurring product issue.'}</p>
              <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">Approved</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{index === 0 ? 'Premium export' : 'Portal only'}</span>
              </div>
            </article>
          ))}
          <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Monthly AI summary</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Generated once after month-end, stored in MySQL, and shown on demand for this manufacturer only.</p>
          </section>
        </main>
      </div>
    );
  }

  if (user.role === 'InternalAdmin') {
    return (
      <div className="cw-mobile-sandbox lg:hidden min-h-screen w-screen max-w-[100vw] overflow-x-hidden bg-[#eef3f6] text-[#0f172a] pb-8">
        <header className="box-border bg-[#0a192f] px-5 py-6 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">Admin Console</p>
              <h1 className="mt-2 text-[2rem] leading-none font-medium">Control Center</h1>
            </div>
            <MobileSignOut onSignOut={onSignOut} />
          </div>
          <p className="mt-3 text-sm text-white/60">Users, retailers, manufacturers, access, digest, audit.</p>
        </header>
        <main className="cw-mobile-frame space-y-4 px-0 py-4">
          {[
            ['Salesman accounts', 'Admin creates salesman accounts and verifies email addresses by hyperlink.'],
            ['Retail sites', 'Store name, address, GPS from address, contacts, buyer, and revenue size.'],
            ['Manufacturers', 'President, marketing VP, contacts, revenue size, and manufacturer accounts.'],
            ['Python + MySQL', 'Server-side Python app stores roles, reports, summaries, and master data in SQL tables.'],
          ].map(([title, copy]) => (
            <section key={title} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p>
            </section>
          ))}
        </main>
      </div>
    );
  }

  if (user.role === 'SalesManager') {
    return (
      <div className="cw-mobile-sandbox lg:hidden min-h-screen w-screen max-w-[100vw] overflow-x-hidden bg-[#eef3f6] text-[#0f172a] pb-8">
        <header className="box-border bg-[#0a192f] px-5 py-6 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">Manager Dashboard</p>
              <h1 className="mt-2 text-[2rem] leading-none font-medium">Visit Intelligence</h1>
            </div>
            <MobileSignOut onSignOut={onSignOut} />
          </div>
          <p className="mt-3 text-sm text-white/60">Full internal view across reports and follow-ups.</p>
        </header>
        <main className="cw-mobile-frame grid gap-4 px-0 py-4">
          {[
            ['12', 'Visits this week'],
            ['$281k', 'Approved opportunity value'],
            ['7', 'Follow-ups due'],
            ['3', 'Manufacturer issues'],
          ].map(([value, label]) => (
            <section key={label} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <p className="text-3xl font-medium">{value}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-500">{label}</p>
            </section>
          ))}
        </main>
      </div>
    );
  }

  return <MobileRepWorkflow onSignOut={onSignOut} />;
};

const MobileRepWorkflow = ({ onSignOut }: { onSignOut: () => void }) => {
  const [selectedSite, setSelectedSite] = useState('riverside');
  const [mobileStep, setMobileStep] = useState<'site' | 'record' | 'review'>('site');
  const selectedSiteName = selectedSite === 'riverside' ? 'Riverside Market' : 'Northpoint Retail Center';
  const visitDate = new Date().toISOString().slice(0, 10);
  const mobileManufacturers = ['Apex Industrial', 'Brixton Controls', 'Stratos Filtration'];
  const stepIndex = mobileStep === 'site' ? 1 : mobileStep === 'record' ? 2 : 3;
  const stepTitle = mobileStep === 'site' ? 'Choose site' : mobileStep === 'record' ? 'Capture note' : 'Review output';
  const stepCopy = mobileStep === 'site'
    ? 'Confirm the retailer location and open one visit call report.'
    : mobileStep === 'record'
      ? 'Record short notes separately for each represented manufacturer.'
      : 'Approve manufacturer-visible records without exposing internal context.';

  return (
  <div className="cw-mobile-sandbox lg:hidden min-h-screen w-screen max-w-[100vw] overflow-x-hidden bg-[#eef3f6] text-[#0f172a] pb-32">
    <header className="box-border max-w-full bg-[#0a192f] px-5 pb-5 pt-5 text-white">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">Field Intelligence</p>
          <h1 className="mt-2 text-[2rem] leading-none font-medium tracking-normal">Call Wizard™</h1>
        </div>
        <MobileSignOut onSignOut={onSignOut} />
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.07] p-3">
        <div className="grid grid-cols-3 gap-2">
          {['Site', 'Record', 'Review'].map((label, index) => {
            const active = stepIndex === index + 1;
            const complete = stepIndex > index + 1;
            return (
              <div key={label} className="flex min-w-0 items-center justify-center gap-2">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium ${active ? 'border-white bg-white text-[#0a192f]' : complete ? 'border-emerald-300 bg-emerald-300 text-[#0a192f]' : 'border-white/20 text-white/45'}`}>
                  {complete ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                </div>
                <span className={`hidden min-[430px]:block truncate font-mono text-[9px] uppercase tracking-[0.04em] ${active ? 'text-white' : 'text-white/45'}`}>{label}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.08em] text-white/55">{stepTitle}</p>
      </div>
    </header>

    <main className="cw-mobile-frame box-border overflow-x-hidden py-4">
      <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Step {stepIndex} of 3</p>
            <h2 className="mt-2 max-w-full text-[2rem] leading-[1.04] font-medium tracking-normal text-[#0f172a] break-words">{stepTitle}</h2>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0a192f] text-white">
            {mobileStep === 'site' && <MapPin className="h-6 w-6" />}
            {mobileStep === 'record' && <Radio className="h-6 w-6" />}
            {mobileStep === 'review' && <Sparkles className="h-6 w-6" />}
          </div>
        </div>
        <p className="mt-4 max-w-full text-[0.98rem] leading-[1.5] font-light text-slate-600 break-words">{stepCopy}</p>
      </section>

      {mobileStep === 'site' && <div className="space-y-4">
        <div className="mt-4 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
          <div className="relative h-40 bg-[#dfe8ee]">
            <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(#cbd5e1_1px,transparent_1px),linear-gradient(90deg,#cbd5e1_1px,transparent_1px)] [background-size:34px_34px]" />
            <div className="absolute left-[20%] top-[42%] flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#0a192f] text-white shadow-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="absolute right-[18%] top-[22%] flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-lg">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-2 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur">
              Nearby sites detected
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedSite('riverside');
            setMobileStep('site');
          }}
          className={`box-border w-full max-w-full rounded-[24px] border bg-white px-5 py-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.05)] active:scale-[0.99] transition ${selectedSite === 'riverside' ? 'border-[#0a192f] ring-2 ring-[#0a192f]/10' : 'border-slate-200'}`}
        >
          <span className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className="block max-w-full text-[1.1rem] leading-tight font-medium tracking-normal text-[#0f172a] break-words">Riverside Market</span>
              <span className="block max-w-full mt-2 text-[0.94rem] leading-snug text-slate-500 break-words">420 Main St, Dayton, OH</span>
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </span>
          <span className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.04em] text-emerald-700">Detected nearby</span>
            <span className="text-sm font-medium text-slate-500">0.2 mi</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedSite('northpoint');
            setMobileStep('site');
          }}
          className={`box-border w-full max-w-full rounded-[24px] border bg-white px-5 py-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.05)] active:scale-[0.99] transition ${selectedSite === 'northpoint' ? 'border-[#0a192f] ring-2 ring-[#0a192f]/10' : 'border-slate-200'}`}
        >
          <span className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className="block max-w-full text-[1.05rem] leading-tight font-medium tracking-normal text-[#0f172a] break-words">Northpoint Retail Center</span>
              <span className="block max-w-full mt-2 text-[0.94rem] leading-snug text-slate-500 break-words">1180 Commerce Dr, Vandalia, OH</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
          </span>
          <span className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.04em] text-blue-700">New lead</span>
            <span className="text-sm font-medium text-slate-500">1.1 mi</span>
          </span>
        </button>
      </div>}

      {mobileStep === 'record' && (
        <div className="mt-4 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          <div className="bg-[#0a192f] px-5 py-5 text-white">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">Active visit</p>
            <p className="mt-1 text-lg font-medium">{selectedSiteName}</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-white/55"><CalendarDays className="h-4 w-4" /> Visit date recorded: {visitDate}</p>
          </div>
          <div className="px-6 py-7 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0a192f] text-white shadow-[0_16px_35px_rgba(10,25,47,0.25)]">
              <Store className="h-9 w-9" />
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-emerald-700">Manufacturer fields</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">Each represented manufacturer gets its own short text box with a speech-to-text action.</p>
            <div className="mt-6 space-y-3 text-left">
              {mobileManufacturers.map((manufacturer, index) => (
                <div key={manufacturer} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-900">{manufacturer}</p>
                    <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0a192f] shadow-sm">
                      <Microphone className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="min-h-16 rounded-xl border border-slate-200 bg-white p-3 text-sm leading-relaxed text-slate-500">
                    {index === 0 && 'Shelf facings are strong; buyer asked about spring promotion pricing.'}
                    {index === 1 && 'Competitor display is placed at aisle end cap near checkout.'}
                    {index === 2 && 'Store manager reported two damaged packages in filtration section.'}
                  </p>
                </div>
              ))}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">General notes</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">Overall store traffic was high; purchasing head requested follow-up next week.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {mobileStep === 'review' && (
        <div className="mt-4 space-y-4">
          <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <LockKeyhole className="mt-1 h-5 w-5 shrink-0 text-emerald-700" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-emerald-700">Visibility guardrail</p>
                <p className="mt-1 text-sm leading-relaxed text-emerald-900">Internal-only notes stay hidden from manufacturer portals.</p>
              </div>
            </div>
          </div>
          {['Northstar replacement opportunity', 'ClearFlow filtration issue', 'Apex competitor mention'].map((item, index) => (
            <div key={item} className="rounded-[24px] border border-slate-200 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Observation 0{index + 1}</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{item}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500">{index === 0 ? '91%' : index === 1 ? '84%' : '76%'}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">Manufacturer-visible notes are separated from internal-only context.</p>
            </div>
          ))}
        </div>
      )}
    </main>

    <div className="fixed inset-x-0 bottom-0 z-40 box-border max-w-[100vw] border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur lg:hidden">
      <button
        type="button"
        onClick={() => {
          if (mobileStep === 'site') setMobileStep('record');
          if (mobileStep === 'record') setMobileStep('review');
          if (mobileStep === 'review') setMobileStep('site');
        }}
        className="cw-pill mx-auto flex w-full max-w-[360px] items-center justify-center gap-2 bg-[#0a192f] px-8 py-5 text-center font-mono text-[0.82rem] uppercase tracking-[0.06em] text-white shadow-[0_16px_30px_rgba(10,25,47,0.22)] active:scale-[0.99] transition"
      >
        {mobileStep === 'site' && 'Start Site Visit'}
        {mobileStep === 'record' && 'Review Call Report'}
        {mobileStep === 'review' && 'Restart Demo'}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
  );
};

// STUBS
const MarketingLayout = () => {
  const location = useLocation();
  const navLink = (path: string, label: string) => (
    <Link to={path} className="cw-nav-link" data-active={location.pathname === path}>
      {label}
    </Link>
  );

  return (
    <div className="cw-shell min-h-screen flex flex-col overflow-x-hidden pt-[122px] md:pt-[72px] max-w-full">
      <header className="cw-topbar fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 md:py-0 min-h-[72px] flex flex-col md:flex-row justify-center md:justify-between gap-3 md:gap-0 md:items-center">
        <div className="w-full md:flex-1 flex justify-between md:justify-start items-center">
          <Link to="/" className="cw-brand text-xl">
            Call Wizard™
          </Link>
          <Link to="/login" className="cw-pill md:hidden inline-flex items-center justify-center px-4 py-2 bg-white text-[#0a192f] text-[11px] font-medium hover:bg-slate-100 transition-all">
            Login
          </Link>
        </div>
        
        <nav className="w-full md:w-auto flex md:flex flex-1 justify-start md:justify-center gap-2 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navLink('/', 'Overview')}
          {navLink('/benefits', 'Benefits')}
          {navLink('/pricing', 'Pricing')}
          {navLink('/download', 'Download')}
          {navLink('/demo', 'Demo')}
        </nav>

        <div className="hidden md:flex flex-1 justify-end">
          <Link to="/login" className="cw-pill inline-flex items-center justify-center px-5 py-3 bg-white text-[#0a192f] text-[11px] font-medium hover:bg-slate-100 transition-all md:w-auto">
            Client Login
          </Link>
        </div>
      </header>
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <footer className="cw-footer px-6 md:px-8 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12 mt-0 w-full">
        <div className="flex flex-col gap-2 relative top-2">
          <span className="text-xl font-medium text-white tracking-tight">Call Wizard™ Ecosystem</span>
          <span className="text-sm font-light text-white/55">Voice-powered field intelligence for manufacturing rep firms.</span>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4 right-0">
          <div className="flex flex-wrap gap-5 md:gap-6 text-[12px] font-mono uppercase tracking-[0.04em]">
            <Link to="/pricing" className="hover:text-slate-900 transition-colors">Pricing Options</Link>
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link to="/demo" className="hover:text-slate-900 transition-colors">Contact</Link>
          </div>
          <p className="text-sm font-light text-white/45">© 2026 Call Wizard™ Ecosystem. Built for reps, managers, manufacturers, and admins.</p>
        </div>
      </footer>
    </div>
  );
};

const PortalLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(getDemoUser);
  const allNavItems = [
    { name: 'Rep Workflow', path: '/app', roles: ['SalesRep', 'SalesManager', 'InternalAdmin'] },
    { name: 'AI Review', path: '/app/reports', roles: ['SalesRep', 'SalesManager', 'InternalAdmin'] },
    { name: 'Manager', path: '/app/reps', roles: ['SalesManager', 'InternalAdmin'] },
    { name: 'Manufacturer', path: '/app/sites', roles: ['ManufacturerUser', 'InternalAdmin'] },
    { name: 'Admin', path: '/app/manufacturers', roles: ['InternalAdmin'] },
  ];
  const navItems = allNavItems.filter((item) => user?.role && item.roles.includes(user.role));

  useEffect(() => {
    const refresh = () => setUser(getDemoUser());
    window.addEventListener('cw-demo-auth', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('cw-demo-auth', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  if (!user) return <Navigate to="/login" replace />;
  if (!canAccessPortalRoute(user.role, location.pathname)) return <Navigate to={defaultPortalRoute(user.role)} replace />;

  const handleSignOut = () => {
    signOutDemoUser();
    navigate('/login');
  };

  return (
    <>
    <MobileRolePanel user={user} onSignOut={handleSignOut} />
    <div className="cw-portal hidden lg:flex min-h-screen flex-col bg-[#f8fafb] overflow-x-hidden">
      <header className="bg-[#0a192f] text-white px-4 md:px-8 py-4 flex flex-col lg:flex-row justify-between gap-4 lg:items-center z-10 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 min-w-0">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">Quantos Software LLC</span>
            <h1 className="text-xl md:text-2xl font-medium tracking-normal">Call Wizard™ <span className="block sm:inline text-sm font-normal sm:ml-2 text-white/55">Field Intelligence Portal</span></h1>
          </div>
          <nav className="flex gap-4 md:gap-6 lg:ml-12 overflow-x-auto whitespace-nowrap pb-1">
            <Link to="/app" className="cw-pill text-[11px] tracking-[0.04em] uppercase text-white bg-white/10 border border-white/15 px-3 py-2">Operational Portal</Link>
            <Link to="/" className="cw-pill text-[11px] tracking-[0.04em] uppercase text-white/65 hover:text-white transition-colors px-3 py-2">Home Page</Link>
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between lg:justify-end gap-3 md:gap-6">
          <div className="text-left lg:text-right">
            <p className="text-xs font-medium text-white">Welcome, {user.firstName} {user.lastName}</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-white/45 mt-0.5">{roleLabel(user.role)} | {user.companyName}</p>
          </div>
          <button type="button" onClick={handleSignOut} className="cw-pill inline-flex w-full sm:w-auto justify-center px-5 py-3 bg-white text-[#0a192f] text-[11px] tracking-[0.04em] font-medium uppercase transition-all whitespace-nowrap">Sign Out</button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col lg:flex-row min-h-0">
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-slate-200 p-4 lg:p-8 flex flex-col lg:justify-between bg-white">
          <div className="space-y-6 lg:space-y-12">
            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.08em] font-normal text-slate-400 mb-3 lg:mb-6 border-b border-slate-100 pb-2">Main Menu</h2>
              <ul className="flex lg:block gap-3 lg:space-y-5 overflow-x-auto pb-2 lg:pb-0">
                {navItems.map((item) => {
                  const active = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
                  return (
                    <li key={item.path} className="flex-shrink-0 lg:flex-shrink">
                      <Link
                        to={item.path}
                        className={`cw-pill flex items-center gap-2 lg:gap-3 text-[11px] lg:text-xs tracking-[0.04em] transition-colors border px-3 py-2 ${active ? 'font-medium text-[#0a192f] uppercase border-slate-300 bg-slate-100' : 'font-normal text-slate-500 hover:text-slate-900 uppercase border-transparent hover:bg-slate-50'}`}
                      >
                        {active ? <span className="w-2 h-2 bg-[#0a192f] rounded-full flex-shrink-0"></span> : <span className="hidden lg:block w-2 h-2 border border-slate-300 rounded-full flex-shrink-0 transition-colors hover:border-slate-900"></span>}
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>

            <section className="hidden lg:block">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.08em] font-normal text-slate-400 mb-6 border-b border-slate-100 pb-2">Pending Actions</h2>
              <Link to="/app/reports/pending" className="cw-pill block text-center w-full bg-[#0a192f] text-white py-4 px-2 font-mono text-[10px] uppercase tracking-[0.06em] hover:bg-slate-800 transition-all">
                Publish Reports
              </Link>
              <p className="font-mono text-[10px] text-slate-400 mt-4 text-center uppercase tracking-[0.06em]">Validated for manufacturer visibility</p>
            </section>
          </div>
          <div className="hidden lg:block bg-[#f8fafb] p-6 border border-slate-200 mt-8">
            <h3 className="font-mono text-[10px] font-normal uppercase tracking-[0.08em] mb-3 text-slate-900">Call Wizard™ Value</h3>
            <p className="text-[11px] leading-relaxed text-slate-600">Capture, structure, and report field intelligence without leaking restricted data.</p>
          </div>
        </aside>
        
        <section className="flex-1 p-4 md:p-6 lg:p-12 bg-[#f8fafb] overflow-y-auto min-w-0">
          <Outlet />
        </section>
      </main>
    </div>
    </>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = safeSessionStorage.getItem('hasSeenSplash');
    const startsInLoggedInApp = window.location.hash.startsWith('#/app');
    const skipsSplash = new URLSearchParams(window.location.search).has('nosplash');
    return !hasSeenSplash && !startsInLoggedInApp && !skipsSplash;
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        safeSessionStorage.setItem('hasSeenSplash', 'true');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f8fafb]"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <h1 className="text-4xl md:text-5xl font-sans font-medium text-[#0a192f] tracking-tight">Call Wizard™</h1>
              <div className="w-48 h-[2px] bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="h-full bg-[#0a192f]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={showSplash ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        animate={!showSplash ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: showSplash ? 0.4 : 0, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-screen"
      >
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<ClientLogin />} />
            
            <Route path="/" element={<MarketingLayout />}>
              <Route index element={<Overview />} />
              <Route path="benefits" element={<Benefits />} />
              <Route path="download" element={<Download />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="demo" element={<Demo />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
            </Route>
            
            <Route path="/app" element={<PortalLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="reports" element={<CallReports />} />
              <Route path="reports/pending" element={<PendingReports />} />
              <Route path="reps" element={<RepsList />} />
              <Route path="sites" element={<DealersList />} />
              <Route path="manufacturers" element={<VendorsList />} />
            </Route>
          </Routes>
        </Router>
      </motion.div>
    </>
  );
}
