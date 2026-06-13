import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import verified from "../assets/Verified-tick.png";
import filetypeicon from "../assets/Filetypeicon.png";
import { INITIAL_SUBSCRIBERS } from "./SubscriptionBreakdown";
import { ArrowDown, CloudDownload } from "lucide-react";

// Mock data for billing history matching "Subscriptions User Details.
const INVOICES_DATA = [
  { id: "007", date: "Dec 1, 2024", status: "Paid", amount: "NGN 7,000.00", plan: "Basic plan" },
  { id: "006", date: "Nov 1, 2024", status: "Paid", amount: "NGN 7,000.00", plan: "Basic plan" },
  { id: "005", date: "Oct 1, 2024", status: "Paid", amount: "NGN 7,000.00", plan: "Basic plan" },
  { id: "004", date: "Sep 1, 2024", status: "Paid", amount: "NGN 7,000.00", plan: "Basic plan" },
  { id: "003", date: "Aug 1, 2024", status: "Paid", amount: "NGN 7,000.00", plan: "Basic plan" },
  { id: "002", date: "Jul 1, 2024", status: "Paid", amount: "NGN 7,000.00", plan: "Basic plan" },
  { id: "001", date: "Jun 1, 2024", status: "Paid", amount: "NGN 7,000.00", plan: "Basic plan" },
];

interface ProviderDashboardProps {
  profilePic: string;
  setProfilePic: (base64String: string) => void;
}

