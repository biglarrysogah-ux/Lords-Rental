import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarListingSection } from '../components/CarListingSection';
import { CustomerReviews } from '../components/CustomerReviews';

export const CarsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookNow = (vehicleId: string) => {
    navigate(`/booking?vehicle=${encodeURIComponent(vehicleId)}`);
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Standalone Car Listing Section with Header, Search, Filters & Cards */}
      <CarListingSection
        onBookNow={handleBookNow}
        showIntroHeader={true}
      />

      {/* Customer Reviews Section */}
      <CustomerReviews />
    </main>
  );
};
