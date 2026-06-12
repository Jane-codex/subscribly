import { useState } from "react";


interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPlanModal({ isOpen, onClose }: AddPlanModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
const [isLoading, setIsLoading] = useState(false);

  // 🟢 State collection for multi-step form persistence
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    services: ["", "", ""], 
    price: "",
    discountOption: "10%",
  paymentType: "Flexible", 
  paymentDate: "",
  hasTrial: "Yes",        
  trialDuration: "0",
  });

  if (!isOpen) return null;

  // Step names, IDs, and clean modern stroke paths for the wizard nodes
  const steps = [
    {
      id: "title",
      label: "Subscription Title",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: "service",
      label: "Service List",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      ),
    },
    {
      id: "price",
      label: "Subscription Price",
      icon: (
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    strokeWidth="2" 
    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" 
  />
</svg>
      ),
    },
    {
      id: "payment",
      label: "Payment Plan",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="18" height="18" x="3" y="3" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 12h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      ),
    },
  ];

  const handleNext = () => {
  if (activeStep < steps.length - 1) {
    setActiveStep((prev) => prev + 1);
  } else {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onClose();
        // Reset states back to default
        setIsSuccess(false);
        setActiveStep(0);
      }, 2000);
    }, 1500);
  }
};

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    } else {
      onClose();
    }
  };

