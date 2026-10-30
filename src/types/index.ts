export type VehicleCategory = 'Sedan' | 'SUV' | 'Pickup' | 'Van';

export type SelfDriveStatus = 'yes' | 'no' | null;

export interface VehicleListing {
  id: string;
  listingNumber: number;
  name: string;
  displayModel: string;
  category: VehicleCategory;
  priceDisplay: string | null;
  priceAmount?: number | null;
  currency?: 'GH₵' | '$' | 'To confirm' | null;
  pricePeriod?: string | null; // e.g. "a day" only if explicitly in source
  location?: string | null;
  selfDrive?: SelfDriveStatus;
  description?: string | null;
  pricingNeedsConfirmation?: boolean;
  sourceNotes?: string | null;
  image: string;
  imageAlt: string;
}

export interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  isSameAsPhone: boolean;
  vehicleId: string;
  duration: string;
  customDuration?: string;
  additionalMessage?: string;
}
