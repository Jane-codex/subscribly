import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ⚡ Import Link
import logo from "../assets/logo.png";
import { User, ShieldCheck } from "lucide-react"; // Adjust based on your icon library

export default function SelectAccountType() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState<"subscriber" | "provider">("subscriber");

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-white flex flex-col p-8 md:p-16 font-sans">
    
      <div className="flex items-center gap-2 mb-20">
        <div className="flex items-center gap-2">
          <div className="items-center justify-center">
            <img src={logo} alt="Logo" />
          </div>
          <span className="font-krona text-2xl font-[400] tracking-tight text-white">
            Subscribly
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-12 text-gray-200">Select your account type</h2>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
        
          <button 
            onClick={() => {
              setActiveType("subscriber");
              navigate("/signup"); 
            }}
            onMouseEnter={() => setActiveType("subscriber")}
            className={`flex-1 group rounded-3xl p-10 flex flex-col items-center gap-6 transition-all duration-300 border-2 text-center
              ${activeType === "subscriber" 
                ? "border-red-900 bg-red-950/20 text-white" 
                : "border-white/10 bg-white/5 text-slate-400 hover:border-red-900/40 hover:bg-white/10"
              }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all
              ${activeType === "subscriber" ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10"}`}
            >
              <User className={`w-6 h-6 transition-colors ${activeType === "subscriber" ? "text-white" : "text-slate-400"}`} />
            </div>
            <span className={`text-lg font-medium transition-colors ${activeType === "subscriber" ? "text-white" : "text-slate-400"}`}>
              Subscriber
            </span>
          </button>

          <button 
            onClick={() => {
              setActiveType("provider");
              navigate('/provider-signup'); 
            }}
            onMouseEnter={() => setActiveType("provider")}
            className={`flex-1 group rounded-3xl p-10 flex flex-col items-center gap-6 transition-all duration-300 border-2 text-center
              ${activeType === "provider" 
                ? "border-red-900 bg-red-950/20 text-white" 
                : "border-white/10 bg-white/5 text-slate-400 hover:border-red-900/40 hover:bg-white/10"
              }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all group-hover:scale-105
              ${activeType === "provider" ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10"}`}
            >
              <ShieldCheck className={`w-6 h-6 transition-colors ${activeType === "provider" ? "text-white" : "text-slate-400"}`} />
            </div>
            <span className={`text-lg font-medium transition-colors ${activeType === "provider" ? "text-white" : "text-slate-400"}`}>
              Subscription Provider
            </span>
          </button>
        </div>
        <p className="mt-12 text-sm text-slate-400 font-medium">
          Already a Member?{" "}
          <Link 
            to={activeType === "provider" ? "/provider-login" : "/login"} 
            className="text-red-700 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}