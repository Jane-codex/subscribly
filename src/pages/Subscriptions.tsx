import { useState } from "react";
import { Search } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";


import netflixlogo from "../assets/netflixlogo.png";
import spotifylogo from "../assets/spotifylogo.png";
import groupline from "../assets/groupline.png";
import canvalogo from "../assets/canvalogo.png";
import applelogo from "../assets/applelogo.png";
import dropbox from "../assets/dropbox.png";
import jira from "../assets/jira.png";

const subscriptionsData = [
  { id: 1, name: "Netflix", desc: "Streamline Movies and shows.", frequency: "Monthly", active: true, logo: netflixlogo },
  { id: 2, name: "AJo with Sophie, Lagos Nigeria", desc: "Group saving monthly plan.", frequency: "Monthly", active: true, logo: groupline },
  { id: 3, name: "AJo Gbemi", desc: "Group saving monthly plan.", frequency: "Monthly", active: true, logo: groupline },
  { id: 4, name: "Spotify", desc: "Streamline Music Platform.", frequency: "Yearly", active: true, logo: spotifylogo },
   { id: 5, name: "Canva", desc: "Creative platform for designs.", frequency: "Monthly", active: true, logo: canvalogo },
   { id: 6, name: "AJo with Linda.", desc: "Group saving monthly plan.", frequency: "Monthly", active: true, logo: groupline },
  { id: 7, name: "Apple Music", desc: "Creative platform for designs.", frequency: "Monthly", active: true, logo: applelogo },
  { id: 8, name: "Atlassian JIRA", desc: "Plan, track, and release great software.", frequency: "Monthly", active: true, logo: jira },
  { id: 9, name: "Dropbox", desc: "Everything you need for work, all in one place.", frequency: "Monthly", active: true, logo: dropbox },
];

export default function SubscriptionsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeSubs, setActiveSubs] = useState(subscriptionsData);

  const navigate = useNavigate();

 const toggleSubscription = (id: number) => {
   setActiveSubs((prev) => prev.map((sub) => sub.id === id ? {...sub, active: !sub.active } : sub
  )
  );
 };
 
const filteredSubscriptions = activeSubs.filter((sub) => {
  const matchesTab = filter === "All" || sub.frequency === filter;
  const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase());
  return matchesTab && matchesSearch;
});
  const frequencies = ["All", "Weekly", "Bi-Weekly", "Monthly", "Yearly", "Others"];


 return (
    <div className="p-4 md:p-8 bg-black min-h-screen text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-krona">Subscriptions</h1>
          <p className="text-slate-400 text-xs md:text-sm">Manage all subscription plans</p>
        </div>
        <Button 
          onClick={() => navigate('/subscription/join')}
        className="w-full sm:w-auto bg-red-800 hover:bg-red-900 rounded-xl px-6 h-12 flex items-center justify-center gap-2 font-bold whitespace-nowrap">
          <span className="text-xl">+</span> Join New Subscription
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-10">
        <div className="flex bg-[#0B0B0B] p-1 rounded-xl border border-slate-900 overflow-x-auto max-w-full no-scrollbar">
          {frequencies.map((freq) => (
            <button
              key={freq}
              onClick={() => setFilter(freq)}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm transition-all whitespace-nowrap ${
                filter === freq ? "bg-white/10 text-white font-bold" : "text-slate-500 hover:text-white"
              }`}
            >
              {freq}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full flex-1">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0B0B0B] border-slate-900 pl-12 h-12 rounded-xl w-full text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={() => setSearch("")} 
              className="flex-1 sm:flex-none text-slate-400 font-medium px-4 py-3 hover:text-white text-sm"
            >
              Clear
            </button>
            <Button className="flex-1 sm:flex-none bg-red-800 hover:bg-red-900 rounded-xl px-8 h-12 font-bold text-sm">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredSubscriptions.map((sub) => (
          <div 
            key={sub.id} 
            className="bg-[#0B0B0B] border border-slate-900 rounded-[24px] p-5 md:p-6 hover:border-red-900/40 transition-all flex flex-col justify-between h-auto min-h-[220px]"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={sub.logo} alt={sub.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-white leading-tight break-words">{sub.name}</h3>
              </div>
              <Switch 
                checked={sub.active}
                onCheckedChange={() => toggleSubscription(sub.id)}
                className="data-[state=checked]:bg-red-700 data-[state=unchecked]:bg-[#1A1A1A] scale-90 md:scale-100" 
              />
            </div>
            
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4 line-clamp-3">
              {sub.desc}
            </p>
            
            <div className="pt-4 border-t border-slate-900/50 mt-6 text-right">
              <button
                onClick={() => navigate(`/subscription/${sub.id}`)}
                className="text-red-700 text-xs md:text-sm font-bold hover:text-red-500 transition-colors py-1"
              >
                View Subscription
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSubscriptions.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p>No subscriptions found.</p>
        </div>
      )}
    </div>
  );
}