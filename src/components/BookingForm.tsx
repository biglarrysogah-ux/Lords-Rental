import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Check, Copy, AlertCircle, Info, Sparkles, Car } from 'lucide-react';
import { VEHICLE_CATALOGUE } from '../data/vehicles';
import { BUSINESS_CONFIG } from '../config/business';
import { VehicleListing } from '../types';

interface BookingFormProps {
  initialVehicleId?: string;
  onVehicleChange?: (vehicleId: string) => void;
  showIntroHeader?: boolean;
  id?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialVehicleId,
  onVehicleChange,
  showIntroHeader = true,
  id = 'booking-section',
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSameAsPhone, setIsSameAsPhone] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(initialVehicleId || '');
  const [duration, setDuration] = useState('1 day');
  const [customDuration, setCustomDuration] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWhatsappUrl, setGeneratedWhatsappUrl] = useState<string | null>(null);
  const [rawMessage, setRawMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Sync if prop changes
  useEffect(() => {
    if (initialVehicleId) {
      setSelectedVehicleId(initialVehicleId);
    }
  }, [initialVehicleId]);

  // Sync whatsapp number if checkbox checked
  const handlePhoneChange = (val: string) => {
    setPhoneNumber(val);
    if (isSameAsPhone) {
      setWhatsappNumber(val);
    }
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: '' }));
    }
  };

  const handleSamePhoneToggle = (checked: boolean) => {
    setIsSameAsPhone(checked);
    if (checked) {
      setWhatsappNumber(phoneNumber);
      if (errors.whatsappNumber) {
        setErrors((prev) => ({ ...prev, whatsappNumber: '' }));
      }
    }
  };

  const selectedVehicle: VehicleListing | undefined = VEHICLE_CATALOGUE.find(
    (v) => v.id === selectedVehicleId
  );

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    }

    if (!whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'WhatsApp Number is required.';
    } else if (whatsappNumber.trim().length < 7) {
      newErrors.whatsappNumber = 'Please enter a valid WhatsApp number.';
    }

    if (!selectedVehicleId) {
      newErrors.vehicleId = 'Please select a vehicle from the catalogue.';
    }

    if (!duration) {
      newErrors.duration = 'Please specify your requested rental duration.';
    } else if (duration === 'other' && !customDuration.trim()) {
      newErrors.customDuration = 'Please specify the duration or rental period.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const durationText =
      duration === 'other' ? customDuration.trim() : duration;

    const vehicleTitle = selectedVehicle
      ? `${selectedVehicle.name} (${selectedVehicle.priceDisplay || 'Rate to confirm'})`
      : 'Vehicle from catalogue';

    // Build the exact required message format
    let message = `Hello LORDS RENTAL,\n\nI would like to make a car rental booking enquiry.\n\n`;
    message += `Full Name: ${fullName.trim()}\n\n`;
    message += `Phone Number: ${phoneNumber.trim()}\n\n`;
    message += `WhatsApp Number: ${whatsappNumber.trim()}\n\n`;
    message += `Selected Vehicle: ${vehicleTitle}\n\n`;
    message += `Rental Duration: ${durationText}\n\n`;

    if (additionalMessage.trim()) {
      message += `Additional Message: ${additionalMessage.trim()}\n\n`;
    }

    message += `Please confirm the vehicle’s availability, final rental price, and booking arrangements.\n\nThank you.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.phoneClean}?text=${encoded}`;

    setRawMessage(message);
    setGeneratedWhatsappUrl(whatsappUrl);
    setIsSubmitted(true);

    // Try to open WhatsApp in a new tab
    const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // Browser popup blocked; fallback card below provides direct click
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900 border-t border-neutral-800 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {showIntroHeader && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/40 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Reservations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              Book Your Ride
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Tell us which vehicle you need and send your booking enquiry directly to our WhatsApp team.
            </p>
          </div>
        )}

        {/* Selected Vehicle Highlight Banner */}
        {selectedVehicle && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-emerald-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.imageAlt}
                className="w-16 h-12 rounded-lg object-cover bg-neutral-900 border border-neutral-800 shrink-0"
              />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                  Selected Vehicle
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {selectedVehicle.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                  <span>Rate: {selectedVehicle.priceDisplay || 'Contact for pricing'}</span>
                  {selectedVehicle.selfDrive && (
                    <span className="text-emerald-400">
                      • {selectedVehicle.selfDrive === 'yes' ? 'Self-Drive' : 'Chauffeur Driven'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedVehicleId('');
                if (onVehicleChange) onVehicleChange('');
              }}
              className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 self-end sm:self-auto"
            >
              Change vehicle
            </button>
          </div>
        )}

        {/* Booking Form Card */}
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Field 1: Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-neutral-200 mb-2">
                Full Name <span className="text-emerald-400">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                }}
                placeholder="e.g. Samuel K. Mensah"
                className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.fullName ? 'border-red-500 bg-red-950/10' : 'border-neutral-800 focus:border-transparent'
                }`}
                required
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Contact Numbers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Field 2: Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-neutral-200 mb-2">
                  Phone Number <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="e.g. +233 24 123 4567"
                  className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                    errors.phoneNumber ? 'border-red-500 bg-red-950/10' : 'border-neutral-800 focus:border-transparent'
                  }`}
                  required
                />
                {errors.phoneNumber && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phoneNumber}</span>
                  </p>
                )}
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Ghanaian and international formats supported
                </span>
              </div>

              {/* Field 3: WhatsApp Number */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="whatsappNumber" className="block text-sm font-semibold text-neutral-200">
                    WhatsApp Number <span className="text-emerald-400">*</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-neutral-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSameAsPhone}
                      onChange={(e) => handleSamePhoneToggle(e.target.checked)}
                      className="rounded border-neutral-700 text-emerald-600 focus:ring-emerald-500 bg-neutral-900"
                    />
                    <span>Same as phone</span>
                  </label>
                </div>
                <input
                  id="whatsappNumber"
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => {
                    setWhatsappNumber(e.target.value);
                    if (isSameAsPhone) setIsSameAsPhone(false);
                    if (errors.whatsappNumber) setErrors((prev) => ({ ...prev, whatsappNumber: '' }));
                  }}
                  placeholder="e.g. +233 24 123 4567"
                  className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                    errors.whatsappNumber ? 'border-red-500 bg-red-950/10' : 'border-neutral-800 focus:border-transparent'
                  }`}
                  required
                />
                {errors.whatsappNumber && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.whatsappNumber}</span>
                  </p>
                )}
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  The number we will contact you on via WhatsApp
                </span>
              </div>
            </div>

            {/* Field 4: Select Vehicle */}
            <div>
              <label htmlFor="vehicleSelect" className="block text-sm font-semibold text-neutral-200 mb-2">
                Select Vehicle <span className="text-emerald-400">*</span>
              </label>
              <select
                id="vehicleSelect"
                value={selectedVehicleId}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedVehicleId(val);
                  if (onVehicleChange) onVehicleChange(val);
                  if (errors.vehicleId) setErrors((prev) => ({ ...prev, vehicleId: '' }));
                }}
                className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.vehicleId ? 'border-red-500 bg-red-950/10' : 'border-neutral-800'
                }`}
                required
              >
                <option value="">-- Choose a vehicle from our 27 Accra listings --</option>
                {VEHICLE_CATALOGUE.map((v) => (
                  <option key={v.id} value={v.id}>
                    #{String(v.listingNumber).padStart(2, '0')} - {v.name}
                    {v.priceDisplay ? ` [${v.priceDisplay}]` : ' [Rate to confirm]'}
                    {v.selfDrive ? ` (${v.selfDrive === 'yes' ? 'Self-Drive' : 'Chauffeur'})` : ''}
                  </option>
                ))}
              </select>
              {errors.vehicleId && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.vehicleId}</span>
                </p>
              )}
            </div>

            {/* Field 5: Rental Duration */}
            <div>
              <label htmlFor="durationSelect" className="block text-sm font-semibold text-neutral-200 mb-2">
                How Long Would You Like to Rent the Car? <span className="text-emerald-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  '1 day',
                  '2 days',
                  '3 days',
                  '4 days',
                  '5 days',
                  '6 days',
                  '7 days',
                  'More than 7 days',
                ].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setDuration(d);
                      if (errors.duration) setErrors((prev) => ({ ...prev, duration: '' }));
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      duration === d
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Other / Custom Duration Option */}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setDuration('other')}
                  className={`text-xs font-semibold underline underline-offset-4 ${
                    duration === 'other' ? 'text-emerald-400' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Custom or flexible duration?
                </button>

                {duration === 'other' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={customDuration}
                      onChange={(e) => {
                        setCustomDuration(e.target.value);
                        if (errors.customDuration) setErrors((prev) => ({ ...prev, customDuration: '' }));
                      }}
                      placeholder="e.g. 2 weeks, 1 month, or specific dates (e.g. Nov 10 - Nov 18)"
                      className={`w-full bg-neutral-900 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.customDuration ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                    {errors.customDuration && (
                      <p className="mt-1 text-xs text-red-400">{errors.customDuration}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Optional Field: Additional Message */}
            <div>
              <label htmlFor="additionalMessage" className="block text-sm font-semibold text-neutral-200 mb-2">
                Additional Message <span className="text-xs text-neutral-500 font-normal">(Optional)</span>
              </label>
              <textarea
                id="additionalMessage"
                rows={3}
                value={additionalMessage}
                onChange={(e) => setAdditionalMessage(e.target.value)}
                placeholder="Preferred pickup point in Accra, special timing, or questions about self-drive requirements..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Transparency Note */}
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3">
              <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">How it works:</strong> WhatsApp will open with your booking details ready to send. Please press <strong>Send</strong> in WhatsApp to submit your enquiry to our reservations team (+233 24 784 3535). We will confirm availability and finalize arrangements with you directly.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-sm sm:text-base uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-950 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center gap-3 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send Booking Enquiry on WhatsApp</span>
            </button>
          </form>

          {/* Submission Feedback & Fallback Card */}
          {isSubmitted && generatedWhatsappUrl && (
            <div className="mt-8 p-6 rounded-xl bg-neutral-900 border border-emerald-600/40 text-left space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Enquiry Prepared for WhatsApp</span>
              </div>
              <p className="text-xs text-neutral-300">
                If your browser did not automatically open WhatsApp, click the button below to launch the conversation:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={generatedWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Conversation</span>
                </a>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg border border-neutral-700"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Message Copied!' : 'Copy Enquiry Message'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Direct Telephone Contact Card (Section 11) */}
          <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <span className="text-xs text-neutral-400 block font-medium">Prefer to call directly?</span>
              <span className="text-sm font-bold text-white">Call LORDS RENTAL: {BUSINESS_CONFIG.phoneDisplay}</span>
            </div>
            <a
              href={BUSINESS_CONFIG.telLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl border border-neutral-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
