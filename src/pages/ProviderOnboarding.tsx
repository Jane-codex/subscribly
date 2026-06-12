import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud } from "lucide-react"; 

export default function ProviderOnboarding() {
  const navigate = useNavigate();
  
  // ⚡ 1. Updated state to support 3 distinct sequential step views
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // ⚡ 2. Updated master defaults to track fields for ALL 3 steps in one place
  const form = useForm({
    defaultValues: {
      businessName: "",
      businessType: "",
      businessWebsite: "",
      tin: "",                  
      businessRegistration: "", 
      regDocument: null,        // Step 3 file state field
    },
  });

  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await form.trigger(["businessName", "businessType"]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await form.trigger(["tin", "businessRegistration"]);
      if (isValid) setStep(3);
    }
  };

  const handleBackStep = () => {
    setStep((prev) => prev - 1);
  };

  // ⚡ 4. Final step submission triggered ONLY on Step 3 "Finish" click
  const onSubmit = (data: any) => {
    // Append the state-managed uploaded file to the final submission payload object
    const finalPayload = { ...data, regDocument: selectedFile };
    console.log("Complete Subscribly Provider Onboarding Dataset:", finalPayload);
    
    localStorage.setItem("isReturningUser", "true");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-white flex items-center justify-center p-4 md:p-12 font-sans selection:bg-red-700">
      {/* GRID CONTAINER */}
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT SIDE: Dynamic Narrative context headings matching your mockups */}
        <div className="lg:col-span-5 space-y-8">
           <div className="flex items-center gap-2">
          <img src={logo} alt="Subscribly Logo" className="h-6 w-auto" />
          <span className="font-krona text-xl tracking-tight text-white">Subscribly</span>
        </div>
        <div className="space-y-2">
            <span className="text-red-600 font-semibold tracking-wide text-sm uppercase">
                {step === 1 ? "Step 1" : "Step 2"}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-normal leading-tight tracking-tight text-gray-200">
                {step === 1 && (
                <>What kind of <br /><span className="font-bold text-white">Business</span></>
                )}
                {step === 2 && (
                <>Business <br /><span className="font-bold text-white">Verification</span></>
                )}
                {step === 3 && (
                <>Upload <br />Registration <br /><span className="font-bold text-white">Documents</span></>
                )}
            </h1>
            </div>
        </div>

        {/* RIGHT SIDE: Onboarding Card Stack */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end py-12 w-full">
          <div className="relative w-full max-w-[480px]">
            {/* Decorative Back Cards */}
            <div className="absolute inset-y-16 right-6 w-full bg-zinc-800/20 border border-zinc-700/20 rounded-3xl transform -translate-x-9 scale-[0.94] blur-[1px] hidden sm:block z-0"></div>
            <div className="absolute inset-y-10 right-4 w-full bg-zinc-800/50 border border-zinc-700/30 rounded-3xl transform -translate-x-6 scale-[0.96] blur-[0.5px] hidden sm:block z-0"></div>
            <div className="absolute inset-y-5 right-2 w-full bg-zinc-800/70 border border-zinc-700/40 rounded-3xl transform -translate-x-3 scale-[0.98] hidden sm:block z-0"></div>
            
            {/* Main White Card Wrapper */}
            <div className="bg-white text-black w-full rounded-[2rem] p-8 md:p-12 shadow-2xl relative z-10 min-h-[580px] flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-center text-zinc-900 mb-10">Step {step}</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* ================= STEP 1 VIEWS ================= */}
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Business Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Business Type*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <div className="flex h-12 w-full rounded-xl border border-zinc-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-red-700/20 focus-within:border-red-700 transition-all">
                                  <SelectTrigger className="h-full w-full border-0 rounded-none bg-transparent px-4 text-left font-normal text-zinc-950 focus:ring-0 focus:border-0 focus-visible:ring-0 focus-visible:border-0 outline-none shadow-none data-[placeholder]:text-zinc-400 [&>svg]:text-zinc-400 [&>svg]:h-4 [&>svg]:w-4">
                                    <SelectValue placeholder="Select business type" />
                                  </SelectTrigger>
                                </div>
                              </FormControl>
                              <SelectContent className="bg-white border border-zinc-200 rounded-xl shadow-lg">
                                <SelectItem value="saas" className="focus:bg-zinc-50 cursor-pointer">SaaS / Software</SelectItem>
                                <SelectItem value="agency" className="focus:bg-zinc-50 cursor-pointer">Agency / Service</SelectItem>
                                <SelectItem value="e-commerce" className="focus:bg-zinc-50 cursor-pointer">E-Commerce Subscriptions</SelectItem>
                                <SelectItem value="media" className="focus:bg-zinc-50 cursor-pointer">Media / Entertainment</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessWebsite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Business Website <span className="text-slate-400 font-normal capitalize">(Optional)</span></FormLabel>
                            <FormControl>
                              <div className="flex rounded-xl border border-zinc-200 overflow-hidden focus-within:ring-2 focus-within:ring-red-700/20 focus-within:border-red-700 transition-all">
                                <span className="inline-flex items-center px-4 bg-zinc-50 border-r border-zinc-200 text-sm font-semibold text-zinc-400 select-none">URL</span>
                                <Input placeholder="www.com" className="h-12 border-0 rounded-none focus-visible:ring-0 focus-visible:border-0 text-zinc-900 flex-1 pl-3" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* ================= STEP 2 VIEWS ================= */}
                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <FormField
                        control={form.control}
                        name="tin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">TIN.*</FormLabel>
                            <FormControl>
                              <Input placeholder="Tax Identification Number" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessRegistration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-600 font-bold text-xs uppercase tracking-wider">Business Registration Number*</FormLabel>
                            <FormControl>
                              <Input placeholder="000-000 000" className="h-12 rounded-xl text-zinc-900 border-zinc-200 focus-visible:ring-red-700/20 focus-visible:border-red-700" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* ================= STEP 3 VIEWS (File Upload Dropzone) ================= */}
                  {step === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <FormItem>
                        <FormControl>
                          {/* Hidden actual file input element triggered by the clicking container */}
                          <div className="relative">
                            <label className="flex flex-col items-center justify-center w-full h-40 border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50 hover:bg-zinc-50 cursor-pointer transition-all p-4 text-center group">
                              <div className="flex flex-col items-center justify-center space-y-2">
                                <div className="p-2.5 rounded-xl border border-zinc-100 bg-white shadow-sm text-zinc-400 group-hover:scale-105 transition-transform">
                                  <UploadCloud className="h-5 w-5" />
                                </div>
                                <p className="text-sm text-zinc-500 font-medium">
                                  <span className="text-[#A30B1E] font-bold hover:underline">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-zinc-400 font-normal tracking-wide">
                                  {selectedFile ? `Selected: ${selectedFile.name}` : "DOC, PDF, PPT or PNG (max. 800x400px)"}
                                </p>
                              </div>
                              <input 
                                type="file" 
                                accept=".doc,.docx,.pdf,.ppt,.pptx,.png"
                                className="hidden" 
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setSelectedFile(e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    </div>
                  )}

                  {/* ================= DYNAMIC ACTION BUTTONS ROW ================= */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button 
                      type="button" 
                      onClick={step === 1 ? () => navigate("/select-type") : handleBackStep}
                      className="h-12 rounded-xl border border-zinc-200 bg-zinc-50 font-bold text-zinc-700 hover:bg-zinc-100 transition-all shadow-none"
                    >
                      Back
                    </Button>
                    
                    {step < 3 ? (
                      <Button 
                        type="button" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleNextStep();
                        }}
                        className="h-12 rounded-xl bg-[#A30B1E] hover:bg-[#850817] font-bold text-white transition-all shadow-md"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        className="h-12 rounded-xl bg-[#A30B1E] hover:bg-[#850817] font-bold text-white transition-all shadow-md"
                      >
                        Finish
                      </Button>
                    )}
                  </div>

                </form>
              </Form>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}