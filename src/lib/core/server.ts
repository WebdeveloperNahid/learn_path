"use server";

import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

// ---- Response এর status চেক করে redirect করা, তারপর json রিটার্ন ----
const handleStatus = async <T = unknown>(
  res: Response,
  redirectPath?: string
): Promise<T> => {
  if (res.status === 401) {
    const target = redirectPath
      ? `/signin?redirect=${encodeURIComponent(redirectPath)}`
      : "/signin";
    redirect(target);
  } else if (res.status === 403) {
    redirect("/unauthorized");
  }

  // ⭐ নতুন যোগ — response ok না হলে JSON parse না করে গ্রেসফুলি handle করুন
 if (!res.ok) {
  console.warn(`API request failed: ${res.status} ${res.statusText}`);
  return null as T;
}

  return res.json();
};

// ---- AuthHeader ----
export const authHeader = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();

  const header: Record<string, string> = {};
  if (token) {
    header["authorization"] = `Bearer ${token}`;
  }

  return header;
};

// ---- ServerFetch -- GET (public, token লাগে না) ----
export const serverFetch = async <T = unknown>(
  path: string,
  redirectPath?: string
): Promise<T | null> => {
  const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
  return handleStatus<T>(res, redirectPath);
};

// ---- ProtectedFetch -- GET (token লাগে, protected route এর জন্য) ----
export const protectedFetch = async <T = unknown>(
  path: string,
  redirectPath?: string   // 👈 এই parameter-টাই এখনো নেই তোমার ফাইলে
): Promise<T | null> => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    headers: await authHeader(),
  });
  return handleStatus<T>(res, redirectPath);
};

// ---- ServerMutation -- POST/PATCH/DELETE ----
export const serverMutation = async <T = unknown>(
  path: string,
  data: unknown,
  method: string = "POST",
  redirectPath?: string
): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  return handleStatus<T>(res, redirectPath);
};