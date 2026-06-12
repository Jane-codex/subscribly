import { Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const JoinByLink = () => {

  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white p-6 font-sans">
      <nav className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 mb-24">
         <span className="cursor-pointer hover:text-white" onClick={() => navigate("/dashboard")}>
          <Home size={18} />
        </span>
        <ChevronRight size={12} />
        <span className="cursor-pointer hover:text-white transition-colors tracking-wider">Subscription</span>  
        <ChevronRight size={12} />
        <span className="text-slate-600">...</span>
        <ChevronRight size={12} />
        <span className="text-red-700 font-semibold tracking-wider">Join subscription link</span>
      </nav>    
      <div className="max-w-md mx-auto flex flex-col items-center text-center mt-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
          Subscription link
        </h1>
        <p className="text-slate-400 text-sm md:text-base mb-12 leading-relaxed">
          Join a subscription plan by uploading a link from a provider
        </p>

        {/* 3. The Input Form */}
        <div className="w-full space-y-8">
          <div className="flex flex-col items-start gap-2.5">
            <label className="text-xs font-semibold text-slate-300  tracking-widest">
              Subscription Link
            </label>
            <div className="w-full relative group">
              <div className="absolute left-0 top-0 bottom-0 flex items-center px-4 bg-white/5 border-r border-slate-300 rounded-l-lg text-slate-500 text-xs pointer-events-none">
                /Subscription Link
              </div>
              <input 
                type="text" 
                placeholder="Enter Link"
                className="w-full bg-[#161B26] border border-slate-800 rounded-lg py-4 pl-40 pr-4 text-white focus:outline-none focus:border-white-600 focus:ring-1 focus:ring-white-600 transition-all placeholder:text-slate-600 text-sm"
              />
            </div>
          </div>
          <div className="space-y-6 pt-4">
            <button className="w-full bg-[#A91212] hover:bg-red-600 active:scale-[0.99] text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-red-900/10 tracking-wide">
              Join
            </button>

            <button 
               onClick={() => navigate('/subscription/catalog')}
            className="block mx-auto text-slate-400 hover:text-white text-sm font-bold underline underline-offset-[12px] decoration-slate-700 hover:decoration-white transition-all">
              Skip Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};