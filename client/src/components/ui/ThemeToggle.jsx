import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/70 px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all duration-300 hover:border-teal-300 hover:bg-teal-50/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-teal-500/50 dark:hover:bg-slate-700 ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light" : "Dark"}
    >
      {isDark ? (
        <>
          <HiOutlineSun className="h-4 w-4 shrink-0" aria-hidden />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <HiOutlineMoon className="h-4 w-4 shrink-0" aria-hidden />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}
