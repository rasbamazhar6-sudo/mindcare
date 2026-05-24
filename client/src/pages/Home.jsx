import { Link } from "react-router-dom";
import {
  HiOutlineHeart,
  HiOutlineLightningBolt,
  HiOutlineEmojiSad,
  HiOutlineFire,
  HiOutlineSparkles,
  HiOutlineMoon,
} from "react-icons/hi";
import { FaLeaf, FaBook, FaBed, FaRunning, FaHandsHelping } from "react-icons/fa";
import { MdSelfImprovement } from "react-icons/md";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ROUTES } from "../utils/constants";

const whyCards = [
  {
    title: "Emotional wellness",
    body: "Understanding and tending to your feelings builds steadier days and kinder self-talk.",
    icon: HiOutlineHeart,
    accent: "from-emerald-100 to-teal-50",
  },
  {
    title: "Anxiety",
    body: "Worry and tension are common—and workable—with grounding tools, support, and professional care.",
    icon: HiOutlineLightningBolt,
    accent: "from-sky-100 to-indigo-50",
  },
  {
    title: "Burnout",
    body: "When output outpaces recovery, your mind and body ask for boundaries, rest, and sustainable pace.",
    icon: HiOutlineFire,
    accent: "from-violet-100 to-fuchsia-50",
  },
  {
    title: "Depression",
    body: "Low mood can shrink your world slowly. Connection and evidence-based care can help widen it again.",
    icon: HiOutlineEmojiSad,
    accent: "from-teal-100 to-cyan-50",
  },
  {
    title: "Stress",
    body: "Stress signals needs: clarity, support, and space. Small resets can prevent chronic overload.",
    icon: HiOutlineSparkles,
    accent: "from-amber-100 to-orange-50",
  },
];

const stigmaPoints = [
  {
    title: "Why people hesitate",
    text: "Many worry that reaching out means admitting weakness—when it is actually a courageous step toward relief.",
  },
  {
    title: "Fear of judgment",
    text: "Stigma thrives in silence. Safe spaces and accurate information reduce shame and isolation.",
  },
  {
    title: "Social pressure",
    text: "Performing “fine” can drain energy. Naming struggle is not failure—it is honest self-respect.",
  },
  {
    title: "Speaking openly",
    text: "Open conversations normalize care, encourage early support, and remind others they are not alone.",
  },
];

