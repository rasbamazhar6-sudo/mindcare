import {
  HiOutlineHeart,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineSun,
} from "react-icons/hi";
import { FaBrain, FaBalanceScale } from "react-icons/fa";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import Card from "../components/ui/Card";
import RecoveryStories from "../components/awareness/RecoveryStories";
import TreatmentMatters from "../components/awareness/TreatmentMatters";

const whatIs = [
  {
    title: "A spectrum, not a switch",
    text: "Mental health shifts with sleep, stress, relationships, and biology—just like physical health.",
    icon: FaBrain,
  },
  {
    title: "Skills + support",
    text: "Wellbeing grows through coping tools, community, and sometimes professional treatment.",
    icon: HiOutlineHeart,
  },
  {
    title: "Whole-person care",
    text: "Emotions, thoughts, behaviors, and environment interact. Small changes can ripple widely.",
    icon: HiOutlineSun,
  },
];

const warningSigns = [
  "Persistent low mood or numbness",
  "Sleep or appetite changes lasting weeks",
  "Withdrawal from people or activities you value",
  "Intense worry, panic, or intrusive thoughts",
  "Difficulty concentrating or unexplained fatigue",
  "Thoughts of self-harm—seek immediate professional help",
];

const mythsFacts = [
  {
    myth: "Talking about problems makes them worse.",
    fact: "Naming experiences with a safe listener often reduces shame and clarifies next steps.",
  },
  {
    myth: "Therapy is only for crises.",
    fact: "Many people use therapy for prevention, transitions, and building emotional skills.",
  },
  {
    myth: "Mental health struggles mean you are broken.",
    fact: "Struggle is human. Support helps you adapt—not because you failed, but because you matter.",
  },
];

const practices = [
  { title: "Breathing resets", detail: "Slow exhale-forward breathing signals safety to your nervous system." },
  { title: "Boundaries", detail: "Protecting time and energy is not selfish—it stabilizes capacity." },
  { title: "Movement", detail: "Gentle walks can shift rumination and improve mood chemistry." },
  { title: "Connection", detail: "One trusted conversation can interrupt isolation’s downward pull." },
];

export default function Awareness() {
  return (
    <div className="py-14 md:py-20">
      <Container>
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700/90 dark:text-teal-400/90">
            Awareness hub
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-slate-900 sm:text-5xl dark:text-slate-100">
            Understanding mental health
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Clear language, respectful framing, and practical next steps—so you can care for yourself and others with
            confidence.
          </p>
        </header>

        <section className="mt-16" aria-labelledby="what-heading">
          <SectionHeader
            id="what-heading"
            eyebrow="Foundations"
            title="What is mental health?"
            description="Mental health is how we think, feel, and relate—especially under stress. It is not the absence of difficulty, but the capacity to recover and grow."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {whatIs.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-sky-100 text-slate-800">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-20" aria-labelledby="wellbeing-heading">
          <SectionHeader
            id="wellbeing-heading"
            eyebrow="Daily life"
            title="Emotional wellbeing"
            description="Emotional wellbeing is the ability to name feelings, regulate intensity, and respond—not react—to life’s demands."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-gradient-to-br from-sky-50/90 via-white/70 to-violet-50/70">
              <div className="flex items-start gap-3">
                <FaBalanceScale className="mt-1 h-6 w-6 text-sky-700" aria-hidden />
                <div>
                  <h3 className="font-display text-xl text-slate-900">Balance is dynamic</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Seasons of stress happen. Wellbeing means building recovery into the week—not chasing perfection.
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <h3 className="font-display text-xl text-slate-900">Signals to listen for</h3>
              <p className="mt-2 text-sm text-slate-600">
                Irritability, tearfulness, brain fog, or relationship friction can be early cues to slow down and
                seek support.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-20" aria-labelledby="warnings-heading">
          <SectionHeader
            id="warnings-heading"
            eyebrow="Safety"
            title="Warning signs"
            description="If several signs persist or worsen, consider speaking with a licensed clinician. If you are in immediate danger, contact local emergency services."
          />
          <Card className="border border-amber-100/80 bg-amber-50/40">
            <div className="flex items-start gap-3">
              <HiOutlineExclamationCircle className="mt-0.5 h-6 w-6 text-amber-700" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-amber-950">This list is educational—not diagnostic.</p>
                <p className="mt-1 text-sm text-amber-950/80">
                  Use it as a prompt for reflection and conversation with a professional.
                </p>
              </div>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {warningSigns.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-slate-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="mt-20" aria-labelledby="myths-heading">
          <SectionHeader
            id="myths-heading"
            eyebrow="Clarity"
            title="Myths vs facts"
            description="Stigma often spreads misinformation. Here are grounded reframes you can trust."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {mythsFacts.map((row) => (
              <Card key={row.myth}>
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-700/80">Myth</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{row.myth}</p>
                <div className="mt-4 flex items-start gap-2">
                  <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800/90">Fact</p>
                    <p className="mt-1 text-sm text-slate-600">{row.fact}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-20" aria-labelledby="practices-heading">
          <SectionHeader
            id="practices-heading"
            eyebrow="Toolkit"
            title="Self-care practices"
            description="Start small. Consistency beats intensity—especially when energy is low."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {practices.map((p) => (
              <Card key={p.title}>
                <h3 className="font-display text-lg text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        <RecoveryStories />
        <TreatmentMatters />
      </Container>
    </div>
  );
}
