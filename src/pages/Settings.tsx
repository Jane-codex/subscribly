import { Mail, ChevronDown, Camera, Eye, Download, Trash2, Search, ArrowDown, Check, Wifi } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Verified from "../assets/Verified-tick.png";
import { useOutletContext } from "react-router-dom";
import DefaultAvatar from "../assets/defaultavatar.jpg";
import visa from "../assets/visa-card.png";
import master from "../assets/master-card.png";


const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const tabs = ["Profile", "Password", "Billing", "Notifications"];
  const { setActiveToast } = useOutletContext<any>(); 
  const [isSaving, setIsSaving] = useState(false);
 const [profileImg, setProfileImg] = useState<string>(DefaultAvatar);
 const [displayName, setDisplayName] = useState("Morah Codex");
 const [selectedCard, setSelectedCard] = useState('visa'); 
 const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
const [paymentType, setPaymentType] = useState('direct');
const [modalStep, setModalStep] = useState(1);
 const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardData, setCardData] = useState({
  name: "",
  number: "",
  expiry: "",
  cvv: "•••"
});


 const [searchTerm, setSearchTerm] = useState("");
 const [category, setCategory] = useState("Category");


interface NotificationSetting {
  p: boolean;
  e: boolean;
}

const [notificationPrefs, setNotificationPrefs] = useState<Record<string, NotificationSetting>>({
  "Subscription Due Date": { p: true, e: true },
  "Deleted Subscription": { p: true, e: false },
  "Transaction Notice": { p: false, e: true },
});


const handleToggle = (title: string, type: 'p' | 'e') => {
  setNotificationPrefs(prev => ({
    ...prev,
    [title]: {
      ...prev[title],
      [type]: !prev[title][type]
    }
  }));
};

 const [invoices] = useState([
  { id: "INV-3069", amount: "N7,021.23", date: "Dec 13, 2023", status: "Processing" },
  { id: "INV-3069", amount: "N7,021.23", date: "Nov 13, 2023", status: "Success" },
  { id: "INV-3067", amount: "N7,021.23", date: "Oct 13, 2023", status: "Success" },
  { id: "INV-3068", amount: "N7,021.23", date: "Sep 13, 2023", status: "Declined" },
  { id: "INV-3066", amount: "N7,021.23", date: "Sep 13, 2023", status: "Declined" },
  { id: "INV-3066", amount: "N7,021.23", date: "Sep 13, 2023", status: "Declined" },
]);



const [isError, setIsError] = useState(false);
const [timer, setTimer] = useState(0);
const [canResend, setCanResend] = useState(true);


useEffect(() => {
  if (modalStep !== 3) {
    setOtp(["", "", "", ""]);
    setIsError(false);
  }
}, [modalStep]);

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

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "Category" || inv.status === category;
    return matchesSearch && matchesCategory;
  });

const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);


const toggleInvoice = (index: number) => {
  const id = index.toString();
  setSelectedInvoices((prev) => {
    if (prev.includes(id)) {
      return prev.filter((item) => item !== id);
    } else {
      return [...prev, id];
    }
  });
};

const toggleAll = () => {
  if (selectedInvoices.length > 0) {
    setSelectedInvoices([]);
  } else {
    setSelectedInvoices(invoices.map((_, i) => i.toString()));
  }
};

const [profileData, setProfileData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "Nig"
});


const [passwords, setPasswords] = useState({
  current: "",
  new: "",
  confirm: ""
});


const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPasswords({...passwords, [e.target.name]: e.target.value})
}


