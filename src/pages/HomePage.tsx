import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { BusinessIntro } from '../components/BusinessIntro';
import { CarListingSection } from '../components/CarListingSection';
import { BookingForm } from '../components/BookingForm';
import { CustomerReviews } from '../components/CustomerReviews';

export const HomePage: React.FC = () => {
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState<string>('');

  const scrollToCars = () => {
    const el = document.getElementById('cars-catalogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooking = (vehicleId?: string) => {
    if (vehicleId) {
      setSelectedVehicleForBooking(vehicleId);
    }
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* 1. Homepage Hero & Introduction */}
      <Hero
        onScrollToCars={scrollToCars}
        onScrollToBooking={() => scrollToBooking()}
        isHomepage={true}
      />
      <BusinessIntro />

      {/* 2. Full Car Listing Section */}
      <CarListingSection
        id="cars-catalogue"
        onBookNow={(id) => scrollToBooking(id)}
        showIntroHeader={true}
      />

      {/* 3. Full Booking Section */}
      <BookingForm
        id="booking-section"
        initialVehicleId={selectedVehicleForBooking}
        onVehicleChange={(id) => setSelectedVehicleForBooking(id)}
        showIntroHeader={true}
      />

      {/* 4. Customer Review Section */}
      <CustomerReviews />
    </main>
  );
};
