import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import * as z from "zod";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean(),
});


type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage({ setUserName }: { setUserName: (name: string) => void }) {
   const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { 
      email: "", 
      password: "", 
      remember: false, 
    },
  });

 const onSubmit = (data: LoginFormValues) => {
  const existingUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');

  const matchedUser = existingUsers.find(
    (user: any) => user.email === data.email && user.password === data.password
  );

  if (matchedUser) {
    localStorage.setItem('userToken', 'active_session_token');
    localStorage.setItem('currentUser', matchedUser.fullName);
    localStorage.setItem('accountType', 'subscriber');
    localStorage.setItem('isReturningUser', 'true');

    // ⚡ FIX: Ensure the signup flag is gone on a standard login
    sessionStorage.removeItem('justSignedUp');

    setUserName(matchedUser.fullName);
    navigate("/dashboard");
  } else {
    alert("Invalid email or password. Please sign up first!");
  }
};

return (
  <div className="min-h-screen bg-[#0C0C0D] text-white flex items-center justify-center p-4 md:p-12 font-sans selection:bg-red-700">
    <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-5 space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="items-center justify-center">
            <img src={logo} alt="Logo" />
          </div>
          <span className="font-krona text-2xl font-[400] tracking-tight text-white">
            Subscribly
          </span>
        </div>
        
        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-normal leading-tight">
            Login to manage <br /> all of your <br />
            <span className="font-bold">Subscriptions</span>
          </h1>
        </div>

        {/* Feature Badges list */}
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
                
                {/* Text styling */}
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
        
            <Button variant="outline" className="w-full flex items-center gap-2 h-12 rounded-xl mb-6 text-zinc-700 border-zinc-300 hover:bg-zinc-50">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Sign in with google
            </Button>
            <div className="flex items-center my-6">
              <div className="flex-1 h-[1px] bg-zinc-200"></div>
              <span className="text-xs text-zinc-400 font-bold px-4 tracking-wider">OR</span>
              <div className="flex-1 h-[1px] bg-zinc-200"></div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Field */}
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
                      <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between pt-1">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            id="remember"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-zinc-300 data-[state=checked]:bg-red-800 data-[state=checked]:border-red-800"
                          />
                        </FormControl>
                        <FormLabel htmlFor="remember" className="text-xs text-slate-500 font-medium cursor-pointer select-none">
                          Remember for 30 days
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Button variant="link" type="button" className="text-red-700 font-bold p-0 h-auto text-xs hover:underline">
                    Forgot password
                  </Button>
                </div>

                <Button type="submit" className="w-full h-12 bg-[#A30B1E] hover:bg-[#850817] rounded-xl text-lg font-bold text-white tracking-wide transition-all shadow-md mt-4">
                  Sign in
                </Button>
              </form>
            </Form>

            <p className="text-center mt-8 text-sm font-medium text-zinc-500">
              Not a member?{" "}
              <Link 
                to="/select-type" 
                className="text-red-700 hover:underline font-bold"
              >
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