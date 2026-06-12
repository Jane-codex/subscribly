import { Button } from "@/components/ui/button";
import signedDocPng from "../assets/signed-doc.png";

interface ConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: string;
  accountNumber: string;
  isProcessing?: boolean; 
  isFinished?: boolean;   
}

export default function ConfirmWithdrawalModal({ 
  isOpen, onClose, onConfirm, amount, accountNumber,
  isProcessing = false, 
  isFinished = false 
}: ConfirmProps) {
  if (!isOpen) return null;

  const formattedAmount = Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[400px] rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center justify-center">
        
        {!isProcessing ? (
          /*  CONFIRMATION VIEW */
          <div className="animate-in fade-in duration-300 flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center mt-2">
              <img src={signedDocPng} alt="Confirm" className="w-full h-full object-contain" />
            </div>

            <h2 className="text-[20px] font-bold text-[#0f172a] mt-4">Confirm Withdrawal</h2>
            <div className="text-[#64748b] text-[16px] leading-relaxed mb-2">
              <p>You are about to make withdrawal for</p>
              <p>
                <span className="font-bold text-[#0f172a]">₦{formattedAmount}</span> to Account Number <span className="font-bold text-[#0f172a]">{accountNumber}</span>
              </p>
              <p className="mt-2 text-[#0f172a] font-medium">Click proceed to continue</p>
            </div>

            <div className="mt-3 flex gap-4 w-full">
              <Button onClick={onClose} variant="outline" className="flex-1 h-11 rounded-xl border-slate-200 text-[#64748b] font-bold text-sm">
                Cancel
              </Button>
              <Button onClick={onConfirm} className="flex-1 h-11 rounded-xl bg-[#a00000] hover:bg-[#800000] text-white font-bold text-sm">
                Proceed
              </Button>
            </div>
          </div>
        ) : (
          /* SUCCESS / PROCESSING VIEW */
            <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center space-y-8">
            <div className="relative w-21 h-21 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-slate-50 rounded-full" />
    <div className={`absolute inset-0 border-4 border-blue-600 rounded-full transition-all duration-500 ${
      !isFinished ? "border-t-transparent animate-spin" : "bg-blue-600 scale-100"
    }`} />
    {isFinished && (
      <div className="relative animate-in zoom-in spin-in-12 duration-300 ease-out">
        <svg 
          className="w-8 h-8 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={4}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )}
  </div>

  <h3 className="text-[21px] font-bold text-[#0f172a] tracking-tight transition-all">
    {!isFinished ? "Processing..." : "Successful"}
  </h3>
</div>
        )}
      </div>
    </div>
  );
}