const handleSave = () => {
  setIsSaving(true);

  setTimeout(() => {
    if (activeTab === "Profile") {
      if (profileData.firstName || profileData.lastName) {
        setDisplayName(`${profileData.firstName} ${profileData.lastName}`);
      }

      setActiveToast({
        id: Date.now(),
        title: "Profile Updated",
        message: "Your changes have been saved successfully.",
        type: 'fund',
        time: "Just now"
      });

      
      setProfileData({ firstName: "", lastName: "", email: "", phone: "", country: "Nig" });

    } else if (activeTab === "Password") {
      setActiveToast({
        id: Date.now(),
        title: "Security Updated",
        message: "Your password has been changed successfully.",
        type: 'fund',
        time: "Just now"
      });

      setPasswords({ current: "", new: "", confirm: "" });
    }

    setIsSaving(false);
  }, 1000);
};

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
    }
  };

  const handleDeletePicture = () => {
    setProfileImg(""); 
  };


  const handleExport = () => {
  const headers = ["Invoice ID,Amount,Date,Status\n"];
  const rows = filteredInvoices.map(inv => 
    `${inv.id},${inv.amount.replace(',', '')},${inv.date},${inv.status}`
  );

  const csvContent = headers.concat(rows.join("\n")).join("");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `billing_history_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


useEffect(() => {
  if (modalStep === 4) {
    const loadTimer = setTimeout(() => setIsLoaded(true), 1500);
    const closeTimer = setTimeout(() => {
      setIsAddPaymentOpen(false);
      setModalStep(1);
      setIsLoaded(false); 
    }, 4500);
    return () => {
      clearTimeout(loadTimer);
      clearTimeout(closeTimer);
    };
  }
}, [modalStep]);
  

 return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8 animate-in fade-in duration-700">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*" 
      />

      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-slate-500 text-sm font-medium">Manage all account settings</p>
      </div>

<div className="w-full overflow-hidden">
  <div className="flex gap-1 p-2 bg-[#0b0b0b] border border-white/5 rounded-xl w-full md:w-fit overflow-x-auto no-scrollbar">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
          activeTab === tab 
            ? "bg-[#1a1a1a] text-white border border-white/10 shadow-lg" 
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>

      {/* MAIN CONTENT CARD */}
      <div className="bg-[#0b0b0b] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        
        {/* --- PROFILE TAB CONTENT --- */}
        {activeTab === "Profile" && (
          <div className="animate-in fade-in duration-500">
            {/* TOP SECTION: AVATAR & NAME */}
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border-b border-white/5">
              <div className="relative group cursor-pointer" onClick={handleUpdateClick}>
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 ring-4 ring-white/5 bg-[#141414] flex items-center justify-center">
                  {profileImg ? (
                    <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-slate-600" />
                  )}
                </div>
                {profileImg && (
                  <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img src={Verified} alt="Verified Tick" className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Camera className="text-white w-6 h-6" />
                </div>
              </div>
              
              <div className="text-center md:text-left space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">{displayName}</h2>
                <p className="text-slate-400 ">Update your photo and personal details.</p>
                <div className="flex gap-4 pt-2 justify-center md:justify-start">
                  <button onClick={handleDeletePicture} className="text-red-500 text-sm font-bold hover:text-red-400 transition-colors">Delete Picture</button>
                  <button onClick={handleUpdateClick} className="text-blue-500 text-sm font-bold hover:text-blue-400 transition-colors">Update Picture</button>
                </div>
              </div>
            </div>

            {/* FORM SECTION */}
            <div className="p-8 md:p-12 space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start lg:items-center">
                <label className="text-white font-medium">Username</label>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 ml-1 font-semibold">First Name</p>
                    <input name="firstName" value={profileData.firstName} onChange={handleInputChange} type="text" className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 ml-1 font-semibold">Last Name</p>
                    <input name="lastName" value={profileData.lastName} onChange={handleInputChange} type="text" className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none transition-all" />
                  </div>
                </div>
              </div>
               <hr className="border-white/5 w-[calc(100%+4rem)] -ml-8 md:w-[calc(100%+6rem)] md:-ml-12" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start lg:items-center">
                <label className="text-white font-medium">Email Address</label>
                <div className="lg:col-span-2 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input name="email" value={profileData.email} onChange={handleInputChange} type="email" className="w-full bg-[#141414] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-red-600 outline-none transition-all" />
                </div>
              </div>

               <hr className="border-white/5 w-[calc(100%+4rem)] -ml-8 md:w-[calc(100%+6rem)] md:-ml-12" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start lg:items-center">
  <div className="space-y-1">
    <label className="text-white font-medium">Phone Number</label>
    <p className="text-xs text-slate-500">Enter your mobile number</p>
  </div>

  <div className="lg:col-span-2">
    <div className="flex items-center bg-[#141414] border border-white/10 rounded-xl overflow-hidden focus-within:border-red-600 transition-all">

      <div className="relative">
        <select 
          name="country" 
          value={profileData.country} 
          onChange={handleInputChange} 
          className="appearance-none bg-[#141414] text-slate-600  pl-4 pr-10 py-3 outline-none cursor-pointer text-sm"
        >
          <option value="Nig">Nig</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
      </div>
      <input 
        name="phone" 
        value={profileData.phone} 
        onChange={handleInputChange} 
        type="text" 
        placeholder="800 000 0000"
        className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-600" 
      />
          </div>
        </div>
      </div>
            </div>
          </div>
        )}

        {/* --- PASSWORD TAB CONTENT ---  */}
        {activeTab === "Password" && (
          <div className="divide-y divide-white/5 animate-in fade-in duration-500">
            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <label className="text-white font-medium">Current password</label>
              <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} placeholder="********" className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600 outline-none transition-all placeholder:text-slate-800" />
            </div>
            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <label className="text-white font-medium pt-4">New password</label>
              <div className="space-y-3">
                <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} placeholder="********" className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600 outline-none transition-all placeholder:text-slate-800" />
                <p className="text-xs text-slate-500">Your new password must be more than 8 characters.</p>
              </div>
            </div>
            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <label className="text-white font-medium">Confirm new password</label>
              <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} placeholder="********" className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-4 text-white focus:border-red-600 outline-none transition-all placeholder:text-slate-800" />
            </div>
          </div>
        )}

        {activeTab === "Notifications" && (
  <div className="p-8 animate-in fade-in duration-500">
  <div className="mb-6 pb-6 border-b border-slate-800/60">
      <h3 className="text-white text-xl font-bold mb-2">Notification settings</h3>
      <p className="text-slate-500 text-sm">
        We may still send you important notifications about your account outside of your notification settings.
      </p>
    </div>

    {/* Notification Row List */}
      <div className="space-y-0 divide-y divide-slate-800/50">
  {Object.entries(notificationPrefs).map(([title, settings]) => (
    <div key={title} className="flex items-center justify-between py-6">
      <div>
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-slate-500 text-sm">
          {title === "Subscription Due Date" && "These are notifications for subscription that is about to expire"}
          {title === "Deleted Subscription" && "These are notifications for when a subscription provider deletes a subscription"}
          {title === "Transaction Notice" && "These are notifications to let you know when your wallet has been debited"}
          
        </p>
      </div>
      
      <div className="flex flex-col gap-3 min-w-[120px]">
        {/* Push Toggle */}
        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={() => handleToggle(title, 'p')}
            className={`w-10 h-5 rounded-full relative transition-all duration-300 ${settings.p ? 'bg-[#A10714]' : 'bg-slate-700'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.p ? 'left-6' : 'left-1'}`} />
          </button>
          <span className="text-white text-sm font-medium w-10">Push</span>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={() => handleToggle(title, 'e')}
            className={`w-10 h-5 rounded-full relative transition-all duration-300 ${settings.e ? 'bg-[#A10714]' : 'bg-slate-700'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.e ? 'left-6' : 'left-1'}`} />
          </button>
          <span className="text-white text-sm font-medium w-10">Email</span>
        </div>
      </div>
    </div>
  ))}
</div>

<div className="mt-12 bg-[#20232D] rounded-2xl p-8 border border-slate-800/50">
  <h4 className="text-white font-bold mb-1 text-lg">We've just released a new update!</h4>
  <p className="text-slate-400 text-sm mb-8">Check out the all new dashboard view. Pages and now load faster.</p>
  
  <div className="flex flex-col gap-1.5">
    <label className="text-white text-sm font-medium">Subscribe to updates</label>
    
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </span>
        <input 
          type="email" 
          placeholder="you@example.com" 
          className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-3.5 pl-12 text-white outline-none focus:border-red-600 transition-all placeholder:text-slate-600"
        />
      </div>
      <button className="bg-[#A10714] hover:bg-[#8B0611] text-white font-bold px-10 py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/10">
        Subscribe
      </button>
    </div>
  </div>
</div>
  </div>
)}

  {activeTab === "Billing" && (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h3 className="text-white font-bold mb-1">Billing Details</h3>
        <p className="text-slate-500 text-sm">Select default payment method.</p>
      </div>

     <div className="flex flex-col gap-4 w-full max-w-xl">
  {/* Visa Card */}
  <div 
    onClick={() => setSelectedCard('visa')}
    className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
      selectedCard === 'visa' 
        ? "bg-[#FFCBD0] border-red-600 shadow-sm" 
        : "bg-red-50/10 border-white/5 hover:border-white/10"
    }`}
  >
    <div>
      <img src={visa} alt="Visa" className="w-10" />
    </div>
    
    <div className="flex-1">
      <h4 className={`font-bold text-sm ${selectedCard === 'visa' ? 'text-neutral-900' : 'text-neutral-200'}`}>Visa ending in 1234</h4>
     <p className={`text-xs mb-3 font-medium ${selectedCard === 'visa' ? 'text-neutral-600' : 'text-neutral-500'}`}>
        Expiry 06/2024</p>
      <div className="flex gap-4">
        <button className="text-red-600 text-xs font-bold hover:underline">Set as default</button>
        <button className="text-blue-500 text-xs font-bold hover:underline">Edit</button>
      </div>
    </div>

    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
      selectedCard === 'visa' ? "bg-red-600 border-red-600" : "border-white/20"
    }`}>
      {selectedCard === 'visa' && <Check size={12} className="text-white" strokeWidth={4} />}
    </div>
  </div>

  {/* Mastercard Card */}
  <div 
    onClick={() => setSelectedCard('mastercard')}
    className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
      selectedCard === 'mastercard' 
        ? "bg-[#FFCBD0] border-red-600 shadow-sm" 
        : "bg-red-50/10 border-white/5 hover:border-white/10" 
    }`}
  >
    <div>
      <img src={master} alt="Mastercard" className="w-10" />
    </div>
    
    <div className="flex-1">
     <h4 className={`font-bold text-sm ${selectedCard === 'mastercard' ? 'text-neutral-900' : 'text-neutral-200'}`}>
        Mastercard ending in 1234
      </h4>
     <p className={`text-xs mb-3 font-medium ${selectedCard === 'mastercard' ? 'text-neutral-600' : 'text-neutral-500'}`}>
        Expiry 06/2024
      </p>
      <div className="flex gap-4">
        <button className={`${selectedCard === 'mastercard' ? 'text-red-800' : 'text-red-600'} text-xs font-bold hover:underline`}>
          Set as default
        </button>
        <button className={`${selectedCard === 'mastercard' ? 'text-blue-800' : 'text-blue-500'} text-xs font-bold hover:underline`}>
          Edit
        </button>
      </div>
    </div>

   <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
      selectedCard === 'mastercard' ? "bg-red-600 border-red-600 shadow-sm" : "border-neutral-700"
    }`}>
      {selectedCard === 'mastercard' && <Check size={12} className="text-white" strokeWidth={4} />}
    </div>
  </div>

  <button 
  onClick={() => setIsAddPaymentOpen(true)}
  className="flex items-center gap-2 text-red-600 font-bold text-sm mt-4 hover:text-red-700 transition-all active:scale-95 w-fit"
>
  <span className="text-xl leading-none">+</span> 
  Add new payment method
</button>

  {/* Add New Method Button */}
      {isAddPaymentOpen && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
      onClick={() => {
        setIsAddPaymentOpen(false);
        setModalStep(1); 
        setIsLoaded(false);
      }} 
    />
    
    {/* Modal Container */}
    <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
      
      {modalStep === 1 ? (
        /* --- STEP 1: SELECTION --- */
        <>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Payment Method</h2>
          <p className="text-slate-500 text-[15px] mb-8">Select a payment method to attach to your account</p>
          <div className="space-y-4 mb-10">
            {/* Account Direct Debit Option */}
            <div 
              onClick={() => setPaymentType('direct')}
              className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                paymentType === 'direct' ? 'border-red-100 bg-white' : 'border-slate-100 bg-white'
              }`}
            >
              <div className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center bg-white">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0F172A]">Account Direct Debit</h4>
                <p className="text-slate-400 text-sm">Fund wallet directly from bank account</p>
              </div>
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                paymentType === 'direct' ? 'border-red-500 bg-white' : 'border-slate-200'
              }`}>
                {paymentType === 'direct' && <Check size={14} className="text-red-500" strokeWidth={4} />}
              </div>
            </div>

            {/* Card Debit Option */}
            <div 
              onClick={() => setPaymentType('card')}
              className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                paymentType === 'card' ? 'border-red-100 bg-white' : 'border-slate-100 bg-white'
              }`}
            >
              <div className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center bg-white">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0F172A]">Card Debit</h4>
                <p className="text-slate-400 text-sm">Fund wallet directly with card details</p>
              </div>
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                paymentType === 'card' ? 'border-red-500 bg-white' : 'border-slate-200'
              }`}>
                {paymentType === 'card' && <Check size={14} className="text-red-500" strokeWidth={4} />}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setIsAddPaymentOpen(false)} className="flex-1 py-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
            <button onClick={() => setModalStep(2)} className="flex-1 py-4 rounded-xl bg-[#A10714] text-white font-bold hover:bg-[#8B0611]">Continue</button>
          </div>
        </>
     ) : modalStep === 2 ? (
       <>
    {paymentType === 'card' ? (
      /* --- CARD VIEW --- */
      <div className="animate-in fade-in duration-300">
        <div className="relative h-52 w-full rounded-2xl mb-8 overflow-hidden p-6 text-white bg-gradient-to-br from-[#A10714] via-[#C44D44] to-[#E5A367]">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] m-3 rounded-xl border border-white/20 p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-lg font-medium">Untitled.</span>
              <div className="opacity-80"><Wifi size={20} className="rotate-90" /></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest opacity-70 mb-1">
                <span>{cardData.name || "......."}</span>
                <span>{cardData.expiry || "06/24"}</span>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-xl font-semibold tracking-widest">{cardData.number || "**** **** **** ****"}</p>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-white/30"></div>
                  <div className="w-6 h-6 rounded-full bg-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[#0F172A] mb-1">Card payment method</h2>
        <p className="text-slate-500 text-sm mb-6">Update your card details.</p>

       <div className="grid grid-cols-2 gap-4 mb-8">
  <div className="col-span-2">
    <label className="block text-slate-700 text-sm font-semibold mb-1.5">Name on card</label>
    <input 
      type="text" 
      value={cardData.name} 
      onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))} 
      className="w-full p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-800 text-slate-900 font-medium bg-white"
    />
  </div>

 <div className="col-span-2 relative">
  <label className="block text-slate-700 text-sm font-semibold mb-1.5">Card number</label>
  <div className="relative">
    {/* Mastercard Logo Container */}
    <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
      <img src={master} alt="Mastercard" className="w-10 object-contain" />
    </span>

    <input 
      type="text" 
      placeholder="0000 0000 0000 0000"
      value={cardData.number} 
      onChange={(e) => {
  const inputVal = e.target.value.replace(/\D/g, '');
  const formatted = inputVal.replace(/(\d{4})(?=\d)/g, '$1 ');
  
  setCardData(prev => ({ 
    ...prev, 
    number: formatted.substring(0, 19) 
  }));
}}
      className="w-full p-3.5 pl-16 rounded-xl border border-slate-200 focus:outline-none focus:border-red-800 text-slate-900 font-medium bg-white" 
    />
  </div>
</div>
  
<div>
  <label className="block text-slate-700 text-sm font-semibold mb-1.5">Expiry</label>
  <input 
    type="text" 
    placeholder="MM / YY"
    value={cardData.expiry} 
    onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))} 
    className="w-full p-3.5 rounded-xl border border-slate-200 text-center text-slate-900 font-medium bg-white focus:border-red-800 outline-none" 
      />
   </div>

  
  <div>
  <label className="block text-slate-700 text-sm font-semibold mb-1.5">CVV</label>
  <input 
    type="password" 
    maxLength={3} 
    placeholder="•••"
    value={cardData.cvv} 
    onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))} 
    className="w-full p-3.5 rounded-xl border border-slate-200 text-center text-slate-900 font-medium bg-white focus:border-red-800 outline-none" 
  />
      </div>
      </div>
      </div>

    ) : (
      /* --- BANK VIEW --- */
      <div className="animate-in fade-in duration-300">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Payment Method</h2>
        <p className="text-slate-500 text-[15px] mb-8">Select a payment method to attach to your account</p>
        <div className="space-y-5 mb-10">
          <div>
            <label className="block text-[#0F172A] font-semibold text-sm mb-2">Select Bank</label>
            <div className="relative">
              <select className="w-full p-4 bg-white border border-slate-200 rounded-xl appearance-none focus:outline-none focus:border-slate-400 text-[#0F172A] font-medium">
                <option>UBA</option>
                <option>GTBank</option>
                <option>Access Bank</option>
                <option>Zenith Bank</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold text-sm mb-2">Account Name</label>
            <input type="text" className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none text-[#0F172A] font-medium" />
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold text-sm mb-2">Account Number</label>
            <input type="text" className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none text-[#0F172A] font-medium" />
          </div>
        </div>
      </div>
    )}

   <div className="flex gap-4">
  <button 
    onClick={() => {
    
      setCardData({
        name: '',
        number: '',
        expiry: '',
        cvv: ''
      });
      setModalStep(1); 
    }} 
    className="flex-1 py-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
  >
    Cancel
  </button>

  <button 
    onClick={() => {
      if (paymentType === 'card') {
        setModalStep(4);
        setTimeout(() => {
          setIsLoaded(true);
          setCardData({ name: '', number: '', expiry: '', cvv: '' });
        }, 2000);
      } else {
        setModalStep(3);
      }
    }} 
    className="flex-1 py-4 rounded-xl bg-[#A10714] text-white font-bold hover:bg-[#8B0611] transition-colors"
  >
    {paymentType === 'card' ? 'Add Card' : 'Add Account'}
  </button>
</div>
  </>
) : modalStep === 3 ? (
  /* --- STEP 3: OTP VERIFICATION WITH ERROR & TIMER --- */
  <div className="text-center relative">
    <button 
      onClick={() => setModalStep(2)} 
      className="absolute -right-2 -top-4 p-2 text-slate-400"
    >
    </button>
    
    <h2 className="text-2xl font-bold text-[#0F172A] mb-1 mt-4">OTP Verification</h2>
    <p className="text-slate-500 text-[15px] mb-10">
      We've sent a code to the number attached to your account
    </p>

    {/* Shake container when isError is true */}
    <div className={`space-y-6 ${isError ? "animate-shake" : ""}`}>
      <div className="flex justify-center gap-3">
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
              setIsError(false); 

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

      <div className="text-center">
        {isError && (
          <p className="text-red-500 text-xs font-bold mb-2">
            Invalid OTP. Please try again.
          </p>
        )}
        
        <p className="text-slate-500 text-sm">
          Didn't get a code?{" "}
          {canResend ? (
            <button 
              onClick={handleResend}
              className="text-slate-900 underline font-semibold hover:text-red-800 transition-colors"
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

    <div className="flex gap-4 mt-12">
      <button 
  onClick={() => {
    setModalStep(2);
    setOtp(["", "", "", ""]); 
    setIsError(false);
  }} 
  className="flex-1 py-4 rounded-xl border border-slate-200 text-slate-600 font-bold"
>
  Cancel
</button>
      <button 
        onClick={() => {
          if (otp.join("") !== "1234") {
            setIsError(true);
          } else {
            setIsError(false);
            setModalStep(4);
            setTimeout(() => setIsLoaded(true), 2000);
          }
        }} 
        className="flex-1 py-4 rounded-xl bg-[#A10714] text-white font-bold hover:bg-[#8B0611]"
      >
        Verify
      </button>
    </div>
  </div>

      ) : (
        <div className="py-6 flex flex-col w-full animate-in fade-in duration-500">
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Add Account</h2>
            <p className="text-slate-500 text-[15px]">add a bank account to your account</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center pb-12">
            <div className="relative w-24 h-24 mb-16 flex items-center justify-center">
              {!isLoaded ? (
                <>
                  <div className="absolute inset-0 border-[6px] border-slate-50 rounded-full"></div>
                  <div className="absolute inset-0 border-[6px] border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  <Check size={40} className="text-green-600" strokeWidth={3} />
                </div>
              )}
            </div>
           <h3 className="text-[26px] font-bold text-[#0F172A] tracking-tight">
    {paymentType === 'card' ? 'Card added successfully' : 'Bank account added successfully'}
  </h3>
          </div>
        </div>
      )}
    </div>
  </div>
)}
</div>
    </div>

    {/* BILLING HISTORY TABLE */}
    <div className="border-t border-white/5 p-8 md:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h3 className="text-xl font-bold text-white">Billing History</h3>
<div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">  
  <div className="relative w-full md:w-72">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
    <input 
      type="text"
      placeholder="Search transaction"
      className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-red-600/50 transition-colors"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div className="flex gap-3 w-full md:w-auto">
    <div className="relative flex-1 md:flex-none">
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full appearance-none flex items-center gap-2 bg-[#141414] border border-white/10 text-white px-3 py-2.5 pr-10 rounded-lg text-sm font-medium hover:border-white/20 transition-all focus:outline-none cursor-pointer"
      >
        <option value="Category">Category</option>
        <option value="Success">Success</option>
        <option value="Processing">Processing</option>
        <option value="Declined">Declined</option>
      </select>
      <ChevronDown 
        size={16} 
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" 
      />
    </div>

    <button 
      onClick={handleExport}
      className="flex-1 md:flex-none justify-center bg-white text-black px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-200 transition-all active:scale-95"
    >
      <Download size={16} /> Export
    </button>
  </div>
</div>
      </div>
 
 <div className="w-full">
  <div className="overflow-x-auto scrollbar-hide">
    <table className="w-full min-w-[1000px] text-sm text-slate-400">
      <thead className="border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500">
        <tr>
          <th className="pb-6 pl-2 w-12 text-left">
            <div onClick={toggleAll} className="w-5 h-5 border rounded-md border-red-600/50 bg-red-600/10 flex items-center justify-center cursor-pointer">
              <div className="w-2.5 h-0.5 bg-red-600 rounded-full" />
            </div>
          </th>
          <th className="pb-6 pl-4 font-medium text-left w-full">Invoice</th>
          <th className="pb-6 px-6 font-medium text-left w-32">Order amount</th>
          <th className="pb-6 px-7 font-medium text-left w-44">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              Delivery date
              <ArrowDown size={14} className="text-slate-500" />
            </div>
          </th>
          <th className="pb-6 px-10 font-medium text-left w-32">Status</th>
          <th className="pb-6 text-right pr-4 w-40"></th>
        </tr>
      </thead>

      <tbody className="divide-y divide-white/5">
        {filteredInvoices.map((inv, i) => {
          const isSelected = selectedInvoices.includes(i.toString());

          return (
            <tr key={`row-${i}`} className="hover:bg-white/[0.02] group transition-colors">
              <td className="py-6 pl-2">
                <div 
                  onClick={() => toggleInvoice(i)}
                  className={`w-5 h-5 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? "bg-red-600 border-red-600 shadow-md shadow-red-900/40" 
                      : "bg-transparent border-white/20 hover:border-white/40"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-white animate-in zoom-in duration-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </td>

              <td className="py-6 pl-4 text-slate-300 font-medium whitespace-nowrap">{inv.id}</td>
              <td className="py-6 px-10 text-slate-400 whitespace-nowrap">{inv.amount}</td>
              <td className="py-6 px-10 text-slate-400 whitespace-nowrap">{inv.date}</td>

              <td className="py-6 pr-24 pl-6">
                <span className={`inline-flex items-center gap-4 px-4 py-1 rounded-full text-[11px] font-medium bg-[#1A1A1A] border border-white/5 ${
                  inv.status === 'Success' ? 'text-green-400' : 
                  inv.status === 'Processing' ? 'text-white' : 'text-red-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    inv.status === 'Success' ? 'bg-green-500' : 
                    inv.status === 'Processing' ? 'bg-white' : 'bg-red-500'
                  }`} />
                  {inv.status}
                </span>
              </td>

              <td className="py-6 text-right pr-4">
                <div className="flex justify-end items-center gap-6 text-slate-500">
                  <button className="hover:text-white transition-colors"><Eye size={20}/></button>
                  <button className="hover:text-white transition-colors"><Download size={20}/></button>
                  <button className="hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-white/5">
  <p className="text-sm text-slate-600 font-medium order-2 sm:order-1">
    Page <span className="text-slate-400">1</span> of <span className="text-slate-400">10</span>
  </p>
  <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
    <button 
      className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-white/10 text-sm font-semibold text-slate-500 hover:bg-white/5 hover:text-white transition-all disabled:opacity-50" 
      disabled
    >
      Previous
    </button>
    <button 
      className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-white/10 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-all"
    >
      Next
    </button>
  </div>
</div>
    </div>
  </div>
)}
      </div>

      {/* FOOTER ACTIONS */}
{(activeTab === "Profile" || activeTab === "Password") && (
  <div className="flex justify-end gap-4 pt-4 pb-10 animate-in fade-in duration-300">
    <button 
      type="button"
      disabled={isSaving} 
      onClick={() => {
        console.log("Cancel clicked");
      }}
      className="px-10 py-3 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-all disabled:opacity-50"
    >
      Cancel
    </button>
    <button 
      onClick={handleSave} 
      disabled={isSaving} 
      className="px-10 py-3 rounded-xl bg-[#A10714] text-white font-bold hover:bg-red-800 transition-all shadow-lg flex items-center gap-2"
    >
      {isSaving ? "Saving..." : "Save Changes"}
    </button>
  </div>
)}

    </div>
  );
}

export default SettingsPage;