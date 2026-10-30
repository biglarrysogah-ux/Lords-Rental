import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, Car, ShieldAlert, MessageSquare } from 'lucide-react';
import { VEHICLE_CATALOGUE } from '../data/vehicles';
import { VehicleCategory, SelfDriveStatus } from '../types';
import { CarCard } from './CarCard';
import { BUSINESS_CONFIG } from '../config/business';

interface CarListingSectionProps {
  id?: string;
  onBookNow?: (vehicleId: string) => void;
  showIntroHeader?: boolean;
}

export const CarListingSection: React.FC<CarListingSectionProps> = ({
  id = 'car-catalogue',
  onBookNow,
  showIntroHeader = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSelfDrive, setSelectedSelfDrive] = useState<string>('all');
  const [selectedPriceStatus, setSelectedPriceStatus] = useState<string>('all');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('all');

  // Filter logic
  const filteredVehicles = useMemo(() => {
    return VEHICLE_CATALOGUE.filter((vehicle) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = vehicle.name.toLowerCase().includes(query);
        const matchModel = vehicle.displayModel.toLowerCase().includes(query);
        const matchDesc = vehicle.description?.toLowerCase().includes(query);
        if (!matchName && !matchModel && !matchDesc) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (vehicle.category !== selectedCategory) return false;
      }

      // Self-Drive
      if (selectedSelfDrive !== 'all') {
        if (selectedSelfDrive === 'yes' && vehicle.selfDrive !== 'yes') return false;
        if (selectedSelfDrive === 'no' && vehicle.selfDrive !== 'no') return false;
      }

      // Price Status
      if (selectedPriceStatus !== 'all') {
        if (selectedPriceStatus === 'has-price' && !vehicle.priceDisplay) return false;
        if (selectedPriceStatus === 'contact-price' && vehicle.priceDisplay) return false;
      }

      // Currency
      if (selectedCurrency !== 'all') {
        if (vehicle.currency !== selectedCurrency) return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedSelfDrive, selectedPriceStatus, selectedCurrency]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSelfDrive('all');
    setSelectedPriceStatus('all');
    setSelectedCurrency('all');
  };

  const isFiltering =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedSelfDrive !== 'all' ||
    selectedPriceStatus !== 'all' ||
    selectedCurrency !== 'all';

  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {showIntroHeader && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Car className="w-3.5 h-3.5" />
              <span>Full Vehicle Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              Explore Our Cars
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Find the vehicle that suits your journey and send us your booking enquiry.
            </p>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-4 sm:p-6 mb-10 shadow-xl backdrop-blur-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by car name (e.g. Prado, Accord, Corolla, Outlander)..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                aria-label="Search vehicles"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white bg-neutral-800 px-2 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Reset Filters Button */}
            {isFiltering && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold rounded-xl border border-neutral-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Filter Dropdowns / Tags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {/* Category Filter */}
            <div>
              <label htmlFor="category-filter" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Vehicle Type
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Body Types</option>
                <option value="Sedan">Sedans</option>
                <option value="SUV">SUVs</option>
                <option value="Pickup">Pickups</option>
                <option value="Van">Vans</option>
              </select>
            </div>

            {/* Self-Drive Filter */}
            <div>
              <label htmlFor="selfdrive-filter" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Driving Mode
              </label>
              <select
                id="selfdrive-filter"
                value={selectedSelfDrive}
                onChange={(e) => setSelectedSelfDrive(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Options</option>
                <option value="yes">Self-Drive Available</option>
                <option value="no">No Self-Drive</option>
              </select>
            </div>

            {/* Price Status Filter */}
            <div>
              <label htmlFor="price-status-filter" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Pricing Status
              </label>
              <select
                id="price-status-filter"
                value={selectedPriceStatus}
                onChange={(e) => setSelectedPriceStatus(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Vehicles</option>
                <option value="has-price">Listed Rates</option>
                <option value="contact-price">Contact for Price</option>
              </select>
            </div>

            {/* Currency Filter */}
            <div>
              <label htmlFor="currency-filter" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Currency
              </label>
              <select
                id="currency-filter"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Currencies</option>
                <option value="GH₵">Ghana Cedi (GH₵)</option>
                <option value="$">US Dollar ($)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Summary */}
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800/80">
            <span>
              Showing <strong className="text-white font-bold">{filteredVehicles.length}</strong> of{' '}
              <strong className="text-white font-bold">{VEHICLE_CATALOGUE.length}</strong> vehicles in Accra fleet
            </span>
            {isFiltering && (
              <span className="text-emerald-400 font-medium">Filters active</span>
            )}
          </div>
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((vehicle) => (
              <CarCard
                key={vehicle.id}
                vehicle={vehicle}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-neutral-900 rounded-2xl border border-neutral-800 max-w-lg mx-auto">
            <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No matching vehicles found</h3>
            <p className="text-sm text-neutral-400 mb-6">
              No vehicles match your active search terms or filters. Try adjusting your search or speak directly with our WhatsApp team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="w-full sm:w-auto px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Clear all filters
              </button>
              <a
                href={`${BUSINESS_CONFIG.whatsappBaseUrl}?text=Hello%20LORDS%20RENTAL,%20I%20am%20looking%20for%20a%20specific%20vehicle%20to%20rent%20in%20Accra.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
