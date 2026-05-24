import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden gradient-page">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-lg focus:outline focus:outline-2 focus:outline-teal-500"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex min-h-0 flex-1 flex-col overflow-x-hidden" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
