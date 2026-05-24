export default function Card({ as: Component = "div", className = "", children, ...props }) {
  return (
    <Component
      className={`glass rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_16px_48px_-20px_rgba(15,23,42,0.18)] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
