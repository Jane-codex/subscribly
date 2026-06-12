import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from 'react-router-dom';

// Mock data for the subscribers table
export const INITIAL_SUBSCRIBERS = [
   { id: "SUB021", name: "Tg Morah", email: "olivia@untitledui.com", phone: "+2349021609303", status: "Inactive", city: "Lagos", plan: "Linear Basic Plan" },
  { id: "SUB123", name: "Aliu Muibi Hammed", email: "phoenix@untitledui.com", phone: "+2349021609303", status: "Active", city: "Ondo", plan: "Linear Premium Plan" },
  { id: "SUB109", name: "Rasak Ojoola", email: "lana@untitledui.com", phone: "+2349021609303", status: "Active", city: "Ogun" },
  { id: "SUB213", name: "Yinka Daramola", email: "demi@untitledui.com", phone: "+2349021609303", status: "Active", city: "Enugu" },
  { id: "SUB987", name: "Seun Orofin", email: "candice@untitledui.com", phone: "+2349021609303", status: "Active", city: "Oyo" },
  { id: "SUB090", name: "Lota Okeke", email: "natali@untitledui.com", phone: "+2349021609303", status: "Active", city: "Rivers" },
  { id: "SUB324", name: "Emmanuella Etuk", email: "drew@untitledui.com", phone: "+2349021609303", status: "Active", city: "Imo" },
  { id: "SUB122", name: "Sinclair Ajoku", email: "orlando@untitledui.com", phone: "+2349021609303", status: "Inactive", city: "Lagos" },
  { id: "SUB125", name: "Opemipo Oladinni", email: "andi@untitledui.com", phone: "+2349021609303", status: "Active", city: "Ogun" },
  { id: "SUB1", name: "Amara Okeke", email: "kate@untitledui.com", phone: "+2349021609303", status: "Active", city: "Ekiti" },
];

