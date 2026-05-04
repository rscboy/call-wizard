import { useState } from 'react';
import { mockReports, mockCustomers, mockManufacturers, mockSalesReps } from '../data/mockData';
import { format } from 'date-fns';
import { CheckCircle2, ChevronRight, FileText, Search, PlusCircle, Building2, Truck, Users, Download as DownloadIcon, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-serif font-black text-slate-900 mb-8 pb-4 border-b-2 border-slate-900">Home Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link to="/app/reports" className="group bg-white p-6 border-2 border-slate-900 shadow-[8px_8px_0_0_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 border-2 border-slate-900 flex items-center justify-center text-slate-900">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-4xl font-serif font-black text-slate-900">{mockReports.length}</span>
          </div>
          <h3 className="font-black uppercase tracking-widest text-slate-900 mb-2">All Reports</h3>
          <p className="text-sm font-medium text-slate-500">View draft, validated, and sent reports.</p>
        </Link>
        <Link to="/app/customers" className="group bg-white p-6 border-2 border-slate-900 shadow-[8px_8px_0_0_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 border-2 border-slate-900 flex items-center justify-center text-slate-900">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-4xl font-serif font-black text-slate-900">{mockCustomers.length}</span>
          </div>
          <h3 className="font-black uppercase tracking-widest text-slate-900 mb-2">Show Customer List</h3>
          <p className="text-sm font-medium text-slate-500">Manage accounts and geography.</p>
        </Link>
        <Link to="/app/reports/pending" className="group bg-white p-6 border-2 border-slate-900 shadow-[8px_8px_0_0_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 border-2 border-slate-900 flex items-center justify-center text-slate-900">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-4xl font-serif font-black text-slate-900">
              {mockReports.filter(r => r.status === 'VALIDATED').length}
            </span>
          </div>
          <h3 className="font-black uppercase tracking-widest text-slate-900 mb-2">Pending Reports</h3>
          <p className="text-sm font-medium text-slate-500">Distribute approved calls to principals.</p>
        </Link>
      </div>
    </div>
  );
};

