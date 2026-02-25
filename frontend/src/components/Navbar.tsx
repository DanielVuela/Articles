import { NavLink } from "react-router-dom";
import { useState } from "react";

const linkBase =
  "rounded-lg px-3 py-2 text-sm font-medium transition";
const linkInactive = "text-slate-300 hover:text-white hover:bg-slate-800";
const linkActive = "text-white bg-slate-800";

function AppLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? linkActive : linkInactive}`
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500" />
            <span className="text-lg font-semibold text-white">Articles</span>
          </NavLink>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <AppLink to="/" label="Dashboard" />
            <AppLink to="/upload" label="Upload Article" />
            <AppLink to="/source-items" label="Source Items" />
            <AppLink to="/settings" label="Settings" />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-white"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2">
            <AppLink to="/" label="Dashboard" />
            <AppLink to="/upload" label="Upload Article" />
            <AppLink to="/source-items" label="Source Items" />
            <AppLink to="/settings" label="Settings" />
          </div>
        </div>
      )}
    </nav>
  );
}