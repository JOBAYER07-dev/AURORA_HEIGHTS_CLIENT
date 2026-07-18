"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Zod registration schema with matching confirmation validation
const registerSchema = z
  .object({
    name: z.string().min(2, "Full Name must be at least 2 characters long"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    // Simulate database record creation
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setLoading(false);
    setSuccess(true);
    
    // Redirect to login page after success delay
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      
      {/* Spacer for Navbar */}
      <div className="h-[70px] bg-luxury-dark" />

      <main className="flex-1 min-h-screen bg-luxury-cream flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-5xl bg-white border border-luxury-sand/20 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
          
          {/* Column 1: Luxury Real Estate Side Branding (5 Columns) */}
          <div className="hidden md:flex md:col-span-5 bg-luxury-dark relative flex-col justify-between p-12 text-white overflow-hidden">
            {/* Visual background placeholder overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80')` }}
            />
            {/* Dark luxury overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark/30 via-luxury-dark/70 to-luxury-dark z-0" />

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] tracking-[0.4em] text-gold-300 font-bold uppercase block">
                AURORA HEIGHTS
              </span>
              <h2 className="text-3xl font-serif font-light leading-tight">
                Exclusive <br />
                <span className="italic">Membership</span>
              </h2>
            </div>

            <div className="relative z-10 space-y-4">
              <p className="text-xs font-light text-white/70 leading-relaxed italic">
                &ldquo;Join our global network of design managers. Keep inventory synchronized and publish residences under the Aurora seal.&rdquo;
              </p>
              <div className="border-t border-white/10 pt-3 flex items-center gap-3">
                <span className="text-[10px] tracking-wider uppercase text-gold-300 font-semibold">
                  Membership Console
                </span>
                <span className="text-white/30">|</span>
                <span className="text-white/40 text-[9px]">2026 Admin Suite</span>
              </div>
            </div>
          </div>

          {/* Column 2: Register Form (7 Columns) */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-8 bg-white">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-bold tracking-[0.25em] text-gold-600 uppercase">
                CONSOLE ADMITTANCE
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif text-luxury-charcoal font-light">
                Request <span className="italic font-normal text-gold-700">Account</span>
              </h1>
            </div>

            {/* Registration Success Overlay Message */}
            {success ? (
              <div className="bg-green-50 border border-green-200/50 rounded-xl p-6 text-center space-y-3 animate-[fadeIn_0.3s_ease-out]">
                <svg className="w-10 h-10 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-serif text-base text-luxury-charcoal font-medium">Application Received</h3>
                <p className="text-xs text-luxury-charcoal/50 leading-relaxed font-light">
                  Your credentials have been cached. Redirecting to the Login portal to authenticate...
                </p>
              </div>
            ) : (
              /* Registration Form */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="e.g. Alexis Harrington"
                    className={`w-full bg-luxury-cream border ${
                      errors.name ? "border-red-500" : "border-luxury-sand/40"
                    } rounded-sm py-2 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all`}
                  />
                  {errors.name && (
                    <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wider block pt-0.5">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="e.g. alexis@auroraheights.com"
                    className={`w-full bg-luxury-cream border ${
                      errors.email ? "border-red-500" : "border-luxury-sand/40"
                    } rounded-sm py-2 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all`}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wider block pt-0.5">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Password and Password Confirmation Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      placeholder="••••••••"
                      className={`w-full bg-luxury-cream border ${
                        errors.password ? "border-red-500" : "border-luxury-sand/40"
                      } rounded-sm py-2 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all`}
                    />
                    {errors.password && (
                      <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wider block pt-0.5">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword")}
                      placeholder="••••••••"
                      className={`w-full bg-luxury-cream border ${
                        errors.confirmPassword ? "border-red-500" : "border-luxury-sand/40"
                      } rounded-sm py-2 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all`}
                    />
                    {errors.confirmPassword && (
                      <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wider block pt-0.5">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-luxury-charcoal hover:bg-gold-600 text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md shadow-luxury-charcoal/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "Register Console Admittance"
                  )}
                </button>
              </form>
            )}

            {/* Login Navigation */}
            <div className="text-center text-xs text-luxury-charcoal/50 font-light">
              Already have console credentials?{" "}
              <Link href="/login" className="font-semibold text-gold-700 hover:text-luxury-charcoal transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
