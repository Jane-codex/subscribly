import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProviderDashboard from "./ProviderDashboard"; 
import SubscriberDashboard from "./SubscriberDashboard";


interface SwitchboardProps {
  profilePic: string;
  setProfilePic: (base64String: string) => void;
}

export default function DashboardSwitchboard({ profilePic, setProfilePic }: SwitchboardProps) {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<string | null>(null);
  const [debugLog, setDebugLog] = useState<string>("");
  const [isLocked, setIsLocked] = useState<boolean>(false);

  useEffect(() => {
    const storedType = localStorage.getItem("accountType"); 
    const isOnboarded = localStorage.getItem("isReturningUser"); 
    const token = localStorage.getItem("userToken");

    const logMessage = `accountType: "${storedType}", isReturningUser: "${isOnboarded}", userToken: "${token ? 'Present' : 'Missing'}"`;
    setDebugLog(logMessage);
    if (storedType === "provider" && isOnboarded !== "true") {
      setIsLocked(true); 
      return;
    }
    setAccountType(storedType);
  }, []);

  if (isLocked) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8 flex flex-col items-center justify-center font-sans">
        <div className="bg-zinc-900 border-2 border-amber-500 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-4">
          <h2 className="text-xl font-bold text-amber-500">⚠️ Switchboard Intercepted a Bounce Loop</h2>
          <p className="text-zinc-400 text-sm">
            Your application wanted to redirect to onboarding because the current state failed validation. Here is what is in your browser right now:
          </p>
          <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-xs text-green-400 space-y-2">
            <p>💾 {debugLog}</p>
          </div>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                localStorage.setItem("accountType", "provider");
                localStorage.setItem("isReturningUser", "true");
                window.location.reload();
              }}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all"
            >
              Force Apply Provider Flags & Reload
            </button>
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="w-full bg-zinc-800 text-zinc-400 hover:text-white text-xs py-2 rounded-xl transition-all"
          >
            Clear Everything & Reset
          </button>
        </div>
      </div>
    );
  }

  if (!accountType) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-slate-400 font-sans">
        Loading workspace...
      </div>
    );
  }

  if (accountType === "provider") {
   return (
      <ProviderDashboard 
        profilePic={profilePic} 
        setProfilePic={setProfilePic} // 🎯 MUST BE PASSED HERE!
      />
    );
  }

  return <SubscriberDashboard key="subscriber-layout-view" />;
}