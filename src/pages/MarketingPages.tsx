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
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#0a192f] text-white">
      <img
        src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80"
        alt="Abstract technical architecture"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,25,47,0.98),rgba(10,25,47,0.74)_48%,rgba(10,25,47,0.32))]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-end gap-12 px-6 pb-10 pt-20 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[342px] pb-6 sm:max-w-none"
        >
          <p className="cw-eyebrow mb-6 text-white/55">Field intelligence laboratory // Quantos Software</p>
          <h1 className="cw-display mb-8 max-w-5xl text-[2.35rem] leading-[1.04] text-white sm:text-5xl md:text-[6.4rem] md:leading-[0.95]">
            Turn field conversations into <span className="whitespace-nowrap">product-line</span> intelligence.
          </h1>
          <p className="mb-10 max-w-[342px] text-lg font-light leading-relaxed text-slate-200 sm:max-w-2xl md:text-xl">
            A mobile, voice-first platform for manufacturing rep firms. Capture site visits, structure notes by product line, and share only approved intelligence with each manufacturer.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/app" className="cw-pill group inline-flex w-full items-center justify-center gap-2 bg-white px-6 py-4 text-[12px] font-medium text-[#0a192f] transition hover:bg-slate-100 sm:w-auto">
              See the Workflow <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/benefits" className="cw-pill inline-flex w-full items-center justify-center border border-white/25 px-6 py-4 text-[12px] font-medium text-white transition hover:bg-white/10 sm:w-auto">
              View Requirements
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="cw-card-dark mb-4 p-4 backdrop-blur-md md:p-5"
        >
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">Live Visit Draft</span>
            <span className="rounded-full bg-blue-500/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-blue-100">Ready</span>
          </div>
          <div className="grid gap-3">
            {[
              ['Customer Site', 'Riverside Manufacturing'],
              ['Product Line', 'Hydraulic filtration'],
              ['Signal', 'Maintenance team evaluating Q3 replacement cycle'],
              ['Visibility', 'Manager approved / manufacturer-safe']
            ].map(([label, value]) => (
              <div key={label} className="grid gap-1 border-b border-white/10 pb-3 last:border-b-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">{label}</span>
                <span className="text-sm text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
            {[
              ['85%', 'Less admin time'],
              ['2M+', 'Structured records'],
              ['100%', 'Permissioned views']
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl font-medium text-white">{value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.04em] text-white/45">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <section className="px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div>
          <p className="cw-eyebrow mb-5">Capture // Structure // Control</p>
          <h2 className="cw-display text-4xl leading-[1.05] text-slate-900 md:text-6xl">
            A cleaner operating surface for field reporting.
          </h2>
        </div>
        <div className="grid gap-8">
          <p className="text-lg font-light leading-relaxed text-slate-600">
            Manufacturing reps collect valuable market signals on every site visit, but those details often stay in a notebook, a voice memo, or the rep's memory. Call Wizard turns spoken observations into reviewed, searchable data tied to customers, sites, product lines, opportunities, issues, competitors, and follow-up tasks.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['01', 'Voice-first capture', 'Reps select a customer site, speak naturally, and review an AI-generated report before it becomes official.'],
              ['02', 'Structured output', 'Transcripts become product-line tags, opportunity timing, issue records, competitive mentions, and follow-up tasks.'],
              ['03', 'Permissioned reporting', 'Managers see the full visit. Manufacturers see only approved records tied to their product lines.']
            ].map(([number, title, copy]) => (
              <div key={number} className="cw-card p-5">
                <span className="font-mono text-[11px] text-slate-400">{number}</span>
                <h3 className="mt-8 text-xl font-medium text-slate-900">{title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#eef3f6] px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
          alt="Dashboard analytics"
          className="h-[420px] w-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div>
          <p className="cw-eyebrow mb-5">Manufacturer-safe reporting</p>
          <h2 className="cw-display text-4xl leading-[1.05] text-slate-900 md:text-5xl">Prove rep-firm value without leaking restricted data.</h2>
          <p className="mt-6 text-base font-light leading-relaxed text-slate-600">
            Each manufacturer receives a clean view of the field signals that matter to its product line: customer comments, open opportunities, product issues, competitive mentions, timing, value, and follow-up status.
          </p>
          <div className="mt-8 grid gap-3">
            {['Product-line ownership rules', 'Internal-only note protection', 'Exportable approved reports'].map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-slate-300/70 py-3">
                <CheckCircle2 className="h-4 w-4 text-[#0a192f]" />
                <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#0a192f] px-6 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <div>
          <p className="cw-eyebrow mb-5 text-white/50">MVP evaluation</p>
          <h2 className="cw-display max-w-4xl text-4xl leading-[1.05] md:text-6xl">Ready to inspect the workflow?</h2>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link to="/download" className="cw-pill inline-flex justify-center bg-white px-6 py-4 font-mono text-[12px] uppercase tracking-[0.04em] text-[#0a192f] hover:bg-slate-100">
            Explore the MVP
          </Link>
          <Link to="/demo" className="cw-pill inline-flex justify-center border border-white/25 px-6 py-4 font-mono text-[12px] uppercase tracking-[0.04em] text-white hover:bg-white/10">
            Request Review
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export const Benefits = () => (
  <div className="w-full bg-[#f8fafb]">
    <section className="px-6 pt-20 pb-14 md:px-8 md:pt-24 md:pb-16 border-b border-slate-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[342px] sm:max-w-2xl md:max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-[3.5rem] text-slate-900 mb-6 leading-tight">Architecture of Field Advantage.</h1>
        <p className="text-lg font-light text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Built around the product requirements: mobile-first capture, voice-first reporting, structured product-line data, rep review, role-based access, and manufacturer dashboards that never leak unrelated information.
        </p>
      </motion.div>
    </section>
    
    {/* Complex Data Routing Pipeline Section */}
    <section className="px-6 py-16 md:px-8 md:py-24 bg-white border-b border-slate-100">
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
        <div className="flex items-center gap-4 mb-12 md:mb-16">
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
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Map-based site selection</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Guided or free-form voice notes</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> New-site creation and duplicate checks</li>
             </ul>
             <p className="mt-8 text-sm font-light text-slate-500 leading-relaxed">Makes call reporting faster than typing, so reps capture observations while the details are still fresh.</p>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="relative group p-6 rounded-sm hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
             <div className="text-[10rem] font-serif italic text-slate-50 font-black absolute -top-20 -left-4 -z-10 group-hover:text-slate-100 transition-colors">02</div>
             <GitMerge className="w-8 h-8 text-[#0a192f] mb-6" />
             <h3 className="text-xl font-serif text-slate-900 mb-3 block">AI Structuring Layer</h3>
             <ul className="space-y-3 mt-6 border-l-2 border-slate-200 pl-4 py-2">
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Speech-to-text transcript</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Product-line dictionary matching</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Opportunity, issue, and competitor extraction</li>
             </ul>
             <p className="mt-8 text-sm font-light text-slate-500 leading-relaxed">The system separates general notes from product-line records and flags low-confidence assignments for rep review.</p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="relative group p-6 rounded-sm hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
             <div className="text-[10rem] font-serif italic text-slate-50 font-black absolute -top-20 -left-4 -z-10 group-hover:text-slate-100 transition-colors">03</div>
             <Activity className="w-8 h-8 text-[#0a192f] mb-6" />
             <h3 className="text-xl font-serif text-slate-900 mb-3 block">Manufacturer-Safe Reporting</h3>
             <ul className="space-y-3 mt-6 border-l-2 border-slate-200 pl-4 py-2">
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Product-line ownership rules</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Internal-only note protection</li>
               <li className="text-xs text-slate-500 font-mono tracking-tight flex items-start"><span className="text-[#0a192f] font-semibold text-sm mr-3 mt-[-2px]">•</span> Exportable approved reports</li>
             </ul>
             <p className="mt-8 text-sm font-light text-slate-500 leading-relaxed">Manufacturers get relevant comments, opportunities, issues, and competitive mentions without seeing restricted firm data.</p>
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
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-6 leading-tight">Start Every Visit from the Customer Site</h2>
          <p className="text-base text-slate-600 font-light leading-relaxed mb-6">
            Reps begin with the place they are actually visiting. They can choose a nearby site from the map, search by customer or address, add a missing location, and pull prior visit history before recording.
          </p>
          <div className="flex items-center gap-4 text-[#0a192f]">
            <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2">Map-Based Site Selection <ChevronRight className="w-3 h-3"/></span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="order-1 md:order-2 relative">
          <motion.img 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80" alt="Field route planning" className="rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.06)]" referrerPolicy="no-referrer" />
          
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
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#0a192f] mb-1">Master Data</p>
              <p className="text-sm font-light text-slate-500 min-w-[120px]">Site match confidence</p>
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
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-6 leading-tight">Field Intelligence Manufacturers Can Actually Use</h2>
          <p className="text-base text-slate-600 font-light leading-relaxed mb-8">
            Give each manufacturer a clean view of the field signals that matter to their product line: customer comments, open opportunities, product issues, competitive mentions, timing, value, and follow-up status.
          </p>
          
          <div className="space-y-6 w-full">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#0a192f] mb-2">
                <span>Product-Line Tagging</span>
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
                <span>Permission Coverage</span>
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
          { icon: <Compass className="w-5 h-5" />, title: 'Mobile First', desc: 'A fast phone workflow for reps before, during, or immediately after a customer visit.' },
          { icon: <Server className="w-5 h-5" />, title: 'Voice First', desc: 'Spoken observations become transcripts, summaries, and structured fields with less typing.' },
          { icon: <Layers className="w-5 h-5" />, title: 'Structured Data', desc: 'Reports are organized by customer, site, rep, product line, manufacturer, opportunity, issue, and task.' },
          { icon: <ShieldCheck className="w-5 h-5" />, title: 'Permissioning by Design', desc: 'Product-line ownership drives manufacturer visibility from the data model forward.' },
          { icon: <BarChart2 className="w-5 h-5" />, title: 'Reporting as Revenue Driver', desc: 'Manufacturer dashboards make the rep firm value visible, measurable, and renewable.' },
          { icon: <Terminal className="w-5 h-5" />, title: 'Focused MVP', desc: 'Built around field capture and product-line reporting, not a sprawling CRM replacement.' }
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
    <section className="px-6 pt-20 pb-14 md:px-8 md:pt-24 md:pb-16 border-b border-slate-200">
      <div className="max-w-[342px] sm:max-w-2xl md:max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-[3.5rem] text-slate-900 mb-6 leading-tight">Deployment & Access</h1>
        <p className="text-lg font-light text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Evaluate the MVP around the exact workflow in the requirements: site selection, voice capture, AI structuring, rep review, permissioned reporting, and manager oversight.
        </p>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-6 py-16 md:px-8 md:py-24">
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
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} whileHover={{ y: -8 }} className="bg-white px-8 py-12 md:px-16 md:py-20 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-100 rounded-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#f8fafb] flex items-center justify-center rounded border border-slate-100 mb-8 transition-transform duration-300">
            <Search className="w-6 h-6 text-[#0a192f]" />
          </div>
          <h2 className="text-2xl font-serif text-slate-900 mb-4">MVP Workflow Sandbox</h2>
          <p className="text-slate-500 font-light text-sm leading-relaxed mb-10 mx-auto">
            Pre-populated with manufacturing customers, sites, product lines, manufacturers, opportunities, issues, and follow-up tasks.
          </p>
          <Link to="/app" className="block text-center w-full">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-8 py-4 bg-[#f8fafb] border border-slate-200 text-[#0a192f] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-50 transition-colors rounded-sm w-full block">
              Initialize Sandbox
            </motion.button>
          </Link>
        </motion.div>

        {/* Full Trial Version */}
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} whileHover={{ y: -8 }} className="bg-[#0a192f] text-white px-8 py-12 md:px-16 md:py-20 shadow-2xl shadow-slate-900/10 hover:shadow-slate-900/20 transition-all duration-300 border border-[#0a192f] rounded-sm flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-white/10 text-white text-[10px] font-bold px-6 py-2 uppercase tracking-widest rounded-bl-sm backdrop-blur-md">Full Sandbox License</div>
          <div className="w-16 h-16 bg-white/5 flex items-center justify-center rounded border border-white/10 mb-8 transition-transform duration-300">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-serif text-white mb-4">Pilot Environment Trial</h2>
          <p className="text-slate-300 font-light text-sm leading-relaxed mb-10 mx-auto">
            Configure roles, manufacturer access, product-line dictionaries, and customer/site master data for a controlled pilot launch.
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
            <h3 className="text-xl font-serif text-slate-900 mb-2">Requirements and Permission Model Brief</h3>
            <p className="font-light text-slate-500 text-sm max-w-lg">Review the core workflows, role matrix, product-line data model, and MVP acceptance criteria.</p>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="whitespace-nowrap px-8 py-4 w-full md:w-auto bg-transparent border border-slate-300 text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors rounded-sm">
          Review MVP Brief
        </motion.button>
      </motion.div>
    </section>

    {/* Complex Technical Table */}
    <section className="max-w-6xl mx-auto px-8 py-24 border-t border-slate-200">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h2 className="text-3xl font-serif text-slate-900 mb-4">MVP Capability Architecture</h2>
           <p className="text-slate-500 font-light text-sm max-w-2xl">The first commercially meaningful release stays focused on capture, structure, review, storage, and permission-controlled reporting.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0a192f] bg-[#f8fafb] px-4 py-2 border border-slate-200 rounded-sm">
           <Zap className="w-3 h-3 text-emerald-600" /> Validation Passed
        </div>
      </div>
      <div className="overflow-x-auto shadow-sm rounded-sm">
        <table className="w-full text-left border-collapse min-w-[800px] border border-slate-200 bg-white">
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="py-6 px-6 bg-slate-50/50 font-semibold text-slate-900 text-sm whitespace-nowrap"><Terminal className="w-4 h-4 inline-block mr-3 text-slate-400" />Rep Capture Workflow</td>
              <td className="py-6 px-6 font-mono text-[11px] text-slate-600 tracking-tight">LOGIN // MAP SITE // RECORD // TRANSCRIBE // REVIEW // SUBMIT</td>
              <td className="py-6 px-6 font-light text-slate-500 text-sm border-l border-slate-100">Must be usable from a phone with minimal typing.</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-6 px-6 bg-slate-50/50 font-semibold text-slate-900 text-sm whitespace-nowrap"><Activity className="w-4 h-4 inline-block mr-3 text-slate-400" />Structured Intelligence</td>
              <td className="py-6 px-6 font-mono text-[11px] text-slate-600 tracking-tight">PRODUCT LINE // OPPORTUNITY // ISSUE // COMPETITOR // FOLLOW-UP</td>
              <td className="py-6 px-6 font-light text-slate-500 text-sm border-l border-slate-100">AI draft remains editable before final submission.</td>
            </tr>
            <tr>
              <td className="py-6 px-6 bg-slate-50/50 font-semibold text-slate-900 text-sm whitespace-nowrap"><Lock className="w-4 h-4 inline-block mr-3 text-slate-400" />Access Control</td>
              <td className="py-6 px-6 font-mono text-[11px] text-slate-600 tracking-tight">REP // MANAGER // MANUFACTURER // ADMIN</td>
              <td className="py-6 px-6 font-light text-slate-500 text-sm border-l border-slate-100">Manufacturers only see authorized product-line records.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
);



export const Pricing = () => (
  <div className="w-full bg-[#f8fafb]">
    <section className="px-6 pt-20 pb-14 md:px-8 md:pt-24 md:pb-16 border-b border-slate-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[342px] sm:max-w-2xl md:max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-[3.5rem] text-slate-900 mb-6 leading-tight">Transparent Scalability.</h1>
        <p className="text-lg font-light text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Pricing aligned to the product's value: faster rep adoption, cleaner field data, stronger manager visibility, and manufacturer reporting access that can be monetized.
        </p>
      </motion.div>
    </section>
    
    <section className="max-w-6xl mx-auto px-6 py-16 md:px-8 md:py-24">
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
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} className="bg-white p-8 md:p-16 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-slate-100 rounded-sm flex flex-col hover:-translate-y-2 transition-transform duration-500">
          <h3 className="text-2xl font-serif text-slate-900 mb-2">Rep Firm MVP</h3>
          <p className="text-sm text-slate-500 font-light mb-12 border-b border-slate-100 pb-8">For teams proving the core capture-to-reporting workflow.</p>
          <div className="mb-10">
            <span className="text-5xl text-slate-900 tracking-tight">$99</span>
            <span className="text-slate-500 text-xs tracking-widest uppercase ml-2 font-bold">/ User / Month</span>
          </div>
          <div className="flex-1">
             <ul className="space-y-5 mb-12 text-sm text-slate-600 font-light">
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" /> <span className="leading-snug">Mobile voice capture and AI-generated call reports</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" /> <span className="leading-snug">Customer/site, product-line, opportunity, issue, and follow-up storage</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" /> <span className="leading-snug">Internal manager dashboard and basic audit trail</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" /> <span className="leading-snug">Manufacturer portal for approved product-line records</span></li>
             </ul>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group w-full py-4 bg-[#f8fafb] border border-slate-200 text-slate-900 text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors rounded-sm flex items-center justify-center gap-2">
            Start MVP Evaluation <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} className="bg-[#0a192f] text-white p-8 md:p-16 shadow-2xl shadow-slate-900/10 rounded-sm relative flex flex-col hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 bg-white/10 text-white text-[10px] font-bold px-4 py-2 uppercase tracking-widest rounded-bl-sm backdrop-blur-md z-10">Enterprise Core</div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px] -z-0"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-serif text-white mb-2">Manufacturer Reporting Network</h3>
            <p className="text-sm text-slate-400 font-light mb-12 border-b border-slate-800 pb-8">For firms turning manufacturer visibility into a commercial data product.</p>
          </div>
          <div className="mb-10 relative z-10">
            <span className="text-5xl text-white tracking-tight">Custom.</span>
            <span className="text-slate-500 text-xs tracking-widest uppercase ml-2 font-bold block mt-3">Procurement Required</span>
          </div>
          <div className="flex-1 relative z-10">
             <ul className="space-y-5 mb-12 text-sm text-slate-300 font-light">
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" /> <span className="leading-snug">Multiple manufacturer roles and product-line access rules</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" /> <span className="leading-snug">Exportable reports and manufacturer engagement metrics</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" /> <span className="leading-snug">Manager review queues and data quality exception monitoring</span></li>
               <li className="flex items-start gap-4"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" /> <span className="leading-snug">Pilot design for renewal, retention, and reporting monetization</span></li>
             </ul>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative z-10 w-full py-4 bg-white text-[#0a192f] text-[11px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors rounded-sm shadow-xl flex items-center justify-center gap-2">
            Plan Manufacturer Access <ChevronRight className="w-3 h-3 text-[#0a192f] group-hover:translate-x-1 transition-transform" />
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
        <h2 className="text-2xl font-serif text-slate-900 mb-8 border-b border-slate-200 pb-4">Capability Fit by Deployment Stage</h2>
        <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-slate-100 rounded-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#f8fafb] border-b border-slate-200">
                <th className="py-4 px-6 font-semibold uppercase tracking-widest text-[10px] text-slate-500">Core Subsystem Capability</th>
                <th className="py-4 px-6 font-semibold tracking-widest text-[10px] text-slate-900 text-center uppercase">MVP</th>
                <th className="py-4 px-6 font-semibold tracking-widest text-[10px] text-slate-900 text-center uppercase">Network</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">Mobile Voice Capture</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">Product-Line Permission Gating</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">Map-Based Customer/Site Selection</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap flex items-center gap-2">Manufacturer Portal Engagement Metrics <ShieldAlert className="w-3 h-3 text-slate-400" /></td>
                <td className="py-4 px-6 text-center text-slate-300 font-mono text-xs">-</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">Advanced Review and Data Quality Queues</td>
                <td className="py-4 px-6 text-center text-slate-300 font-mono text-xs">-</td>
                <td className="py-4 px-6 text-center"><CheckCircle2 className="w-4 h-4 text-[#0a192f] inline-block" /></td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap flex items-center gap-2">Manufacturer-Specific Portal Branding <code className="bg-slate-200 px-1 rounded text-[10px] ml-2">portal.yourfirm.com</code></td>
                <td className="py-4 px-6 text-center text-slate-300 font-mono text-xs">-</td>
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
    <section className="max-w-6xl mx-auto px-6 py-16 md:px-8 md:py-24 w-full">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="sticky top-24">
          <h1 className="text-4xl md:text-[3.5rem] text-slate-900 mb-6 leading-tight">Inspect the Architecture.</h1>
          <p className="text-lg font-light text-slate-600 leading-relaxed mb-12">
            Walk through the exact use case: a rep selects a customer site, records spoken observations, reviews the AI draft, corrects product-line tags, and publishes manufacturer-safe reporting.
          </p>
          
          <div className="space-y-10 pl-6 border-l-2 border-slate-200 relative mt-16 max-w-md">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
               <div className="absolute -left-[33px] top-1 w-4 h-4 bg-slate-900 rounded-full border-[3px] border-[#f8fafb] shadow-sm"></div>
               <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0a192f]">00:00 - Field Workflow Fit</h4>
               <p className="text-sm font-light text-slate-500 mt-2 leading-relaxed">Map your current call reporting process, rep friction points, product-line structure, and manufacturer reporting expectations.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="relative">
               <div className="absolute -left-[33px] top-1 w-4 h-4 bg-slate-400 rounded-full border-[3px] border-[#f8fafb] shadow-sm"></div>
               <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">15:00 - Voice Capture Simulation</h4>
               <p className="text-sm font-light text-slate-500 mt-2 leading-relaxed">Run a sample site visit through map selection, voice capture, transcription, structured extraction, and rep review.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="relative">
               <div className="absolute -left-[33px] top-1 w-4 h-4 bg-slate-400 rounded-full border-[3px] border-[#f8fafb] shadow-sm"></div>
               <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">30:00 - Permission Model Review</h4>
               <p className="text-sm font-light text-slate-500 mt-2 leading-relaxed">Verify which data managers, reps, admins, and manufacturers should see before pilot launch.</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-white p-6 md:p-12 shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-slate-100 rounded-sm w-full lg:mt-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-[50px] -z-10 absolute pointer-events-none"></div>
          <div className="mb-10 text-left border-b border-slate-100 pb-8">
            <h3 className="text-2xl text-slate-900 mb-2">Request MVP Workflow Review</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2"><Lock className="w-3 h-3"/> Role and Permission Discovery</p>
          </div>
          <form className="flex flex-col gap-8 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Form evaluation submitted.") }}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">First Name</label>
                <input type="text" className="cw-input text-sm transition-all" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Last Name</label>
                <input type="text" className="cw-input text-sm transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Business Email <span className="text-rose-500">*</span></label>
              <input type="email" required className="cw-input text-sm transition-all" placeholder="ops@repfirm.com" />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Rep Firm or Manufacturer</label>
              <input type="text" className="cw-input text-sm transition-all" placeholder="Northline Manufacturing Reps" />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="group mt-8 flex justify-center items-center gap-3 px-8 py-5 bg-[#0a192f] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors shadow-xl rounded-sm w-full">
              Request Workflow Review <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
            <p className="text-[10px] text-slate-400 text-center leading-relaxed font-light mt-2">By establishing contact, you consent to Quantos Software LLC processing your identification metrics per the architectural constraints outlined in our privacy policy.</p>
          </form>
        </motion.div>
      </div>
    </section>
  </div>
);
