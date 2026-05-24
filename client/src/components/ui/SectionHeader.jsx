export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) {
  const alignClass = align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <header
      id={id}
      className={`flex flex-col gap-3 md:gap-4 max-w-3xl mx-auto mb-10 md:mb-14 ${alignClass} ${className}`}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700/80 dark:text-teal-400/90">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl sm:text-4xl md:text-[2.5rem] font-semibold text-slate-900 leading-tight dark:text-slate-100">
        {title}
      </h2>
      {description ? (
        <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl dark:text-slate-400">
          {description}
        </p>
      ) : null}
    </header>
  );
}
