import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Download as DownloadIcon, HelpCircle, FileText, PhoneCall, Truck, ClipboardList, Wrench, Search, BarChart2, ShieldCheck, BarChart, Server, Lock, Zap, ChevronRight, Activity, Database, GitMerge, Settings, Compass, Layers, Terminal, ShieldAlert, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';

const AnimatedNumber = ({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

export const Overview = () => (
  <div className="w-full bg-[#f8fafb]">
    {/* Hero Gradient Block */}
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-32 overflow-hidden bg-gradient-to-b from-[#2A3B4C] via-[#6B7D8D] to-[#f8fafb]">
      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px]" 
      />
      <motion.div 
        animate={{ y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
        className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[120px]" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-8"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-[4.5rem] font-serif text-white tracking-tight leading-[1.05] mb-8"
        >
          Sync Your Sales Floor with Your Office. Instantly.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl font-sans font-light text-slate-100 mb-14 max-w-2xl mx-auto leading-relaxed"
        >
          Voice-powered field intelligence and product-line reporting for manufacturing sales rep firms. Turn customer site visits into structured data without the paperwork.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
        >
          <Link to="/app" className="group px-8 py-4 bg-[#0f172a] text-white text-sm font-medium hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all rounded-sm shadow-sm md:w-auto w-full inline-flex justify-center items-center gap-2">
            Request Demo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/benefits" className="px-8 py-4 bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all rounded-sm backdrop-blur-sm md:w-auto w-full inline-flex justify-center items-center">
            View Specs
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-3 gap-8 border-t border-slate-900/10 pt-10"
        >
          <div>
            <div className="text-3xl font-serif text-slate-900 mb-1"><AnimatedNumber value={85} suffix="%" /></div>
            <div className="text-[10px] text-slate-900 font-black uppercase tracking-[0.1em]">Time Reclaimed</div>
          </div>
          <div className="border-l border-slate-900/10 pl-8">
            <div className="text-3xl font-serif text-slate-900 mb-1"><AnimatedNumber value={2} prefix="+" suffix="M" /></div>
            <div className="text-[10px] text-slate-900 font-black uppercase tracking-[0.1em]">Reports Synced</div>
          </div>
          <div className="border-l border-slate-900/10 pl-8">
            <div className="text-3xl font-serif text-slate-900 mb-1"><AnimatedNumber value={100} suffix="%" /></div>
            <div className="text-[10px] text-slate-900 font-black uppercase tracking-[0.1em]">Data Accuracy</div>
          </div>
        </motion.div>
      </motion.div>
    </section>

    {/* Section 2: Empower Your Sales Team */}
    <section className="px-8 py-24 bg-[#f8fafb]">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }
        }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-5xl md:text-[3.5rem] font-serif text-slate-900 mb-16 leading-[1.1] tracking-tight">
          Empower Your Sales Team.<br />Close More Deals.
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mt-20">
          <div className="flex flex-col gap-12">
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                For manufacturing sales rep firms, the gap between field activity and office reporting has been filled with manual delays. Call Wizard™ bridges this chasm with automated, real-time intelligence on customer visits and field sales, turning every customer interaction into actionable data.
              </p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="border-l border-slate-300 pl-10 py-2">
              <p className="text-2xl font-serif italic text-slate-800">
                "Reliability is the ultimate luxury."
              </p>
            </motion.div>
          </div>
          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80" alt="Dashboard Analytics" className="rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.06)]" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </motion.div>
    </section>

    {/* Section 3: Cards */}
    <section className="px-8 py-32 bg-[#f4f7f8]">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
      >
        
        <motion.div whileHover={{ y: -8 }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="bg-white p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-100 flex flex-col rounded-sm">
          <div className="w-12 h-12 bg-[#f4f7f8] rounded flex items-center justify-center mb-10 transition-transform duration-300">
            <Search className="w-5 h-5 text-slate-900" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-[1.6rem] text-slate-900 mb-5 leading-tight">Inventory Visibility</h3>
          <p className="font-light text-slate-600 leading-relaxed text-sm">
            Track stock, site condition and automate reporting for manual streams of analytical intelligence.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -8 }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="bg-white p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-100 flex flex-col rounded-sm">
          <div className="w-12 h-12 bg-[#f4f7f8] rounded flex items-center justify-center mb-10 transition-transform duration-300">
            <BarChart2 className="w-5 h-5 text-slate-900" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-[1.6rem] text-slate-900 mb-5 leading-tight">Field-First Automation</h3>
          <p className="font-light text-slate-600 leading-relaxed text-sm">
            Automated sales reports unseen naturally intercepting your inbound workflow.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -8 }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="bg-white p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-100 flex flex-col rounded-sm">
          <div className="w-12 h-12 bg-[#f4f7f8] rounded flex items-center justify-center mb-10 transition-transform duration-300">
            <ShieldCheck className="w-5 h-5 text-slate-900" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-[1.6rem] text-slate-900 mb-5 leading-tight">Lead Integrity</h3>
          <p className="font-light text-slate-600 leading-relaxed text-sm">
            Track leads from site visit to sale, allowing the visibility and sales to align seamlessly.
          </p>
        </motion.div>

      </motion.div>
    </section>

    {/* Section 4: Deep Navy CTA */}
    <section className="relative px-8 py-32 bg-[#0a192f] text-center flex flex-col items-center justify-center min-h-[60vh] overflow-hidden">
      <motion.div 
        animate={{ x: [-20, 20, -20], y: [-20, 20, -20], opacity: [0.3, 0.5, 0.3] }} 
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }} 
        className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px]" 
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-[3.5rem] font-serif text-white mb-6 leading-tight max-w-3xl"
        >
          Ready to Drive Your Rep Firm Forward?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl font-light text-slate-300 max-w-3xl leading-relaxed mb-12"
        >
          Join the ranks of elite firms utilizing Call Wizard™ to master their market presence and ensure every call counts.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link to="/download" className="group px-8 py-4 bg-white text-[#0a192f] text-sm font-medium hover:bg-slate-100 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all rounded-[4px] min-w-[200px] inline-flex justify-center items-center gap-2">
            Start Free Trial <ChevronRight className="w-4 h-4 text-[#0a192f] group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/download" className="px-8 py-4 bg-transparent border border-white/20 text-white text-sm font-medium hover:bg-white/5 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all rounded-[4px] min-w-[200px] inline-flex justify-center items-center">
            Download Firm Guide
          </Link>
        </motion.div>
      </div>
    </section>
  </div>
);

