import { Outlet, NavLink } from "react-router-dom";
import { Bell, User, X, Menu, ArrowUpRight, ArrowDownLeft, CreditCard, Settings, LifeBuoy, TrendingUp, History } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";

export interface AppNotification {
  id: number | string;
  title: string;
  message: string;
  type: 'fund' | 'withdraw';
  time: string;
}

const Layout = ({
  userName,
  notifications, 
  hasUnread, 
  setHasUnread, 
  setNotifications,
  setUserName 
}: { 
  userName: string,
  notifications: AppNotification[], 
  hasUnread: boolean, 
  setHasUnread: (val: boolean) => void, 
  setNotifications: React.Dispatch<React.SetStateAction<AppNotification[]>>,
  setUserName: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);

  const accountType = localStorage.getItem("accountType") || "subscriber";
  const subscriberLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Subscriptions', path: '/subscriptions', icon: <CreditCard className="w-4 h-4" /> },
    { name: 'Support', path: '/support', icon: <LifeBuoy className="w-4 h-4" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-4 h-4" /> }
  ];

 
const providerLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: <TrendingUp className="w-4 h-4" /> },
  { name: 'Subscriptions', path: '/provider/subscriptions', icon: <CreditCard className="w-4 h-4" /> }, // 👈 Added the 's' here!
  { name: 'Transactions', path: '/provider/transactions', icon: <History className="w-4 h-4" /> },
  { name: 'Settings', path: '/provider/settings', icon: <Settings className="w-4 h-4" /> }
];

  const navigationLinks = accountType === "provider" ? providerLinks : subscriberLinks;

  return (
    <div className="min-h-screen bg-[#111214] text-white">
      {/* --- NAVBAR SECTION --- */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
       <div className="flex items-center gap-2">
          <img src={logo} alt="Subscribly Logo" className="h-9 w-auto" />
          <span className="font-krona text-xl tracking-tight text-white">
            Subscribly
          </span>
        </div>
        {/* Navigation Links using dynamic current arrays */}
        <div className="hidden lg:flex items-center gap-2 text-sm">
          {navigationLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path}
              className={({ isActive }) => `
                px-4 py-2 rounded-lg transition-all font-medium
                ${isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-slate-400 hover:text-white'}
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => {
                if (!isNotifOpen) {
                  setHasUnread(false);
                }
                setIsNotifOpen(!isNotifOpen);
              }}
              className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-400" />
              {hasUnread && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-[#0a0a0a]"></span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-4 w-72 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl z-[60] overflow-hidden flex flex-col">
                <div className="p-4 border-b border-white/5 font-bold text-sm flex justify-between items-center">
                  <span>Notifications</span>
                  {notifications.length > 0 && (
                    <span className="bg-red-600/20 text-red-500 text-[10px] px-2 py-0.5 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </div>
                
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map((n: AppNotification) => (
                        <div key={n.id} className="p-4 border-b border-white/[0.03] hover:bg-white/[0.02]">
                          <div className={`mt-1 p-1.5 rounded-full w-fit ${n.type === 'withdraw' ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                            {n.type === 'withdraw' ? (
                              <ArrowUpRight className="w-3 h-3 text-red-500" />
                            ) : (
                              <ArrowDownLeft className="w-3 h-3 text-emerald-500" />
                            )}
                          </div>
                          <p className="text-xs font-bold text-white mt-1">{n.title}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{n.message}</p>
                          <p className="text-[9px] text-slate-600 mt-2">{n.time}</p>
                        </div>
                      ))}

                      <button 
                        onClick={() => setNotifications([])} 
                        className="w-full p-3 text-[10px] font-bold text-red-700 hover:text-red-500 hover:bg-red-500/5 transition-all uppercase tracking-widest border-t border-white/5"
                      >
                        Clear All Notifications
                      </button>
                    </>
                  ) : (
                    <div className="p-10 text-xs text-slate-500 text-center">
                      No new notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:flex w-9 h-9 bg-blue-500/20 rounded-full items-center justify-center border border-blue-500/20">
            <User className="w-5 h-5 text-blue-400" />
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-slate-400" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
      
      {/* --- MOBILE SIDEBAR --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-[#121212] p-6 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-lg">Menu</span>
              <X className="w-6 h-6 text-slate-400 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
            </div>
        
            <div className="space-y-4">
              {navigationLinks.map((item) => (
                <NavLink 
                  key={item.name} 
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={({ isActive }) => `
                    flex items-center gap-3 p-3 rounded-xl transition-all font-medium
                    ${isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {item.icon} {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeToast && (
        <div className="fixed top-20 right-6 z-[200] animate-in slide-in-from-top-5 duration-500">
          <div className="bg-[#181818] border border-blue-500/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.15)] w-80 flex items-start gap-3 backdrop-blur-md">
            <div className="bg-blue-500 p-2 rounded-xl shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              <Bell className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-bold text-white">New Message</h5>
              <p className="text-[13px] text-slate-300 mt-1 line-clamp-2">{activeToast.message}</p>
            </div>

            <button 
              onClick={() => setActiveToast(null)}
              className="p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-slate-500 hover:text-white" />
            </button>
          </div>
        </div>
      )}

      {/* --- PAGE CONTENT SECTION --- */}
      <main>
        <Outlet context={{ userName, setUserName, setNotifications, setHasUnread, setActiveToast }} />
      </main>
    </div>
  );
};

export default Layout;