# Section Structure Mapping

## Sections → HTML Sections (from 03_integrate_web.json)

### Overview
Total: **6 sections** in single HTML file

### Section Mapping

1. **section-01-hero** → `<section id="hero">`
   - Type: hero
   - Background: Video loop
   - Content: Heading, subheading, CTA, scroll hint
   - Animations: Video background, split-text heading animation

2. **section-02-technology** → `<section id="technology">`
   - Type: interactive-accordion
   - Background: White
   - Content: 3-stage accordion with 3D visualization
   - Animations: 3D protein model rotation, stage transitions

3. **section-03-overview** → `<section id="overview">`
   - Type: text-block
   - Background: White
   - Content: Heading with highlights, metadata

4. **section-04-sequence** → `<section id="sequence">`
   - Type: scroll-triggered-sequence
   - Background: Dark
   - Content: Canvas-based frame animation, overlay labels
   - Animations: Scroll-driven frame sequence

5. **section-05-about** → `<section id="about-us">`
   - Type: multi-content
   - Background: White
   - Content: Team info, mission, careers section, contact form

6. **section-06-careers** → `<section id="careers">`
   - Type: job-listings
   - Background: White
   - Content: Job cards with filtering

### Implementation Notes

- All sections use Tailwind CSS for styling
- Animations implemented with GSAP + Three.js
- Responsive breakpoints: mobile (0-767px), tablet (768-1023px), laptop (1024-1279px), desktop (1280px+)
- All codeHints from JSON will be inserted verbatim in animation scripts