const formatToUKDate = (dateString: string) => {
  if (!dateString) return "";
  if (dateString.includes("-")) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }
  return dateString;
};



 return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container Box */}
      <div className="bg-white w-full max-w-[640px] rounded-[24px] shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200 min-h-[380px] justify-center">
        
        {/* LOADING SCREEN OVERLAY */}
        {isLoading || isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-300">
            {isLoading ? (
              <div className="w-14 h-14 border-4 border-zinc-100 border-t-[#0066FF] rounded-full animate-spin" />
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight">Successful</h3>
              </div>
            )}
          </div>
        ) : (
         
          <>
            {/* ===== HEADER SECTOR PANEL ===== */}
            <div className="p-6 flex items-center justify-between border-b border-zinc-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">Add New Plan</h2>
                  <p className="text-sm text-zinc-400">Add a new subscription plan</p>
                </div>
              </div>
              
              <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 transition-colors p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ==== TIMELINE PROGRESS STEPPER ==== */}
            <div className="px-8 pt-8 pb-6 relative bg-white border-b border-zinc-100">
              <div 
                className="absolute top-[52px] left-0 h-[2px] bg-[#A30B1E] transition-all duration-300 z-0"
                style={{ width: activeStep === steps.length - 1 ? "100%" : `${12.5 + (activeStep * 25)}%` }}
              />
              <div 
                className="absolute top-[52px] right-0 h-[2px] bg-zinc-100 z-0 transition-all duration-300"
                style={{ left: activeStep === steps.length - 1 ? "100%" : `${12.5 + (activeStep * 25)}%` }}
              />

              {/* Stepper Nodes */}
              <div className="relative z-10 flex justify-between items-center">
                {steps.map((step, index) => {
                  const isCurrent = index === activeStep;
                  const isCompleted = index < activeStep;

                  return (
                    <div key={step.id} className="flex flex-col items-center flex-1">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 bg-white ${
                          isCurrent 
                            ? "border-[#A30B1E] text-[#A30B1E] shadow-sm font-bold scale-105" 
                            : isCompleted
                            ? "border-[#A30B1E] text-[#A30B1E]"
                            : "border-zinc-100 text-zinc-300"
                        }`}
                      >
                        {step.icon}
                      </div>
                      
                      <span 
                        className={`text-[11px] font-bold mt-2 whitespace-nowrap tracking-tight transition-colors duration-200 ${
                          isCurrent || isCompleted ? "text-[#A30B1E]" : "text-zinc-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* === CENTRAL DYNAMIC FORM FIELDS AREA === */}
            <div className="p-8 flex-1 min-h-[300px]">
              {activeStep === 0 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-zinc-800">Subscription Title</label>
                    <input 
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Input Title"
                      className="w-full h-12 px-4 bg-white border border-zinc-200 rounded-xl text-zinc-800 text-sm placeholder-zinc-400 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-zinc-800">Subscription Description</label>
                    <textarea 
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Input Description"
                      className="w-full p-4 bg-white border border-zinc-200 rounded-xl text-zinc-800 text-sm placeholder-zinc-400 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 1: SERVICE LIST */}
              {activeStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <label className="block text-sm font-bold text-zinc-800">Service List</label>
                  
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {formData.services.map((service, index) => (
                      <input 
                        key={index}
                        type="text"
                        value={service}
                        onChange={(e) => {
                          const updated = [...formData.services];
                          updated[index] = e.target.value;
                          setFormData({ ...formData, services: updated });
                        }}
                        placeholder={`Input Service ${index + 1}`}
                        className="w-full h-12 px-4 bg-white border border-zinc-200 rounded-xl text-zinc-800 text-sm placeholder-zinc-400 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
                      />
                    ))}
                  </div>

                  <div className="flex justify-end pt-1">
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, services: [...formData.services, ""] })}
                      className="flex items-center gap-1 text-sm font-bold text-[#A30B1E] hover:text-red-900 transition-colors"
                    >
                      <span className="text-base font-semibold">+</span> Add New Service
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SUBSCRIPTION PRICE & DISCOUNT */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-zinc-800">Subscription Price</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-sm font-medium text-zinc-800 pointer-events-none">NGN</span>
                      <input 
                        type="text"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="0.00"
                        className="w-full h-12 pl-16 pr-4 bg-white border border-zinc-200 rounded-xl text-zinc-800 text-sm placeholder-zinc-300 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-zinc-800">Discount Option</label>
                    <div className="relative">
                      <select
                        value={formData.discountOption}
                        onChange={(e) => setFormData({ ...formData, discountOption: e.target.value })}
                        className="w-full h-12 px-4 bg-white border border-zinc-200 rounded-xl text-zinc-800 text-sm font-medium outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all appearance-none cursor-pointer"
                      >
                        <option value="None">No Discount</option>
                        <option value="5%">5%</option>
                        <option value="10%">10%</option>
                        <option value="15%">15%</option>
                        <option value="20%">20%</option>
                      </select>
                      
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT PLAN CONFIGURATION */}
              {activeStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {/* Payment Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-zinc-800">Payment Type</label>
                    <div className="relative">
                      <select
                        value={formData.paymentType}
                        onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                        className="w-full h-12 px-4 bg-white border border-zinc-200 rounded-xl text-zinc-800 text-sm font-medium outline-none appearance-none cursor-pointer focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
                      >
                        <option value="Flexible">Flexible</option>
                        <option value="Fixed Date">Fixed</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Payment Date Picker */}
                  <div className="space-y-2">
                    <label className={`block text-sm font-bold transition-colors duration-200 ${formData.paymentType === "Flexible" ? "text-zinc-300" : "text-zinc-800"}`}>
                      Payment Date
                    </label>
                    <div className="relative flex items-center">
                      <input 
                        type="text"
                        disabled={formData.paymentType === "Flexible"}
                        readOnly
                        value={formData.paymentType === "Flexible" ? "" : formatToUKDate(formData.paymentDate)}
                        placeholder="DD/MM/YYYY"
                        onClick={(e) => {
                          if (formData.paymentType !== "Flexible") {
                            const nextEl = e.currentTarget.nextElementSibling as HTMLInputElement;
                            if (nextEl) nextEl.showPicker();
                          }
                        }}
                        className={`w-full h-12 px-4 border rounded-xl text-sm outline-none transition-all pr-12 ${
                          formData.paymentType === "Flexible" 
                            ? "bg-zinc-50 border-zinc-100 text-zinc-300 cursor-not-allowed placeholder-zinc-300" 
                            : "bg-white border-zinc-200 text-zinc-800 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 cursor-pointer"
                        }`}
                      />
                      {formData.paymentType !== "Flexible" && (
                        <input 
                          type="date"
                          value={formData.paymentDate}
                          onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                          className="absolute inset-0 opacity-0 pointer-events-none"
                        />
                      )}
                      
                      {/* Custom design calendar icon */}
                      <div className={`absolute right-4 pointer-events-none transition-colors duration-200 ${formData.paymentType === "Flexible" ? "text-zinc-300" : "text-zinc-500"}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Trial Period Toggle */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-zinc-800">Trial Period?</label>
                    <div className="relative">
                      <select
                        value={formData.hasTrial}
                        onChange={(e) => setFormData({ ...formData, hasTrial: e.target.value })}
                        className="w-full h-12 px-4 bg-white border border-zinc-200 rounded-xl text-zinc-800 text-sm font-medium outline-none appearance-none cursor-pointer focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Conditional Trial Frame Input */}
                  {formData.hasTrial === "Yes" && (
                    <div className="space-y-2 pt-2 animate-in slide-in-from-top-2 duration-200">
                      <label className="block text-sm font-bold text-zinc-800">Trial Period Time-frame</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-800">Days</span>
                        <input 
                          type="number"
                          value={formData.trialDuration}
                          onChange={(e) => setFormData({ ...formData, trialDuration: e.target.value })}
                          placeholder="0"
                          className="w-full h-12 pl-16 pr-4 bg-white border border-zinc-200 rounded-xl text-zinc-800 text-sm outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* === BOTTOM COMMAND ACTIONS ROW === */}
            <div className="p-6 bg-white border-t border-zinc-100 flex items-center justify-end gap-3">
              <button 
                type="button"
                onClick={handleBack}
                className="px-8 h-12 rounded-xl bg-white border border-zinc-200 text-zinc-700 text-sm font-bold hover:bg-zinc-50 transition-colors shadow-sm"
              >
                {activeStep === 0 ? "Cancel" : "Back"}
              </button>
              
              <button 
                type="button"
                onClick={handleNext}
                className="px-10 h-12 rounded-xl bg-[#A30B1E] hover:bg-red-800 text-white text-sm font-bold transition-colors shadow-sm"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}