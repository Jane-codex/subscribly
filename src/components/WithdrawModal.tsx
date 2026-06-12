import { useState, useEffect } from "react";
import { ChevronDown, Plus } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import uba from "@/assets/uba-.png";
import access from "@/assets/access.png";
import zenith from "@/assets/zenith.png";
import gtco from "@/assets/gtco.jpeg";

export default function WithdrawModal({ isOpen, onClose, bankData, onOpenAddBank, onSuccess }: { 
  isOpen: boolean; 
  onClose: () => void;
  bankData: { name: string; number: string; holder: string }; 
  onOpenAddBank: () => void;
  onSuccess: (amount: string, method: string) => void;  
}) {
  const [amount, setAmount] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");

 

  // Create the Map
const bankLogos: Record<string, any> = {
   "uba": uba,
  "access": access,
  "zenith": zenith,
  "gtco": gtco,
};

  useEffect(() => {
    if (!isOpen) {
      setAmount("");
      setDisplayAmount("");
    }
  }, [isOpen]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    setAmount(value);
    
    if (value) {
      const formatted = new Intl.NumberFormat('en-US').format(Number(value));
      setDisplayAmount(formatted);
    } else {
      setDisplayAmount("");
    }
  };

  const handleConfirm = () => {
    if (!amount) return;
    onSuccess(amount, "bankData.name");
    onClose();
  };

   if (!isOpen) return null;
   
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Withdraw</h2>
          <p className="text-slate-500 text-sm">Withdraw money seamlessly to your bank</p>
        </div>

        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-slate-700">Enter Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 font-bold">₦</span>
           <Input 
            value={displayAmount}
            onChange={handleAmountChange}
            placeholder="0"
            className="pl-10 h-14 rounded-xl border-slate-200 text-slate-900 font-bold text-lg focus:ring-[#b9000b]" 
            />
          </div>
        </div>
        <div className="space-y-2 mb-8">
           <div className="flex justify-between items-center mb-2">
  <label className="text-sm font-medium text-slate-700">Select Bank</label>
  <button 
    type="button"
    onClick={() => {
       onClose(); 
       onOpenAddBank(); 
    }}
    className="text-[#b9000b] text-sm font-bold hover:underline flex items-center gap-1"
  >
    <Plus className="w-3 h-3" /> Add Bank
  </button>
</div>
          <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-[1.2rem] bg-white shadow-sm">
  <div className="flex items-center gap-3">
        <div className="w-[58px] h-[34px] flex items-center justify-center">
  {bankLogos[bankData.name.toLowerCase()] ? (
    <img 
      src={bankLogos[bankData.name.toLowerCase()]} 
      alt={bankData.name}
      className="max-w-full max-h-full object-contain" 
    />
  ) : (
    <span className="font-bold text-[#b9000b] text-[10px] uppercase">
      {bankData.name.substring(0, 3)}
    </span>
  )}
</div>
    <div className="flex flex-col -space-y-1">
      <p className="text-slate-900 font-bold text-[16px] tracking-tight">
        {bankData.number}
      </p>
      <p className="text-slate-400 text-[11px] font-medium">
        {bankData.holder}
      </p>
    </div>
  </div>

  <ChevronDown className="text-slate-300 w-5 h-5 stroke-[1.5px]" />
</div>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={onClose}
            variant="outline" 
            className="flex-1 h-14 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            className="flex-1 h-14 rounded-2xl bg-[#b9000b] hover:bg-[#900008] text-white font-bold transition-transform active:scale-95"
          >
            Withdraw
          </Button>
        </div>

      </div>
    </div>
  );
}