export default function ProviderDashboard({ profilePic, setProfilePic }: ProviderDashboardProps) {
 const { id: routeId } = useParams<{ id: string }>();
  const [invoices] = useState(INVOICES_DATA);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);
  const handleOpenReceipt = (invoice: any) => {
    setSelectedReceipt(invoice);
    setIsReceiptOpen(true);
  };
  
  const handleCloseReceipt = () => {
    setIsReceiptOpen(false);
    setSelectedReceipt(null);
  };

  const activeId = routeId || localStorage.getItem("last_viewed_subscriber") || "SUB021";

  useEffect(() => {
    if (activeId) {
      localStorage.setItem("last_viewed_subscriber", activeId);
    }
  }, [activeId]);

 
  const currentSubscriber = INITIAL_SUBSCRIBERS.find(
    (user) => String(user.id) === String(activeId)
  ) || INITIAL_SUBSCRIBERS[0];


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String); 
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  }; 

 
  useEffect(() => {
    if (activeId) {
      localStorage.setItem("last_viewed_subscriber", activeId);
    }
  }, [activeId]);


  return (
    <div className="min-h-screen bg-gray-100 pb-16 font-sans antialiased">
      
      {/* == BRAND HERO BANNER == */}
      <div className="h-44 w-full bg-gradient-to-r from-[#500008] via-[#1A0003] to-black relative" />

      <div className="max-w-6xl mx-auto px-6 relative -mt-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-0 pb-0">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">

            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md overflow-visible bg-zinc-100 shrink-0 group/avatar flex items-center justify-center">
              
              {profilePic ? (
                <img 
                  src={profilePic} 
                  alt="User Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              <button 
                onClick={triggerFileInput}
                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 cursor-pointer"
                title="Select profile picture"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />

              {/* Verified Badge Container */}
              <div className="absolute bottom-1 right-1 w-6 h-6 flex items-center justify-center z-10">
                <img 
                  src={verified} 
                  alt="Verified badge"
                  className="w-full h-full object-contain select-none"
                />
              </div>

            </div>

            <div className="space-y-0.5 text-center sm:text-left pb-1">
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                {currentSubscriber.name}
              </h1>
              <p className="text-sm text-zinc-500 font-medium">
                {currentSubscriber.email}
              </p>
            </div>
          </div>
          
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-400 pb-1">
        <svg 
          className="w-3.5 h-3.5 inline mr-1 text-zinc-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
  <span>&rsaquo;</span>
  <Link 
    to="/provider/subscriptions/plan/linear-basic" 
    className="hover:text-zinc-600 transition-colors"
  >
    Linear Basic Plan
  </Link>
  <span>&rsaquo;</span>
  <span className="text-zinc-300">...</span>
  <span>&rsaquo;</span>
  <span className="text-[#A60615] font-bold">{currentSubscriber.name}</span>
</div>
        </div>
      </div>

      {/* == MAIN CONTENT SECTION == */}
      <div className="max-w-6xl mx-auto px-6 mt-8 space-y-5">
        
        {/* CURRENT PLAN OVERVIEW CARD */}
        <div className="space-y-7">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Current Plan</h2>
            <p className="text-xs text-zinc-400 font-medium">Manage this user's subscription plans</p>
          </div>

          <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-zinc-900">
                    {currentSubscriber.plan || "Basic Plan"}
                  </h3>
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

            {/* Slider meter tracker indicator line */}
            <div className="mt-8 space-y-2">
              <div className="text-[11px] font-bold text-zinc-600">
                145 of 200 active users
              </div>
              <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#FF6473] rounded-full" style={{ width: "72.5%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* BILLING AND INVOICING HISTORY TABLE */}
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Billing and invoicing</h2>
            <p className="text-xs text-zinc-400 font-medium">View all invoices for all user transactions</p>
          </div>

          <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/60 border-b border-zinc-100 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-5 w-12">
                      <input type="checkbox" className="rounded border-zinc-300 accent-[#A30B1E]" />
                    </th>
                    <th className="py-3 px-4 font-bold lowercase first-letter:uppercase">Invoice</th>
                    <th className="py-3 px-4 font-bold flex items-center gap-1 text-zinc-500 lowercase first-letter:uppercase">
                      
                    <div className="flex items-center gap-1.3 cursor-pointer hover:text-zinc-700 transition-colors">
                        Billing date <ArrowDown size={10} />
                    </div>
                  
                    </th>
                    <th className="py-3 px-4 font-bold lowercase first-letter:uppercase">Status</th>
                    <th className="py-3 px-4 font-bold lowercase first-letter:uppercase">Amount</th>
                    <th className="py-3 px-4 font-bold lowercase first-letter:uppercase">Plan</th>
                    <th className="py-3 px-4 w-24 border-l border-zinc-100"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs text-zinc-600">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-zinc-50/40 transition-colors group">
                      <td className="py-3.5 px-5">
                        <input type="checkbox" className="rounded border-zinc-300 accent-[#A30B1E]" />
                      </td>
                      <td className="py-3.5 px-4 font-medium text-zinc-900">
                        <div className="flex items-center gap-3">
                          <div className="p-1 relative flex items-center justify-center w-9 h-9 shrink-0 -ml-7">
                            <img 
                              src={filetypeicon} 
                              alt="File type graphic icon"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="font-semibold tracking-tight text-zinc-800">Invoice #{inv.id} &ndash; Dec 2024</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-medium text-zinc-500">{inv.date}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-zinc-700">{inv.amount}</td>
                      <td className="py-3.5 px-4 font-medium text-zinc-400">{inv.plan}</td>
                      
                      <td className="py-3.5 px-4 border-l border-zinc-100 text-center">
                        <div className="flex items-center justify-center gap-3 text-zinc-400">
                          <button 
                            onClick={() => handleOpenReceipt(inv)}
                            className="hover:text-zinc-600 transition-colors p-1" 
                            title="View details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="hover:text-zinc-600 transition-colors p-1" title="Download Invoice">
                           <CloudDownload size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* == DATA VIEW RECEIPT MODAL OVERLAY == */}
      {isReceiptOpen && selectedReceipt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 antialiased">
          <div className="bg-white rounded-3xl w-full max-w-[430px] shadow-2xl overflow-hidden border border-zinc-100 flex flex-col">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-zinc-950 font-sans tracking-tight">Receipt</h3>
              <button 
                onClick={handleCloseReceipt}
                className="text-zinc-400 hover:text-zinc-600 p-1.5 hover:bg-zinc-50 rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 bg-white">
              <div className="bg-[#1E2229] text-white rounded-[26px] p-6 flex flex-col items-center shadow-inner relative">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mt-2 shadow-sm">
                  <div className="w-9 h-9 bg-emerald-400 rounded-full flex items-center justify-center text-[#1E2229]">
                    <svg className="w-5 h-5 stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm font-medium mt-4 tracking-wide">Payment Success!</p>
                <h4 className="text-3xl font-extrabold text-white mt-1.5 font-sans tracking-tight">
                  {selectedReceipt.amount.includes("NGN") 
                    ? selectedReceipt.amount.replace("NGN ", "₦") 
                    : selectedReceipt.amount}
                </h4>

                <div className="w-full border-t border-zinc-700/60 my-6" />

                <div className="w-full space-y-4 text-xs font-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 font-normal">Invoice Number</span>
                    <span className="text-zinc-100 font-semibold text-right">INV-{selectedReceipt.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 font-normal">Ref Number</span>
                    <span className="text-zinc-100 font-semibold tracking-wide text-right">000085752257</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 font-normal">Payment Time</span>
                    <span className="text-zinc-100 font-semibold text-right">{selectedReceipt.date}, 13:22:16</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 font-normal">Payment Method</span>
                    <span className="text-zinc-100 font-semibold text-right">Bank Transfer</span>
                  </div>
                  <div className="w-full border-t border-dashed border-zinc-700/80 my-2 pt-2" />
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-zinc-400 font-normal">Amount</span>
                    <span className="text-white font-bold text-sm text-right">
                      {selectedReceipt.amount.includes("NGN") 
                        ? selectedReceipt.amount.replace("NGN ", "₦") 
                        : selectedReceipt.amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-zinc-400 font-normal">Payment Charges</span>
                    <span className="text-white font-bold text-sm text-right">₦200.00</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}