const selfCare = [
  { title: "Mindful breathing", icon: HiOutlineMoon, text: "Short breathing pauses can calm the nervous system and sharpen gentle focus." },
  { title: "Journaling", icon: FaBook, text: "Writing helps process emotions and notice patterns without judgment." },
  { title: "Sleep", icon: FaBed, text: "Consistent rest repairs mood, memory, and resilience—protect it like a ritual." },
  { title: "Exercise", icon: FaRunning, text: "Movement supports mood chemistry and reminds your body it is capable." },
  { title: "Therapy", icon: MdSelfImprovement, text: "Licensed professionals offer structured tools tailored to you." },
  { title: "Mindfulness", icon: FaLeaf, text: "Present-moment awareness softens reactivity and deepens self-kindness." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden gradient-hero">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl animate-float" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-sky-200/60 blur-3xl animate-float [animation-delay:1s]" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl animate-float [animation-delay:2s]" />
        </div>

        <Container className="relative py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-teal-800 shadow-sm dark:border-slate-600 dark:bg-slate-800/60 dark:text-teal-300">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden />
                Calm, confidential, compassionate
              </p>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] dark:text-slate-100">
                Your Mental Health Matters
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                MindCare is a gentle companion for awareness, self-care, and support—designed with the warmth of a
                modern wellness studio and the clarity of trusted healthcare UX.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button as={Link} to={ROUTES.register} size="lg">
                  Start Wellness Journey
                </Button>
                <Button as={Link} to={ROUTES.register} variant="secondary" size="lg">
                  Track Your Progress
                </Button>
                <Button as={Link} to={ROUTES.awareness} variant="ghost" size="lg" className="sm:ml-1">
                  Explore awareness
                </Button>
              </div>
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-500">
                Progress tracking lives in your private dashboard after you create an account.
              </p>
            </div>

            <div className="relative animate-fade-up [animation-delay:0.1s]">
              <div className="glass-strong relative overflow-hidden rounded-[2rem] p-6 shadow-2xl ring-1 ring-white/70">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-gradient-to-br from-emerald-100/90 to-teal-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal-900/80">Today</p>
                    <p className="mt-2 font-display text-2xl text-slate-900">Grounded check-in</p>
                    <p className="mt-2 text-sm text-slate-600">A soft start for nervous systems that run fast.</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-sky-100/90 to-indigo-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-900/80">Support</p>
                    <p className="mt-2 font-display text-2xl text-slate-900">AI companion</p>
                    <p className="mt-2 text-sm text-slate-600">Empathic guidance—not diagnosis.</p>
                  </div>
                  <div className="sm:col-span-2 rounded-2xl border border-white/60 bg-gradient-to-br from-emerald-50/90 via-white/80 to-violet-50/70 p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
                    <blockquote className="font-display text-lg font-medium leading-snug text-slate-900 sm:text-xl">
                      “Your mental health matters every single day.”
                    </blockquote>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                      Small steps, support, and self-care can slowly bring healing and strength.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute -bottom-6 -right-4 hidden h-28 w-28 rounded-3xl bg-gradient-to-tr from-violet-200 to-sky-200 opacity-80 blur-2xl lg:block"
                aria-hidden
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="why-heading">
        <Container>
          <SectionHeader
            id="why-heading"
            eyebrow="Education"
            title="Why mental health matters"
            description="Mental health is part of whole health. These topics are common entry points—each deserves nuance, community, and professional care when needed."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="group">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-slate-800 shadow-inner`}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-white/40 dark:bg-slate-900/40" aria-labelledby="stigma-heading">
        <Container>
          <SectionHeader
            id="stigma-heading"
            eyebrow="Culture"
            title="Breaking the stigma"
            description="Stigma keeps people quiet when they most need support. MindCare stands for dignity, discretion, and destigmatizing care."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {stigmaPoints.map((p) => (
              <Card key={p.title}>
                <h3 className="font-display text-xl text-slate-900 dark:text-slate-100">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="selfcare-heading">
        <Container>
          <SectionHeader
            id="selfcare-heading"
            eyebrow="Healing"
            title="Self care & healing"
            description="Small rituals add up. Choose what fits your season of life—then protect it like an appointment."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selfCare.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.title}>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-violet-100 text-slate-800">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg text-slate-900 dark:text-slate-100">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.text}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        className="py-16 md:py-24 bg-gradient-to-b from-white/50 to-slate-50/80 dark:from-slate-900/50 dark:to-slate-900"
        aria-labelledby="community-heading"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                className="mx-0 mb-8"
                id="community-heading"
                eyebrow="Community"
                title="Kindness is a practice"
                description="Supportive communities remind us that healing is relational. You deserve patience—from others and from yourself."
              />
              <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                  <FaHandsHelping className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-200">Emotional support:</strong> listening without fixing can be
                    profoundly regulating.
                  </span>
                </li>
                <li className="flex gap-3">
                  <HiOutlineHeart className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" aria-hidden />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-200">Helping others:</strong> contribution can restore meaning—when
                    balanced with rest.
                  </span>
                </li>
                <li className="flex gap-3">
                  <HiOutlineSparkles className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" aria-hidden />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-200">Awareness:</strong> accurate information reduces fear and
                    empowers early care.
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button as={Link} to={ROUTES.support} variant="secondary">
                  Browse resources
                </Button>
                <Button as={Link} to={ROUTES.chatbot}>
                  Talk with AI support
                </Button>
              </div>
            </div>
            <Card className="bg-gradient-to-br from-emerald-50/80 via-white/60 to-violet-50/80 dark:from-emerald-950/40 dark:via-slate-800/60 dark:to-violet-950/40">
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">
                Community pledge
              </p>
              <p className="mt-4 font-display text-2xl text-slate-900 dark:text-slate-100">We lead with gentleness.</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                MindCare is built for psychological safety: no shame, no sensationalism—just steady encouragement and
                clear boundaries around clinical care.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20" aria-labelledby="quote-heading">
        <Container>
          <div
            id="quote-heading"
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-200/80 via-sky-200/80 to-violet-200/80 p-10 md:p-14 text-center shadow-[0_24px_80px_-30px_rgba(15,23,42,0.35)] ring-1 ring-white/60 dark:from-emerald-900/40 dark:via-slate-800 dark:to-violet-900/40 dark:shadow-black/30 dark:ring-slate-600/50"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.06),transparent_55%)]" />
            <blockquote className="relative font-display text-2xl md:text-3xl font-medium leading-snug text-slate-900 dark:text-slate-100">
              “Healing is not linear—and you are not behind. Small steps still move you toward a life that feels more
              possible.”
            </blockquote>
            <p className="relative mt-5 text-sm font-medium text-slate-700 dark:text-slate-400">MindCare mantra</p>
          </div>
        </Container>
      </section>
    </>
  );
}
