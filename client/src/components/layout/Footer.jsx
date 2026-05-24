import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { ROUTES } from "../../utils/constants";
import { footerCrisisLines } from "../../data/crisisHelplines";
import Container from "../ui/Container";
import Logo from "../ui/Logo";

const footerLinks = [
  { to: ROUTES.home, label: "Home" },
  { to: ROUTES.awareness, label: "Awareness" },
  { to: ROUTES.conditions, label: "Conditions" },
  { to: ROUTES.chatbot, label: "AI Support" },
  { to: ROUTES.support, label: "Resources" },
  { to: ROUTES.login, label: "Login" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/60 backdrop-blur-md transition-colors duration-300 dark:border-slate-700/80 dark:bg-slate-900/80">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size="md" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              MindCare offers education and wellness tools to support your journey. We are not a substitute for
              professional care.
            </p>
            <div className="mt-5 flex gap-3 text-slate-500 dark:text-slate-400">
              <a
                href="https://twitter.com"
                className="rounded-xl border border-slate-200/80 bg-white/60 p-2 transition-all duration-300 hover:border-teal-200 hover:text-teal-700 dark:border-slate-600 dark:bg-slate-800/60 dark:hover:border-teal-500/50 dark:hover:text-teal-300"
                aria-label="Twitter (placeholder)"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                className="rounded-xl border border-slate-200/80 bg-white/60 p-2 transition-all duration-300 hover:border-teal-200 hover:text-teal-700 dark:border-slate-600 dark:bg-slate-800/60 dark:hover:border-teal-500/50 dark:hover:text-teal-300"
                aria-label="Instagram (placeholder)"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                className="rounded-xl border border-slate-200/80 bg-white/60 p-2 transition-all duration-300 hover:border-teal-200 hover:text-teal-700 dark:border-slate-600 dark:bg-slate-800/60 dark:hover:border-teal-500/50 dark:hover:text-teal-300"
                aria-label="LinkedIn (placeholder)"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-slate-100">
              Quick links
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    className="text-slate-600 transition-colors duration-300 hover:text-teal-800 dark:text-slate-400 dark:hover:text-teal-300"
                    to={l.to}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-slate-100">
              Pakistan — helplines
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {footerCrisisLines.map((line) => (
                <li key={line.label}>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{line.label}:</span> {line.value}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
              For immediate physical danger or a medical emergency, call{" "}
              <span className="font-medium text-slate-700 dark:text-slate-300">Police 15</span> or your provincial
              rescue / ambulance line (e.g.{" "}
              <span className="font-medium text-slate-700 dark:text-slate-300">1122</span> where available). For mental
              health NGO lines and free screenings, open{" "}
              <Link
                className="font-medium text-teal-800 underline decoration-teal-200 underline-offset-2 dark:text-teal-300 dark:decoration-teal-700"
                to={ROUTES.support}
              >
                Resources
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs leading-relaxed text-amber-950/90 transition-colors duration-300 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100/90">
          <strong className="font-semibold">Disclaimer:</strong> Content on MindCare is for educational purposes only
          and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified clinician for
          personalized guidance—especially if you are in crisis.
        </div>

        <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} MindCare. Crafted with care for emotional safety and clarity.
        </p>
      </Container>
    </footer>
  );
}
