const variants = {
  primary:
    "bg-gradient-to-r from-emerald-500/90 via-teal-500/90 to-cyan-600/90 text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 dark:shadow-teal-500/15",
  secondary:
    "bg-white/80 text-slate-800 border border-slate-200/80 shadow-sm hover:bg-white hover:border-slate-300/80 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:border-slate-500",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-800/80",
  danger: "bg-rose-500/90 text-white shadow-md hover:bg-rose-600",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-2xl",
  lg: "px-6 py-3 text-base rounded-2xl",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  return (
    <Component
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
