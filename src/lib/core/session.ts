import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("DEBUG session:", JSON.stringify(session, null, 2));
  return session?.session.token || null;
};

export const requireRole = async (role: "admin" | "user") => {
  const user = await getUserSession();

  if (!user) {
    redirect("/signin");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }

  return user;
};
