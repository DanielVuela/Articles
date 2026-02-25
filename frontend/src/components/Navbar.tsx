import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500" />
            <span className="text-lg font-semibold text-white">
              Articles Website
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="text-slate-300 hover:text-white transition">
              Dashboard
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition">
              Source Items
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition">
              Settings
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition">
              Upload Article
            </a>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900">
          <div className="flex flex-col gap-3 px-4 py-4 text-sm">
            <a href="#" className="text-slate-300 hover:text-white">
              Dashboard
            </a>
            <a href="#" className="text-slate-300 hover:text-white">
              Source Items
            </a>
            <a href="#" className="text-slate-300 hover:text-white">
              Settings
            </a>
            <a href="#" className="text-slate-300 hover:text-white">
              Upload Article
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
