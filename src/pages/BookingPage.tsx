import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookingForm } from '../components/BookingForm';
import { CustomerReviews } from '../components/CustomerReviews';

export const BookingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const vehicleParam = searchParams.get('vehicle') || '';
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicleParam);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (vehicleParam) {
      setSelectedVehicleId(vehicleParam);
    }
  }, [vehicleParam]);

  const handleVehicleChange = (id: string) => {
    setSelectedVehicleId(id);
    if (id) {
      setSearchParams({ vehicle: id }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Complete Booking Form with preselected vehicle support */}
      <BookingForm
        initialVehicleId={selectedVehicleId}
        onVehicleChange={handleVehicleChange}
        showIntroHeader={true}
      />

      {/* Customer Reviews Section */}
      <CustomerReviews />
    </main>
  );
};
