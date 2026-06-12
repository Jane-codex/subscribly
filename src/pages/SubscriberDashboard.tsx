import { useEffect, useState } from "react";
import { 
    Wallet, Plus, 
  Calendar, ChartLine, FileChartColumn
} from "lucide-react";
import { useOutletContext, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WithdrawModal from "@/components/WithdrawModal";
import FundWalletModal from "@/components/FundWalletModal";
import AddBankModal from "@/components/AddBankModal";
import ConfirmWithdrawalModal from "@/components/ConfirmWithdrawalModal";

// Assumed Asset Paths
import netflixLogo from "../assets/netflix-logo.png";
import appleLogo from "../assets/apple-logo.png";
import canvaLogo from "../assets/canva-logo.png";
import spotifyLogo from "../assets/spotify-logo.png";
import ajoLogo from "../assets/ajo-log.png";
import appleIcon from "../assets/apple-icon.png";
import canvaIcon from "../assets/canva-icon.png";
import netflixIcon from "../assets/netflix-icon.png";
import spotifyIcon from "../assets/spotify-icon.png";
import ajoIcon from "../assets/ajo-icon.png";


// This defines custom notification structure
interface AppNotification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'fund' | 'withdraw'; 
  methodType?: string; 
}

export default function Dashboard() {
  const [isReturning, setIsReturning] = useState(false);
  const location = useLocation();
  const [isFundOpen, setIsFundOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const [bankData, setBankData] = useState({ name: "UBA", number: "2075975944", holder: "Ebiwari Meshach" });
   const [isProcessing, setIsProcessing] = useState(false);
const [isFinished, setIsFinished] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
const [tempAmount, setTempAmount] = useState("");
  const { userName, setNotifications, setHasUnread, setActiveToast } = useOutletContext<any>();

 useEffect(() => {
    // 1. Check React Router State first
    const stateFlag = location.state?.isReturningUser;

    // 2. Check LocalStorage fallback second
    const storageFlag = localStorage.getItem('isReturningUser') === 'true';

    // 3. If EITHER is true, this is a returning user!
    if (stateFlag || storageFlag) {
      setIsReturning(true);
    }

    // 4. Clean up the localStorage flag immediately so a page refresh clears it
    localStorage.removeItem('isReturningUser');
    
    // 5. Clean up the router state history so a refresh clears that too
    window.history.replaceState({}, document.title);
  }, []); 


const handleWithdrawClick = (amount: string) => {
  setTempAmount(amount);
  setIsWithdrawOpen(false); 
  setIsConfirmOpen(true);
};

const handleFinalProceed = () => {
  setIsProcessing(true); 
  setTimeout(() => {
    setIsFinished(true); 

    const withdrawNotif: AppNotification = {
      id: Date.now(),
      type: 'withdraw',
      title: "Withdrawal Successful",
      message: `You successfully withdrew ₦${Number(tempAmount).toLocaleString()}`,
      time: "Just now",
    };

    setNotifications((prev: any) => [withdrawNotif, ...prev]); 
    setHasUnread(true);
    setActiveToast(withdrawNotif);
    
    
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(_err => {});
    setTimeout(() => {
      setIsConfirmOpen(false);
      setIsProcessing(false);
      setIsFinished(false);
      setTempAmount("");
    }, 2500);
  }, 2000);
};

  const handleAddNotification = (amount: string, method: string) => {
  const formattedAmount = formatCurrency(amount);
  const isBank = method === 'uba';
  const methodLabel = isBank ? 'Bank Transfer' : `${method.charAt(0).toUpperCase() + method.slice(1)} Card`;

  const newNotif: AppNotification = {
  id: Date.now(),
  type: 'fund',
  title: "Wallet Funded",
  message: `You added ₦${formattedAmount} via ${methodLabel} successfully!`,
  methodType: isBank ? 'bank' : 'card',
  time: "Just now",
};
  setNotifications((prev: any) => [newNotif, ...prev]);
  setHasUnread(true);
  setActiveToast(newNotif);
  
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  audio.play().catch(_err => {});

  setTimeout(() => setActiveToast(null), 6000);
};

const formatCurrency = (val: string) => {
  return Number(val).toLocaleString('en-US');
};

  // Data Objects
  const subscriptions = [
    { name: "AJo with Sophie, Lagos Nigeria", amount: "₦30,000", date: "Nov 08, 2023", schedule: "25th of every month", logoImg: ajoLogo, isImage: true },
    { name: "Netflix", amount: "₦7,000", date: "Nov 08, 2023", schedule: "25th of every month", logoImg: netflixLogo, color: "text-[#E50914]", isImage: true },
    { name: "Spotify", amount: "₦7,000", date: "Nov 08, 2023", schedule: "25th of every month", logoImg: spotifyLogo, color: "text-[#1DB954]", isImage: true },
    { name: "Canva", amount: "₦7,000", date: "Nov 08, 2023", schedule: "25th of every month", logoImg: canvaLogo, color: "text-[#00C4CC]", isImage: true },
    { name: "Apple Music", amount: "₦7,000", date: "Nov 08, 2023", schedule: "25th of every month", logoImg: appleLogo, isImage: true },
        { name: "AJo with Linda", amount: "₦30,000", date: "Nov 08, 2023", schedule: "25th of every month", logoImg: ajoLogo, isImage: true },
  ];

  // Data for the Transactions
  const transactions = [
    { name: "Netflix", date: "25/06/2024", amount: "- ₦7,000.00", logoImg: netflixIcon, isImage: true },
    { name: "AJo with Sophie, Lagos Nigeria", date: "25/06/2024", amount: "- ₦30,000.00", logoImg: ajoIcon, isImage: true },
    { name: "Spotify", date: "25/06/2024", amount: "- ₦7,000.00", logoImg: spotifyIcon, isImage: true },
    { name: "Canva", date: "25/06/2024", amount: "- ₦7,000.00", logoImg: canvaIcon, isImage: true },
    { name: "Apple Music", date: "25/06/2024", amount: "- ₦7,000.00",  logoImg: appleIcon,  isImage: true },
    { name: "AJo Gbemi", date: "25/06/2024", amount: "- ₦30,000.00", logoImg: ajoIcon, isImage: true },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden">
    
      {/* --- MAIN CONTENT AREA --- */}
      <main className="p-4 md:p-8 max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-bold mb-8 italic">
  {isReturning ? "Welcome back, " : "Welcome, "}
  <span className="text-orange-500">{userName}</span>
</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
        {[
    { 
      label: "Total Number of Subscriptions", 
      value: "12", 
      iconColor: "text-blue-500", 
      bgHover: "group-hover:border-blue-500/30" 
    },
    { 
      label: "Total Number of Active Subscriptions", 
      value: "8", 
      iconColor: "text-green-500", 
      bgHover: "group-hover:border-green-500/30" 
    },
    { 
      label: "Total Number of Canceled Subscriptions", 
      value: "4", 
      iconColor: "text-red-500", 
      bgHover: "group-hover:border-red-500/30" 
    },
   ].map((stat, i) => (
    <div 
      key={i} 
      className={`bg-[#121212] p-8 rounded-2xl border border-white/5 relative group transition-all duration-300 ${stat.bgHover}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <ChartLine className={`w-4 h-4 ${stat.iconColor}`} strokeWidth={2.5} />
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider leading-none">
            {stat.label}
          </p>
        </div>
        
        <FileChartColumn 
          className={`w-5 h-5 opacity-40 group-hover:opacity-100 transition-all duration-500 ${stat.iconColor} drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]`} 
        />
      </div>

      <h3 className="text-3xl font-bold tracking-tight text-white">
        {stat.value}
      </h3>
    </div>
  ))}
 </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold">All Subscription</h2>
              <div className="flex gap-1 bg-[#121212] p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar max-w-full">
                {['All', 'Pending', 'Completed', 'Cancelled'].map((tab) => (
                  <button key={tab} className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${tab === 'Pending' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {subscriptions.map((sub, i) => (
                <div key={i} className="bg-[#121212] p-4 md:p-6 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-[#161616] transition-all cursor-pointer">
                  <div className="space-y-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Due Date: {sub.date}</p>
                    <div>
                      <h4 className="font-bold text-base md:text-lg text-white">{sub.name}</h4>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2">
                        <span className="text-sm text-slate-400 flex items-center gap-2"><Wallet className="w-4 h-4 text-slate-600" /> {sub.amount}</span>
                        <span className="text-sm text-slate-400 flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-600" /> {sub.schedule}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center min-w-[60px] md:min-w-[80px]">
                    <img src={sub.logoImg} alt={sub.name} className="w-12 h-12 md:w-20 md:h-20 object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-xl font-bold">Transactions</h2>
            
            <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
              <p className="text-slate-500 text-xs mb-1 flex items-center gap-2 font-medium"><Wallet className="w-3 h-3" /> Wallet Balance</p>
              <h3 className="text-3xl font-bold mb-8">₦100,000</h3>
             <div className="flex flex-col sm:flex-row gap-3 relative z-10">
  
    <Button 
    onClick={() => setIsWithdrawOpen(true)} 
    className="flex-1 bg-white text-[#b9000b] hover:bg-slate-100 rounded-xl h-11 text-xs font-bold transition-transform active:scale-95"
  >
    Withdraw Funds
  </Button>

  <Button 
    onClick={() => setIsFundOpen(true)} 
    className="flex-1 bg-red-700 hover:bg-red-800 text-white rounded-xl h-11 text-xs font-bold gap-2"
  >
    <Plus className="w-4 h-4" /> Fund wallet
  </Button>
</div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full border-[15px] border-white/5 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
            </div>

            <div className="bg-[#121212] rounded-[2rem] border border-white/5 p-6">
              <h4 className="text-sm font-bold mb-8">Recent Transactions</h4>
              <div className="space-y-6">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                        <img src={tx.logoImg} className="w-8 h-8 md:w-9 md:h-9 object-contain" alt={tx.name} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-100">{tx.name}</p>
                        <p className="text-[10px] text-slate-500 mt-1 font-medium">{tx.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-red-600/90">{tx.amount}</span>
                  </div>
                ))}
              </div>
              <button className="w-full text-center text-red-700 text-xs font-bold mt-8 hover:underline">Show more</button>
            </div>
          </div>
        </div>
      </main>

  {/* Fund Wallet Modal */}
<FundWalletModal 
  key={isFundOpen ? "fund" : "closed"}
  isOpen={isFundOpen} 
  onClose={() => setIsFundOpen(false)} 
  onSuccess={(amt, meth) => handleAddNotification(amt, meth)} 
/>

{/* Withdraw Modal */}
<WithdrawModal 
 key="withdraw-modal-instance" 
  isOpen={isWithdrawOpen} 
  onClose={() => setIsWithdrawOpen(false)} 
  bankData={bankData} // Passes current data down
  onOpenAddBank={() => setIsAddBankOpen(true)}
 onSuccess={handleWithdrawClick}
/>

{/* AddBank Modal */}
<AddBankModal 
  isOpen={isAddBankOpen} 
  onClose={() => setIsAddBankOpen(false)}
  onAdd={(name, num, bank) => {
    setBankData({ name: bank, number: num, holder: name });
    setIsAddBankOpen(false);
    setIsWithdrawOpen(true); 
  }}
/>

{/* The Confirmation Modal */}
    <ConfirmWithdrawalModal 
      isOpen={isConfirmOpen}
      isProcessing={isProcessing} 
       isFinished={isFinished}    
      amount={tempAmount}   
      accountNumber={bankData.number}
      onClose={() => setIsConfirmOpen(false)}
      onConfirm={handleFinalProceed}
    />
    </div>
  );
}
