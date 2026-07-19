import { createAuthClient } from "better-auth/react";

const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000/api/v1/auth";

if (typeof window !== "undefined") {
  console.log("[Auth Client] Better Auth client initialized with baseURL:", authUrl);
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000/api/v1/auth",
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, useSession, signOut } = authClient;