export const Benefits = () => (
  <div className="w-full bg-[#f8fafb]">
    <section className="px-8 pt-24 pb-16 border-b border-slate-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-[3.5rem] font-serif text-slate-900 mb-6 leading-tight">Architecture of Field Advantage.</h1>
        <p className="text-lg font-light text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The legacy promises that made Call Wizard™ the standard for rep agencies in the trades. Eliminate friction, standardize unstructured CRM deployments, and capture ground truth.
        </p>
      </motion.div>
    </section>
    
    {/* Complex Data Routing Pipeline Section */}
    <section className="px-8 py-24 bg-white border-b border-slate-100">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">The Intelligence Pipeline</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-8">
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="relative group p-6 rounded-sm hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
             <div className="text-[10rem] font-serif italic text-slate-50 font-black absolute -top-20 -left-4 -z-10 group-hover:text-slate-100 transition-colors">01</div>
             <Database className="w-8 h-8 text-[#0a192f] mb-6" />
             <h3 className="text-xl font-serif text-slate-900 mb-3 block">Field Capture Engine</h3>
             <ul className="space-y-3 mt-6 border-l-2 border-slate-200 pl-4 py-2">
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Offline-first local caching</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Standardized dropdown matrices</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> GPS-validated site logging</li>
             </ul>
             <p className="mt-8 text-sm font-light text-slate-500 leading-relaxed">Enables high-fidelity data capture from sales reps before they even step directly off the customer site.</p>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="relative group p-6 rounded-sm hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
             <div className="text-[10rem] font-serif italic text-slate-50 font-black absolute -top-20 -left-4 -z-10 group-hover:text-slate-100 transition-colors">02</div>
             <GitMerge className="w-8 h-8 text-[#0a192f] mb-6" />
             <h3 className="text-xl font-serif text-slate-900 mb-3 block">Algorithmic Triage</h3>
             <ul className="space-y-3 mt-6 border-l-2 border-slate-200 pl-4 py-2">
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Payload decryption & tagging</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Manufacturer logic gating</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> CRM bidrectional synchronization</li>
             </ul>
             <p className="mt-8 text-sm font-light text-slate-500 leading-relaxed">Incoming payloads are processed against deeply embedded manufacturer routing rules and CRM constraints instantaneously.</p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="relative group p-6 rounded-sm hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
             <div className="text-[10rem] font-serif italic text-slate-50 font-black absolute -top-20 -left-4 -z-10 group-hover:text-slate-100 transition-colors">03</div>
             <Activity className="w-8 h-8 text-[#0a192f] mb-6" />
             <h3 className="text-xl font-serif text-slate-900 mb-3 block">Principal Extraction</h3>
             <ul className="space-y-3 mt-6 border-l-2 border-slate-200 pl-4 py-2">
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Clean-email digest distribution</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Role-based principal portals</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> High-velocity trend surfacing</li>
             </ul>
             <p className="mt-8 text-sm font-light text-slate-500 leading-relaxed">Secure data structures provide manufacturers the exact dashboard intelligence requested, entirely omitting generic sales fluff.</p>
          </motion.div>
        </div>
      </motion.div>
    </section>

    {/* NEW Add Picture Cleanly Section for Benefits */}
    <section className="px-8 py-24 bg-[#f4f7f8] border-b border-slate-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex flex-col justify-center order-2 md:order-1">
          <div className="w-12 h-12 bg-white rounded flex items-center justify-center mb-8 border border-slate-200">
            <Compass className="w-5 h-5 text-[#0a192f]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-6 leading-tight">Navigating the Modern Sales Territory</h2>
          <p className="text-base text-slate-600 font-light leading-relaxed mb-6">
            Equip your reps with visual cartography of their regional tours. The field interface allows reps to pull historic snapshots of previous reports before even leaving the vehicle, ensuring continuity and professional advantage.
          </p>
          <div className="flex items-center gap-4 text-[#0a192f]">
            <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2">Spatial Architecture Integrated <ChevronRight className="w-3 h-3"/></span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="order-1 md:order-2 relative">
          <motion.img 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80" alt="Customer Navigation Strategy" className="rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.06)]" referrerPolicy="no-referrer" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center gap-6 border border-slate-100"
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                <motion.circle 
                  cx="32" cy="32" r="28" 
                  fill="none" 
                  stroke="#0a192f" 
                  strokeWidth="6" 
                  strokeDasharray="175"
                  initial={{ strokeDashoffset: 175 }}
                  whileInView={{ strokeDashoffset: 175 * 0.15 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[#0a192f] font-serif font-black text-lg"><AnimatedNumber value={85} />%</span>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#0a192f] mb-1">Coverage</p>
              <p className="text-sm font-light text-slate-500 min-w-[120px]">Customer mapping complete</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <section className="px-8 py-24 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <motion.img 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            src="https://images.unsplash.com/photo-1542562496-5126834d8cc3?auto=format&fit=crop&w=1000&q=80" alt="Field Rep Analytics" className="rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.04)]" referrerPolicy="no-referrer" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex flex-col justify-center">
          <div className="w-12 h-12 bg-[#f4f7f8] rounded flex items-center justify-center mb-8 border border-slate-100">
            <ClipboardList className="w-5 h-5 text-[#0a192f]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-6 leading-tight">Instantaneous Field-Level Intelligence</h2>
          <p className="text-base text-slate-600 font-light leading-relaxed mb-8">
            Provide your manufacturer principals with ground-truth data instantly. Call Wizard™ transforms every salesperson into the true "eyes and ears" for product marketing, uncovering trends at the customer site before they ever reach the broad market.
          </p>
          
          <div className="space-y-6 w-full">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#0a192f] mb-2">
                <span>Sync Velocity</span>
                <span><AnimatedNumber value={98} />%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  whileInView={{ width: '98%' }} 
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} 
                  className="h-full bg-[#0a192f]" 
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                <span>Data Consistency</span>
                <span><AnimatedNumber value={100} />%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  whileInView={{ width: '100%' }} 
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }} 
                  className="h-full bg-slate-400" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="px-8 py-32 bg-[#f4f7f8]">
      <div className="flex items-center justify-center mb-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif text-slate-900">Functional Advantages</h2>
      </div>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
      >
        {[
          { icon: <Compass className="w-5 h-5" />, title: 'Intuitive Interface', desc: 'So simple your reps will actually use it. Eliminating the friction makes daily sales call reporting an absolute habit.' },
          { icon: <Server className="w-5 h-5" />, title: 'Automated Distribution', desc: 'Route reports automatically to the right principal stakeholders instantly based on exact product line relevance indexing.' },
          { icon: <Layers className="w-5 h-5" />, title: 'Strategic Archiving', desc: 'All reports are archived by account location. Quickly pull prior notes instantly before walking into the customer site.' },
          { icon: <ShieldCheck className="w-5 h-5" />, title: 'Competitive Advantage', desc: 'Demonstrate deep organizational competence. Give your agency a clear edge in securing and retaining premium principals.' },
          { icon: <BarChart2 className="w-5 h-5" />, title: 'Seamless Organization', desc: 'Stop searching through endless inbox threads. Structure knowledge by territory, customer, and manufacturer natively.' },
          { icon: <Terminal className="w-5 h-5" />, title: 'Rapid Setup Phase', desc: 'Deployment is instant. We bridge your legacy CRM and field data without complex multi-month integration delays.' }
        ].map((benefit, i) => (
          <motion.div whileHover={{ y: -8 }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} key={i} className="bg-white p-12 shadow-[0_4px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col rounded-sm transition-all duration-300">
            <div className="w-12 h-12 bg-[#f8fafb] rounded flex items-center justify-center mb-8 text-[#0a192f] border border-slate-100 transition-transform duration-300">
              {benefit.icon}
            </div>
            <h3 className="font-serif text-2xl text-slate-900 mb-4">{benefit.title}</h3>
            <p className="font-light text-slate-500 leading-relaxed text-sm">
              {benefit.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  </div>
);

export const Download = () => (
  <div className="w-full bg-[#f8fafb]">
    <section className="px-8 pt-24 pb-16 border-b border-slate-200">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-[3.5rem] font-serif text-slate-900 mb-6 leading-tight">Deployment & Access</h1>
        <p className="text-lg font-light text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Begin your implementation. Download the environment that fits your organization's compliance guidelines and technical evaluation criteria.
        </p>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-8 py-24">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="grid md:grid-cols-2 gap-12"
      >
        {/* Sample Data Version */}
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} whileHover={{ y: -8 }} className="bg-white px-16 py-20 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-100 rounded-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#f8fafb] flex items-center justify-center rounded border border-slate-100 mb-8 transition-transform duration-300">
            <Search className="w-6 h-6 text-[#0a192f]" />
          </div>
          <h2 className="text-2xl font-serif text-slate-900 mb-4">Sample Intelligence Environment</h2>
          <p className="text-slate-500 font-light text-sm leading-relaxed mb-10 mx-auto">
            Pre-populated with baseline customer accounts and manufacturers. See exactly how the reporting and routing algorithms process data out-of-the-box before connecting live endpoints.
          </p>
          <Link to="/app" className="block text-center w-full">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-8 py-4 bg-[#f8fafb] border border-slate-200 text-[#0a192f] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-50 transition-colors rounded-sm w-full block">
              Initialize Sandbox
            </motion.button>
          </Link>
        </motion.div>

        {/* Full Trial Version */}
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} whileHover={{ y: -8 }} className="bg-[#0a192f] text-white px-16 py-20 shadow-2xl shadow-slate-900/10 hover:shadow-slate-900/20 transition-all duration-300 border border-[#0a192f] rounded-sm flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-white/10 text-white text-[10px] font-bold px-6 py-2 uppercase tracking-widest rounded-bl-sm backdrop-blur-md">Full Sandbox License</div>
          <div className="w-16 h-16 bg-white/5 flex items-center justify-center rounded border border-white/10 mb-8 transition-transform duration-300">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-serif text-white mb-4">Live Environment Trial</h2>
          <p className="text-slate-300 font-light text-sm leading-relaxed mb-10 mx-auto">
            A complete system deployment containing a temporary trial license. Input your live agency data securely, invite field reps, and establish actual routing workflows.
          </p>
          <Link to="/app" className="block text-center w-full">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-8 py-4 bg-white text-[#0a192f] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-100 transition-colors shadow-lg rounded-sm w-full block">
              Initialize Live Setup
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mt-16 bg-white rounded-sm px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-slate-100"
      >
        <div className="flex items-center gap-8 w-full md:w-auto">
          <div className="w-16 h-16 bg-[#f8fafb] rounded border border-slate-100 flex items-center justify-center flex-shrink-0 hidden md:flex">
            <FileText className="w-6 h-6 text-slate-700" />
          </div>
          <div>
            <h3 className="text-xl font-serif text-slate-900 mb-2">Systems & Operations API Handbook</h3>
            <p className="font-light text-slate-500 text-sm max-w-lg">Complete technical documentation detailing the integration, database modification, and administrative protocols.</p>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="whitespace-nowrap px-8 py-4 w-full md:w-auto bg-transparent border border-slate-300 text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors rounded-sm">
          Acquire Schema PDF (2.4 MB)
        </motion.button>
      </motion.div>
    </section>

    {/* Complex Technical Table */}
    <section className="max-w-6xl mx-auto px-8 py-24 border-t border-slate-200">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h2 className="text-3xl font-serif text-slate-900 mb-4">Implementation Infrastructure Architecture</h2>
           <p className="text-slate-500 font-light text-sm max-w-2xl">Ensure your agency's operating environment meets these stringent technical parameters before initiating full deployment sequencing.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0a192f] bg-[#f8fafb] px-4 py-2 border border-slate-200 rounded-sm">
           <Zap className="w-3 h-3 text-emerald-600" /> Validation Passed
        </div>
      </div>
      <div className="overflow-x-auto shadow-sm rounded-sm">
        <table className="w-full text-left border-collapse min-w-[800px] border border-slate-200 bg-white">
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="py-6 px-6 bg-slate-50/50 font-semibold text-slate-900 text-sm whitespace-nowrap"><Terminal className="w-4 h-4 inline-block mr-3 text-slate-400" />Endpoint Compatibility</td>
              <td className="py-6 px-6 font-mono text-[11px] text-slate-600 tracking-tight">iOS 14.0+ // ANDROID 11.0 (API 30)+ // WINDOWS 11 // MACOS 13.0+</td>
              <td className="py-6 px-6 font-light text-slate-500 text-sm border-l border-slate-100">Requires persistent hardware-level encryption core enabled via MDM.</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-6 px-6 bg-slate-50/50 font-semibold text-slate-900 text-sm whitespace-nowrap"><Activity className="w-4 h-4 inline-block mr-3 text-slate-400" />Network Layer Resilience</td>
              <td className="py-6 px-6 font-mono text-[11px] text-slate-600 tracking-tight">LOCAL CACHE: 50MB // TIMEOUT: 3000MS // EXPONENTIAL BACKOFF</td>
              <td className="py-6 px-6 font-light text-slate-500 text-sm border-l border-slate-100">Engineered for zero-signal factory conditions. Persists offline.</td>
            </tr>
            <tr>
              <td className="py-6 px-6 bg-slate-50/50 font-semibold text-slate-900 text-sm whitespace-nowrap"><Lock className="w-4 h-4 inline-block mr-3 text-slate-400" />Compliance & Security</td>
              <td className="py-6 px-6 font-mono text-[11px] text-slate-600 tracking-tight">SOC 2 TYPE II // AES-256 AT REST // TLS 1.3 IN TRANSIT</td>
              <td className="py-6 px-6 font-light text-slate-500 text-sm border-l border-slate-100">Regularly subjected to rigorous independent penetration audits.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
);



export const Pricing = () => (
  <div className="w-full bg-[#f8fafb]">
    <section className="px-8 pt-24 pb-16 border-b border-slate-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-[3.5rem] font-serif text-slate-900 mb-6 leading-tight">Transparent Scalability.</h1>
        <p className="text-lg font-light text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Pricing engineered for commercial rep agencies. Unambiguous license gating. No hidden structural integrations or data taxes.
        </p>
      </motion.div>
    </section>
    
    <section className="max-w-6xl mx-auto px-8 py-24">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} className="bg-white p-16 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-slate-100 rounded-sm flex flex-col hover:-translate-y-2 transition-transform duration-500">
          <h3 className="text-2xl font-serif text-slate-900 mb-2">Agency Standard Module</h3>
          <p className="text-sm text-slate-500 font-light mb-12 border-b border-slate-100 pb-8">Calibrated for lean, highly responsive field units.</p>
          <div className="mb-10">
            <span className="text-5xl font-serif text-slate-900 tracking-tight">${'{'}99{'}'}</span>
            <span className="text-slate-500 text-xs tracking-widest uppercase ml-2 font-bold">/ User / Month</span>
          </div>
          <div className="flex-1">
             <ul className="space-y-5 mb-12 text-sm text-slate-600 font-light">
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" /> <span className="leading-snug">Unrestricted Access to the Native Algorithmic Routing Engine</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" /> <span className="leading-snug">Unlimited Field Intelligence Reporting</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" /> <span className="leading-snug">Historical Archiving Infrastructure (Rolling 10-Year retention)</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" /> <span className="leading-snug">Tier-2 Asynchronous Email Support Tunnel</span></li>
             </ul>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group w-full py-4 bg-[#f8fafb] border border-slate-200 text-slate-900 text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors rounded-sm flex items-center justify-center gap-2">
            Begin Evaluation Context <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} className="bg-[#0a192f] text-white p-16 shadow-2xl shadow-slate-900/10 rounded-sm relative flex flex-col hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 bg-white/10 text-white text-[10px] font-bold px-4 py-2 uppercase tracking-widest rounded-bl-sm backdrop-blur-md z-10">Enterprise Core</div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px] -z-0"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-serif text-white mb-2">Deep Enterprise Organization</h3>
            <p className="text-sm text-slate-400 font-light mb-12 border-b border-slate-800 pb-8">Architected for deep multi-state manufacturer networks.</p>
          </div>
          <div className="mb-10 relative z-10">
            <span className="text-5xl font-serif text-white tracking-tight">Custom.</span>
            <span className="text-slate-500 text-xs tracking-widest uppercase ml-2 font-bold block mt-3">Procurement Required</span>
          </div>
          <div className="flex-1 relative z-10">
             <ul className="space-y-5 mb-12 text-sm text-slate-300 font-light">
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" /> <span className="leading-snug">Full Legacy CRM Database Migration & Extraction Protocols</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" /> <span className="leading-snug">Priority Telephonic Support SLA (<span className="font-mono text-xs">{"<30min Response"}</span>)</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" /> <span className="leading-snug">Dedicated Development Blocks for Workflow Surgery</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" /> <span className="leading-snug">White-Glove Administrative Onboarding Tactics</span></li>
             </ul>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative z-10 w-full py-4 bg-white text-[#0a192f] text-[11px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors rounded-sm shadow-xl flex items-center justify-center gap-2">
            Contact Sales Directive <ChevronRight className="w-3 h-3 text-[#0a192f] group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Feature Matrix Deep Dive */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-4xl mx-auto mt-32"
      >
        <h2 className="text-2xl font-serif text-slate-900 mb-8 border-b border-slate-200 pb-4">In-Depth Subsystem Licensing Strategy</h2>
        <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-slate-100 rounded-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#f8fafb] border-b border-slate-200">
                <th className="py-4 px-6 font-semibold uppercase tracking-widest text-[10px] text-slate-500">Core Subsystem Capability</th>
                <th className="py-4 px-6 font-semibold tracking-widest text-[10px] text-slate-900 text-center uppercase">Agency Standard</th>
                <th className="py-4 px-6 font-semibold tracking-widest text-[10px] text-slate-900 text-center uppercase">Enterprise Core</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">Offline-First Intelligent Syncing</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">Manufacturer-Specific Automated Gating</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">Site Visit Geographic Checkpoint Tracking</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap flex items-center gap-2">Custom Bi-Directional External CRM Sync <ShieldAlert className="w-3 h-3 text-slate-400" /></td>
                <td className="py-4 px-6 text-center text-slate-300 font-mono text-xs">—</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">Historical Customer Data DB Reconstruction</td>
                <td className="py-4 px-6 text-center text-slate-300 font-mono text-xs">—</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap flex items-center gap-2">White-Label URL Architecture <code className="bg-slate-200 px-1 rounded text-[10px] ml-2">portal.youragency.com</code></td>
                <td className="py-4 px-6 text-center text-slate-300 font-mono text-xs">—</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  </div>
);

export const Demo = () => (
  <div className="w-full bg-[#f8fafb] min-h-[90vh]">
    <section className="max-w-6xl mx-auto px-8 py-24 w-full">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="sticky top-24">
          <h1 className="text-4xl md:text-[3.5rem] font-serif text-slate-900 mb-6 leading-tight">Inspect the Architecture.</h1>
          <p className="text-lg font-light text-slate-600 leading-relaxed mb-12">
            Schedule a pristine, no-nonsense investigation of the Call Wizard™ logic frame. We dissect routing pathways, simulate field deployments, and calculate sync velocity.
          </p>
          
          <div className="space-y-10 pl-6 border-l-2 border-slate-200 relative mt-16 max-w-md">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
               <div className="absolute -left-[33px] top-1 w-4 h-4 bg-slate-900 rounded-full border-[3px] border-[#f8fafb] shadow-sm"></div>
               <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">00:00 — System Reconnaissance</h4>
               <p className="text-sm font-light text-slate-500 mt-2 leading-relaxed">Evaluation of your operational friction points, CRM limitations, and principal data demands.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="relative">
               <div className="absolute -left-[33px] top-1 w-4 h-4 bg-slate-400 rounded-full border-[3px] border-[#f8fafb] shadow-sm"></div>
               <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">15:00 — Field Interface Simulation</h4>
               <p className="text-sm font-light text-slate-500 mt-2 leading-relaxed">Direct manipulation of the offline-first environment identical to what reps execute on a live lot.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="relative">
               <div className="absolute -left-[33px] top-1 w-4 h-4 bg-slate-400 rounded-full border-[3px] border-[#f8fafb] shadow-sm"></div>
               <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">30:00 — Algorithmic Integrity Assessment</h4>
               <p className="text-sm font-light text-slate-500 mt-2 leading-relaxed">Triggering routing sequences and verifying accurate, logic-gated distribution directly to mock principals in real-time.</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-white p-12 shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-slate-100 rounded-sm w-full lg:mt-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-[50px] -z-10 absolute pointer-events-none"></div>
          <div className="mb-10 text-left border-b border-slate-100 pb-8">
            <h3 className="text-2xl font-serif text-slate-900 mb-2">Request Deployment Parameter Session</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2"><Lock className="w-3 h-3"/> SSL Encrypted Form Routing</p>
          </div>
          <form className="flex flex-col gap-8 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Form evaluation submitted.") }}>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">First Name Indicator</label>
                <input type="text" className="bg-[#f8fafb] border border-slate-200 px-4 py-4 text-sm rounded-sm focus:outline-none focus:border-[#0a192f] focus:ring-4 focus:ring-[#0a192f]/5 transition-all outline-none" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Last Name Indicator</label>
                <input type="text" className="bg-[#f8fafb] border border-slate-200 px-4 py-4 text-sm rounded-sm focus:outline-none focus:border-[#0a192f] focus:ring-4 focus:ring-[#0a192f]/5 transition-all outline-none" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Corporate Address <span className="text-rose-500">*</span></label>
              <input type="email" required className="bg-[#f8fafb] border border-slate-200 px-4 py-4 text-sm rounded-sm focus:outline-none focus:border-[#0a192f] focus:ring-4 focus:ring-[#0a192f]/5 transition-all outline-none" placeholder="hq@manufacturinggrp.com" />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Entity Nomenclature</label>
              <input type="text" className="bg-[#f8fafb] border border-slate-200 px-4 py-4 text-sm rounded-sm focus:outline-none focus:border-[#0a192f] focus:ring-4 focus:ring-[#0a192f]/5 transition-all outline-none" placeholder="Operations Agency LLC" />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="group mt-8 flex justify-center items-center gap-3 px-8 py-5 bg-[#0a192f] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors shadow-xl rounded-sm w-full">
              Inject Form Data <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
            <p className="text-[10px] text-slate-400 text-center leading-relaxed font-light mt-2">By establishing contact, you consent to Quantos Software LLC processing your identification metrics per the architectural constraints outlined in our privacy policy.</p>
          </form>
        </motion.div>
      </div>
    </section>
  </div>
);
