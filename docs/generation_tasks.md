# HTML Generation Task List

## Overview
- **Total Sections**: 6
- **Output**: Single HTML file (`output/web/index.html`)
- **Method**: Section-by-section 3-pass generation

---

## ✅ Completed Tasks

### Phase 1: Foundation
- [x] Task 1.1: Create base HTML structure (header, footer, CDN libraries)
- [x] Task 1.2: Create section mapping document

### Section 01: Hero
- [x] Task 2.1: Pass 1 - HTML structure (video, heading, subheading, CTA, scroll hint)
- [x] Task 2.2: Pass 2 - Tailwind styling (responsive typography, video parallax, hover effects)
- [x] Task 2.3: Pass 3 - Animation scripts (split-text, fade-in, GSAP ScrollTrigger)

---

## 🔄 Pending Tasks

### Section 02: Technology (Interactive Accordion)
- [ ] Task 3.1: Pass 1 - HTML structure
  - Header (number, title, description, year)
  - 3 accordion stages (number, title, description, image with markers)
  - 3D canvas placeholder
  - CTA button
- [ ] Task 3.2: Pass 2 - Tailwind styling
  - 2-column layout (3D left, accordion right)
  - Sticky behavior
  - Stage number circles (border, active/inactive states)
  - Accordion expand/collapse transitions
  - Responsive mobile stack
- [ ] Task 3.3: Pass 3 - Validation + codeHint
  - Three.js scene setup
  - GLTFLoader for protein model
  - OrbitControls rotation
  - Stage click/scroll interactions
  - **codeHint**: `const scene = new THREE.Scene(); const loader = new THREE.GLTFLoader(); loader.load('protein-stage-1.gltf', (gltf) => { scene.add(gltf.scene); }); function animate() { requestAnimationFrame(animate); protein.rotation.y += 0.01; renderer.render(scene, camera); }`

### Section 03: Overview (Text Block)
- [ ] Task 4.1: Pass 1 - HTML structure
  - Heading with highlighted phrases
  - Metadata (number, category, year)
- [ ] Task 4.2: Pass 2 - Tailwind styling
  - Large heading typography (48-64px)
  - Highlight styling (underline or background)
  - Centered layout
  - Section padding
- [ ] Task 4.3: Pass 3 - Validation
  - Verify all text content
  - Check highlight spans
  - No animations for this section

### Section 04: Sequence (Scroll-Triggered Canvas)
- [ ] Task 5.1: Pass 1 - HTML structure
  - Canvas element for image sequence
  - 3 overlay labels (number, title, subtitle)
  - Dark background container
- [ ] Task 5.2: Pass 2 - Tailwind styling
  - Full viewport height (300vh for scroll range)
  - Sticky canvas positioning
  - Label positioning (absolute, fade transitions)
  - Dark theme text colors
- [ ] Task 5.3: Pass 3 - Validation + codeHint
  - Preload image sequence
  - Scroll progress calculation
  - Frame selection logic
  - Label fade-in/out based on scroll thresholds
  - **codeHint**: `const canvas = document.querySelector('[data-sequence-canvas]'); const ctx = canvas.getContext('2d'); const images = [/* preloaded frames */]; window.addEventListener('scroll', () => { const progress = (window.scrollY - sectionTop) / sectionHeight; const frame = Math.floor(progress * images.length); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(images[frame], 0, 0); });`

### Section 05: About (Company Info)
- [ ] Task 6.1: Pass 1 - HTML structure
  - Logo with glass-card backdrop
  - Company name (split-text ready)
  - Floating protein image
  - Description with metadata
  - Team members grid (3 cards with image, name, role)
  - Publications list
  - Investors/partners logos
- [ ] Task 6.2: Pass 2 - Tailwind styling
  - Centered logo card with backdrop blur
  - Extra large heading (120-160px desktop)
  - Floating image transform (rotate -15deg, absolute positioning)
  - Team grid (3 columns desktop, 1 column mobile)
  - Card hover effects
- [ ] Task 6.3: Pass 3 - Validation + codeHint (2 animations)
  - Split-text reveal for company name
  - Parallax floating image
  - **codeHint 1**: `gsap.from('.char', { opacity: 0, y: 35, stagger: 0.02, scrollTrigger: { trigger: '.company-name', start: 'top 80%' } })`
  - **codeHint 2**: `gsap.to('.floating-image', { y: '+=35%', scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 } })`

### Section 06: Careers + Contact
- [ ] Task 7.1: Pass 1 - HTML structure
  - Careers heading
  - 8 job cards (id, title, location, department, salary, link)
  - Contact form (4 fields: name, email, company, message)
  - Submit button
  - Alternative contact info (email, address)
- [ ] Task 7.2: Pass 2 - Tailwind styling
  - Job cards grid (2 columns tablet, 3 columns desktop)
  - Card border, padding, hover effects
  - Form input styling (border, focus states)
  - Button primary style
  - Responsive layout
- [ ] Task 7.3: Pass 3 - Validation
  - Verify all 8 job listings
  - Check form field attributes (required, type)
  - External links open in new tab
  - No animations for this section

### Phase 3: Final Assembly
- [ ] Task 8.1: Verify all sections rendered
- [ ] Task 8.2: Test all animations load correctly
- [ ] Task 8.3: Check required libraries (GSAP, Three.js)
- [ ] Task 8.4: Validate responsive breakpoints
- [ ] Task 8.5: Final file size check

---

## Success Criteria

### Completion Checklist
- [ ] 6 sections fully implemented
- [ ] 8 codeHints inserted verbatim
- [ ] All animations functional (split-text, 3D, canvas sequence, parallax)
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] All external links working
- [ ] Footer credit included ("built by harufolio")
- [ ] File size: 800-1500 lines (estimated)

### Quality Metrics
- Section rendering: 6/6 (100%)
- Animation preservation: 8/8 codeHints (100%)
- Feature completeness: All JSON fields mapped
- No simplifications or placeholder content

---

## Execution Strategy

1. Complete one section at a time (Pass 1 → Pass 2 → Pass 3)
2. Wait for user confirmation after each pass
3. Report progress: "✅ Pass X/3 완료 (Section Name). 계속할까요?"
4. Validate against JSON after Pass 3
5. Move to next section only after validation passes
