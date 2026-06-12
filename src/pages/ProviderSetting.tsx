import { useState, useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import { Mail, ChevronDown, Camera } from "lucide-react";
import DefaultAvatar from "../assets/defaultavatar.jpg";
import Verified from "../assets/Verified-tick.png";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const tabs = ["Profile", "Password", "Notifications"];
   const [profileImg, setProfileImg] = useState<string>(DefaultAvatar);
    const { setActiveToast } = useOutletContext<any>(); 
    // 1. Initialize from localStorage so it remembers after you navigate away
const [displayName, setDisplayName] = useState(() => localStorage.getItem("savedName") || "Morah Codex");

// This will make the inputs blank every time the page loads
const [profileData, setProfileData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "Nig"
});
 
    const [isSaving, setIsSaving] = useState(false);
     
     
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
      const newName = `${profileData.firstName} ${profileData.lastName}`.trim();
      
      // 1. Update Display Name and Save to LocalStorage
      if (newName) {
        setDisplayName(newName);
        localStorage.setItem("savedName", newName);
      }

      // 2. Save the full profile data to LocalStorage
      localStorage.setItem("savedProfile", JSON.stringify(profileData));

      // 3. Trigger the success toast
      setActiveToast({
        id: Date.now(),
        title: "Profile Updated",
        message: "Your changes have been saved successfully.",
        type: 'fund',
        time: "Just now"
      });

      // 4. NOW clear the inputs to give the user a "Clean Slate"
      setProfileData({ firstName: "", lastName: "", email: "", phone: "", country: "Nig" });
      
    } else if (activeTab === "Password") {
      setActiveToast({
        id: Date.now(),
        title: "Security Updated",
        message: "Your password has been changed successfully.",
        type: 'fund',
        time: "Just now"
      });

      // Clear password inputs
      setPasswords({ current: "", new: "", confirm: "" });
    }

    if (activeTab === "Notifications") {
      setActiveToast({
        id: Date.now(),
        title: "Notifications Updated",
        message: "Your preferences have been saved.",
        type: 'fund',
        time: "Just now"
      });
      // Optionally save to localStorage here too
      localStorage.setItem("savedNotifications", JSON.stringify(notifications));
    }

    setIsSaving(false);
  }, 1000);
};
       // Reference for the hidden file input
       const fileInputRef = useRef<HTMLInputElement>(null);
     
       
     
       const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
         setProfileData({ ...profileData, [e.target.name]: e.target.value });
       };
     
       // Handle Image Update
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
     
       // Handle Image Deletion
       const handleDeletePicture = () => {
         setProfileImg(""); // Resets to empty/placeholder
       };

  const [notifications, setNotifications] = useState({
  subscriptionPush: false,
  subscriptionEmail: false,
  transactionPush: true, // Based on your image (Transaction Push is ON)
  transactionEmail: false,
});

