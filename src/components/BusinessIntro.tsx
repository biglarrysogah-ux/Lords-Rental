import React from 'react';
import { ShieldCheck, MessageSquare, Car, PhoneCall } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const BusinessIntro: React.FC = () => {
  return (
    <section className="bg-neutral-900 border-y border-neutral-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>About LORDS RENTAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              A Direct, Reliable Car Rental Service in Accra
            </h2>
            <p className="text-neutral-300 text-base leading-relaxed">
              At <strong className="text-white font-semibold">{BUSINESS_CONFIG.name}</strong>, we make car rentals in Accra straightforward and accessible. Visitors and residents can explore our comprehensive vehicle listings, review available pricing and driving terms, and send booking enquiries directly to our WhatsApp reservations team.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Whether you need an executive sedan, a sturdy SUV for Accra roads, or a reliable pickup truck, our catalogue contains all current vehicle offerings with clear details. Submit your enquiry on WhatsApp or call us directly to confirm availability and schedule your trip.
            </p>
          </div>

          {/* Key Flow Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 shrink-0 border border-emerald-800/40">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">1. Browse Available Listings</h3>
                <p className="text-xs text-neutral-400">
                  Review 27 vehicle listings across sedans, SUVs, and pickups with supplied rates.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 shrink-0 border border-emerald-800/40">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">2. Fast WhatsApp Enquiry</h3>
                <p className="text-xs text-neutral-400">
                  Select your vehicle and submit your form. Details open immediately in WhatsApp ready to send.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-neutral-900 text-neutral-300 shrink-0 border border-neutral-700/50">
                <PhoneCall className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">3. Direct Call Assistance</h3>
                <p className="text-xs text-neutral-400">
                  Prefer to speak with an agent? Call us directly at {BUSINESS_CONFIG.phoneDisplay}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
