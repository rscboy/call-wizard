import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from './lib/utils';
import { ShieldAlert, LogIn, LineChart, FileText, Users, Building, Truck, Send, Menu, X } from 'lucide-react';
import { Overview, Benefits, Download, Pricing, Demo } from './pages/MarketingPages';
import { Dashboard, CallReports, CustomersList, ManufacturersList, RepsList, PendingReports } from './pages/PortalPages';
import { ClientLogin, Privacy, Terms } from './pages/UtilityPages';
import { db } from './lib/firebase';
import { doc, getDocFromServer } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';

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

// STUBS
const getHasSeenSplash = () => {
  try {
    return window.sessionStorage.getItem('hasSeenSplash') === 'true';
  } catch {
    return false;
  }
};

const setHasSeenSplash = () => {
  try {
    window.sessionStorage.setItem('hasSeenSplash', 'true');
  } catch {
    // Storage may be unavailable in some mobile/private browsing contexts.
  }
};

const isActiveRoute = (pathname: string, path: string) => pathname === path;

const MarketingLayout = () => {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const marketingNavItems = [
    { name: 'Overview', path: '/' },
    { name: 'Benefits', path: '/benefits' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Download', path: '/download' },
  ];

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafb] overflow-x-hidden pt-[72px]">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 h-[72px] flex justify-between items-center bg-[#f8fafb] border-none shadow-sm">
        <div className="flex-1 min-w-0 flex justify-start items-center">
          <Link to="/" className="truncate text-xl font-serif font-medium tracking-tight text-slate-900">
            Call Wizard™
          </Link>
        </div>
        
        <nav className="hidden md:flex flex-1 justify-center gap-8" aria-label="Primary navigation">
          {marketingNavItems.map((item) => (
            <Link key={item.path} to={item.path} className={`text-sm font-medium pb-1 ${isActiveRoute(location.pathname, item.path) ? 'text-slate-900 border-b border-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>{item.name}</Link>
          ))}
        </nav>

        <div className="flex-1 shrink-0 flex justify-end items-center gap-2 md:gap-4">
          <Link to="/login" className="hidden sm:inline-flex items-center justify-center px-6 py-2 bg-transparent border border-slate-300 text-slate-800 text-sm font-medium hover:bg-slate-50 transition-all rounded-sm md:w-auto">
            Client Login
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center gap-2 rounded-full border-2 border-slate-900 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-900 shadow-[3px_3px_0_0_rgba(15,23,42,1)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            aria-controls="mobile-marketing-nav"
            aria-expanded={isMobileNavOpen}
            onClick={() => setIsMobileNavOpen((open) => !open)}
          >
            {isMobileNavOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            Menu
          </button>
        </div>

        {isMobileNavOpen && (
          <nav
            id="mobile-marketing-nav"
            aria-label="Mobile primary navigation"
            className="fixed left-4 right-4 top-[82px] z-[60] md:hidden rounded-2xl border-2 border-slate-900 bg-white p-3 shadow-[6px_6px_0_0_rgba(15,23,42,1)]"
          >
            <div className="grid gap-2">
              {marketingNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${isActiveRoute(location.pathname, item.path) ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/login" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-900 sm:hidden">
                Client Login
              </Link>
            </div>
          </nav>
        )}
      </header>
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <footer className="bg-[#f8fafb] px-8 py-16 flex flex-col md:flex-row justify-between items-end gap-12 border-t border-slate-200 mt-0 w-full text-slate-500">
        <div className="flex flex-col gap-2 relative top-2">
          <span className="text-xl font-serif font-medium text-slate-900 tracking-tight">Call Wizard™ Ecosystem</span>
          <span className="text-sm font-light text-slate-400">Created by Quantos Development.</span>
        </div>
        <div className="flex flex-col items-end gap-4 right-0">
          <div className="flex gap-6 text-[15px] font-light">
            <Link to="/pricing" className="hover:text-slate-900 transition-colors">Pricing Options</Link>
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          </div>
          <p className="text-sm font-light text-slate-400">© 2026 Call Wizard™ Ecosystem. All manufacturing sales rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const PortalLayout = () => {
  const location = useLocation();
  const [isPortalNavOpen, setIsPortalNavOpen] = useState(false);
  const navItems = [
    { name: 'Dashboard', path: '/app' },
    { name: 'All Call Reports', path: '/app/reports' },
    { name: 'Pending Reports', path: '/app/reports/pending' },
    { name: 'Show Sales Rep List', path: '/app/reps' },
    { name: 'Show Customer List', path: '/app/customers' },
    { name: 'Show Manufacturer List', path: '/app/manufacturers' },
  ];

  useEffect(() => {
    setIsPortalNavOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col bg-white overflow-hidden">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b-2 border-slate-900 bg-white px-4 py-4 md:px-8">
        <div className="flex min-w-0 items-center gap-3 md:gap-8">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Quantos Software LLC</span>
            <h1 className="text-xl md:text-2xl font-serif font-black italic tracking-tight truncate">DIRT <span className="hidden sm:inline text-sm font-sans font-normal not-italic ml-2 opacity-60">— DRG Information Reporting Tool</span></h1>
          </div>
          <nav className="hidden lg:flex gap-6 ml-12" aria-label="Portal top navigation">
            <Link to="/app" className="text-[11px] tracking-widest font-black uppercase text-slate-900 border-b-2 border-slate-900 pb-1">Operational Portal</Link>
            <Link to="/" className="text-[11px] tracking-widest font-black uppercase text-slate-400 hover:text-slate-900 transition-colors">Call Wizard™ Info</Link>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-3 md:gap-6">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-black">Welcome, Admin</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400 mt-0.5">System Administrator | DRG</p>
          </div>
          <button
            type="button"
            className="lg:hidden inline-flex items-center gap-2 border-2 border-slate-900 bg-white px-4 py-2 text-[10px] tracking-widest font-black uppercase shadow-[3px_3px_0_0_rgba(15,23,42,1)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            aria-controls="mobile-portal-nav"
            aria-expanded={isPortalNavOpen}
            onClick={() => setIsPortalNavOpen((open) => !open)}
          >
            {isPortalNavOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            Menu
          </button>
          <Link to="/" className="hidden sm:inline-flex px-4 py-2 border border-slate-200 hover:border-slate-900 text-[10px] tracking-widest font-black uppercase transition-all">Logout</Link>
        </div>
      </header>
      
      {isPortalNavOpen && (
        <nav
          id="mobile-portal-nav"
          aria-label="Mobile portal navigation"
          className="relative z-40 max-h-[calc(100dvh-76px)] overflow-y-auto border-b-2 border-slate-900 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.12)] lg:hidden"
        >
          <div className="grid gap-2">
            {navItems.map((item) => {
              const active = isActiveRoute(location.pathname, item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 border-2 px-4 py-3 text-[11px] font-black uppercase tracking-widest ${active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}
                >
                  {active ? <span className="h-2 w-2 bg-blue-300" aria-hidden="true" /> : <span className="h-2 w-2 border border-slate-400" aria-hidden="true" />}
                  {item.name}
                </Link>
              );
            })}
            <Link to="/" className="border-2 border-slate-200 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-700 sm:hidden">
              Logout
            </Link>
          </div>
        </nav>
      )}

      <main className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden lg:flex w-64 border-r-2 border-slate-900 p-8 flex-col justify-between overflow-y-auto bg-white">
          <div className="space-y-12">
            <section>
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-6 border-b-2 border-slate-100 pb-2">Main Menu</h2>
              <ul className="space-y-5">
                {navItems.map((item) => {
                  const active = isActiveRoute(location.pathname, item.path);
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 text-xs tracking-widest transition-colors ${active ? 'font-black text-slate-900 uppercase' : 'font-medium text-slate-500 hover:text-slate-900 uppercase'}`}
                      >
                        {active ? <span className="w-2 h-2 bg-blue-800 flex-shrink-0"></span> : <span className="w-2 h-2 border border-slate-300 flex-shrink-0 group-hover:block transition-colors hover:border-slate-900"></span>}
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>

            <section>
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-6 border-b-2 border-slate-100 pb-2">Pending Actions</h2>
              <Link to="/app/reports/pending" className="block text-center w-full bg-white border-2 border-slate-900 text-slate-900 py-4 px-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                Send Reports
              </Link>
              <p className="text-[10px] text-slate-400 mt-4 text-center font-bold uppercase tracking-widest">Waiting for distribution</p>
            </section>
          </div>
          <div className="bg-slate-50 p-6 border-t-2 border-slate-900 border-l-2 border-r-2 border-b-2 mt-8 shadow-[4px_4px_0_0_rgba(15,23,42,1)]">
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-3 text-slate-900">Call Wizard™ Value</h3>
            <p className="text-[11px] leading-relaxed font-serif text-slate-600 italic">"Software that removes excuses... Real-time intelligence for product management."</p>
          </div>
        </aside>
        
        <section className="min-w-0 flex-1 overflow-y-auto bg-slate-50 p-5 md:p-12">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(() => !getHasSeenSplash());

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        setHasSeenSplash();
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
              <h1 className="text-4xl md:text-5xl font-serif text-[#0a192f] tracking-tight">Call Wizard™</h1>
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
              <Route path="customers" element={<CustomersList />} />
              <Route path="manufacturers" element={<ManufacturersList />} />
            </Route>
          </Routes>
        </Router>
      </motion.div>
    </>
  );
}
