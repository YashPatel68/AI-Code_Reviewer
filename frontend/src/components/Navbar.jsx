import React from "react";
import image from "../assets/iconOfProject.png";
import { House, MessagesSquare, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/",
    label: "Workspace",
    icon: House,
    end: true
  },
  {
    to: "/feedback",
    label: "Feedback",
    icon: MessagesSquare
  }
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06070d]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[88px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="group flex min-w-0 items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-slate-900 to-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
            <img src={image} alt="AI Reviewer logo" className="h-11 w-11 object-contain brightness-125 saturate-150" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
              <Sparkles size={13} />
              AI Code Reviewer
            </div>
            <p className="truncate text-base font-semibold text-white sm:text-lg">Dark workspace</p>
          </div>
        </NavLink>

        <nav className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-cyan-400/15 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.12)]"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                  }`
                }
              >
                <Icon size={17} />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
