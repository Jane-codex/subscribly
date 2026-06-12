import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import signedDocPng from "../assets/signed-doc.png";


interface Plan {
  name: string;
  logo: string;
  id: number;
}

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}


  const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, plan }) => {
  const [step, setStep] = useState<'select' | 'invite' | 'confirm'>('select');
  const [username, setUserName] = useState("");
   const [payDate, setPayDate] = useState(""); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ 
  label: string; 
  price: string; 
  type: string; 
} | null>({ label: "Monthly Plan", price: "$18/month", type: "Fixed Monthly" });

  const [isProcessing, setIsProcessing] = useState(false);
       
  const handleProceed = async () => {
  setIsProcessing(true);
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStep('select'); 
    onClose(); 
  } catch (error) {
    console.error(error);
  } finally {
    setIsProcessing(false);
  }
};


  useEffect(() => {
  if (!isOpen) {
    setStep('select'); 
    setSelectedPlan(null); 
    setUserName(''); 
    setPayDate("");
    setIsProcessing(false);
  }
}, [isOpen, setSelectedPlan]); 

  const dateInputRef = useRef<HTMLInputElement>(null);
  if (!isOpen || !plan) return null;

  const planOptions = [
    { label: "Monthly", price: "$18/month", type: "Fixed Monthly" },
    { label: "Yearly", price: "$180/year", type: "Fixed Yearly" },
    { label: "Family Plan", price: "$25.00", type: "Family  Plan" },
  ];

  

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-[32px] overflow-visible shadow-2xl animate-in zoom-in-95 fade-in duration-300">

        {/* --- STEP 1: PLAN SELECTION --- */}
        {step === 'select' && (
          <>
            <div className="pt-12 pb-8 flex flex-col items-center bg-[#F9FAFB] border-b border-slate-100 relative rounded-t-[32px]">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] rounded-t-[32px]" />
              <div className="w-21 h-21 flex items-center justify-center p-4 mb-4 z-10">
                <img src={plan.logo} alt={plan.name} className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 z-10 text-center px-4">Join a Subscription</h2>
              <p className="text-slate-500 text-sm mt-1 z-10">Fill in your info to get started</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 tracking-wide">Username/ ID</label>
                <input 
                  type="text" 
                  placeholder="Enter ID"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-[#A91212] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 tracking-wide">Select Subscription plan</label>
                <div className="relative">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-5 py-3 rounded-2xl border border-slate-200 bg-white cursor-pointer hover:border-[#A91212] transition-all select-none"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[14px] font-bold text-slate-800 leading-none mb-1">{selectedPlan?.label}</span>
                      <span className="text-[13px] text-slate-600 leading-none">{selectedPlan?.price}</span>
                    </div>
                    <ChevronDown className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-[105%] left-0 w-full bg-white border border-slate-100 shadow-2xl rounded-2xl z-[999] overflow-hidden">
                      <div className="max-h-[200px] overflow-y-auto">
                        {planOptions.map((option, index) => (
                          <div 
                            key={index}
                            onClick={() => {
                              setSelectedPlan(option);
                              setIsDropdownOpen(false);
                            }}
                            className="p-4 border-b border-slate-50 hover:bg-red-50 flex flex-col items-start cursor-pointer transition-colors"
                          >
                            <span className="text-[14px] font-bold text-slate-800">{option.label}</span>
                            <span className="text-[13px] text-slate-600">{option.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 flex gap-3">
              <button onClick={onClose} className="flex-1 py-4 px-6 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
              <button 
                onClick={() => setStep('invite')}
                className="flex-1 py-4 px-6 rounded-xl bg-[#A91212] text-white font-bold hover:bg-red-800 shadow-lg shadow-red-900/20 active:scale-95 transition-all"
              >
                Confirm
              </button>
            </div>
          </>
        )}

        {/* --- STEP 2: INVITATION LINK --- */}
        {step === 'invite' && (
          <>
            <div className="pt-12 pb-8 flex flex-col items-center bg-[#F9FAFB] border-b border-slate-100 relative rounded-t-[32px]">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] rounded-t-[32px]" />
              <div className="w-21 h-21 flex items-center justify-center p-4 mb-6 z-10">
                <img src={plan.logo} alt={plan.name} className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 z-10">Invitation Link</h2>
              <p className="text-slate-500 text-sm mt-1 z-10 font-medium text-center px-10">Confirm you want to join this subscription</p>
            </div>

            <div className="p-8 space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[14px] font-medium">Subscription Title</span>
                <span className="text-slate-800 font-bold text-[15px]">{plan.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[14px] font-medium">Subscription ID</span>
                <span className="text-slate-800 font-bold text-[15px]">
                  {username || "No ID Entered"} 
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[14px] font-medium">Subscription Amount</span>
                <span className="text-[#A91212] font-bold text-[18px]">{selectedPlan?.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[14px] font-medium">Subscription Type</span>
                <span className="text-slate-800 font-bold text-[15px]">{selectedPlan?.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[14px] font-medium">Pay Date</span>
                  <div className="relative">
                    <button 
                      onClick={() => dateInputRef.current?.showPicker()} 
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-slate-500 text-[13px] font-bold hover:bg-slate-50 transition-all"
                    >
                      <Calendar size={16} className="text-slate-400" />
                      {payDate ? new Date(payDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      }) : "Select dates"}
                    </button>

                    <input 
                      type="date" 
                      ref={dateInputRef}
                      value={payDate}
                      onChange={(e) => setPayDate(e.target.value)}
                      className="absolute opacity-0 pointer-events-none w-0 h-0" 
                    />
                  </div>
              </div>
            </div>

            <div className="px-8 pb-8 flex gap-4">
              <button onClick={() => setStep('select')} className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
              <button
                 onClick={() => setStep('confirm')}
              className="flex-1 py-4 rounded-2xl bg-[#A91212] text-white font-bold shadow-lg shadow-red-900/20 active:scale-95 transition-all">Subscribe</button>
            </div>
          </>
        )}

        {/* --- STEP 3: CONFIRMATION  */}
        {step === 'confirm' && (
  <div className="p-6 flex flex-col items-center text-center">
    {!isProcessing ? (
      /* --- INITIAL CONFIRMATION VIEW --- */
      <div className="animate-in fade-in duration-300 flex flex-col items-center w-full space-y-4">
        <div className="w-20 h-20 flex items-center justify-center">
           <img src={signedDocPng} alt="Confirm" className="w-full h-full object-contain" />
        </div>

        <div className="space-y-1">
          <h2 className="text-[24px] font-bold text-[#0F172A]">Confirm Subscription</h2>
          <p className="text-slate-600 text-[16px]">
            You are about to join subscription for <br />
            <span className="font-bold text-slate-900">{plan.name}</span>
          </p>
        </div>
        
        <p className="text-slate-900 text-[15px]">Click proceed to continue</p>
        
        <div className="w-full flex gap-4 pt-4">
          <button 
            onClick={() => setStep('invite')} 
            className="flex-1 py-4 rounded-2xl border border-slate-200 font-bold text-slate-900"
          >
            Cancel
          </button>
          <button 
  onClick={handleProceed} 
  className="flex-1 py-4 rounded-2xl bg-[#A91212] text-white font-bold"
>
  Proceed
</button>
        </div>
      </div>
    ) : (
      /* --- LOADING / SUCCESSFUL STATE --- */
      <div className="animate-in fade-in zoom-in duration-500 py-12 flex flex-col items-center justify-center w-full space-y-6">
        {/* The Blue Spinner Arc */}
        <div className="relative w-20 h-20">
          <div className="w-20 h-20 border-[3px] border-slate-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-[3px] border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        
        <h2 className="text-[22px] font-medium text-[#0F172A] tracking-tight">
          Successful
        </h2>
      </div>
    )}
  </div>
)}
      </div>
    </div>
  );
};

export default JoinModal;