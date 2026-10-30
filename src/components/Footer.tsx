import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, ArrowUp } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="h-12 w-auto bg-white rounded-lg p-1 border border-neutral-700/60 shadow-sm flex items-center justify-center">
                <img
                  src={BUSINESS_CONFIG.logoUrl}
                  alt={BUSINESS_CONFIG.logoAlt}
                  className="h-full w-auto object-contain max-w-[130px]"
                />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                {BUSINESS_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-neutral-300 italic font-medium">
              &ldquo;{BUSINESS_CONFIG.taglineSlogan}&rdquo;
            </p>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              {BUSINESS_CONFIG.supportingSubtitle}
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-300 pt-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{BUSINESS_CONFIG.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Website Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-emerald-400 transition-colors">
                  Car Listings (/cars)
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-emerald-400 transition-colors">
                  Book A Ride (/booking)
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-sm">
              <div>
                <span className="text-[11px] text-neutral-500 uppercase block font-semibold">
                  Telephone
                </span>
                <a
                  href={BUSINESS_CONFIG.telLink}
                  className="text-white hover:text-emerald-400 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
              </div>

              <div>
                <span className="text-[11px] text-neutral-500 uppercase block font-semibold">
                  WhatsApp Bookings
                </span>
                <a
                  href={`${BUSINESS_CONFIG.whatsappBaseUrl}?text=Hello%20LORDS%20RENTAL,%20I%20would%20like%20to%20make%20a%20car%20rental%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat: +233 24 784 3535</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">{BUSINESS_CONFIG.location}</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
