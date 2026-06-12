import { MessageCircle, MessageSquare, MapPin, Phone, Check, Loader2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import Image  from "../assets/Image.png";

const SupportPage = () => {
  const { setActiveToast } = useOutletContext<any>();
   const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setActiveToast({
        id: Date.now(),
        title: "Success",
        message: "Message sent successfully!",
        type: 'fund',
        time: "Just now"
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
      });
      setAgreed(false);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8 animate-in fade-in duration-700">
      
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white mb-1">Support</h1>
        <p className="text-slate-500 text-sm font-medium">Manage all subscription plans</p>
      </div>

      <div className="bg-[#0b0b0b] border border-white/5 rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
        <div className="p-8 md:p-12 space-y-8 flex flex-col justify-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Get in touch</h2>
            <p className="text-slate-400 text-lg">Our friendly team would love to hear from you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">First name</label>
                <input 
                  required name="firstName" type="text" placeholder="First name" 
                  value={formData.firstName} onChange={handleChange}
                  className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-red-600 outline-none transition-all placeholder:text-slate-600" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Last name</label>
                <input 
                  required name="lastName" type="text" placeholder="Last name" 
                  value={formData.lastName} onChange={handleChange}
                  className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-red-600 outline-none transition-all placeholder:text-slate-600" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-300">Email</label>
              <input 
                required name="email" type="email" placeholder="you@company.com" 
                value={formData.email} onChange={handleChange}
                className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-red-600 outline-none transition-all placeholder:text-slate-600" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-300">Message</label>
              <textarea 
                required name="message" rows={4} placeholder="Leave us a message..." 
                value={formData.message} onChange={handleChange}
                className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-red-600 outline-none transition-all resize-none placeholder:text-slate-600"
              ></textarea>
            </div>

            <div className="flex items-center gap-3 py-2">
              <button 
                type="button"
                disabled={isLoading}
                onClick={() => setAgreed(!agreed)}
                className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${agreed ? 'bg-red-700 border-red-700' : 'border-white/20 bg-transparent'}`}
              >
                {agreed && <Check className="w-4 h-4 text-white" />}
              </button>
              <p className="text-sm text-slate-400">
                You agree to our friendly <span className="underline cursor-pointer">privacy policy</span>.
              </p>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-red-700 hover:bg-red-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending message...
                </>
              ) : (
                "Send message"
              )}
            </button>
          </form>
        </div>

        <div className="hidden lg:block relative h-full w-full"> 
          <img src={Image} alt="Support Team" className="absolute inset-0 w-full h-full object-cover object-top" />
        </div>
      </div>

      <div className="bg-[#0b0b0b] border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-12 shadow-2xl">
        <div className="space-y-2">
          <p className="text-red-600 font-bold text-xs uppercase tracking-widest">Contact us</p>
          <h2 className="text-4xl font-bold text-white tracking-tight">We'd love to hear from you</h2>
          <p className="text-slate-400">Our friendly team is always here to chat.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <MessageCircle size={22} />, title: "Chat on Whatsapp", desc: "Speak to our friendly team.", link: "+234 123 456 789" },
            { icon: <MessageSquare size={22} />, title: "Chat to support", desc: "We're here to help.", link: "support@subscribly.com" },
            { icon: <MapPin size={22} />, title: "Visit us", desc: "Visit our office HQ.", link: "100 Smith Street Collingwood VIC 3066 AU" },
            { icon: <Phone size={22} />, title: "Call us", desc: "Mon-Fri from 8am to 5pm.", link: "+234 123 456 789", link2: "+234 124 586 931" },
          ].map((card, i) => (
            <div key={i} className="bg-[#141414]/50 border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 bg-red-700 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-red-900/20 group-hover:rotate-12 transition-transform duration-300">
                {card.icon}
              </div>
              <h4 className="text-white font-bold text-lg mb-2">{card.title}</h4>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{card.desc}</p>
              <p className="text-red-500 text-sm font-bold hover:underline transition-all">{card.link}</p>
              {card.link2 && <p className="text-red-500 text-sm font-bold hover:underline transition-all">{card.link2}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;