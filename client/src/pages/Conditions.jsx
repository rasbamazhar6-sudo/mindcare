import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineInformationCircle } from "react-icons/hi";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import { conditions, CONDITIONS_DISCLAIMER } from "../data/conditions";

function BulletList({ items, dotClass }) {
  return (
    <ul className="mt-1.5 space-y-1">
      {items.map((s) => (
        <li key={s} className="flex gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${dotClass}`} aria-hidden />
          {s}
        </li>
      ))}
    </ul>
  );
}

export default function Conditions() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="py-10 md:py-14">
      <Container>
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700/90 dark:text-teal-400/90">
            Conditions library
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-slate-100">
            Explore with care and clarity
          </h1>
          <p className="mt-3 text-sm text-slate-600 md:text-base dark:text-slate-400">
            Topics relevant to life in Pakistan—compact summaries for learning, not diagnosis.
          </p>
          <p className="mt-4 inline-flex items-start gap-2 rounded-xl border border-amber-200/80 bg-amber-50/70 px-3 py-2 text-left text-xs text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100/90">
            <HiOutlineInformationCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {CONDITIONS_DISCLAIMER}
          </p>
        </header>

        <div className="mt-10">
          <SectionHeader
            eyebrow="Educational"
            title="Mental health conditions"
            description="Tap to expand. Each card stays compact until you need details."
            className="mb-6"
          />

          <div className="space-y-2">
            {conditions.map((c) => {
              const isOpen = openId === c.id;
              const panelId = `panel-${c.id}`;
              const headingId = `heading-${c.id}`;
              return (
                <article
                  key={c.id}
                  className="overflow-hidden rounded-2xl border border-white/70 bg-white/55 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-800/55 dark:hover:shadow-lg dark:hover:shadow-black/20"
                >
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-5"
                    onClick={() => setOpenId(isOpen ? null : c.id)}
                  >
                    <span className="font-display text-base font-medium text-slate-900 sm:text-lg dark:text-slate-100">
                      {c.name}
                    </span>
                    <HiOutlineChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="space-y-4 border-t border-slate-200/60 px-4 pb-4 pt-3 dark:border-slate-700/60 sm:px-5">
                        <section>
                          <h3 className="text-[10px] font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-200">Overview</h3>
                          <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{c.overview}</p>
                        </section>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <section>
                            <h3 className="text-[10px] font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-200">Symptoms</h3>
                            <BulletList items={c.symptoms} dotClass="bg-violet-400" />
                          </section>
                          <section>
                            <h3 className="text-[10px] font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-200">Possible causes</h3>
                            <BulletList items={c.causes} dotClass="bg-teal-400" />
                          </section>
                          <section>
                            <h3 className="text-[10px] font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-200">Coping methods</h3>
                            <BulletList items={c.coping} dotClass="bg-sky-400" />
                          </section>
                          <section>
                            <h3 className="text-[10px] font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-200">Precautions</h3>
                            <BulletList items={c.precautions} dotClass="bg-amber-400" />
                          </section>
                        </div>
                        <section className="rounded-xl border border-teal-200/70 bg-teal-50/50 px-3 py-2.5 dark:border-teal-800/50 dark:bg-teal-950/30">
                          <h3 className="text-[10px] font-semibold uppercase tracking-wide text-teal-900 dark:text-teal-300">
                            When to seek professional help
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">{c.professional}</p>
                        </section>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
