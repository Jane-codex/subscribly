import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddBankProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, number: string, bank: string) => void;
}

export default function AddBankModal({ isOpen, onClose, onAdd }: AddBankProps) {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("uba");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async () => {
    if (!accountName || !accountNumber) return;
    
    setStatus("loading");

    // Simulate verification
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onAdd(accountName, accountNumber, selectedBank);
        setStatus("idle"); 
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200 min-h-[500px] flex flex-col">
        
        {/* Header */}
        <div className="mb-6 text-left">
          <h2 className="text-2xl font-bold text-slate-900">Add Bank</h2>
          <p className="text-slate-500 text-sm">Withdraw money seamlessly to your bank</p>
        </div>

        {status === "idle" ? (
          <div className="animate-in fade-in duration-300">
            <div className="space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-sm font-semibold text-slate-700">Account Name</label>
                <Input 
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="h-14 rounded-xl border-slate-200 text-slate-900 focus:ring-[#b9000b] text-base"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-sm font-semibold text-slate-700">Account Number</label>
                <Input 
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="h-14 rounded-xl border-slate-200 text-slate-900 focus:ring-[#b9000b] text-base"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-sm font-semibold text-slate-700">Select Bank</label>
                <div className="relative">
                  <select 
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full h-14 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 appearance-none outline-none focus:ring-[#b9000b]"
                  >
                    <option value="uba">UBA</option>
                    <option value="access">Access Bank</option>
                    <option value="zenith">Zenith Bank</option>
                    <option value="gtco">GTBank</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <Button onClick={onClose} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 text-slate-600 font-bold">
                Cancel  
              </Button>
              <Button 
                onClick={handleSubmit}
                className="flex-1 h-14 rounded-2xl bg-[#a00000] hover:bg-[#800000] text-white font-bold"
              >
                Add Bank
              </Button>
            </div>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 pb-10 animate-in fade-in zoom-in duration-500">
  <div className="relative flex items-center justify-center w-24 h-24">
    
    {/* 1. THE OUTER RING */}
    <div className="absolute inset-0 border-4 border-slate-50 rounded-full" />
    
    <div 
      className={`absolute inset-0 border-4 border-blue-600 rounded-full transition-all duration-500 ${
        status === "loading" 
          ? "border-t-transparent animate-spin" 
          : "border-t-blue-600 scale-110"
      }`} 
    />

    {status === "success" && (
      <div className="animate-in zoom-in spin-in-12 duration-500 ease-out">
        <Check className="w-10 h-10 text-blue-600 stroke-[4px]" />
      </div>
    )}
  </div>

  <h3 className="text-2xl font-bold text-slate-900 text-center leading-tight px-6">
    {status === "loading" ? "Verifying Bank..." : "Bank added successfully"}
  </h3>
</div>
        )}
      </div>
    </div>
  );
}