import { Link } from "react-router-dom";
import { HiOutlineHeart, HiOutlineSparkles, HiOutlineCheckCircle } from "react-icons/hi";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { recoveryStories, recoveryAffirmations } from "../../data/recoveryStories";
import { ROUTES } from "../../utils/constants";

function StoryBlock({ title, items, variant = "bullet" }) {
  if (!items?.length) return null;
  return (
    <div className="mt-4">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</h4>
      {variant === "text" ? (
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{items}</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {items.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StoryCard({ story, index }) {
  return (
    <article
      className="animate-fade-up"
      style={{ animationDelay: `${index * 120}ms` }}
      aria-labelledby={`${story.id}-title`}
    >
      <Card className="overflow-hidden p-0">
        <div className={`bg-gradient-to-br ${story.theme} px-6 py-5`}>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600/90 dark:text-slate-400">Recovery story</p>
          <h3 id={`${story.id}-title`} className="mt-2 font-display text-2xl text-slate-900 dark:text-slate-100">
            {story.title}
          </h3>
          <p className={`mt-1 text-sm font-medium ${story.accent}`}>{story.persona}</p>
        </div>
        <div className="space-y-1 px-6 py-6">
          <StoryBlock title="The challenge" items={story.challenge} />
          <StoryBlock title="Emotional struggle" items={story.struggle} variant="text" />
          <StoryBlock title="Treatment journey" items={story.treatment} />
          <StoryBlock title="Recovery progress" items={story.progress} />
          <div className="mt-5 rounded-2xl border border-teal-100/80 bg-teal-50/50 p-4 dark:border-teal-800/50 dark:bg-teal-950/30">
            <div className="flex items-start gap-2">
              <HiOutlineSparkles className="mt-0.5 h-5 w-5 shrink-0 text-teal-700 dark:text-teal-400" aria-hidden />
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Reflection: </span>
                {story.conclusion}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
}

export default function RecoveryStories() {
  return (
    <section className="mt-20" aria-labelledby="recovery-heading">
      <SectionHeader
        id="recovery-heading"
        eyebrow="Hope & healing"
        title="Real recovery stories"
        description="Inspired by real journeys, shared anonymously. Names and details are changed to protect privacy. These stories show that treatment and therapy can change lives."
      />

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {recoveryAffirmations.map((line) => (
          <span
            key={line}
            className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-teal-900 shadow-sm dark:border-teal-700/50 dark:bg-slate-800/60 dark:text-teal-200"
          >
            <HiOutlineCheckCircle className="h-4 w-4 text-emerald-600" aria-hidden />
            {line}
          </span>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {recoveryStories.map((story, i) => (
          <StoryCard key={story.id} story={story} index={i} />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-[1.75rem] border border-white/70 bg-gradient-to-r from-teal-50/80 via-white/60 to-violet-50/80 p-8 text-center shadow-lg dark:border-slate-700/50 dark:from-teal-950/40 dark:via-slate-800/60 dark:to-violet-950/40">
        <HiOutlineHeart className="h-10 w-10 text-rose-500" aria-hidden />
        <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          If you or someone you love is struggling, professional support in Pakistan is available. You do not have to
          carry this alone.
        </p>
        <Button as={Link} to={ROUTES.support} size="lg">
          Reach Out for Help
        </Button>
      </div>
    </section>
  );
}
