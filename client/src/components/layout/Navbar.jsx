import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { ROUTES } from "../../utils/constants";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";

const navLinkClass = ({ isActive }) =>
  `relative px-1 py-1 text-sm font-medium transition-colors duration-300 ${
    isActive
      ? "text-teal-800 dark:text-teal-300"
      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
  }`;

const navLinks = [
  { to: ROUTES.home, label: "Home", end: true },
  { to: ROUTES.awareness, label: "Awareness" },
  { to: ROUTES.conditions, label: "Conditions" },
  { to: ROUTES.chatbot, label: "AI Support" },
  { to: ROUTES.support, label: "Resources" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const closeMobile = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shell = scrolled
    ? "bg-white/75 backdrop-blur-xl border-b border-white/60 shadow-sm dark:bg-slate-900/85 dark:border-slate-700/60"
    : "bg-white/40 backdrop-blur-md border-b border-white/30 dark:bg-slate-900/50 dark:border-slate-800/50";

  const displayName = user?.fullName?.trim() || user?.name?.trim() || "there";

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${shell}`}>
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Logo size="md" />

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-gradient-to-r from-teal-400 to-violet-400 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <span
                className="max-w-[140px] truncate text-sm text-slate-600 dark:text-slate-400"
                title={user?.email}
              >
                Hi, {displayName}
              </span>
              <Button as={Link} to={ROUTES.dashboard} variant="secondary" size="sm">
                Dashboard
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={logout}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to={ROUTES.login} variant="ghost" size="sm">
                Login
              </Button>
              <Button as={Link} to={ROUTES.register} size="sm">
                Register
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 p-2 text-slate-800 shadow-sm transition-all duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenuAlt3 className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden border-t border-white/40 bg-white/85 backdrop-blur-xl transition-all duration-300 dark:border-slate-700/50 dark:bg-slate-900/95 ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeMobile}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-teal-50 text-teal-900 dark:bg-teal-900/40 dark:text-teal-200"
                    : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-200/60 pt-3 dark:border-slate-700 sm:flex-row">
            {isAuthenticated ? (
              <>
                <Button
                  as={Link}
                  to={ROUTES.dashboard}
                  variant="secondary"
                  className="w-full sm:flex-1"
                  onClick={closeMobile}
                >
                  Dashboard
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full sm:flex-1"
                  onClick={() => {
                    closeMobile();
                    logout();
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to={ROUTES.login}
                  variant="secondary"
                  className="w-full sm:flex-1"
                  onClick={closeMobile}
                >
                  Login
                </Button>
                <Button as={Link} to={ROUTES.register} className="w-full sm:flex-1" onClick={closeMobile}>
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
