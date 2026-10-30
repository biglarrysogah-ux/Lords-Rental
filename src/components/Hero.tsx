import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface HeroProps {
  onScrollToCars?: () => void;
  onScrollToBooking?: () => void;
  isHomepage?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToCars,
  onScrollToBooking,
  isHomepage = true,
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Image: Luxury Mercedes-Benz */}
      <div className="absolute inset-0 z-0">
        <img
          src={BUSINESS_CONFIG.heroImage}
          alt={BUSINESS_CONFIG.heroImageAlt}
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-110 transform scale-105 transition-transform duration-1000"
          loading="eager"
        />
        {/* Gradients to blend smoothly with header and sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/30 to-neutral-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Brand logo badge */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/70 backdrop-blur-md mb-6 animate-fade-in shadow-xl">
          <img
            src={BUSINESS_CONFIG.logoUrl}
            alt={BUSINESS_CONFIG.logoAlt}
            className="h-6 w-auto object-contain bg-white rounded px-1.5 py-0.5"
          />
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-200">
            {BUSINESS_CONFIG.name} • ACCRA, GHANA
          </span>
        </div>

        {/* Main Website Slogan */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight sm:leading-none">
          <span className="block drop-shadow-md">Drive in style</span>
          <span className="block text-emerald-400 drop-shadow-md">travel with confidence</span>
        </h1>

        {/* Supporting Sentence */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-300 mb-10 font-normal leading-relaxed">
          {BUSINESS_CONFIG.supportingSubtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {isHomepage && onScrollToBooking ? (
            <button
              type="button"
              onClick={onScrollToBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-xl shadow-lg shadow-emerald-950 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            >
              <span>BOOK NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-xl shadow-lg shadow-emerald-950 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <span>BOOK NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {isHomepage && onScrollToCars ? (
            <button
              type="button"
              onClick={onScrollToCars}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm px-6 py-4 rounded-xl border border-neutral-700/80 transition-all backdrop-blur-sm cursor-pointer"
            >
              <span>Explore Our Cars</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/cars"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm px-6 py-4 rounded-xl border border-neutral-700/80 transition-all backdrop-blur-sm"
            >
              <span>Explore Our Cars</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Transparent highlights without fabricated claims */}
        <div className="mt-14 pt-8 border-t border-neutral-800/60 max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
          <div className="flex items-center gap-2.5 text-xs text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Direct WhatsApp booking</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Self-drive & chauffeur options</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 text-xs text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Accra city & regional routes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
