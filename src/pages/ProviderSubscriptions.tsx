import MonthlySubscriptionChart from "@/components/MonthlySubscriptionChart";
import UserManagementChart from "@/components/UserManagementChart";
import { useState } from "react";
import { Link } from 'react-router-dom';
import AddPlanModal from "@/components/AddPlanModal";
import { 
  ChartLine,  
  FileChartColumn,
  MoreVertical
} from "lucide-react";
import linear from "../assets/linear.png";

// Mock Data for the Transactions Feed
const transactions = [
  { id: 1, name: "Sinclair Thompson", date: "06/01/2025", amount: "+ ₦5,244.00" },
  { id: 2, name: "Faith", Alex: "05/06/2025", amount: "+ ₦5,244.00" },
  { id: 3, name: "Udauk Sam", date: "04/01/2025", amount: "+ ₦5,244.00" },
  { id: 4, name: "Anie Effiong", date: "08/0/92025", amount: "+ ₦5,244.00" },
  { id: 5, name: "Samuel Udo", date: "02/07/2025", amount: "+ ₦5,244.00" },
  { id: 6, name: "Kelvin Codex", date: "04/02/2025", amount: "+ ₦5,244.00" },
  { id: 7, name: "Tony Morah", date: "06/09/2025", amount: "+ ₦5,244.00" },
  { id: 8, name: "Emmy Joe", date: "03/09/2025", amount: "+ ₦5,244.00" },
  { id: 9, name: "Jackson Samson", date: "08/01/2025", amount: "+ ₦5,244.00" },
];


  export default function ProviderSubscriptions() {
    const accountType = localStorage.getItem('accountType');
  const storedName = accountType === 'provider' 
    ? localStorage.getItem('providerName') 
    : localStorage.getItem('subscriberName');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select option");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);




return (

    <div className="min-h-screen bg-gray-100 text-zinc-900 font-sans antialiased pb-12">
      {/* === MAIN DASHBOARD === */}
      <main className="max-w-[1400px] mx-auto px-8 pt-10 space-y-10">
        <div>
          <h1 className="text-2xl font-bold mb-8 italic text-black">Welcome <span className="text-orange-500">{storedName || "Provider"}</span>
          </h1>
        </div>
        {/* ===== TOP METRIC CARDS ROW ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-500 font-medium text-sm">
                <ChartLine className="h-4 w-4 text-zinc-400" />
                <span>Total Earnings</span>
              </div>
              <p className="text-3xl font-bold tracking-tight text-zinc-900">₦2,546,020</p>
            </div>
            <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-400">
              <FileChartColumn className="h-4 w-4" />
            </div>
          </div>

          {/* Total Active Subscribers */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-500 font-medium text-sm">
                <ChartLine className="h-4 w-4 text-zinc-400" />
                <span>Total Active Subscribers</span>
              </div>
              <p className="text-3xl font-bold tracking-tight text-zinc-900">24</p>
            </div>
            <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-400">
              <FileChartColumn className="h-4 w-4" />
            </div>
          </div>

          {/* Total Inactive Subscribers */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-500 font-medium text-sm">
                <ChartLine className="h-4 w-4 text-zinc-400" />
                <span>Total Inactive Subscribers</span>
              </div>
              <p className="text-3xl font-bold tracking-tight text-zinc-900">4</p>
            </div>
            <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-400">
              <FileChartColumn className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Subscription Stats
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Chart Block 1: Average Monthly Subscription */}
           <div className="bg-white rounded-2xl p-4 md:p-6 border border-zinc-100 shadow-sm relative select-none">
    <div className="flex justify-between items-start mb-6">
    <div className="flex flex-col">
      <h3 className="font-bold text-zinc-900 text-sm md:text-lg tracking-tight">
        Average Monthly Subscription
      </h3>
      <p className="text-[10px] md:text-xs text-zinc-800">
        Track how your rating compares to your industry average.
      </p>
    </div>

    <button className="p-1.5 -mr-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-50 transition-colors shrink-0">
      <MoreVertical className="h-4 w-4" />
    </button>
  </div>

  {/* Dropdown Container */}
  <div className="flex justify-end w-full">
    <div className="relative z-20 w-full md:w-[290px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="h-[45px] w-full pl-4 pr-10 rounded-xl border border-zinc-200 bg-white text-sm font-normal text-zinc-500 flex items-center justify-between outline-none focus:border-zinc-300 transition-colors"
      >
        <span className="truncate">{selectedOption}</span>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
          <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 p-3 bg-white rounded-2xl border border-zinc-100 shadow-xl z-50 w-full">
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[40px] w-full pl-10 pr-4 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-600 outline-none"
            />
          </div>
          <div className="flex flex-col max-h-[200px] overflow-y-auto">
            {["All Subscription Plans", "Linear Basic", "Linear Silver", "Linear Bronze", "Linear Gold", "Linear Platinum", "Linear Diamond"]
              .filter(option => option.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                    setSearchQuery("");
                    if (option === "All Subscription Plans") setIsPlanModalOpen(true);
                  }}
                  type="button"
                  className="w-full text-left py-2.5 px-2 rounded-lg text-sm font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                >
                  {option}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Chart */}
  <div className="w-full h-64 mt-6">
    <MonthlySubscriptionChart />
  </div>
</div>

            {/* Chart Block: User Management Bar Data */}
              <div className="bg-white rounded-2xl p-4 md:p-6 border border-zinc-100 shadow-sm">
  <div className="flex justify-between items-start gap-4 mb-6">
    <div className="space-y-0.5">
      <h3 className="font-bold text-zinc-900 text-base md:text-lg tracking-tight">
        User management
      </h3>
      <p className="text-[10px] md:text-xs text-zinc-800">
        Track how your users subscribe to your plan
      </p>
    </div>

    <div className="flex flex-col items-end gap-3 shrink-0">
      <button className="p-1.5 -mr-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-50 transition-colors">
        <MoreVertical className="h-4 w-4" />
      </button>

      <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 text-[10px] md:text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-zinc-200" />
          <span className="text-zinc-500 whitespace-nowrap">Active Users</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#A30B1E]" />
          <span className="text-zinc-500 whitespace-nowrap">Inactive Users</span>
        </div>
      </div>
    </div>
  </div>

  <div className="w-full h-64 mt-2">
    <UserManagementChart />
  </div>
</div>
          </div>

          {/* RIGHT COLUMN: Subscription */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm space-y-6 flex flex-col justify-between min-h-[696px]">
            <div className="space-y-6 w-full">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-900 text-lg">Subscription Transactions</h3>
                <button className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-50"><MoreVertical className="h-4 w-4" /></button>
              </div>
              <div className="space-y-4 divide-y divide-zinc-100 max-h-[520px] overflow-y-auto pr-1">
                {transactions.map((tx, idx) => (
                  <div key={tx.id} className={`flex items-center justify-between pt-4 ${idx === 0 ? 'pt-0' : ''}`}>
                    <div className="space-y-1">
                      <p className="font-bold text-zinc-900 text-sm">{tx.name}</p>
                      <p className="text-xs text-zinc-400 font-medium">Subscription Date- {tx.date}</p>
                    </div>
                    <span className="text-emerald-600 text-sm font-bold tracking-tight">
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* View Footer */}
            <button className="w-full text-center text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors pt-4 border-t border-zinc-100">
              Show more
            </button>
          </div>
        </div>
      </main>

      {/* === OVERLAY PLAN MODAL PLATFORM === */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">

          {/* Layout Frame */}
          <div className="bg-gray-50 w-full max-w-[1400px] max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl flex flex-col relative animate-in zoom-in-95 duration-200">

            {/* Header / Action Blocks Row Container */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 w-full">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Subscriptions</h2>
                <p className="text-sm text-zinc-400 mt-1">Manage all subscription plans</p>
              </div>
             <div className="flex items-center gap-3 w-full md:w-auto">
            <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex-1 md:flex-none bg-[#A30B1E] text-white px-5 py-2.5 text-sm font-bold rounded-xl hover:bg-red-800 transition-colors shadow-sm whitespace-nowrap"
        >
          + Create New Plan
        </button>
  
            <AddPlanModal 
              isOpen={isCreateModalOpen} 
              onClose={() => setIsCreateModalOpen(false)} 
            />
            <button
              onClick={() => {
                setIsPlanModalOpen(false);
                setSelectedOption("Select option");
              }}
              className="shrink-0 p-2.5 rounded-xl bg-white text-zinc-400 hover:text-zinc-700 border border-zinc-200 hover:bg-zinc-100 transition-all shadow-sm flex items-center justify-center"
              title="Close Modal"
            >
              <svg className="w-5 h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
            </div>

            
           <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
  <div className="flex flex-none gap-2 w-full md:w-auto">
    <button className="flex-1 md:flex-none px-4 py-2 bg-zinc-800 text-white text-sm font-semibold rounded-xl whitespace-nowrap">
      All
    </button>
    <button className="flex-1 md:flex-none px-4 py-2 bg-white text-zinc-400 border border-zinc-200 text-sm font-medium rounded-xl hover:bg-zinc-50 whitespace-nowrap">
      Fixed
    </button>
    <button className="flex-1 md:flex-none px-4 py-2 bg-white text-zinc-400 border border-zinc-200 text-sm font-medium rounded-xl hover:bg-zinc-50 whitespace-nowrap">
      Flexible
    </button>
  </div>
  <div className="flex items-center gap-2 flex-1 w-full">
    <div className="relative flex-1">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search"
        className="h-11 w-full pl-11 pr-4 bg-gray border border-zinc-200 text-sm rounded-xl text-zinc-700 outline-none focus:border-zinc-300"
      />
    </div>
    <button className="h-11 px-5 bg-white border border-zinc-200 text-zinc-600 text-sm font-semibold rounded-xl hover:bg-zinc-50 flex-none">
      Clear
    </button>
    <button className="h-11 px-5 bg-[#A30B1E] text-white text-sm font-semibold rounded-xl hover:bg-red-800 flex-none">
      Search
    </button>
  </div>
</div>
            {/* Subscription Grid Array Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Linear Basic", logoFilter: "hue-rotate-[190deg] brightness-[1] saturate-[1.1]", active: true, price: "₦7,000", date: "25th Monthly", color: "" },

                { name: "Linear Silver", logoFilter: "grayscale brightness-170", active: false, price: "₦10,000", date: "25th Monthly", color: "" },

                { name: "Linear Bronze", logoFilter: "", active: true, price: "₦14,000", date: "25th Monthly", color: "bg-[]" },

                { name: "Linear Gold", logoFilter: "hue-rotate-[1deg] brightness-200 saturate-90", active: true, price: "₦20,000", date: "25th Monthly", color: "" },

                { name: "Linear Platinum", logoFilter: "grayscale brightness-110 contrast-125", active: true, price: "₦25,000", date: "25th Monthly", color: "" },

                { name: "Linear Diamond", logoFilter: "grayscale brightness-150 opacity-30", active: true, price: "₦50,000", date: "-", color: "bg-[]" },

              ].map((plan, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${plan.color} flex items-center justify-center`}>
                          <img
                            src={linear}
                            alt={`${plan.name} Logo`}
                            className={`w-full h-full object-cover ${plan.logoFilter}`}
                          />
                        </div>
                        <h3 className="font-bold text-zinc-900 text-base">{plan.name}</h3>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={plan.active} className="sr-only peer" />
                        <div className="w-9 h-5 bg-zinc-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF6473]"></div>
                      </label>
                    </div>
                    <div className="space-y-3 text-sm border-b border-zinc-50 pb-4 text-zinc-600 font-medium">
                      <div className="flex justify-between">
                        <span className="text-zinc-600">Number of Subscribers</span>
                        <span className="text-zinc-400">200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">Due Date</span>
                        <span className="text-zinc-400">{plan.date}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-zinc-600">Price</span>
                        <span className="text-sm font-bold text-[#A60615]">{plan.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 text-xs font-bold tracking-tight">
                    <button className="text-indigo-600 hover:text-indigo-800 transition-colors">Edit Subscription</button>
                   <Link
  to="/provider/subscriptions/plan/linear-basic"
  className="text-xs font-extrabold text-[#A30B1E] hover:underline flex items-center gap-1"
>
  View Subscription
</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  ); 
}