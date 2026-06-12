import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Check } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import logo from '../assets/logo.png';
import fcGoogle from "../assets/FcGoogle.svg";
export default function ProviderAuthPage() {
  const navigate = useNavigate();
  const context = useOutletContext<any>();
  const setUserName = context?.setUserName;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();

    const registeredProviders = JSON.parse(localStorage.getItem('providerUsers') || '[]');

    const matchedUser = registeredProviders.find(
      (user: any) => user.email === email && user.password === password
    );

   if (matchedUser) {
      localStorage.setItem('userToken', 'active_session_token');
      localStorage.setItem('currentUser', matchedUser.fullName);
      localStorage.setItem('accountType', 'provider');
      
      // THIS IS THE FIX: The switchboard needs this to know you've already onboarded
      localStorage.setItem('isReturningUser', 'true'); 
      
      if (setUserName) setUserName(matchedUser.fullName);
      
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-white flex items-center justify-center p-4 md:p-12 font-sans selection:bg-red-700">
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="items-center justify-center">
              <img src={logo} alt="Logo" />
            </div>
             <span className="font-krona text-2xl font-[400] tracking-tight text-white">
              Subscribly
            </span>
        </div>
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-300 leading-tight">
              Login to manage <br /> all of your
            </h2>
            <h1 className="text-4xl md:text-5xl font-black tracking-wide text-white">
              Subscriptions
            </h1>
          </div>

         <div className="space-y-3 pt-4 max-w-[360px]">
            {[
              "Special discounts rates",
              "Unlimited free downloads",
              "Special promotions",
              "Coupon winning"
            ].map((text, idx) => {
              const isFirst = idx === 0;

              return (
                <div 
                  key={idx} 
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all 
                    ${isFirst 
                      ? "bg-[#640512] border border-red-900/50 hover:bg-[#7a0616]"
                      : "bg-[#23050B]/40 border border-red-950/40 hover:bg-[#320710]/50"
                    }`}
                >
            
                  <div className={`p-1.5 rounded ${isFirst ? "" : "text-white"}`}>
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                  
                
                  <span className={`font-medium text-sm md:text-base ${isFirst ? "text-white font-semibold" : "text-gray-300"}`}>
                    {text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        
       <div className="lg:col-span-7 flex justify-center lg:justify-end py-12 w-full">
          <div className="relative w-full max-w-[480px]">
           <div className="absolute inset-y-16 right-6 w-full bg-zinc-800/20 border border-zinc-700/20 rounded-3xl transform -translate-x-9 scale-[0.94] blur-[1px] hidden sm:block z-0"></div>

          <div className="absolute inset-y-10 right-4 w-full bg-zinc-800/50 border border-zinc-700/30 rounded-3xl transform -translate-x-6 scale-[0.96] blur-[0.5px] hidden sm:block z-0"></div>
        
          <div className="absolute inset-y-5 right-2 w-full bg-zinc-800/70 border border-zinc-700/40 rounded-3xl transform -translate-x-3 scale-[0.98] hidden sm:block z-0"></div>
            
            <div className="bg-white text-black w-full rounded-[2rem] p-8 md:p-12 shadow-2xl relative z-10">
              <h3 className="text-3xl font-bold text-center text-zinc-900 mb-8">Welcome!</h3>
              
            <Button variant="outline" className="w-full flex items-center gap-2 h-12 rounded-xl mb-6">
            <img src={fcGoogle} alt="Google" className="w-5 h-5" />
            Sign in with google
          </Button>

            <div className="flex items-center my-6">
              <div className="flex-1 h-[1px] bg-zinc-200"></div>
              <span className="text-xs text-zinc-400 font-bold px-4 tracking-wider">OR</span>
              <div className="flex-1 h-[1px] bg-zinc-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wider">Email</label>
                <input
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all text-zinc-900"
                />
              </div>

              <div className="relative">
                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wider">Password</label>
                <input
                  name="password"
                  type="password" 
                  placeholder="••••••••" 
                  required
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all text-zinc-900 tracking-widest"
                />
              </div>
            
              <div className="flex items-center justify-between text-xs font-medium pt-1">
                <label className="flex items-center gap-2 text-zinc-500 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-zinc-300 text-red-700 focus:ring-red-700 accent-red-700" />
                  Remember for 30 days
                </label>
                <a href="#" className="text-red-700 font-bold hover:underline">Forgot password</a>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#A30B1E] text-white py-3.5 rounded-xl font-bold tracking-wide hover:bg-[#850817] active:scale-[0.99] transition-all shadow-md mt-4"
              >
                Sign in
              </button>
            </form>

            <p className="text-center mt-8 text-sm font-medium text-zinc-500">
              Not a member?{" "}
              <Link to="/provider-signup" className="text-red-700 hover:underline font-bold">
                Sign up
              </Link>
            </p>
          </div>
       </div>
        </div>
      </div>
    </div>
  );
}