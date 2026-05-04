import { LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ClientLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafb] flex flex-col justify-center items-center px-4 py-20 relative">
      <div className="absolute top-8 left-8">
        <Link to="/" className="text-xl font-serif font-medium tracking-tight text-slate-900">
          Call Wizard™
        </Link>
      </div>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-serif text-slate-900 tracking-tight mb-2">Platform Access</h1>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">Authorized Personnel Only</p>
      </div>
      <div className="bg-white p-12 shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-slate-100 rounded-sm w-full max-w-md">
        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); navigate('/app'); }}>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest font-semibold text-slate-500">Business Email</label>
            <input 
              type="email" 
              required 
              className="bg-[#f8fafb] border border-slate-200 px-4 py-4 text-sm rounded-sm focus:outline-none focus:border-slate-400 transition-colors" 
              placeholder="admin@agency.com" 
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-widest font-semibold text-slate-500">Password</label>
              <a href="#" className="text-xs text-slate-400 font-medium hover:text-slate-900 transition-colors">Forgot?</a>
            </div>
            <input 
              type="password" 
              required 
              className="bg-[#f8fafb] border border-slate-200 px-4 py-4 text-sm rounded-sm focus:outline-none focus:border-slate-400 transition-colors" 
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center mt-2">
            <label className="flex items-center gap-3 text-sm text-slate-600 font-light cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f]" /> 
              Stay signed in
            </label>
          </div>
          <button type="submit" className="mt-4 px-8 py-4 bg-[#0a192f] text-white text-xs font-semibold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg rounded-sm w-full flex justify-center items-center gap-3">
            <LogIn className="w-4 h-4" /> Authenticate
          </button>
        </form>
      </div>
      <Link to="/" className="mt-12 text-xs text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest flex items-center gap-2">
        &larr; Return to Central Hub
      </Link>
    </div>
  );
};

export const Privacy = () => (
  <div className="w-full bg-[#f8fafb] min-h-screen pb-32">
    <section className="px-8 pt-28 pb-12 border-b border-slate-200 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute grid grid-cols-[1fr_1px_1fr_1px_1fr] -top-12 -bottom-12 w-full">
            <div className="bg-transparent"></div>
            <div className="bg-slate-900"></div>
            <div className="bg-transparent"></div>
            <div className="bg-slate-900"></div>
            <div className="bg-transparent"></div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">Zero-Sell Privacy Architecture.</h1>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-10">Effective Date: October 2025 // Data Classification: Tier I</p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-8 py-20">
      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Server Operations" className="w-full h-64 object-cover rounded-sm shadow-sm mb-16 grayscale opacity-80" referrerPolicy="no-referrer" />
      
      <div className="text-slate-600 font-light leading-relaxed space-y-12">
        <p className="text-xl">At Call Wizard™ (a subsidiary of Quantos Development), we prioritize the protection of your agency's proprietary field data over all other operational metrics. This Privacy Policy outlines exactly how we handle the information routed through our infrastructure, specifically engineered to defend the intellectual advantage of elite commercial rep agencies operating within the Manufacturing Sales Trade sectors.</p>
        
        <div>
          <h2 className="text-2xl font-serif text-slate-900 mb-4 pb-2 border-b border-slate-200">1. Data Collection Constraints & Routing Specifications</h2>
          <p className="mb-4">We automatically collect application usage data required strictly for the operation of the Call Wizard™ routing engine. This includes, but is not limited to, site reports, customer geographic coordinates, manufacturer mapping hierarchies, and internal sales representative activity logs necessary for administrative oversight and algorithmic distribution.</p>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Geo-Spatial Tracking:</strong> Captured strictly during active session logging for territory verification.</li>
            <li><strong>Principal Identification:</strong> Used exclusively for logic-gating the correct email distributions.</li>
            <li><strong>Device Endpoints:</strong> Captured for internal MDM (Mobile Device Management) security assertions.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif text-slate-900 mb-4 pb-2 border-b border-slate-200">2. The "Zero-Sell" Ironclad Guarantee</h2>
          <p className="mb-4">Unlike generic software-as-a-service platforms, we do not aggregate, anonymize, distribute, or sell your field intelligence to third-party data brokers, competing agencies, or external entities whatsoever.</p>
          <p>Your intelligence remains your exclusive competitive edge. The sole individuals who intercept your call reports are the intended manufacturer principals and your internal administrators matching the precise internal organizational mapping established during your Phase I rollout.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start my-16 bg-white p-8 border border-slate-100 rounded-sm">
           <img src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80" alt="Security Lockdown" className="w-full md:w-1/3 rounded-sm object-cover h-48" referrerPolicy="no-referrer" />
           <div>
             <h3 className="font-serif text-xl text-slate-900 mb-2">SOC-II Type 2 Certified Cold Storage</h3>
             <p className="text-sm">If your subscription lapses or you enact the "Total Erasure" clause, your historic database is systematically scrubbed from all hot nodes and permanently encrypted in offline cold storage for 60 days before terminal deletion.</p>
           </div>
        </div>

        <div>
           <h2 className="text-2xl font-serif text-slate-900 mb-4 pb-2 border-b border-slate-200">3. Cryptographic Security Protocols</h2>
           <p className="mb-4">Data at rest and in transit is secured using enterprise-grade AES-256 encryption algorithms. We conform to strict SOC2 and ISO 27001 digital compliance constraints to ensure your field reports are impenetrable, even when accessed on unsecured mobile networks from remote customer environments.</p>
           <p>In the event of a theoretical network intrusion, our distributed ledger architecture prevents unauthorized schema dumps. You retain full auditing rights over system logs pertaining to your proprietary tenant slice.</p>
        </div>
      </div>
    </section>
  </div>
);

