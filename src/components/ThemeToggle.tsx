"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  scrolled?: boolean;
  isDark?: boolean;
}

export default function ThemeToggle({ scrolled = false, isDark = true }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg">
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
    );
  }

  /* Color logic:
     - Not scrolled (over dark hero) → white icon always
     - Scrolled in dark mode → light gray icon
     - Scrolled in light mode → dark icon */
  const iconColor = !scrolled
    ? "text-white/80 hover:text-white hover:bg-white/10"
    : isDark
      ? "text-slate-300 hover:text-white hover:bg-white/10"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100";

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-2 rounded-lg transition-all duration-200 ${iconColor}`}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === "dark" ? (
        <Sun className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
      ) : (
        <Moon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
      )}
    </button>
  );
}
