import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Key, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { VehicleListing } from '../types';
import { VehicleImage } from './VehicleImage';

interface CarCardProps {
  vehicle: VehicleListing;
  onBookNow?: (vehicleId: string) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ vehicle, onBookNow }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    if (onBookNow) {
      onBookNow(vehicle.id);
    } else {
      navigate(`/booking?vehicle=${encodeURIComponent(vehicle.id)}`);
    }
  };

  return (
    <div className="group bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-950/20">
      {/* Vehicle Image with Tag Overlays */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-neutral-950">
        <VehicleImage
          src={vehicle.image}
          alt={vehicle.imageAlt}
          className="w-full h-full"
          category={vehicle.category}
        />

        {/* Listing Index Badge */}
        <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-[10px] font-mono tracking-wider text-neutral-300 px-2.5 py-1 rounded-md border border-neutral-700/60">
          #{String(vehicle.listingNumber).padStart(2, '0')} • {vehicle.category}
        </div>

        {/* Driving Mode Badge */}
        {vehicle.selfDrive === 'yes' && (
          <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5">
            <Key className="w-3 h-3" />
            <span>Self-Drive Available</span>
          </div>
        )}
        {vehicle.selfDrive === 'no' && (
          <div className="absolute top-3 right-3 bg-neutral-950/90 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-md border border-amber-600/40 flex items-center gap-1.5">
            <UserCheck className="w-3 h-3 text-amber-400" />
            <span>No Self-Drive</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Location if specified */}
          {vehicle.location && (
            <div className="flex items-center gap-1 text-[11px] text-neutral-400 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{vehicle.location}</span>
            </div>
          )}

          {/* Vehicle Name (Verbatim from specification) */}
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-emerald-400 transition-colors">
            {vehicle.name}
          </h3>

          {/* Supplied Description if available */}
          {vehicle.description && (
            <p className="text-xs text-neutral-300 mt-2 bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/80 italic">
              &ldquo;{vehicle.description}&rdquo;
            </p>
          )}

          {/* Rate confirmation note if applicable */}
          {vehicle.pricingNeedsConfirmation && (
            <div className="flex items-start gap-1.5 mt-2.5 text-[11px] text-amber-300/90 bg-amber-950/30 border border-amber-800/40 p-2 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
              <span>
                {vehicle.sourceNotes || 'Pricing details to be confirmed with reservations team.'}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & BOOK NOW Button */}
        <div className="pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-semibold">
              Rental Rate
            </span>
            {vehicle.priceDisplay ? (
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-white tracking-tight">
                  {vehicle.priceDisplay}
                </span>
                {vehicle.pricePeriod && (
                  <span className="text-xs text-neutral-400">/{vehicle.pricePeriod}</span>
                )}
              </div>
            ) : (
              <span className="text-xs font-semibold text-emerald-400">
                Contact us for pricing
              </span>
            )}
          </div>

          {/* Green BOOK NOW button */}
          <button
            type="button"
            onClick={handleBookClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md shadow-emerald-950 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            aria-label={`Book ${vehicle.name}`}
          >
            <span>BOOK NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