export const CallReports = () => {
  const [tab, setTab] = useState<'UNVALIDATED' | 'VALIDATED'>('UNVALIDATED');
  
  const filtered = mockReports.filter(r => r.status === tab);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-4">
        <div>
          <h1 className="text-4xl font-serif font-black text-slate-900">All Call Reports</h1>
          <p className="text-sm font-medium text-slate-500 mt-2 hover:text-slate-900 transition-colors">Field sales intelligence management for Agent Resources Group.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setTab('UNVALIDATED')}
            className={`px-6 py-2 transition-all ${tab === 'UNVALIDATED' ? 'bg-white border-2 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-widest' : 'bg-slate-100 text-slate-400 text-xs font-black uppercase tracking-widest border-2 border-transparent hover:text-slate-600'}`}
          >
            Unvalidated ({mockReports.filter(r => r.status === 'UNVALIDATED').length})
          </button>
          <button 
            onClick={() => setTab('VALIDATED')}
            className={`px-6 py-2 transition-all ${tab === 'VALIDATED' ? 'bg-white border-2 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-widest' : 'bg-slate-100 text-slate-400 text-xs font-black uppercase tracking-widest border-2 border-transparent hover:text-slate-600'}`}
          >
            Validated ({mockReports.filter(r => r.status === 'VALIDATED').length})
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          <PlusCircle className="w-4 h-4" /> New Report
        </button>
      </div>

      <div className="border-2 border-slate-900 overflow-hidden bg-white flex-grow shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-widest font-black">
            <tr>
              <th className="p-4 border-r border-slate-700">Visit Date</th>
              <th className="p-4 border-r border-slate-700">Customer / Account</th>
              <th className="p-4 border-r border-slate-700">Report Preamble</th>
              <th className="p-4">Sales Rep</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-slate-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 mb-4 opacity-50" />
                  <p className="font-bold text-sm tracking-wide">NO REPORTS IN THIS QUEUE</p>
                </td>
              </tr>
            ) : (
              filtered.map(report => {
                const d = mockCustomers.find(x => x.id === report.customerId);
                const r = mockSalesReps.find(x => x.id === report.repId);
                return (
                  <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group cursor-pointer">
                    <td className="p-4 font-mono font-bold text-slate-500">{format(new Date(report.visitDate), 'MMM dd, yyyy').toUpperCase()}</td>
                    <td className="p-4"><span className="text-blue-800 font-bold underline decoration-blue-200 underline-offset-4 max-w-[200px] truncate block" title={d?.name}>{d?.name}</span></td>
                    <td className="p-4 text-slate-600 italic max-w-xs truncate font-serif" title={report.preamble}>"{report.preamble}"</td>
                    <td className="p-4 font-bold text-slate-900">{r?.name}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const CustomersList = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-4">
        <div>
          <h1 className="text-4xl font-serif font-black text-slate-900">Customer List</h1>
          <p className="text-sm font-medium text-slate-500 mt-2 hover:text-slate-900 transition-colors">Manage accounts and geography for the field.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-900 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
            <DownloadIcon className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            <PlusCircle className="w-4 h-4" /> Add Customer
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input type="text" placeholder="SEARCH ACCOUNTS..." className="border border-slate-900 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest w-64 placeholder:text-slate-400" />
        <select className="border border-slate-900 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-900">
          <option value="">ALL STATES</option>
          <option value="TX">TX</option>
          <option value="NE">NE</option>
        </select>
        <select className="border border-slate-900 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-900">
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>

      <div className="border-2 border-slate-900 overflow-hidden bg-white flex-grow shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-widest font-black">
            <tr>
              <th className="p-4 border-r border-slate-700">Company Name</th>
              <th className="p-4 border-r border-slate-700">City</th>
              <th className="p-4 border-r border-slate-700">State</th>
              <th className="p-4 border-r border-slate-700">Status</th>
              <th className="p-4 border-r border-slate-700">Year Added</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map(dealer => (
              <tr key={dealer.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="p-4"><span className="text-blue-800 font-bold underline decoration-blue-200 underline-offset-4">{dealer.name}</span></td>
                <td className="p-4 text-slate-900 font-bold">{dealer.city}</td>
                <td className="p-4 font-mono font-bold text-slate-500">{dealer.state}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest ${dealer.status === 'ACTIVE' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {dealer.status}
                  </span>
                </td>
                <td className="p-4 font-mono font-bold text-slate-500">{dealer.yearAdded}</td>
                <td className="p-4 text-right">
                   <button className="text-[10px] font-black hover:text-blue-800 text-slate-900 uppercase tracking-widest border border-transparent group-hover:border-slate-300 px-3 py-1 bg-white">View History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ManufacturersList = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-4">
        <div>
          <h1 className="text-4xl font-serif font-black text-slate-900">Manufacturer Directory</h1>
          <p className="text-sm font-medium text-slate-500 mt-2 hover:text-slate-900 transition-colors">Active manufacturers are used to determine email report routing.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          <PlusCircle className="w-4 h-4" /> Add Manufacturer
        </button>
      </div>
      
      <div className="border-2 border-slate-900 overflow-hidden bg-white shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-widest font-black">
            <tr>
              <th className="p-4 border-r border-slate-700">Manufacturer Name</th>
              <th className="p-4 border-r border-slate-700">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockManufacturers.map(vendor => (
              <tr key={vendor.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="p-4"><span className="text-blue-800 font-bold underline decoration-blue-200 underline-offset-4">{vendor.name}</span></td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest ${vendor.status === 'ACTIVE' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {vendor.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-[10px] font-black hover:text-blue-800 text-slate-900 uppercase tracking-widest border border-transparent group-hover:border-slate-300 px-3 py-1 bg-white transition-all">Routing Rules</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const RepsList = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-4">
        <div>
          <h1 className="text-4xl font-serif font-black text-slate-900">Sales Rep Roster</h1>
          <p className="text-sm font-medium text-slate-500 mt-2 hover:text-slate-900 transition-colors">Manage field representation profiles.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          <PlusCircle className="w-4 h-4" /> Add User
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockSalesReps.map(rep => (
          <div key={rep.id} className="border-2 border-slate-900 p-8 bg-white shadow-[8px_8px_0_0_rgba(15,23,42,1)] flex flex-col items-center text-center">
            <div className="w-16 h-16 border-2 border-slate-900 rounded-none flex items-center justify-center text-slate-900 mb-6 relative overflow-hidden">
                <Users className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-black text-2xl text-slate-900 mb-2">{rep.name}</h3>
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-blue-800 mb-6">{rep.territories.join(' / ')}</p>
            <div className="w-full flex justify-between border-t-2 border-slate-100 pt-6 mt-auto">
              <div className="text-left">
                <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Status</div>
                <div className={`text-[10px] font-black tracking-widest uppercase ${rep.status === 'ACTIVE' ? 'text-slate-900' : 'text-slate-400'}`}>{rep.status}</div>
              </div>
              <div className="text-right flex items-end">
                <button className="text-[10px] font-black hover:text-blue-800 text-slate-900 uppercase tracking-widest">Edit Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PendingReports = () => {
  const pending = mockReports.filter(r => r.status === 'VALIDATED');
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-4">
        <div>
          <h1 className="text-4xl font-serif font-black text-slate-900">Send Pending Reports</h1>
          <p className="text-sm font-medium text-slate-500 mt-2 hover:text-slate-900 transition-colors">Distribute approved calls to principals.</p>
        </div>
      </div>
      
      {pending.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-slate-500 bg-slate-50 border-2 border-slate-900 border-dashed m-12">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6 opacity-80" />
          <h2 className="text-2xl font-serif font-black text-slate-900 mb-2">Queue is Empty</h2>
          <p className="font-bold text-sm tracking-widest uppercase">There are no validated reports waiting to be distributed.</p>
        </div>
      ) : (
        <>
          <div className="bg-slate-900 text-white rounded-none p-6 mb-8 flex justify-between items-center shadow-[8px_8px_0_0_rgba(15,23,42,0.2)]">
            <div>
              <p className="font-serif font-black text-3xl mb-1">{pending.length} Reports Ready</p>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Reports will be batched and emailed out to Manufacturers according to routing rules.</p>
            </div>
            <button className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-none">
              <Send className="w-5 h-5" /> Process & Send Queue
            </button>
          </div>
          
          <div className="border-2 border-slate-900 overflow-hidden bg-white shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-widest font-black">
                <tr>
                  <th className="p-4 border-r border-slate-700">Visit Date</th>
                  <th className="p-4 border-r border-slate-700">Customer</th>
                  <th className="p-4 border-r border-slate-700">Rep</th>
                  <th className="p-4">Matched Manufacturers</th>
                </tr>
              </thead>
              <tbody>
                {pending.map(report => {
                  const d = mockCustomers.find(x => x.id === report.customerId);
                  const r = mockSalesReps.find(x => x.id === report.repId);
                  const vNames = report.manufacturersRelevant.map(vid => mockManufacturers.find(v => v.id === vid)?.name).filter(Boolean);
                  return (
                    <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-500">{format(new Date(report.visitDate), 'MMM dd, yyyy').toUpperCase()}</td>
                      <td className="p-4"><span className="text-blue-800 font-bold underline decoration-blue-200 underline-offset-4">{d?.name}</span></td>
                      <td className="p-4 font-bold text-slate-900">{r?.name}</td>
                      <td className="p-4">
                        <div className="flex gap-2 flex-wrap">
                          {vNames.map(vName => (
                            <span key={vName} className="bg-slate-100 text-slate-900 text-[10px] px-2 py-1 font-black uppercase tracking-widest">
                              {vName}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

