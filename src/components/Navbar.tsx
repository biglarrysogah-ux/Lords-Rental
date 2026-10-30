import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Cars', path: '/cars' },
    { label: 'Booking', path: '/booking' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Wordmark & Official Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md py-1"
          >
            <div className="h-12 w-auto bg-white rounded-lg p-1 border border-neutral-700/60 shadow-sm flex items-center justify-center">
              <img
                src={BUSINESS_CONFIG.logoUrl}
                alt={BUSINESS_CONFIG.logoAlt}
                className="h-full w-auto object-contain max-w-[130px]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors uppercase">
                {BUSINESS_CONFIG.name}
              </span>
              <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                Accra, Ghana
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide transition-all relative py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded ${
                    active
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Contact & Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={BUSINESS_CONFIG.telLink}
              className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-3.5 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              title="Call LORDS RENTAL"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BUSINESS_CONFIG.phoneDisplay}</span>
            </a>

            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-sm shadow-emerald-950 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>BOOK NOW</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/booking"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md"
            >
              BOOK NOW
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    active
                      ? 'bg-neutral-900 text-emerald-400 font-semibold'
                      : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-neutral-900 flex flex-col gap-2.5">
            <a
              href={BUSINESS_CONFIG.telLink}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-neutral-200 bg-neutral-900 rounded-lg border border-neutral-800"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call: {BUSINESS_CONFIG.phoneDisplay}</span>
            </a>
            <a
              href={`${BUSINESS_CONFIG.whatsappBaseUrl}?text=Hello%20LORDS%20RENTAL,%20I%20would%20like%20to%20enquire%20about%20car%20rentals%20in%20Accra.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
