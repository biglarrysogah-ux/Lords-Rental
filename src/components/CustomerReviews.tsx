import React from 'react';
import { Star, MessageSquareQuote, AlertTriangle } from 'lucide-react';

interface SampleReview {
  id: string;
  demoName: string;
  tripContext: string;
  content: string;
  rating: number;
}

const SAMPLE_REVIEWS: SampleReview[] = [
  {
    id: 'sample-1',
    demoName: 'Demonstration Client A',
    tripContext: 'Sample: Accra Airport Pickup & City Travel',
    content:
      'Smooth vehicle handover and responsive WhatsApp communication throughout the rental period. The car was clean and well maintained for driving around Accra.',
    rating: 5,
  },
  {
    id: 'sample-2',
    demoName: 'Demonstration Client B',
    tripContext: 'Sample: Weekend Executive SUV Rental',
    content:
      'Booking enquiry via WhatsApp was answered quickly. The vehicle handled Accra traffic comfortably and the chauffeur was courteous and punctual.',
    rating: 5,
  },
  {
    id: 'sample-3',
    demoName: 'Demonstration Client C',
    tripContext: 'Sample: Business Trip Sedan Booking',
    content:
      'Clear pricing and straightforward terms. The car was delivered in good condition and returned without any hassle.',
    rating: 5,
  },
];

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header with explicit demonstration notice */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-semibold mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Sample review — replace with verified customer feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Customer Experience
          </h2>
          <p className="text-neutral-400 text-sm">
            This section is prepared for post-launch customer testimonials. Demonstration layouts are shown below.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              {/* Sample Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400 gap-0.5">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/30">
                  Sample Review
                </span>
              </div>

              {/* Quote Content */}
              <div className="mb-6">
                <MessageSquareQuote className="w-7 h-7 text-neutral-700 mb-2" />
                <p className="text-neutral-300 text-sm leading-relaxed italic">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Placeholder Reviewer Info */}
              <div className="pt-4 border-t border-neutral-800/80">
                <div className="font-bold text-sm text-white">{rev.demoName}</div>
                <div className="text-xs text-neutral-400">{rev.tripContext}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Business Owner Customization Prompt Note */}
        <div className="mt-10 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60 text-center max-w-xl mx-auto text-xs text-neutral-400">
          <span className="text-neutral-300 font-semibold">Note for LORDS RENTAL:</span> Genuine customer feedback can be inserted into the review array before live marketing campaigns.
        </div>
      </div>
    </section>
  );
};
