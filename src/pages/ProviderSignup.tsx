import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from '../assets/logo.png';
import { Check } from "lucide-react";
import fcGoogle from "../assets/FcGoogle.svg";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProviderSignupPage() {
  const navigate = useNavigate();
  const context = useOutletContext<any>();
  const setUserName = context?.setUserName;

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: any) => {
  const existingProviders = JSON.parse(localStorage.getItem('providerUsers') || '[]');

  const updatedProviders = [...existingProviders, { 
    fullName: data.fullName, 
    email: data.email, 
    password: data.password 
  }];
  
  localStorage.setItem('providerUsers', JSON.stringify(updatedProviders));
  localStorage.setItem("isReturningUser", "false");
  localStorage.setItem("currentUser", data.fullName);
  localStorage.setItem("userToken", "active_session_token");
  localStorage.setItem("accountType", "provider");
  
  if (setUserName) setUserName(data.fullName);
  navigate("/provider-onboarding", { state: { isReturningUser: false } });
};

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-white flex items-center justify-center p-4 md:p-12 font-sans selection:bg-red-700">
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT SIDE: Marketing/Branding */}
        <div className="lg:col-span-5 space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="items-center justify-center">
              <img src={logo} alt="Logo" />
            </div>
             <span className="font-krona text-2xl font-[400] tracking-tight text-white">
              Subscribly
            </span>
        </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-normal leading-tight tracking-tight text-gray-200">
              Sign up and create <br /> your <span className="font-bold text-white">Subscription <br /> Plans</span>
            </h1>
          </div>
          <div className="space-y-3 pt-4 max-w-[360px]">
            {[
              "Onboard your Subscription plan",
              "Create a link for your subscription",
              "Share link to subscribers",
              "Watch us manage your payments",
            ].map((text, idx) => {
              const isFirst = idx === 0;

              return (
                <div 
                  key={idx} 
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all 
                    ${isFirst 
                      ? "bg-[#640512] border border-red-900/50 hover:bg-[#7a0616]" 
                      : "bg-[#23050B]/90 border border-red-950/40 hover:bg-[#320710]/70"
                    }`}
                >
                  <div className="p-1.5 rounded text-white">
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
            
            {/* Decorative Back Card 3 */}
            <div className="absolute inset-y-16 right-6 w-full bg-zinc-800/20 border border-zinc-700/20 rounded-3xl transform -translate-x-9 scale-[0.94] blur-[1px] hidden sm:block z-0"></div>

            {/* Decorative Back Card 2 */}
            <div className="absolute inset-y-10 right-4 w-full bg-zinc-800/50 border border-zinc-700/30 rounded-3xl transform -translate-x-6 scale-[0.96] blur-[0.5px] hidden sm:block z-0"></div>
            
            {/* Decorative Back Card 1 */}
            <div className="absolute inset-y-5 right-2 w-full bg-zinc-800/70 border border-zinc-700/40 rounded-3xl transform -translate-x-3 scale-[0.98] hidden sm:block z-0"></div>
            
            {/* Main White Auth Card */}
            <div className="bg-white text-black w-full rounded-[2rem] p-8 md:p-12 shadow-2xl relative z-10">
              <h2 className="text-3xl font-bold text-center text-zinc-900 mb-8">Welcome!</h2>
              
              <Button variant="outline" className="w-full flex items-center gap-2 h-12 rounded-xl mb-6 text-zinc-700 border-zinc-300 hover:bg-zinc-50">
                <img src={fcGoogle} alt="Google" className="w-5 h-5" />
                Sign Up with google
              </Button>

              {/* Separator Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-200" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold tracking-wider">OR</span></div>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  
                  {/* Full Name Field */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-end">
                          <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Password*</FormLabel>
                          <span className={`text-[10px] mb-1 font-semibold ${field.value?.length >= 8 ? 'text-green-600' : 'text-slate-400'}`}>
                            {field.value?.length >= 8 ? '✓ Length OK' : 'Min. 8 characters'}
                          </span>
                        </div>
                        <FormControl>
                          <Input type="password" placeholder="Create a password" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Confirm Password*</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Re-enter password" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-12 bg-[#A30B1E] hover:bg-[#850817] rounded-xl text-lg font-bold text-white tracking-wide transition-all shadow-md mt-6">
                    Sign up
                  </Button>
                </form>
              </Form>

              <p className="text-center mt-8 text-sm font-medium text-zinc-500">
                Already a Member?{" "}
                <Link to="/provider-login" className="text-red-700 hover:underline font-bold">
                  Login
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}