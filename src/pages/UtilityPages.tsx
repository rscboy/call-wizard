import { useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, LogIn, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { defaultPortalRoute, demoAccounts, roleLabel, signInDemoUser } from '../lib/demoAuth';

export const ClientLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@callwizard.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const user = signInDemoUser(email, password);
    if (!user) {
      setError('Use one of the demo accounts below or enter matching credentials.');
      return;
    }
    setError('');
    navigate(defaultPortalRoute(user.role));
  };

  const quickFill = (account: typeof demoAccounts[number]) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  return (
    <div className="cw-login-shell min-h-screen bg-[#f8fafb] flex flex-col justify-center items-center px-4 py-10 md:py-20 relative overflow-x-hidden">
      <div className="cw-login-frame absolute top-8 px-4">
        <Link to="/" className="text-xl font-sans font-medium tracking-tight text-slate-900">
          Call Wizard™
        </Link>
      </div>
      <div className="cw-login-frame mb-8 mt-16 box-border px-2 text-center md:max-w-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">Authenticated product demo</p>
        <h1 className="mt-3 text-3xl font-sans font-medium text-slate-900 tracking-normal mb-2 md:text-4xl">Platform Access</h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-500">Sign in as a salesman, admin, or manufacturer user. Each account opens only the tools needed for that role.</p>
      </div>
      <div className="cw-login-frame grid box-border gap-5 md:max-w-5xl lg:grid-cols-[0.9fr_1.1fr]">
      <div className="box-border w-full bg-white p-6 md:p-8 shadow-[0_18px_55px_rgba(15,23,42,0.08)] border border-slate-200 rounded-[28px]">
        <form className="flex flex-col gap-5" onSubmit={submit}>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-500">Business Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="bg-[#f8fafb] border border-slate-200 px-4 py-4 text-sm rounded-2xl focus:outline-none focus:border-[#0a192f] transition-colors" 
              placeholder="admin@repfirm.com" 
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-between items-center">
              <label className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-500">Password</label>
              <span className="text-xs text-slate-400 font-medium">Demo only</span>
            </div>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="bg-[#f8fafb] border border-slate-200 px-4 py-4 text-sm rounded-2xl focus:outline-none focus:border-[#0a192f] transition-colors" 
              placeholder="••••••••"
            />
          </div>
          {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
          <div className="flex items-center mt-2">
            <label className="flex items-center gap-3 text-sm text-slate-600 font-light cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f]" /> 
              Stay signed in
            </label>
          </div>
          <button type="submit" className="cw-pill mt-2 px-8 py-4 bg-[#0a192f] text-white text-xs font-semibold uppercase tracking-[0.06em] hover:bg-slate-800 transition-colors shadow-lg w-full flex justify-center items-center gap-3">
            <LogIn className="w-4 h-4" /> Authenticate
          </button>
        </form>
      </div>
      <div className="box-border w-full rounded-[28px] border border-slate-200 bg-white p-6 md:p-8 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0a192f] text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-slate-900">Demo accounts</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">Admin, manager, rep, and manufacturer roles use the same credentials seeded in the product code.</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {demoAccounts.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => quickFill(account)}
              className={`rounded-2xl border p-4 text-left transition hover:border-[#0a192f] hover:bg-slate-50 ${email === account.email ? 'border-[#0a192f] bg-slate-50' : 'border-slate-200'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900">{account.firstName} {account.lastName}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">{account.email}</p>
                </div>
                {email === account.email && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />}
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">{roleLabel(account.role)} · {account.password}</p>
            </button>
          ))}
        </div>
      </div>
      </div>
      <Link to="/" className="mt-12 text-center text-xs text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest flex items-center gap-2">
        &larr; Return to Field Intelligence Overview
      </Link>
    </div>
  );
};

export const Privacy = () => (
  <div className="w-full bg-[#f8fafb] min-h-screen pb-32">
    <section className="px-6 pt-20 pb-12 md:px-8 md:pt-28 border-b border-slate-200 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute grid grid-cols-[1fr_1px_1fr_1px_1fr] -top-12 -bottom-12 w-full">
            <div className="bg-transparent"></div>
            <div className="bg-slate-900"></div>
            <div className="bg-transparent"></div>
            <div className="bg-slate-900"></div>
            <div className="bg-transparent"></div>
        </div>
      </div>
      <div className="max-w-[342px] sm:max-w-2xl md:max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-sans font-normal text-slate-900 mb-6 leading-tight tracking-normal">Zero-Sell Privacy Architecture.</h1>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-10">Effective Date: October 2025 // Data Classification: Tier I</p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6 py-14 md:px-8 md:py-20">
      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Server Operations" className="w-full h-48 md:h-64 object-cover rounded-sm shadow-sm mb-12 md:mb-16 grayscale opacity-80" referrerPolicy="no-referrer" />
      
      <div className="text-slate-600 font-light leading-relaxed space-y-12">
        <p className="text-lg md:text-xl">At Call Wizard™ (a subsidiary of Quantos Development), we prioritize the protection of your rep firm's proprietary field intelligence. The platform is designed so full site visit records remain internal while manufacturers receive only approved comments, opportunities, issues, and competitive mentions tied to their product lines.</p>
        
        <div>
          <h2 className="text-2xl font-sans font-normal text-slate-900 mb-4 pb-2 border-b border-slate-200">1. Data Collection Constraints & Routing Specifications</h2>
          <p className="mb-4">We collect only the data required to operate the field intelligence workflow. This includes customer and site records, visit transcripts, structured summaries, product-line tags, manufacturer mappings, follow-up tasks, and audit events required for role-based access.</p>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Site Location:</strong> Used to help reps select nearby customer sites and reduce duplicate site creation.</li>
            <li><strong>Product-Line Ownership:</strong> Used to determine which manufacturer can see each approved record.</li>
            <li><strong>Audit Events:</strong> Used to verify review, submission, and permission decisions.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif text-slate-900 mb-4 pb-2 border-b border-slate-200">2. The "Zero-Sell" Ironclad Guarantee</h2>
          <p className="mb-4">Unlike generic software-as-a-service platforms, we do not sell your field intelligence to data brokers, competing agencies, or unrelated third parties.</p>
          <p>Your customer, site, and product-line intelligence remains your operating asset. Manufacturer access is limited by configured product-line ownership, visibility status, and role permissions.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start my-16 bg-white p-8 border border-slate-100 rounded-sm">
           <img src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80" alt="Security Lockdown" className="w-full md:w-1/3 rounded-sm object-cover h-48" referrerPolicy="no-referrer" />
           <div>
             <h3 className="font-sans text-xl text-slate-900 mb-2">Permissioning by Design</h3>
             <p className="text-sm">Product-line records carry manufacturer ownership and visibility status so restricted notes, unrelated manufacturers, full transcripts, and internal-only comments stay out of manufacturer views.</p>
           </div>
        </div>

        <div>
           <h2 className="text-2xl font-sans font-normal text-slate-900 mb-4 pb-2 border-b border-slate-200">3. Cryptographic Security Protocols</h2>
           <p className="mb-4">Data at rest and in transit should be secured using modern encryption, tenant isolation, and role-based authorization. The product requirements also call for audit logs so administrators can review user activity and permission decisions.</p>
           <p>Manufacturer users cannot access another manufacturer's data, internal-only notes, full unfiltered transcripts, margin or commission information, or product lines they do not own.</p>
        </div>
      </div>
    </section>
  </div>
);

export const Terms = () => (
  <div className="w-full bg-[#f8fafb] min-h-screen pb-32">
    <section className="px-6 pt-20 pb-12 md:px-8 md:pt-28 border-b border-slate-200 bg-white relative overflow-hidden">
      <div className="max-w-[342px] sm:max-w-2xl md:max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-sans font-normal text-slate-900 mb-6 leading-tight tracking-normal">Master Subscriptions & Legal Terms.</h1>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-10">Effective Date: October 2025 // Legal Jurisdiction: Quantos Development</p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6 py-14 md:px-8 md:py-20">
      
      <div className="text-slate-600 font-light leading-relaxed space-y-12">
        <p className="text-lg md:text-xl">By configuring an instance, logging in, or deploying Call Wizard™ to a field rep team, your organization agrees that the platform is intended for mobile voice capture, structured product-line reporting, and permission-controlled manufacturer visibility.</p>
        
        <div>
          <h2 className="text-2xl font-sans font-normal text-slate-900 mb-4 pb-2 border-b border-slate-200">Section I: Licensing Subscriptions and Seat Control</h2>
          <p className="mb-4">Call Wizard™ may be licensed by user, team, or manufacturer reporting access. "Users" include field sales representatives, managers, administrators, and manufacturer users who require authenticated portal access.</p>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Credential Isolation:</strong> Account sharing is prohibited because each role controls different customer, site, product-line, and manufacturer permissions.</li>
            <li><strong>Access Changes:</strong> Deactivated users and expired manufacturer access should no longer be able to view protected reports.</li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center my-16 bg-[#0a192f] text-white p-8 rounded-sm shadow-xl">
           <div>
             <h3 className="font-sans text-2xl text-white mb-2">Focused Product Boundary</h3>
             <p className="text-sm font-light text-slate-300">Call Wizard is not positioned as a full CRM, quoting system, ERP integration, commission engine, or inventory platform. The first release stays focused on capture, structure, review, storage, and reporting.</p>
           </div>
           <div className="w-full md:w-64 flex-shrink-0">
             <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80" alt="Legal Shield" className="rounded border border-slate-700 opacity-80 mix-blend-luminosity" referrerPolicy="no-referrer" />
           </div>
        </div>

        <div>
           <h2 className="text-2xl font-sans font-normal text-slate-900 mb-4 pb-2 border-b border-slate-200">Section II: Interrupted Service & Signal Logistics</h2>
           <p className="mb-4">The product should handle failed or interrupted recordings gracefully and provide clear confirmation when voice capture is complete. Offline-first behavior and deeper workflow automation are deferred unless included in a later implementation phase.</p>
           <p>Users remain responsible for reviewing AI-generated summaries, product-line tags, internal-only notes, and follow-up tasks before submitting final reports.</p>
        </div>

        <div>
          <h2 className="text-2xl font-sans font-normal text-slate-900 mb-4 pb-2 border-b border-slate-200">Section III: Intellectual Property Demarcation</h2>
          <p>All core platform design, workflow logic, software code, and implementation materials remain the intellectual property of Quantos Development unless otherwise agreed in writing.</p>
          <p className="mt-4">Your rep firm retains ownership of customer relationships, site records, transcripts, call reports, product-line intelligence, and follow-up data created through the platform.</p>
        </div>
      </div>
    </section>
  </div>
);
