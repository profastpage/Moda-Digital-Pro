"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
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

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10 dark:hover:bg-white/10"
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
