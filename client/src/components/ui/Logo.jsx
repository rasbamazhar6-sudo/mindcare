import { Link } from "react-router-dom";
import logoImg from "../../assets/mindcare-logo.png";
import { ROUTES } from "../../utils/constants";

const sizes = {
  sm: { img: "h-8 w-8", text: "text-base" },
  md: { img: "h-9 w-9 sm:h-10 sm:w-10", text: "text-lg sm:text-xl" },
  lg: { img: "h-12 w-12 sm:h-14 sm:w-14", text: "text-xl sm:text-2xl" },
};

export default function Logo({ size = "md", showText = true, className = "", linkTo = ROUTES.home }) {
  const s = sizes[size] || sizes.md;

  const content = (
    <>
      <img
        src={logoImg}
        alt="MindCare logo"
        className={`${s.img} shrink-0 rounded-xl object-contain transition-all duration-300 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(45,212,191,0.45)]`}
        width={56}
        height={56}
      />
      {showText ? (
        <span
          className={`font-display font-semibold tracking-tight text-slate-900 transition-colors duration-300 dark:text-slate-100 ${s.text}`}
        >
          MindCare
        </span>
      ) : null}
    </>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={`group inline-flex items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${className}`}
      >
        {content}
      </Link>
    );
  }

  return <div className={`inline-flex items-center gap-2.5 ${className}`}>{content}</div>;
}
