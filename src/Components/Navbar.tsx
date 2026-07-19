"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiOutlineLogout } from "react-icons/hi";
import { HiSparkles } from "react-icons/hi2";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

type TNavUser = {
  name: string;
  role: "student" | "instructor";
} | null;

type NavbarProps = {
  user?: TNavUser;
};

const loggedOutLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Courses", href: "/explore" },
  { label: "About", href: "/about" },
];

const getLoggedInLinks = (role: "student" | "instructor") => {
  const common = [
    { label: "Home", href: "/" },
    { label: "Explore Courses", href: "/explore" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  if (role === "instructor") {l
    return [
      ...common,
      // { label: "Create Course", href: "/items/add" },
      // { label: "Manage Courses", href: "/items/manage" },
    ];
  }

  return [
    ...common,
    // { label: "My Enrollments", href: "/dashboard/enrollments" },
    // { label: "About", href: "/about" },
  ];
};

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Source of truth: the live session. The `user` prop can still be passed
  // (e.g. from a server component) but the session is what keeps this in
  // sync the moment someone logs in or out, without a full page reload.
  const { data: session, isPending } = useSession();

  const sessionUser: TNavUser = session?.user
    ? {
        name: session.user.name ?? "User",
        role:
          (session.user as { role?: "student" | "instructor" }).role ??
          "student",
      }
    : null;

  const currentUser: TNavUser = user ?? sessionUser;
  const isLoggedIn = Boolean(currentUser) && !isPending;

  const navLinks =
    isLoggedIn && currentUser
      ? getLoggedInLinks(currentUser.role)
      : loggedOutLinks;

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await authClient.signOut();
      toast.success("Logged out successfully");
      setIsOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Failed to log out, try again");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200">
            <HiSparkles className="h-5 w-5" />
          </span>
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
            LearnPath
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-indigo-600"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Side — Conditional Auth UI */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn && currentUser ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                {currentUser.name}
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                  {currentUser.role}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-[#7431FC] transition bg-[#894fff83] hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
              >
                <HiOutlineLogout className="h-4 w-4" />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-indigo-600"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg hover:shadow-indigo-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-4">
                {isLoggedIn && currentUser ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
                    >
                      {currentUser.name}
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                        {currentUser.role}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 disabled:opacity-50"
                    >
                      <HiOutlineLogout className="h-4 w-4" />
                      {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
