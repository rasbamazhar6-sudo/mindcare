import { useMemo, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/constants";

export default function Register() {
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!name.trim()) e.name = "Please enter your full name.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email address.";
    if (password.length < 8) e.password = "Use at least 8 characters.";
    if (password !== confirm) e.confirm = "Passwords do not match.";
    return e;
  }, [name, email, password, confirm]);

  const isValid = Object.keys(errors).length === 0;

  if (!loading && isAuthenticated) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError("");
    setTouched(true);
    if (!isValid) return;

    setSubmitting(true);
    try {
      await register({ fullName: name.trim(), email: email.trim(), password });
      navigate(ROUTES.dashboard, { replace: true });
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const show = (field) => touched && errors[field];

  return (
    <div className="relative min-h-[calc(100vh-200px)] overflow-hidden py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="absolute left-10 bottom-0 h-80 w-80 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-md">
          <div className="flex flex-col items-center text-center">
            <Logo size="lg" className="mb-6" />
            <h1 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-slate-100">
              Begin gently
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Create your MindCare space for mood check-ins, daily wellness tasks, and private progress snapshots.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 glass-strong rounded-[1.75rem] p-8 shadow-2xl ring-1 ring-white/70 transition-all duration-300 dark:ring-slate-600/50"
          >
            {submitError ? (
              <p className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900" role="alert">
                {submitError}
              </p>
            ) : null}
            <div className="space-y-5">
              <div>
                <label htmlFor="reg-name" className="text-sm font-medium text-slate-800">
                  Full name
                </label>
                <div className="relative mt-1.5">
                  <HiOutlineUser className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="reg-name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`mindcare-input py-3 pl-11 pr-3 focus:ring-2 ${
                      show("name")
                        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200/80 focus:border-teal-300 focus:ring-teal-200"
                    }`}
                    placeholder="Full Name "
                  />
                </div>
                {show("name") ? (
                  <p className="mt-1.5 text-xs text-rose-700" role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="reg-email" className="text-sm font-medium text-slate-800">
                  Email
                </label>
                <div className="relative mt-1.5">
                  <HiOutlineMail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mindcare-input py-3 pl-11 pr-3 focus:ring-2 ${
                      show("email")
                        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200/80 focus:border-teal-300 focus:ring-teal-200"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {show("email") ? (
                  <p className="mt-1.5 text-xs text-rose-700" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="reg-password" className="text-sm font-medium text-slate-800">
                  Password
                </label>
                <div className="relative mt-1.5">
                  <HiOutlineLockClosed className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="reg-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`mindcare-input py-3 pl-11 pr-3 focus:ring-2 ${
                      show("password")
                        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200/80 focus:border-teal-300 focus:ring-teal-200"
                    }`}
                    placeholder="At least 8 characters"
                  />
                </div>
                {show("password") ? (
                  <p className="mt-1.5 text-xs text-rose-700" role="alert">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="reg-confirm" className="text-sm font-medium text-slate-800">
                  Confirm password
                </label>
                <div className="relative mt-1.5">
                  <HiOutlineLockClosed className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="reg-confirm"
                    type="password"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className={`mindcare-input py-3 pl-11 pr-3 focus:ring-2 ${
                      show("confirm")
                        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200/80 focus:border-teal-300 focus:ring-teal-200"
                    }`}
                    placeholder="Repeat password"
                  />
                </div>
                {show("confirm") ? (
                  <p className="mt-1.5 text-xs text-rose-700" role="alert">
                    {errors.confirm}
                  </p>
                ) : null}
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? "Creating account…" : "Create account"}
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link className="font-semibold text-teal-800 hover:text-teal-950" to={ROUTES.login}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </div>
  );
}
