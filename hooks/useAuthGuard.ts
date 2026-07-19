import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";

export function useAuthGuard(redirectPath: string) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 20;
  const delay = 3000;

  useEffect(() => {
    if (isPending) return;

    if (session) {
      setCheckedAuth(true);
      setIsWakingUp(false);
      return;
    }

    let cancelled = false;
    let currentAttempt = 0;

    const checkSession = async () => {
      if (cancelled) return;
      currentAttempt++;
      setAttempts(currentAttempt);
      setIsWakingUp(true);
      console.log(`[Auth Guard] Session check attempt ${currentAttempt}/${maxAttempts}...`);
      
      try {
        const { data: freshSession } = await authClient.getSession();
        console.log("[Auth Guard] Result:", freshSession);

        if (cancelled) return;

        if (freshSession) {
          setCheckedAuth(true);
          setIsWakingUp(false);
        } else if (currentAttempt < maxAttempts) {
          setTimeout(checkSession, delay);
        } else {
          setIsWakingUp(false);
          router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
        }
      } catch (err) {
        console.error("[Auth Guard] Error during session check:", err);
        if (cancelled) return;
        if (currentAttempt < maxAttempts) {
          setTimeout(checkSession, delay);
        } else {
          setIsWakingUp(false);
          router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
        }
      }
    };

    // Start checking after a short delay to let things settle
    const initialTimer = setTimeout(checkSession, 500);

    return () => {
      cancelled = true;
      clearTimeout(initialTimer);
    };
  }, [session, isPending, router, redirectPath]);

  return {
    session,
    checkedAuth,
    isWakingUp,
    attempts,
    maxAttempts,
    isPending,
  };
}
