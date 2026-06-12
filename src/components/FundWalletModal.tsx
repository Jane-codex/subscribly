import { useState, useEffect } from "react";
import { Plus, ChevronDown, Check } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import confetti from "canvas-confetti";
import uba from "@/assets/uba-.png";
import signedDocPng from "../assets/signed-doc.png";

export default function FundWalletModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: (amount: string, method: string) => void; }) {
  const [view, setView] = useState<"selection" | "edit" | "amount" | "otp" | "confirm">("selection");
  const [selectedMethod, setSelectedMethod] = useState("visa");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
const [isError, setIsError] = useState(false);
const [timer, setTimer] = useState(0);
const [canResend, setCanResend] = useState(true);

useEffect(() => {
  let interval: any;

  if (timer > 0) {
    interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  } else {
    setCanResend(true);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [timer]);

const handleResend = () => {
  if (!canResend) return;
  console.log("New OTP Sent");
  setTimer(60);
  setCanResend(false);
};

const handleVerify = () => {
  if (otp.join("") !== "1234") { 
    setIsError(true);
    setTimeout(() => setIsError(false), 400); 
  } else {
    setView("confirm");
  }
};

  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [methods, setMethods] = useState({
    visa: { number: "1234", expiry: "08/2025", name: "" },
    master: { number: "5678", expiry: "12/2025", name: "" },
    uba: { number: "0000000000", expiry: "", name: "" }
  });

  
  useEffect(() => {
    if (resetSuccess) {
      const timer = setTimeout(() => setResetSuccess(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [resetSuccess]);

  if (!isOpen) return null;

  const isEditingBank = selectedMethod === "uba";
  const updateMethod = (field: string, value: string) => {
    setMethods(prev => ({
      ...prev,
      [selectedMethod]: { ...prev[selectedMethod as keyof typeof methods], [field]: value }
    }));
  };

  const handleReset = (e: React.MouseEvent, methodKey: 'visa' | 'master' | 'uba') => {
    e.stopPropagation(); 
    
    const defaultValues = {
      visa: { number: "1234", expiry: "08/2025", name: "" },
      master: { number: "5678", expiry: "12/2025", name: "" },
      uba: { number: "0000000000", expiry: "", name: "" }
    };

    setMethods(prev => ({
      ...prev,
      [methodKey]: defaultValues[methodKey]
    }));
    
    setResetSuccess(methodKey);
  };

    const handleProceed = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);

  onSuccess(amount, selectedMethod); 
  setTimeout(() => {
    handleClose();
  }, 3000);
};

     const handleClose = () => {
  setView("selection"); 
  setAmount("");
  setOtp(["", "", "", ""]);
  setTimer(0);
  setCanResend(true); 
  onClose();
    };

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2rem] pb-1 w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* MODAL HEADER */}
        <div className="p-8 pb-0">
          <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-slate-900 text-center w-full">
            {/* Priority 1: Check if we are in OTP view */}
            {view === "confirm" ? "" 
              : view === "otp" 
              ? "OTP Verification" 
              : view === "amount" 
                ? "Fund Wallet" 
                : view === "selection" 
                  ? "Fund Wallet" 
                  : isEditingBank 
                    ? "Edit Bank" 
                    : "Edit Card"}
              </h2>
             
              </div>
            {/* Description text logic */}
          <p className="text-slate-500 text-sm">
            {view === "confirm" ? ""
           : view === "otp" 
              ? "We've sent a code to the number attached to your account"
            : view === "amount" 
              ? "Insert Funding amount" 
              : view === "selection" 
                ? "Select a means to which you want to fund your wallet" 
                : ""}
              </p>
            </div>

        {/* MODAL BODY */}
        <div className="p-8">
          {view === "selection" ? (
            <div className="space-y-4">
              
              {/* VISA */}
              <div 
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedMethod === 'visa' ? 'border-red-700 bg-red-50' : 'border-slate-100 bg-white'}`}
                onClick={() => setSelectedMethod('visa')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-blue-800 italic text-[10px]">VISA</div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Visa ending in {methods.visa.number}</p>
                      <p className="text-xs text-slate-400">{methods.visa.name || `Expiry ${methods.visa.expiry}`}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'visa' ? 'border-red-700 bg-red-700' : 'border-slate-200'}`}>
                    {selectedMethod === 'visa' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>  
                <div className="flex gap-4 mt-3 ml-16">
                   <button 
                    onClick={(e) => handleReset(e, 'visa')} 
                    className={`text-xs font-bold flex items-center gap-1 transition-colors ${resetSuccess === 'visa' ? 'text-green-600' : 'text-red-700 hover:underline'}`}
                   >
                     {resetSuccess === 'visa' ? <><Check className="w-3 h-3" /> Reset Success</> : "Set as default"}
                   </button>
                   <button onClick={() => setView("edit")} className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                </div>
              </div>

              {/* MASTERCARD */}
              <div 
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedMethod === 'master' ? 'border-red-700 bg-red-50' : 'border-slate-100 bg-white'}`}
                onClick={() => setSelectedMethod('master')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center gap-1">
                      <div className="w-4 h-4 bg-red-500 rounded-full opacity-80" />
                      <div className="w-4 h-4 bg-orange-500 rounded-full -ml-3 opacity-80" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Mastercard ending in {methods.master.number}</p>
                      <p className="text-xs text-slate-400">{methods.master.name || `Expiry ${methods.master.expiry}`}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'master' ? 'border-red-700 bg-red-700' : 'border-slate-200'}`}>
                    {selectedMethod === 'master' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
                <div className="flex gap-4 mt-3 ml-16">
                   <button 
                    onClick={(e) => handleReset(e, 'master')} 
                    className={`text-xs font-bold flex items-center gap-1 transition-colors ${resetSuccess === 'master' ? 'text-green-600' : 'text-slate-400 hover:text-red-700'}`}
                   >
                     {resetSuccess === 'master' ? <><Check className="w-3 h-3" /> Reset Success</> : "Set as default"}
                   </button>
                   <button onClick={() => setView("edit")} className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                </div>
              </div>

              {/* UBA BANK */}
              <div 
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedMethod === 'uba' ? 'border-red-700 bg-red-50' : 'border-slate-100 bg-white'}`}
                onClick={() => setSelectedMethod('uba')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-15 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-md">
                      <img 
                        src={uba} 
                        alt="UBA Logo" 
                        className="w-[89%] h-[89%] object-contain" 
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">UBA ({methods.uba.number})</p>
                      <p className="text-xs text-slate-400">{methods.uba.name || "No name set"}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'uba' ? 'border-red-700 bg-red-700' : 'border-slate-200'}`}>
                    {selectedMethod === 'uba' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
                <div className="flex gap-4 mt-3 ml-16">
                  <button 
                    onClick={(e) => handleReset(e, 'uba')} 
                    className={`text-xs font-bold flex items-center gap-1 transition-colors ${resetSuccess === 'uba' ? 'text-green-600' : 'text-slate-400 hover:text-red-700'}`}
                  >
                    {resetSuccess === 'uba' ? <><Check className="w-3 h-3" /> Reset Success</> : "Set as default"}
                  </button>
                  <button onClick={() => setView("edit")} className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                </div>
              </div>
              
              <button className="flex items-center gap-2 text-red-700 font-bold text-sm mx-auto pt-2 hover:opacity-80">
                <Plus className="w-4 h-4" /> Add New Payment Method
              </button>
            </div>
          ) : view === "edit" ? (
            /* EDIT FORM */
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider italic">
                    {isEditingBank ? "Account Name" : "Cardholder Name"}
                  </label>
                  <Input 
                    type="text"
                    value={methods[selectedMethod as keyof typeof methods].name} 
                    onChange={(e) => updateMethod('name', e.target.value)} 
                    placeholder="Enter Name"
                    className="h-14 border-slate-200 rounded-xl focus:ring-[#b9000b] text-slate-900 font-medium" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider italic">
                    {isEditingBank ? "Account Number" : "Card Number (Last 4 Digits)"}
                  </label>
                  <Input 
                    type="text"
                    value={methods[selectedMethod as keyof typeof methods].number} 
                    onChange={(e) => updateMethod('number', e.target.value)} 
                    className="h-14 border-slate-200 rounded-xl focus:ring-[#b9000b] text-slate-900 font-medium" 
                  />
                </div>

                {!isEditingBank && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider italic">Expiry Date</label>
                    <Input 
                      type="text"
                      value={methods[selectedMethod as keyof typeof methods].expiry} 
                      onChange={(e) => updateMethod('expiry', e.target.value)} 
                      className="h-14 border-slate-200 rounded-xl focus:ring-[#b9000b]  text-slate-900 font-medium" 
                    />
                  </div>
                )}
              </div>
            </div>

          ) : view === "otp" ? (
            /* OTP VERIFICATION */
            <div className={`space-y-6 animate-in fade-in zoom-in duration-300 ${isError ? "animate-shake" : ""}`}>
              <div className="flex justify-between gap-2 px-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (isNaN(Number(value))) return; 

                      const newOtp = [...otp];
                      newOtp[index] = value;
                      setOtp(newOtp);

                      if (value && index < 3) {
                        document.getElementById(`otp-${index + 1}`)?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[index] && index > 0) {
                        document.getElementById(`otp-${index - 1}`)?.focus();
                      }
                    }}
                    className={`w-[72px] h-[85px] text-center text-4xl font-semibold border-2 rounded-xl outline-none transition-all shadow-sm
                      ${isError 
                        ? "border-red-500 text-red-500 bg-red-50" 
                        : "text-red-900 border-red-800 focus:ring-4 focus:ring-red-50"
                      }`}
                  />
                ))}
              </div>

              <div className="text-center pt-2">
                {isError && <p className="text-red-500 text-xs font-bold mb-2">Invalid OTP. Please try again.</p>}
                
                <p className="text-slate-500 text-sm">
       Didn't get a code?{" "}
    {canResend ? (
      <button 
        onClick={handleResend}
        className="text-slate-900 underline font-semibold decoration-slate-400 hover:text-red-800 transition-colors"
      >
        Click to resend.
      </button>
    ) : (
      <span className="text-slate-400 font-medium italic">
        Resend available in 0:{timer < 10 ? `0${timer}` : timer}
        </span>
        )}
           </p>
              </div>
            </div>

         ) : view === "confirm" ? (
            /* CONFIRM FUNDING */
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              {/* Illustration Icon */}
              <div className="w-16 h-16 flex items-center justify-center -mt-11">
              <img src={signedDocPng} alt="Confirm" className="w-full h-full object-contain" />
            </div>
              <h2 className="text-2xl font-bold text-slate-900">Confirm Funding</h2>
              <p className="text-slate-500 text-sm">You are about to Fund your wallet with</p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                ₦{Number(amount).toLocaleString()}.00
              </p>
              <p className="text-slate-900 text-sm mt-1">Click proceed to continue</p>
            </div>
          ) : (
         
            /* AMOUNT VIEW */
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 italic">Select Funding Method</label>
                  <div onClick={() => setView("selection")} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white cursor-pointer hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      {/* DYNAMIC BRAND ICON */}
                      <div className="w-10 h-6 bg-slate-50 rounded flex items-center justify-center p-1 border border-slate-100 font-bold text-[8px] overflow-hidden">
                        {selectedMethod === 'visa' && (
                          <span className="text-blue-800 italic">VISA</span>
                        )}
                        {selectedMethod === 'master' && (
                          <div className="flex items-center gap-0.5">
                            <div className="w-2.5 h-2.5 bg-red-500 rounded-full opacity-80" />
                            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full -ml-1.5 opacity-80" />
                          </div>
                        )}
                        {selectedMethod === 'uba' && (
                          <span className="text-red-600">UBA</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{isEditingBank ? methods.uba.number : `**** ${methods[selectedMethod as keyof typeof methods].number.slice(-4)}`}</p>
                        <p className="text-[10px] text-slate-400 italic font-medium">{methods[selectedMethod as keyof typeof methods].name}</p>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 italic">Enter Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-900">₦</span>
                   <Input 
                      value={amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                      onChange={(e) => {
                        // Remove all non-digits to store a clean number in state
                        const cleanValue = e.target.value.replace(/\D/g, "");
                        setAmount(cleanValue);
                      }} 
                      placeholder="0"
                      className="h-14 pl-10 border-slate-200 rounded-xl focus-visible:ring-red-700 text-lg font-medium text-slate-900" 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
       {/* MODAL FOOTER */}
<div className="p-8 pt-0 flex gap-4">
  <Button 
    variant="outline" 
    onClick={() => {
      if (view === "amount") {
        setView("selection"); 
      } else if (view === "edit") {
        setView("selection");
      } else {
        handleClose(); 
      }
    }}
    className="flex-1 h-14 rounded-2xl border-slate-200 text-slate-600 font-bold"
  >
    {view === "amount" || view === "edit" ? "Cancel" : "Cancel"}
  </Button>

  <Button 
   onClick={() => {
    if (view === "selection") {
      setView("amount");
    } else if (view === "edit") {
      setView("selection");
    } else if (view === "amount") {
      setView("otp");
    } else if (view === "otp") {
      // This reads the value of handleVerify
      handleVerify(); 
    } else if (view === "confirm") {
      handleProceed();
    }
    }}
    className="flex-1 h-14 rounded-2xl bg-red-800 hover:bg-red-900 text-white font-bold"
  >
    {view === "selection" ? "Next" : view === "edit" ? "Save Changes" : view === "otp" ? "Verify" : view === "confirm" ? "Proceed" : "Fund Wallet"}
  </Button>
</div>
      </div>
    </div>
  );
}