# CHATHURANGA. — Developer Portfolio

A developer portfolio engineered with **React, TypeScript, Vite, Tailwind CSS, and Framer Motion**, adhering to minimalism, editorial typography, asymmetric bento grids, and data integrity.

---

## ⚡ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (CSS variable-driven design tokens for seamless Dark/Light theming)
- **Animation:** Framer Motion (with strict `prefers-reduced-motion` compliance)
- **Icons:** Lucide React + Custom SVG Brand Glyphs
- **Routing:** React Router v7
- **Forms & Validation:** React Hook Form + Zod
- **SEO & Metadata:** React Helmet Async

---

## 🎨 Design System

- **Dark Default Theme:**
  - Background: `#090B0A`
  - Secondary Background: `#101410`
  - Surface Card: `#141914`
  - Accent (Electric Lime): `#B6FF4A`
  - Text: `#F5F7F2`
  - Secondary Text: `#929A91`
  - Border: `#252C26`
- **Light Theme:**
  - Background: `#F8F9F5`
  - Secondary Background: `#EEEFEB`
  - Surface Card: `#FFFFFF`
  - Matching High-Contrast Green: `#488E0F`
  - Text: `#111512`
  - Secondary Text: `#535C52`
  - Border: `#DDE2DA`
- **Typefaces:** *Space Grotesk* (Headlines) & *Inter* (Body) with preconnect font loading.
- **Zero-Flash Theme Switcher:** Uses an inline pre-render script in `index.html` to prevent layout flashes on initial load.

---

## 📬 Contact Form Configuration (`VITE_CONTACT_ENDPOINT`)

The contact form is equipped with:
1. **Client-side Zod validation** (Full name, email format, subject, message length).
2. **Hidden Honeypot field** for automated bot detection.
3. **15-second client throttling** to prevent repeated click spam.
4. **Honest Delivery Engine:** If no endpoint is configured, the form **never fakes delivery**. Instead, it presents an honest notification instructing visitors to contact directly via email.

### Setting up Live Form Delivery:
Create a `.env` (or `.env.local`) file in the project root:

```env
# Example using Formspree:
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your_form_id

# Example using Web3Forms:
# VITE_CONTACT_ENDPOINT=https://api.web3forms.com/submit

# Example using custom serverless function:
# VITE_CONTACT_ENDPOINT=https://your-domain.com/api/contact
```

If left blank or omitted, the application displays a configuration notice and provides direct mail links.

---

## 🤖 Integrated Features

- **Dynamic Case Studies (`/projects/:slug`):** Deep architectural walkthroughs with an interactive 5-step operational workflow diagram for AttendX.
- **GitHub Public Repositories:** Direct sync via the public GitHub REST API for `@chathuranga00` with `sessionStorage` caching and rate-limit mitigation.
- **GitHub Contributions Matrix:** Multi-year contribution heatmap and streak tracker sourced live from the public GitHub graph.
- **Offline AI Portfolio Assistant:** Lightweight floating chat assistant answering questions about skills, projects, and education strictly from local verified schema data, with honest fallbacks when questions are out of scope.

---

## 💻 3D Interactive Laptop Workspace (`HeroVisual` & `LaptopScene`)

The hero section features a custom **React Three Fiber (R3F)** 3D laptop with an animated opening lid (~105°), gentle floating physics, cursor-reactive tilt, soft electric lime (`#B6FF4A`) rim lighting, contact shadows, and an emissive screen displaying the portfolio.

### Asset Configuration:
1. **Screen Texture (`public/images/portfolio-screen.webp`)**:
   - **Recommended Resolution:** `1920 × 1200` (16:10 aspect ratio).
   - **Format:** WebP format, quality 85%, kept under `300 KB`.
   - **Fallback:** If this image is absent, the application automatically builds a 2K canvas texture containing the brand header, hero typography, and UI preview blocks.
2. **Custom 3D Model (`public/models/laptop.glb`) [Optional]**:
   - If placed at `/public/models/laptop.glb`, the scene loads it via Drei's `useGLTF`, centers it, and binds the screen texture to the screen mesh automatically.
   - If absent, the scene renders the built-in procedural laptop (rounded-box graphite chassis, recessed keyboard well, embossed keys, precision trackpad, and hinge assembly).
3. **GLB Optimization & Compression**:
   - Use [`gltf-transform`](https://gltf-transform.dev/) or `gltf-pipeline` to ensure fast loading times:
     ```bash
     npx @gltf-transform/cli optimize input.glb public/models/laptop.glb --draco.mesh.enabled=true --texture-compress=webp
     ```
   - Target file size: under `1.5 MB`.
4. **License & Attribution**:
   - If using a third-party 3D model, record the creator credit, license type (e.g. CC-BY 4.0), and source URL in `public/models/LICENSE.txt`.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript compilation and production build
npm run build

# Preview production build locally
npm run preview
```
