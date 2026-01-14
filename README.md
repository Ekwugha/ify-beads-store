# Ifvy Beads - Handcrafted Bead Bags Store

A beautiful, modern e-commerce web application for selling handcrafted bead bags. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Firebase.

![Ifvy Beads](https://via.placeholder.com/800x400?text=Ify+Beads)

## ✨ Features

### Customer Features

- 🛍️ Beautiful product catalog with glassmorphism cards
- 🔍 Search and filter products
- 🏷️ Sale badges with discount percentages
- 🆕 New Arrival badges
- ⚠️ Limited Stock indicators
- ⏰ "Sale Ends Soon" urgency banners
- 📱 Mobile-first responsive design
- 💬 WhatsApp integration for easy ordering

### SEO & Production Ready

- 🎨 Dynamic favicon and Apple touch icons
- 📸 OpenGraph and Twitter cards for social sharing
- 🗺️ Auto-generated sitemap.xml
- 🤖 SEO-optimized robots.txt
- 📱 Progressive Web App (PWA) manifest
- 🔍 Structured data (JSON-LD) for rich search results
- 🏷️ Comprehensive meta tags on all pages

### Admin Features

- 🔐 Password-protected admin panel (`/admin`)
- ➕ Add new products with image upload
- ✏️ Edit existing products
- 🗑️ Delete products
- 📷 Upload images to Firebase Storage
- 🏷️ Toggle sale status
- ⭐ Mark products as featured
- 🆕 Set products as new arrivals
- ❌ Mark products as sold out
- ⚠️ Enable limited stock labels
- ⏰ Enable "Sale Ends Soon" banners

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Firebase account (free Spark plan works!)

### 1. Clone and Install

```bash
cd ifvy-beads
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Firestore Database**:
   - Go to Build → Firestore Database
   - Click "Create database"
   - Choose "Start in production mode"
   - Select a location close to your users
4. Enable **Storage**:
   - Go to Build → Storage
   - Click "Get started"
   - Choose "Start in production mode"
5. Set up security rules for Firestore:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /products/{document=**} {
         allow read: if true;
         allow write: if true;
       }
     }
   }
   ```
6. Set up security rules for Storage:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /products/{allPaths=**} {
         allow read: if true;
         allow write: if true;
       }
     }
   }
   ```
7. Get your Firebase config:
   - Go to Project Settings → Your apps
   - Click web icon (</>) to add a web app
   - Copy the config values

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin Password (change this to something secure!)
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password

# WhatsApp Number (with country code, no + or spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER=234XXXXXXXXXX

# Site URL (for SEO meta tags - set your deployed URL)
NEXT_PUBLIC_SITE_URL=https://ifybeads.com
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the store.

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

## 📁 Project Structure

```
ifvy-beads/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel
│   │   ├── products/       # Products pages
│   │   │   └── [id]/       # Product detail page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/
│   │   ├── admin/          # Admin components
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── FeaturedProducts.tsx
│   ├── lib/
│   │   ├── firebase.ts     # Firebase config
│   │   ├── products.ts     # Product CRUD operations
│   │   └── utils.ts        # Utility functions
│   └── types/
│       └── product.ts      # TypeScript types
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change the brand colors:

```ts
colors: {
  brand: {
    // Your custom color palette
  },
  gold: {
    // Accent colors
  },
}
```

### Fonts

The app uses:

- **Playfair Display** for headings
- **Outfit** for body text

Change fonts in `src/app/layout.tsx`.

### WhatsApp Number

Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in your `.env.local` file.

### Admin Password

Update `NEXT_PUBLIC_ADMIN_PASSWORD` in your `.env.local` file.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Deploy to Other Platforms

```bash
npm run build
npm start
```

## 📱 WhatsApp Integration

Each product has a "Buy on WhatsApp" button that opens WhatsApp with a pre-filled message:

```
Hi 👋 I want to buy the bead bag: [Product Name]
```

Configure your WhatsApp number in the environment variables.

## 🔒 Security Notes

- The admin panel uses basic password authentication stored in session
- For production, consider implementing proper authentication
- Firebase security rules should be configured for your use case
- Never commit your `.env.local` file to version control

## 📝 License

MIT License - feel free to use this for your business!

## 💖 Credits

Built with love for Ifvy Beads

---

**Need help?** Contact your developer or create an issue on GitHub.
