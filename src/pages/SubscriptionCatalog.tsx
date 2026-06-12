import React from 'react';
import { useState } from 'react';
import { Home, ChevronRight, Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JoinModal from '@/components/JoinModal';

import netflixlogo from "@/assets/netflixlogo.png";
import github from "../assets/github.png";
import figma from "../assets/figma.png";
import zapier from "../assets/zapier.png";
import notion from "../assets/notion.png";
import slack from "../assets/slack.png";

export const SubscriptionCatalog = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState(false);
  const [activePlan, setActivePlan] = React.useState<any>(null);
   const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
   const CATEGORIES = ["All", "Entertainment", "Developer Tools", "Design", "Productivity"];
   const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
       



  const [plans, setPlans] = useState([
    { id: 1, name: 'Netflix', desc: 'Streamline Movies and shows.', logo: netflixlogo, active: true, category: 'Entertainment' },
    { id: 2, name: 'GitHub', desc: 'Link pull requests and automate workflows.', logo: github, active: true, category: 'Developer Tools' },
    { id: 3, name: 'Figma', desc: 'Embed file previews in projects.', logo: figma, active: true, category: 'Design' },
    { id: 4, name: 'Zapier', desc: 'Build custom automations and integrations.', logo: zapier, active: true, category: 'Productivity' },
    { id: 5, name: 'Notion', desc: 'Embed notion pages and notes in projects.', logo: notion, active: true, category: 'Productivity' },
    { id: 6, name: 'Slack', desc: 'Send notifications to channels and create projects.', logo: slack, active: false, category: 'Communication' },
  ]);

const filteredPlans = plans.filter((plan) => {
  const matchesSearch = 
    plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.desc.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesCategory = 
    selectedCategory === "All" || 
    plan.category === selectedCategory;

  return matchesSearch && matchesCategory;
});


const togglePlan = (id: number) => {
  setPlans(prevPlans => 
    prevPlans.map(plan => 
      plan.id === id ? { ...plan, active: !plan.active } : plan
    )
  );
};

  const openJoinModal = (plan: any) => {
    console.log("Button clicked for:", plan.name);
    setActivePlan(plan);
    setIsJoinModalOpen(true);
  };

 
 return (
  <div className="min-h-screen bg-[#0B0B0C] text-white pt-2 p-4 md:p-6 font-sans">
    <nav className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
      <span className="cursor-pointer hover:text-white shrink-0" onClick={() => navigate("/dashboard")}>
        <Home size={18} />
      </span>
      <ChevronRight size={12} className="shrink-0" />
      <span className="cursor-pointer hover:text-white transition-colors tracking-wider shrink-0">Subscription</span>
      <ChevronRight size={12} className="shrink-0" />
      <span className="text-slate-600">...</span>
      <ChevronRight size={12} className="shrink-0" />
      <span className="text-red-500 shrink-0">Netflix</span>
    </nav>

    <header className="mb-6">
      <h1 className="text-xl md:text-2xl font-bold mb-1">Subscription</h1>
      <p className="text-slate-500 text-xs md:text-sm">Manage all subscription plans</p>
    </header> 
    <div className="w-full mb-12 border border-slate-800 rounded-xl p-4">
      <label className="block text-slate-300 text-xs mb-2 ml-1">
        Subscribtion Link
      </label>
<div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
 <div className="flex-1 flex items-center bg-[#111315] border border-slate-700 rounded-xl overflow-hidden h-[52px] md:h-[60px] transition-all focus-within:border-red-600">
    
  <div className="pl-3 pr-3 md:pl-5 md:pr-4 text-slate-500 text-[10px] md:text-sm whitespace-nowrap flex items-center h-full bg-black/10 shrink-0">
    /Subscription Link
    <div className="ml-2 md:ml-4 w-[1px] h-4 md:h-6 bg-slate-800" />
  </div>
  <input 
    type="text" 
    placeholder="Enter Link"
    className="flex-1 bg-transparent border-none outline-none text-white text-xs md:text-base px-4 py-3 placeholder:text-slate-600 w-full min-w-0"
  />
</div>
  <button className="w-full md:w-auto bg-[#A91212] hover:bg-red-700 text-white font-bold h-[52px] md:h-[60px] px-10 rounded-xl transition-all text-sm md:text-base whitespace-nowrap">
    Join
  </button>
</div>

      <p className="text-slate-500 text-[10px] md:text-[11px] mt-3 ml-1">
        Join a subscription by inserting subscribers link
      </p>
    </div>
    <div className="bg-[#1018280D]/50 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm md:text-base font-bold">Popular Subscription Plans</h3>
          <p className="text-slate-500 text-[10px] md:text-xs">Select a subscription plan from the list of popular plans</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161B26] border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-600 transition-colors" 
              placeholder="Search transaction" 
            />
          </div>
  <div className="relative w-full sm:w-auto">
    <button 
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="w-full bg-[#161B26] border border-slate-700 px-4 py-2 rounded-lg text-sm flex items-center justify-between sm:justify-center gap-2 text-slate-300 hover:text-white transition-colors"
    >
      {selectedCategory === "All" ? "Category" : selectedCategory}
      <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
    </button>

    {/* Dropdown Menu */}
    {isDropdownOpen && (
      <>
        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
        
        <div className="absolute right-0 mt-2 w-full sm:w-48 bg-[#111315] border border-slate-700 rounded-xl shadow-2xl z-20 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setIsDropdownOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                selectedCategory === cat 
                  ? 'bg-red-600/10 text-red-500 font-bold' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </>
    )}
  </div>
        </div>
      </div>

      {/* 4. The List */}
      <div className="overflow-x-auto">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors border-b border-slate-800/50 last:border-0 min-w-[400px] md:min-w-full">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center p-2 shadow-inner shrink-0">
                <img src={plan.logo} alt={plan.name} className="w-full h-full object-contain" />
              </div>

              <div>
                <h4 className="text-xs md:text-sm font-bold text-white">{plan.name}</h4>
                <p className="text-slate-500 text-[9px] md:text-[10px] leading-tight max-w-[150px] md:max-w-[200px]">
                  {plan.desc}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6">
              <button 
              onClick={() => openJoinModal(plan)} 
              className={`text-[10px] md:text-[11px] font-bold transition-colors duration-300 whitespace-nowrap ${
                plan.active 
                  ? 'text-red-900/40 cursor-not-allowed' 
                  : 'text-red-600 hover:text-red-500 cursor-pointer'
              }`}
              disabled={plan.active} 
            >
              Join Subscription
            </button>
              
              <div 
                onClick={() => togglePlan(plan.id)}
                className={`w-8 h-4 md:w-10 md:h-5 rounded-full relative cursor-pointer transition-all duration-300 shrink-0 ${plan.active ? 'bg-[#FF6473]' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-0.5 md:top-1 w-3 h-3 bg-black rounded-full transition-all duration-300 ${plan.active ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Table Footer --- */}
       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-white/5">
  <p className="text-sm text-slate-600 font-medium order-2 sm:order-1">
    Page <span className="text-slate-400">1</span> of <span className="text-slate-400">10</span>
  </p>
  <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
    <button 
      className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-white/10 text-sm font-semibold text-slate-500 hover:bg-white/5 hover:text-white transition-all disabled:opacity-50" 
      disabled
    >
      Previous
    </button>
    <button 
      className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-white/10 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-all"
    >
      Next
    </button>
  </div>
</div>
    </div>

    <JoinModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
        plan={activePlan} 
      />
  </div>
);
};