const handleToggle = (key: keyof typeof notifications) => {
  setNotifications(prev => ({
    ...prev,
    [key]: !prev[key]
  }));
};

  return (
      <div className="min-h-screen bg-gray-100 pb-16 font-sans antialiased">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8 animate-in fade-in duration-700">
         {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*" 
      />

      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage all account settings</p>
      </div>

      {/* Tabs Row */}
      <div className="flex bg-gray-200/50 p-1 rounded-lg w-full sm:w-fit mb-5 border border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-sm font-semibold rounded-md transition-all flex-1 sm:flex-none ${
              activeTab === tab 
                ? "bg-[#27272A] text-white shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    
       {/* MAIN CONTENT CARD */}
      <div className="bg-[#FFFFFF] border border-black/10 rounded-[1rem]">
        
        {/* --- PROFILE TAB CONTENT --- */}
        {activeTab === "Profile" && (
          <div className="animate-in fade-in duration-500">
            {/* TOP SECTION: AVATAR & NAME */}
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border-b border-black/10">
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
                <h2 className="text-2xl font-bold text-[#31353F] tracking-tight">{displayName}</h2>
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
                <label className="text-[#31353F] font-medium">Username</label>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 ml-1 font-semibold">First Name</p>
                    <input name="firstName" value={profileData.firstName} onChange={handleInputChange} type="text" className="w-full border border-black/10 rounded-xl px-4 py-3 text-slate-900 focus:border-red-600 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 ml-1 font-semibold">Last Name</p>
                    <input name="lastName" value={profileData.lastName} onChange={handleInputChange} type="text" className="w-full bg-[#FFFFFF] border border-black/10 rounded-xl px-4 py-3 text-slate-900 focus:border-red-600 outline-none transition-all" />
                  </div>
                </div>
              </div>
                   
                   <hr className="border-black/10 w-[calc(100%+4rem)] -ml-8 md:w-[calc(100%+6rem)] md:-ml-12" />
              
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="flex flex-col">
                <label className="text-[#31353F] font-medium">Email Address</label>
                <span className="text-xs text-slate-500 mt-1">Enter an email address</span>
            </div>
                <div className="lg:col-span-2 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                    name="email" 
                    value={profileData.email} 
                    onChange={handleInputChange} 
                    type="email" 
                    className="w-full bg-[#FFFFFF] border border-black/10 rounded-xl pl-12 pr-4 py-3 text-slate-900  focus:border-red-600 outline-none transition-all" 
                    />
                </div>
                </div>

              <hr className="border-black/10 w-[calc(100%+4rem)] -ml-8 md:w-[calc(100%+6rem)] md:-ml-12" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start lg:items-center">
  <div className="space-y-1">
    <label className="text-[#31353F] font-medium">Phone Number</label>
    <p className="text-xs text-slate-900">Enter your active phone number</p>
  </div>

  <div className="lg:col-span-2">
    <div className="flex items-center bg-[#FFFFFF] border border-black/10 rounded-xl overflow-hidden focus-within:border-red-600 transition-all">

      <div className="relative">
        <select 
          name="country" 
          value={profileData.country} 
          onChange={handleInputChange} 
          className="appearance-none bg-[#FFFFFF] text-slate-600  pl-4 pr-10 py-3 outline-none cursor-pointer text-sm"
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
        className="flex-1 bg-transparent px-4 py-3 text-slate-900 outline-none placeholder:text-slate-600" 
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
              <label className="text-gray-900 font-medium">Current password</label>
              <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} placeholder="********" className="w-full bg-[#ffffff] border border-black/10 rounded-xl px-3 py-3 text-gray-900 focus:border-red-600 outline-none transition-all placeholder:text-slate-800" />
            </div>

            <hr className="border-black/10" />

            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <label className="text-gray-900 font-medium pt-4">New password</label>
              <div className="space-y-3">
                <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} placeholder="********" className="w-full bg-[#fffff] border border-black/10 rounded-xl px-3 py-3 text-gray-900 focus:border-red-600 outline-none transition-all placeholder:text-slate-800" />
                <p className="text-xs text-slate-500">Your new password must be more than 8 characters.</p>
              </div>
            </div>

              <hr className="border-black/10" />
              
            <div className="p-5 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <label className="text-gray-900 font-medium">Confirm new password</label>
              <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} placeholder="********" className="w-full bg-[#fffff] border border-black/10 rounded-xl px-3 py-3 text-gray-900 focus:border-red-600 outline-none transition-all placeholder:text-slate-800" />
            </div>
          </div>
        )}

        {activeTab === "Notifications" && (
  <div className="p-8 md:p-12 space-y-8 animate-in fade-in duration-500">
    
    {/* Subscription Alert Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
      <div>
        <p className="font-semibold text-gray-900">Subscription Alert</p>
        <p className="text-sm text-gray-500">Notify you when an order is made or delivered</p>
      </div>
      <div className="lg:col-span-2 flex flex-col gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={notifications.subscriptionPush} onChange={() => handleToggle('subscriptionPush')} className="hidden" />
          <div className={`w-11 h-6 rounded-full transition-colors ${notifications.subscriptionPush ? 'bg-[#A60615]' : 'bg-gray-300'}`}>
            <div className={`w-4 h-4 mt-1 ml-1 bg-black rounded-full transition-transform ${notifications.subscriptionPush ? 'translate-x-5' : ''}`} />
          </div>
          <span className="text-sm text-gray-700">Push</span>
        </label>
        
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={notifications.subscriptionEmail} onChange={() => handleToggle('subscriptionEmail')} className="hidden" />
          <div className={`w-11 h-6 rounded-full transition-colors ${notifications.subscriptionEmail ? 'bg-[#A60615]' : 'bg-gray-300'}`}>
             <div className={`w-4 h-4 mt-1 ml-1 bg-black rounded-full transition-transform ${notifications.subscriptionEmail ? 'translate-x-5' : ''}`} />
          </div>
          <span className="text-sm text-gray-700">Email</span>
        </label>
      </div>
    </div>

    <hr className="border-black/10" />

    {/* Transaction Alert Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
      <div>
        <p className="font-semibold text-gray-900">Transaction Alert</p>
        <p className="text-sm text-gray-500">Notify you when a transaction is made on your account</p>
      </div>
      <div className="lg:col-span-2 flex flex-col gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={notifications.transactionPush} onChange={() => handleToggle('transactionPush')} className="hidden" />
          <div className={`w-11 h-6 rounded-full transition-colors ${notifications.transactionPush ? 'bg-[#A10714]' : 'bg-gray-300'}`}>
             <div className={`w-4 h-4 mt-1 ml-1 bg-black rounded-full transition-transform ${notifications.transactionPush ? 'translate-x-5' : ''}`} />
          </div>
          <span className="text-sm text-gray-700">Push</span>
        </label>
        
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={notifications.transactionEmail} onChange={() => handleToggle('transactionEmail')} className="hidden" />
          <div className={`w-11 h-6 rounded-full transition-colors ${notifications.transactionEmail ? 'bg-[#A10714]' : 'bg-gray-300'}`}>
             <div className={`w-4 h-4 mt-1 ml-1 bg-black rounded-full transition-transform ${notifications.transactionEmail ? 'translate-x-5' : ''}`} />
          </div>
          <span className="text-sm text-gray-700">Email</span>
        </label>
      </div>
    </div>
  </div>
)}
</div>
        
         {/* FOOTER ACTIONS - INTEGRATED INTO THE GRID */}
{(activeTab === "Profile" || activeTab === "Password" || activeTab === "Notifications") && (
  <div className="px-4 md:px-12 pb-16 animate-in fade-in duration-300">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="hidden lg:block"></div> 
      <div className="lg:col-span-2 flex flex-col md:flex-row justify-end gap-4">
        <button 
          type="button"
          disabled={isSaving} 
          onClick={() => console.log("Cancel clicked")}
          className="w-full md:w-auto px-10 py-3 rounded-xl bg-white border border-gray-200 text-black font-bold hover:bg-slate-50 transition-all"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave} 
          disabled={isSaving} 
         className="w-full md:w-auto px-10 py-3 rounded-xl bg-[#A10714] text-white font-bold hover:bg-red-800 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  </div>
)}
        </div>
    </div>
  );
}