export const Terms = () => (
  <div className="w-full bg-[#f8fafb] min-h-screen pb-32">
    <section className="px-8 pt-28 pb-12 border-b border-slate-200 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">Master Subscriptions & Legal Terms.</h1>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-10">Effective Date: October 2025 // Legal Jurisdiction: Quantos Development</p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-8 py-20">
      
      <div className="text-slate-600 font-light leading-relaxed space-y-12">
        <p className="text-xl">By configuring an instance, logging in to the environment, or deploying Call Wizard™ to your field agency force, your organization explicitly agrees to the resulting stipulations concerning operational boundaries, licensing rights, technical limitations, and strict software liabilities.</p>
        
        <div>
          <h2 className="text-2xl font-serif text-slate-900 mb-4 pb-2 border-b border-slate-200">Section I: Licensing Subscriptions and Seat Control</h2>
          <p className="mb-4">Call Wizard™ is licensed strictly on a per-user, per-month foundational basis. "Users" encompass any field sales representative, internal administrator, regional director, or manufacturer principal who requires authenticated portal entry or algorithmic data distribution.</p>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Credential Isolation:</strong> Account sharing is strictly prohibited and actively monitored via behavioral hardware tracking.</li>
            <li><strong>Subscription Lapses:</strong> Failure to remit payment within a 15-day grace period results in a hard lock out of the application interface, halting all incoming field reporting until remedied.</li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center my-16 bg-[#0a192f] text-white p-8 rounded-sm shadow-xl">
           <div>
             <h3 className="font-serif text-2xl text-white mb-2">The Liability Firewall</h3>
             <p className="text-sm font-light text-slate-300">Quantos Development engineered Call Wizard™ for extreme field durability. However, hardware destruction, signal degradation, and acts of nature on external commercial lots fall distinctly outside our operational liability. Software is provided "as-is" without promises of total global uptime.</p>
           </div>
           <div className="w-full md:w-64 flex-shrink-0">
             <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80" alt="Legal Shield" className="rounded border border-slate-700 opacity-80 mix-blend-luminosity" referrerPolicy="no-referrer" />
           </div>
        </div>

        <div>
           <h2 className="text-2xl font-serif text-slate-900 mb-4 pb-2 border-b border-slate-200">Section II: Interrupted Service & Signal Logistics</h2>
           <p className="mb-4">While we aggressively uphold a 99.9% uptime target across our central routing engines, Quantos Development is fundamentally not legally or financially liable for delayed distributions arising from local carrier signal failure, ISP blockages, or hardware bricking at the deployment level.</p>
           <p>Loss of sales commission due to report routing failure is exclusively absorbed by the agency. We advise all field operatives to perform forced manual sync protocols at day's end in WIFI-enabled environments.</p>
        </div>

        <div>
          <h2 className="text-2xl font-serif text-slate-900 mb-4 pb-2 border-b border-slate-200">Section III: Intellectual Property Demarcation</h2>
          <p>All core proprietary algorithms, aesthetic system architectures, workflow hierarchies, and bespoke CRM alterations deployed under our "Enterprise Implementation Contracts" remain the irrevocable intellectual property of Quantos Development.</p>
          <p className="mt-4">Conversely, your agency unequivocally retains 100% legal ownership, mobility, and extraction rights pertaining to any string of CRM notes, historic activity logs, and customer relationships transmitted over our pipeline. We are strictly a conduit, not a data broker.</p>
        </div>
      </div>
    </section>
  </div>
);
