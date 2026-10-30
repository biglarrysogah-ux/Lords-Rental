import React, { useState } from 'react';

interface VehicleImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
}

export const VehicleImage: React.FC<VehicleImageProps> = ({
  src,
  alt,
  className = '',
  category = 'Car',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-neutral-800 to-neutral-900 flex flex-col items-center justify-center text-neutral-400 p-6 ${className}`}
        aria-label={alt}
      >
        <svg
          className="w-16 h-16 text-emerald-500/70 mb-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
        <span className="text-xs font-semibold tracking-wider uppercase text-neutral-300">
          LORDS RENTAL
        </span>
        <span className="text-[11px] text-neutral-500 mt-1">{category}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-800/80 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
