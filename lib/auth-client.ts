import { createAuthClient } from "better-auth/react";

const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000/api/v1/auth";

if (typeof window !== "undefined") {
  console.log("[Auth Client] Better Auth client initialized with baseURL:", authUrl);
}

export const authClient = createAuthClient({
  baseURL: authUrl,
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => {
        if (typeof window !== "undefined") {
          return localStorage.getItem("bearer_token") || "";
        }
        return "";
      },
    },
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get("set-auth-token");
      if (authToken) {
        localStorage.setItem("bearer_token", authToken);
      }
      
      // Clear token on sign-out requests
      if (ctx.request.url.toString().endsWith("/sign-out")) {
        localStorage.removeItem("bearer_token");
      }
    },
  },
});

export const { signIn, signUp, useSession, signOut } = authClient;

/**
 * Reusable helper to return Authorization headers for manual fetch requests.
 */
export const getAuthHeaders = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("bearer_token");
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return {};
};