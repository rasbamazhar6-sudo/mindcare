import { useState } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/constants";

export default function Login() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || ROUTES.dashboard;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      if (!remember) {
        /* session persists for tab; user can clear via logout */
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-200px)] overflow-hidden py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-200/45 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-md">
          <div className="flex flex-col items-center text-center">
            <Logo size="lg" className="mb-6" />
            <h1 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-slate-100">
              Welcome back
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Sign in to access your private dashboard and progress tools.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 glass-strong rounded-[1.75rem] p-8 shadow-2xl ring-1 ring-white/70 dark:ring-slate-600/50"
          >
            {error ? (
              <p
                className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div className="space-y-5">
              <div>
                <label htmlFor="login-email" className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Email
                </label>
                <div className="relative mt-1.5">
                  <HiOutlineMail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mindcare-input py-3 pl-11 pr-3"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Password
                </label>
                <div className="relative mt-1.5">
                  <HiOutlineLockClosed className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mindcare-input py-3 pl-11 pr-3"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="font-medium text-teal-800 underline decoration-teal-200 underline-offset-4 hover:text-teal-950 dark:text-teal-300 dark:decoration-teal-700 dark:hover:text-teal-200"
                  onClick={() => alert("Password reset will be added when email service is configured.")}
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? "Signing in…" : "Login"}
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              New to MindCare?{" "}
              <Link
                className="font-semibold text-teal-800 hover:text-teal-950 dark:text-teal-300 dark:hover:text-teal-200"
                to={ROUTES.register}
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </div>
  );
}
