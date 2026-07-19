"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signIn } from "@/lib/auth-client";

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [error, setError] = useState("");

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError("");

    const { error: authError } = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setError(authError.message || "Invalid credentials");
      setLoading(false);
      return;
    }
    
    setLoading(false);
    // Redirect to destination
    window.location.href = redirectUrl;
  };

  // Auto-fills demo credentials and submits
  const handleDemoLogin = () => {
    setValue("email", "manager@auroraheights.com");
    setValue("password", "luxury2026");
    handleSubmit(onSubmit)();
  };

  // Simulates Google OAuth Authentication Flow
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    setShowGoogleModal(true);

    // Better Auth resolves relative paths against its own baseURL (http://localhost:5000),
    // so we must always supply a full absolute URL.
    const callbackURL = window.location.origin + (redirectUrl !== "/" ? redirectUrl : "/explore");

    const { error: authError } = await signIn.social({
      provider: "google",
      callbackURL,
    });

    if (authError) {
      setError(authError.message || "Failed to log in with Google");
      setShowGoogleModal(false);
      setGoogleLoading(false);
      return;
    }
  };

  return (
    <main className="flex-1 min-h-screen bg-luxury-cream flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-5xl bg-white border border-luxury-sand/20 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
        
        {/* Column 1: Luxury Real Estate Side Branding (5 Columns) */}
        <div className="hidden md:flex md:col-span-5 bg-luxury-dark relative flex-col justify-between p-12 text-white overflow-hidden">
          {/* Visual background placeholder overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80')` }}
          />
          {/* Dark luxury overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark/30 via-luxury-dark/70 to-luxury-dark z-0" />

          <div className="relative z-10 space-y-2">
            <span className="text-[10px] tracking-[0.4em] text-gold-300 font-bold uppercase block">
              AURORA HEIGHTS
            </span>
            <h2 className="text-3xl font-serif font-light leading-tight">
              Architectural <br />
              <span className="italic">Excellence</span>
            </h2>
          </div>

          <div className="relative z-10 space-y-4">
            <p className="text-xs font-light text-white/70 leading-relaxed italic">
              &ldquo;The luxury and scale of these penthouses is unparalleled. Managed at the highest standards of architectural precision.&rdquo;
            </p>
            <div className="border-t border-white/10 pt-3 flex items-center gap-3">
              <span className="text-[10px] tracking-wider uppercase text-gold-300 font-semibold">
                Malibu Portfolio Review
              </span>
              <span className="text-white/30">|</span>
              <span className="text-white/40 text-[9px]">2026 Edition</span>
            </div>
          </div>
        </div>

        {/* Column 2: Login Forms & OAuth Actions (7 Columns) */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-8 bg-white">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-bold tracking-[0.25em] text-gold-600 uppercase">
              PORTAL ACCESS
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif text-luxury-charcoal font-light">
              Sign In to <span className="italic font-normal text-gold-700">Console</span>
            </h1>
          </div>

          {/* Main Email Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200/50 text-red-700 text-xs rounded-sm p-3 font-light leading-relaxed">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="block text-[9px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="e.g. manager@auroraheights.com"
                className={`w-full bg-luxury-cream border ${
                  errors.email ? "border-red-500" : "border-luxury-sand/40"
                } rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all`}
              />
              {errors.email && (
                <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wider block pt-0.5">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-[9px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Security Password
                </label>
                <a href="#" className="text-[9px] uppercase tracking-wider text-gold-600 hover:text-luxury-charcoal font-semibold">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className={`w-full bg-luxury-cream border ${
                  errors.password ? "border-red-500" : "border-luxury-sand/40"
                } rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all`}
              />
              {errors.password && (
                <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wider block pt-0.5">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3 bg-luxury-charcoal hover:bg-gold-600 text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md shadow-luxury-charcoal/10 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying Identity...
                </>
              ) : (
                "Access Secure Console"
              )}
            </button>
          </form>

          {/* Quick Actions Separator */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-luxury-sand/20" />
            <span className="flex-shrink mx-4 text-[9px] uppercase tracking-widest text-luxury-charcoal/40 font-bold">
              Or Connect Via
            </span>
            <div className="flex-grow border-t border-luxury-sand/20" />
          </div>

          {/* Social Oauth / Demo Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Google Social Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              className="py-3 px-4 border border-luxury-sand/40 hover:border-gold-500 bg-white text-luxury-charcoal text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all hover:bg-gold-500/5 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.422 1.905 15.518 1 12.24 1 5.466 1 0 6.466 0 13.24s5.466 12.24 12.24 12.24c7.07 0 11.79-4.945 11.79-11.966 0-.81-.088-1.423-.197-1.967H12.24z" />
              </svg>
              Google Auth
            </button>

            {/* Demo Login (Manager role auto-fill) */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading || googleLoading}
              className="py-3 px-4 border border-gold-400/50 hover:border-gold-500 bg-gold-500/5 hover:bg-gold-500/10 text-gold-800 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Demo Console
            </button>
          </div>

          {/* Registration Navigation */}
          <div className="text-center text-xs text-luxury-charcoal/50 font-light">
            Do not have console credentials yet?{" "}
            <Link href="/register" className="font-semibold text-gold-700 hover:text-luxury-charcoal transition-colors">
              Apply for Registration
            </Link>
          </div>
        </div>
      </div>

      {/* Simulated Google OAuth Loader Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-luxury-dark/75 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-luxury-sand/20 rounded-xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <svg className="w-12 h-12 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.422 1.905 15.518 1 12.24 1 5.466 1 0 6.466 0 13.24s5.466 12.24 12.24 12.24c7.07 0 11.79-4.945 11.79-11.966 0-.81-.088-1.423-.197-1.967H12.24z" />
            </svg>
            <div className="space-y-1.5">
              <h3 className="font-serif text-lg text-luxury-charcoal">Connecting to Google</h3>
              <p className="text-xs text-luxury-charcoal/50 leading-relaxed font-light">
                Please select your authorized Aurora Heights manager email in the secure social login popup.
              </p>
            </div>
            <div className="flex justify-center pt-2">
              <div className="relative w-8 h-8">
                <span className="absolute inset-0 border-4 border-luxury-sand/30 rounded-full" />
                <span className="absolute inset-0 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
            <div className="text-[10px] text-luxury-charcoal/40 uppercase tracking-widest font-semibold pt-1">
              Secure OIDC Handshake in progress
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="h-[70px] bg-luxury-dark" />
      <Suspense
        fallback={
          <main className="flex-1 min-h-screen bg-luxury-cream flex items-center justify-center py-12 px-6">
            <div className="text-luxury-charcoal/50 text-xs uppercase tracking-widest font-semibold animate-pulse">
              Initializing Auth Handshake...
            </div>
          </main>
        }
      >
        <LoginFormContent />
      </Suspense>
      <Footer />
    </>
  );
}
