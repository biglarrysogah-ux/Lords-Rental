# LORDS RENTAL — Official Website

> **“Drive in style travel with confidence”**  
> Premium vehicles. Convenient bookings. A smoother way to move around Accra.

A professional, modern, fully responsive automotive rental website built for **LORDS RENTAL**, located in **Accra, Ghana**.

---

## 🌟 Features

- **Exact Brand Slogan & Identity**: Features the exact slogan `“rent with trust Drive with Ease”`, luxury Mercedes-Benz hero presentation, and deep automotive styling.
- **Three Dedicated Routes**:
  - `/` — **Homepage**: Contains the Hero, Business Introduction, the **full car catalogue**, the **complete booking form**, and the customer reviews.
  - `/cars` — **Car Listing Page**: Dedicated catalogue view with real-time text search and filters (Vehicle Type, Driving Mode, Price Status, Currency).
  - `/booking` — **Booking Page**: Dedicated booking enquiry form supporting direct URL parameter pre-selection (`/booking?vehicle=listing-04`).
- **Complete 27-Vehicle Catalogue**: Centralized single source of truth (`src/data/vehicles.ts`) representing all 27 distinct listings from the specification without invented prices, fabricated rental periods, or missing listings.
- **WhatsApp Direct Booking Integration**: Constructs URL-encoded booking enquiries formatted specifically for the business WhatsApp number `+233 24 784 3535` (`233247843535`), with user confirmation notice and copy-fallback.
- **Telephone Call Integration**: Clickable telephone links formatted with `tel:+233247843535`.
- **Demonstration Reviews**: Clearly marked as sample feedback (`Sample review — replace with verified customer feedback`) ensuring compliance with transparency guidelines.
- **Vercel Deployment Ready**: Includes pre-configured `vercel.json` with Single Page Application rewrites for seamless client-side routing on Vercel.

---

## 🚗 Central Vehicle Catalogue (`src/data/vehicles.ts`)

All listings from the business specification are accurately mapped:
- **Listing 01**: HONDA ACCORD AVAILABLE FOR RENT (GH₵1,200 | Within Accra)
- **Listing 02**: TOYOTA COROLLA 2015 FOR RENT (GH₵600 | Within Accra)
- **Listing 03**: LEXUS RX 350 FOR RENT (GH₵1,200 | Within Accra only)
- **Listing 04**: TOYOTA PRADO FOR RENT ($1,500 | Within Accra)
- **Listing 05**: HONDA CRV FOR RENT ($1,200 | Within Accra)
- **Listing 06**: TOYOTA PRADO FOR RENT ($1,700 a day | Within Accra)
- **Listing 07**: TOYOTA CAMRY FOR RENT ($800 a day | Within Accra)
- **Listing 08**: HONDA ACCORD AVAILABLE FOR RENT ($1,200 a day | Within Accra)
- **Listing 09**: TOYOTA COROLLA AVAILABLE FOR RENT ($600 | Within Accra)
- **Listing 10**: MITSUBISHI OUTLANDER FOR RENT ($900 | Within Accra)
- **Listing 11**: HYUNDAI PALISADE FOR RENT (No Self-Drive | Rate on request)
- **Listing 12**: TOYOTA COROLLA FOR RENT (Self-Drive Available | Rate on request)
- **Listing 13**: TOYOTA SIENNA AVAILABLE FOR BOOKING (Rate on request)
- **Listing 14**: MITSUBISHI OUTLANDER (GH₵1,000.00 / GH₵1,200.00 | Flagged for confirmation)
- **Listing 15**: HONDA ACCORD (GH₵1,000.00 / GH₵1,200.00 | Flagged for confirmation)
- **Listing 16**: HONDA CRV (1,200 | Currency to confirm)
- **Listing 17**: OUTLANDER AVAILABLE FOR RENT (GH₵1,300.00 / GH₵1,500.00 | “Accra daily rate is different o…”)
- **Listing 18**: TOYOTA COROLLA FOR RENT (GH₵600.00)
- **Listing 19**: L 200 AVAILABLE FOR RENT (GH₵1,200.00 | “Accra daily rate is different fr…”)
- **Listing 20**: HONDA ACCORD (GH₵1,000.00 | “Honda Accord available for re…”)
- **Listing 21**: TOYOTA RAV4 2024 (Self-Drive Available | Rate on request)
- **Listing 22**: TOYOTA LAND CRUISER V8 (Rate on request)
- **Listing 23**: HYUNDAI ELANTRA FOR RENT (Rate on request)
- **Listing 24**: TOYOTA CAMRY FOR RENT (Self-Drive Available | Rate on request)
- **Listing 25**: MITSUBISHI OUTLANDER FOR RENT (Self-Drive Available | Rate on request)
- **Listing 26**: TOYOTA 2025 PRADO FOR RENT (No Self-Drive | Rate on request)
- **Listing 27**: TOYOTA COROLLA 2019 FOR RENT (Self-Drive Available | Rate on request)

*(Listing 28 in the prompt was an explicit clarification of Listing 17 and is consolidated under record 17, giving 27 total distinct records).*

---

## 🛠️ Technology Stack

- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Deployment**: Vercel SPA Configuration

---

## 🚀 Local Development

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Building for Production

Compile TypeScript and build the optimized production bundle:
```bash
npm run build
```
The output files will be written to the `dist/` directory.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, click **"Add New Project"** and import the repository.
3. Vercel will automatically detect **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included `vercel.json` ensures that direct navigation to `/cars` and `/booking` resolves cleanly without 404 errors.
5. Click **Deploy**.

---

## 📞 Business Contact

- **Business Name**: LORDS RENTAL
- **Location**: Accra, Ghana
- **Telephone**: `+233 24 784 3535`
- **WhatsApp**: `+233 24 784 3535` (`233247843535`)
