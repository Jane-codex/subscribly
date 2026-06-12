import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import fcGoogle from "../assets/FcGoogle.svg"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SignupPageProps {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}


const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"), 
  confirmPassword: z.string().min(8, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage({ setUserName }: SignupPageProps) {
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

const onSubmit = (data: SignupFormValues) => {
  const existingUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
  
  const emailExists = existingUsers.some((user: any) => user.email === data.email);
  if (emailExists) {
    alert("This email is already registered!");
    return;
  }

  existingUsers.push({
    email: data.email,
    password: data.password,
    fullName: data.fullName
  });

  localStorage.setItem('appUsers', JSON.stringify(existingUsers));
  localStorage.setItem('currentUser', data.fullName);
  localStorage.setItem('userToken', 'active_session_token');
  localStorage.setItem('accountType', 'subscriber');
  localStorage.setItem('isReturningUser', 'false');
  sessionStorage.setItem('justSignedUp', 'false');
  setUserName(data.fullName);
  navigate("/dashboard");
};

  
return (
  <div className="min-h-screen bg-[#0C0C0D] text-white flex items-center justify-center p-4 md:p-12 font-sans selection:bg-red-700">
   
    <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <div className="lg:col-span-5 space-y-8">
       
        <div className="flex items-center gap-2 mb-12">
          <div className="items-center justify-center">
            <img src={logo} alt="Logo" />
          </div>
          <span className="font-krona text-2xl font-[400] tracking-tight text-white">
            Subscribly
          </span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-normal leading-tight">
            Start managing <br /> all of your <br />
            <span className="font-bold">Subscriptions</span>
          </h1>
        </div>

        <div className="space-y-3 pt-4 max-w-[360px]">
          {[
            "Join a Subscription Plan",
            "Fund Wallet or Link Card",
            "Set Subscription Pay dates",
            "Watch Us Handle The Rest",
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
          <div className="absolute inset-y-16 right-6 w-full bg-zinc-800/20 border border-zinc-700/20 rounded-3xl transform -translate-x-9 scale-[0.94] blur-[1px] hidden sm:block z-0"></div>
          <div className="absolute inset-y-10 right-4 w-full bg-zinc-800/50 border border-zinc-700/30 rounded-3xl transform -translate-x-6 scale-[0.96] blur-[0.5px] hidden sm:block z-0"></div>
          <div className="absolute inset-y-5 right-2 w-full bg-zinc-800/70 border border-zinc-700/40 rounded-3xl transform -translate-x-3 scale-[0.98] hidden sm:block z-0"></div>
        
          <div className="bg-white text-black w-full rounded-[2rem] p-8 md:p-12 shadow-2xl relative z-10">
            <h2 className="text-3xl font-bold text-center text-zinc-900 mb-8">Welcome!</h2>
            
            <Button variant="outline" className="w-full flex items-center gap-2 h-12 rounded-xl mb-6 text-zinc-700 border-zinc-300 hover:bg-zinc-50">
              <img src={fcGoogle} alt="Google" className="w-5 h-5" />
              Sign in with google
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-200" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-zinc-400 font-bold tracking-wider">OR</span></div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
5
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Email</FormLabel>
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
                        <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Password</FormLabel>
                        <span className={`text-[10px] mb-1 font-semibold ${field.value?.length >= 8 ? 'text-green-600' : 'text-slate-400'}`}>
                          {field.value?.length >= 8 ? '✓ Length OK' : 'Min. 8 characters'}
                        </span>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="*******" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
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
                      <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 bg-[#A30B1E] hover:bg-[#850817] rounded-xl text-lg font-bold text-white tracking-wide transition-all shadow-md mt-6">
                  Create Account
                </Button>
              </form>
            </Form>

            <p className="text-center mt-8 text-sm font-medium text-zinc-500">
              Already a member?{" "}
              <a href="/login" className="text-red-700 hover:underline font-bold">
                Login
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
);
}