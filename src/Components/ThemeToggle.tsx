"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
        isDark ? "bg-slate-700" : "bg-yellow-300"
      }`}
      aria-label="Toggle theme"
    >
      <span
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <HiMoon className="h-4 w-4 text-slate-700" />
        ) : (
          <HiSun className="h-4 w-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
}