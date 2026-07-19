// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // তোমার auth setup অনুযায়ী পাথ চেঞ্জ করো
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const role = (session.user as { role?: string }).role;

  if (role === "instructor") {
    redirect("/dashboard/instructor");
  }

  redirect("/dashboard/student");
};

export default DashboardPage;