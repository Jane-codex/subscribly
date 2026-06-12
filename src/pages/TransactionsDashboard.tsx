import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Wallet, ArrowDown, CloudDownload } from "lucide-react";
import { Link } from "react-router-dom";
import filetypeicon from "../assets/Filetypeicon.png";
import metal3D from "../assets/Metal3D.png";
import WithdrawModal from "@/components/WithdrawModal";
import AddBankModal from "@/components/AddBankModal";
import ConfirmWithdrawalModal from "@/components/ConfirmWithdrawalModal";


const TRANSACTIONS = [
  { id: "tx-001", title: "Fund Withdrawal", date: "Dec 1, 2024 - 07:00:42", status: "Withdrawal", amount: "N 980,000" },
  { id: "tx-002", title: "Subscription payment", name: "Oladinni O.", date: "Nov 1, 2022", status: "Received", amount: "N 7,000" },
  { id: "tx-003", title: "Subscription payment", name: "Ud Sam.", date: "Nov 1, 2022", status: "Received", amount: "N 7,000" },
  { id: "tx-004", title: "Subscription payment", name: "Anie Effiong.", date: "Nov 1, 2022", status: "Received", amount: "N 7,000" },
  { id: "tx-005", title: "Subscription payment", name: "Amanda Samuel.", date: "Nov 1, 2022", status: "Received", amount: "N 7,000" },
  { id: "tx-005", title: "Fund Withdrawal", date: "Jul 1, 2022", status: "Withdrawal", amount: "N 763,000" },
  { id: "tx-005", title: "Subscription payment", name: "Tony M.", date: "Nov 1, 2022", status: "Received", amount: "N 7,000" },
];

interface AppNotification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'fund' | 'withdraw'; 
  methodType?: string; 
}

export default function TransactionsDashboard() {
   const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
   const [isAddBankOpen, setIsAddBankOpen] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);
   const [isFinished, setIsFinished] = useState(false);
   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
   const [tempAmount, setTempAmount] = useState("");
   const [bankData, setBankData] = useState({ name: "UBA", number: "2075975944", holder: "Ebiwari Meshach" });
   const { setNotifications, setHasUnread, setActiveToast } = useOutletContext<any>();


const handleWithdrawClick = (amount: string) => {
  setTempAmount(amount);
  setIsWithdrawOpen(false); 
  setIsConfirmOpen(true); // Open Modal (11)
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


  return (
    <div className="min-h-screen bg-gray-50 pb-16 font-sans antialiased">
      <div className="max-w-6xl mx-auto p-6 space-y-8">

        <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Tranactions History</h1>
            <p className="text-sm text-zinc-500 mt-0.5">Manage all transactions here</p>
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
            <Link 
    to="/provider/subscriptions/plan/linear-basic" 
    className="text-[#A60615] font-bold"
  >
    Linear Basic Plan
  </Link>
          </div>
        </div>
      </div>

     <div className="bg-[#202020] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl min-h-[180px] flex justify-between items-center">
 
  <div className="flex flex-col h-full justify-between z-10 gap-8">
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-zinc-500">
        <Wallet className="w-5 h-5" />
        <span className="text-sm font-medium">Wallet Balance</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">N 5,000,000</h1>
    </div>

    <div>
      <button 
        onClick={() => setIsWithdrawOpen(true)} 
        className="bg-[#A30B1E] hover:bg-[#8a0a19] transition-colors px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-1"
      >
        <CloudDownload className="w-4 h-4" />
        Withdraw Funds 
      </button>
    </div>
  </div>
  <div className="absolute -right-1 -bottom-0 w-32 h-32 md:right-0 md:bottom-0 md:w-48 md:h-48 opacity-40 md:opacity-80 z-0 pointer-events-none">
    <img 
      src={metal3D} 
      alt="" 
      className="w-full h-full object-contain"
    />
  </div>
  <div className="hidden md:block absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-white/5 to-transparent z-0" />
</div>
        {/* Table Section */}
       <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
  <div className="p-6 flex justify-between items-center border-b border-zinc-100">
    <div>
      <h2 className="text-lg font-bold text-zinc-900">All Invoices</h2>
      <p className="text-xs text-zinc-400">All transactions receipt and invoices</p>
    </div>
    <button className="flex items-center gap-2 text-xs font-bold text-zinc-600 border px-4 py-2 rounded-lg hover:bg-zinc-50">
      <CloudDownload className="w-4 h-4" /> Download Report
    </button>
  </div>
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-zinc-50/60 text-[11px] text-zinc-400 font-bold">
        <tr>
          <th className="p-4"><input type="checkbox" className="accent-[#A30B1E]" /></th>
          <th className="p-4">Invoice</th>
          <th className="p-4">
            <div className="flex items-center gap-1.3 cursor-pointer hover:text-zinc-700 transition-colors">
              Billing date <ArrowDown size={10} />
            </div>
          </th>
          <th className="p-4">Status</th>
          <th className="p-4">Amount</th>
          <th className="p-4"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-100 text-xs">
        {TRANSACTIONS.map((t) => (
          <tr key={t.id} className="hover:bg-zinc-50/50">
            <td className="py-4 pl-4 pr-0"><input type="checkbox" className="accent-[#A30B1E]" /></td>
            <td className="py-4 pl-0 pr-4 font-medium flex items-center gap-2 text-zinc-900">
              <div className="-ml-3 flex items-center justify-center w-7 h-7 shrink-0">
                <img src={filetypeicon} alt="" className="w-full h-full object-contain" />
              </div>
              {t.title} {t.name ? <span className="text-zinc-500">- {t.name}</span> : ""}
            </td>
            <td className="p-4 text-zinc-500">{t.date}</td>
            <td className="p-4">
              <span className={`px-2 py-1 rounded-full font-bold ${t.status === 'Received' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {t.status === 'Received' ? '✓ Received' : '× Withdrawal'}
              </span>
            </td>
            <td className="p-4 font-semibold text-zinc-700">{t.amount}</td>
            <td className="p-4 text-[#A30B1E] font-bold cursor-pointer hover:underline text-right">Download</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="md:hidden divide-y divide-zinc-100">
    {TRANSACTIONS.map((t) => (
      <div key={t.id} className="p-4 flex items-center justify-between hover:bg-zinc-50/50">
        <div className="flex items-center gap-3">
          <input type="checkbox" className="accent-[#A30B1E]" />
          <div className="w-8 h-8 shrink-0">
            <img src={filetypeicon} alt="" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-900">{t.title}</p>
            <p className="text-[10px] text-zinc-400">{t.date}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-zinc-900">{t.amount}</p>
          <p className={`text-[10px] font-bold ${t.status === 'Received' ? 'text-emerald-600' : 'text-red-600'}`}>
            {t.status}
          </p>
          <button className="text-[10px] text-[#A30B1E] font-bold underline">
          Download
        </button>
        </div>
      </div>
    ))}
  </div>
</div>
      </div>
    <WithdrawModal 
     key="withdraw-modal-instance" 
      isOpen={isWithdrawOpen} 
      onClose={() => setIsWithdrawOpen(false)} 
      bankData={bankData} // Passes current data down
      onOpenAddBank={() => setIsAddBankOpen(true)}
     onSuccess={handleWithdrawClick}
    />

    <AddBankModal 
      isOpen={isAddBankOpen} 
      onClose={() => setIsAddBankOpen(false)}
      onAdd={(name, num, bank) => {
        setBankData({ name: bank, number: num, holder: name });
        setIsAddBankOpen(false);
        setIsWithdrawOpen(true); 
      }}
    />

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