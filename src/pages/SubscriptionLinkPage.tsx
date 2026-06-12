import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "../assets/logo.png";

export default function SubscriptionLinkPage() {
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-8 md:p-12">
      {/* Logo Area */}
      <div className="flex items-center gap-2 mb-12">
        <div className="items-center justify-center font-bold">
          <img src={logo} alt="Logo" />
          </div>
        <span className="font-krona text-2xl font-[400] tracking-tight text-white">
      Subscribly
     </span>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-3">Subscription link</h1>
        <p className="text-slate-400 text-sm mb-12 text-center">
          Join a subscription plan by uploading a link from a provider
        </p>

        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 ml-1">Subscription Link</label>
                <div className="relative flex items-center bg-transparent border border-slate-800 rounded-xl overflow-hidden focus-within:border-red-900 transition-all duration-200">
     <span className="pl-4 pr-3 text-slate-600 text-sm whitespace-nowrap select-none">
    /Subscription Link
  </span>
      <div className="h-6 w-[1px] bg-slate-800"></div>
            <Input 
                className="border-none bg-transparent h-14 pl-3 focus-visible:ring-0 text-white text-sm"
                placeholder="Enter Link" // Changed from defaultValue to placeholder
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
           </div>
          </div>

        <Button 
            onClick={() => {
                if(link) navigate("/dashboard");
                else alert("Please enter a link");
            }} 
            className="w-full h-14 bg-red-800 hover:bg-red-900 text-white rounded-xl font-bold text-lg"
          >
            Join
          </Button>

        <button 
            type="button"
            onClick={() => navigate("/dashboard")} 
            className="text-white font-bold underline underline-offset-4 text-sm mt-10 block mx-auto hover:text-slate-300 transition-colors"
          >
            Skip Step
          </button>
        </div>
      </div>
    </div>
  );
}