export default function SubscriptionBreakdown() {
  const [subscribers] = useState(INITIAL_SUBSCRIBERS);

  return (
    <div className="min-h-screen bg-gray-100 pb-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Linear Basic Plan</h1>
            <p className="text-sm text-zinc-500 mt-0.5">Manage all subscription plans</p>
          </div>
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
  <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
  <span>&rsaquo;</span>
  
  <Link 
    to="/provider/subscriptions" 
    className="hover:text-zinc-600 transition-colors cursor-pointer"
  >
    Subscription
  </Link>
  
  <span>&rsaquo;</span>
  <span className="text-zinc-400">...</span>
  <span>&rsaquo;</span>
  <span className="text-[#A60615] font-bold">Linear Basic Plan</span>
</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-6">
        
        {/* ===== PLAN SUMMARY ===== */}
        <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900">Basic plan</h2>
                   <span className="bg-[#A60615] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">Monthly</span>
                </div>
                <p className="text-xs text-zinc-400 font-medium max-w-sm">Our most popular plan for small teams.</p>
              </div>
              
              <div className="text-left sm:text-right">
                <div className="text-2xl font-black text-zinc-900 flex items-baseline sm:justify-end">
                  <span className="text-sm font-bold mr-0.5">₦</span>7,000
                  <span className="text-xs font-normal text-zinc-400 ml-1">per month</span>
                </div>
              </div>
            </div>


 
          {/* Active users capacity progress slider indicator */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-zinc-700">
              <span>145 of 200 active users</span>
            </div>
            <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF6473] rounded-full transition-all duration-500" style={{ width: "72.5%" }} />
            </div>
          </div>

          <div className="border-t border-zinc-100 mt-6 pt-4 flex justify-end">
            <button className="flex items-center gap-1.5 text-xs font-bold text-[#0066FF] hover:underline">
              Edit Subscription <span><ArrowUpRight size={18} /></span>
            </button>
          </div>
        </div>


        {/* ==== PLAN FEATURES LAYOUT GRID ==== */}
        <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Plan Features</h3>
            <p className="text-xs text-zinc-400">What your subscribers get</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-12 pt-2">
            {[
              "Access to basic features", "Up to 10 individual users",
              "Basic reporting and analytics", "20GB individual data each user",
              "Up to 10 individual users", "Basic chat and email support"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-zinc-600">
                <div className="w-5 h-5 rounded-full border border-[#A30B1E] flex items-center justify-center text-[#A30B1E] shrink-0 bg-red-50/10">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: "Total Plan Earnings", value: "₦2,446,020" },
            { label: "Total Active Subscribers", value: "24" },
            { label: "Total Inactive Subscribers", value: "4" }
          ].map((card, idx) => (
            <div key={idx} className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-zinc-400 tracking-tight">{card.label}</span>
                <div className="text-xl font-extrabold text-zinc-900">{card.value}</div>
              </div>
              <div className="p-2 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          ))}
        </div>


        {/* === DATATABLE SUBSCRIBERS BLOCK === */}
        <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Table Control Header */}
          <div className="p-5 flex items-center justify-between border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-zinc-900">Subscribers</h3>
              <span className="bg-[#A60615] text-[11px] font-black px-2 py-0.5 rounded-full">200 users</span>
            </div>
            <button className="text-zinc-400 hover:text-zinc-600 p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>

          {/* Core Structured Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
        <thead>
    <tr className="bg-zinc-50/70 border-b border-zinc-100 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
      <th className="py-3 px-5 w-12"><input type="checkbox" className="rounded border-zinc-300 accent-[#A30B1E]" /></th>
      <th className="py-3 px-4 font-bold border-r border-zinc-100">Subscriber ID</th>
      <th className="py-3 px-4 font-bold border-r border-zinc-100">Full Name</th>
      <th className="py-3 px-4 font-bold">Email Address</th>
      <th className="py-3 px-4 font-bold">Phone Number</th>
      <th className="py-3 px-4 font-bold">Status</th>
      <th className="py-3 px-4 font-bold border-r border-zinc-100">City</th>
      <th className="py-3 px-4 text-right font-bold pr-6">Actions</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-zinc-100 text-sm text-zinc-700">
    {subscribers.map((sub, index) => (
      <tr key={`${sub.id}-${index}`} className="hover:bg-zinc-50/40 transition-colors">
        <td className="py-3.5 px-5"><input type="checkbox" className="rounded border-zinc-300 accent-[#A30B1E]" /></td>
        <td className="py-3.5 px-4 font-bold text-zinc-900 text-xs border-r border-zinc-100">{sub.id}</td>
        <td className="py-3.5 px-4 font-medium text-zinc-600 border-r border-zinc-100">{sub.name}</td>
        
        <td className="py-3.5 px-4 text-zinc-400 text-xs">{sub.email}</td>
        <td className="py-3.5 px-4 text-zinc-500 font-mono text-xs">{sub.phone}</td>
        <td className="py-3.5 px-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight ${
            sub.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
          }`}>
            {sub.status}
          </span>
        </td>
        <td className="py-3.5 px-4 text-zinc-500 font-medium border-r border-zinc-100">{sub.city}</td>
        
        <td className="py-3.5 px-4 text-right pr-6">
          <Link 
            to={`/dashboard/provider/subscriber/${sub.id.replace(" ", "")}`} 
            className="text-[#A30B1E] font-medium hover:underline"
          >
            View More
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>

          {/* === FOOTER DATA PAGINATION ROW === */}
          <div className="p-4 border-t border-zinc-100 bg-white flex items-center justify-between gap-4">
            <button className="flex items-center gap-1.5 h-9 px-4 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors shadow-sm">
              <span>&larr;</span> Previous
            </button>
            
            <div className="hidden md:flex items-center gap-1">
              {[1, 2, 3, "...", 8, 9, 10].map((page, k) => (
                <button 
                  key={k}
                  className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-lg transition-all ${
                    page === 1 
                      ? "bg-red-50 border border-red-100 text-[#A30B1E]" 
                      : page === "..." 
                      ? "text-zinc-400 cursor-default" 
                      : "text-zinc-500 hover:bg-zinc-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-1.5 h-9 px-4 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors shadow-sm">
              Next <span>&rarr;</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}