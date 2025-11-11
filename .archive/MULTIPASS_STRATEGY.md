# Hybrid Multi-Pass MCP Strategy

## Overview

This document describes the enhanced analysis methodology that produces 5-10x more detailed specifications than single-pass analysis.

**Key Metrics:**
- **Passes:** 5 sequential analysis phases
- **Screenshots:** 60-100+ evidence captures
- **Quality Multiplier:** 5-10x more detailed
- **Time Investment:** 3-5x longer than basic analysis
- **Result:** Production-ready, pixel-perfect specifications

---

## Strategy Architecture

```
Pass 1: Structure Scan (10-15 screenshots)
   ↓ Foundation understanding
Pass 2: Interaction Deep Dive (30-50 screenshots)
   ↓ Complete state capture
Pass 3: Responsive Behavior (20-30 screenshots)
   ↓ Breakpoint analysis
Pass 4: Component Micro-Analysis (15-25 screenshots)
   ↓ Detailed specifications
Pass 5: Gap Filling & Validation (5-10 screenshots)
   ↓ Quality assurance
Final: Complete Evidence-Based Specification
```

---

## Pass 1: Structure Scan (Quick Overview)

**Objective:** Understand overall architecture and navigation

**Actions:**
- Navigate to landing page
- Explore primary navigation routes
- Build initial route map
- Identify all major pages
- Capture page layouts

**Screenshots:** 10-15 images

**Capture Points:**
- Landing page full view
- Each major page (About, Services, Products, Contact)
- Header navigation (expanded if applicable)
- Footer full view
- Any mega-menu or complex navigation
- Breadcrumb patterns
- Sitemap structure

**Output:** Initial route map and page hierarchy

---

## Pass 2: Interaction Deep Dive (Complete State Capture)

**Objective:** Document EVERY interactive element in ALL states

**Actions:**

### Buttons
- Capture every button type in:
  - Default state
  - Hover state
  - Active/pressed state
  - Focus state (keyboard navigation)
  - Disabled state
  - Loading state (if applicable)

### Forms
- Document all form fields in:
  - Empty state (placeholder visible)
  - Filled with valid data
  - Error state (with error message)
  - Success/validated state
  - Focus state
  - Disabled state

### Modals & Drawers
- Capture sequence:
  - Trigger element
  - Opening transition (mid-animation)
  - Fully open state
  - Closing transition
  - Closed state

### Accordions & Tabs
- Document:
  - All items collapsed
  - One item expanded
  - Multiple items expanded (if allowed)
  - Tab switching animation
  - Active tab indicator

### Dropdowns
- Capture:
  - Closed state
  - Hover state (if different)
  - Open state
  - Item hover
  - Item selected

### Scroll Animations
- Document:
  - Before trigger point
  - At trigger point
  - Animation in progress
  - Animation complete

### Mobile Menu
- Capture:
  - Closed state
  - Opening animation
  - Fully open state
  - Closing animation

### Tooltips & Popovers
- Document:
  - Trigger on hover/focus
  - Tooltip appearance
  - Positioning (top, bottom, left, right)

**Screenshots:** 30-50 images

**Quality Standard:** Every clickable element must have documented states

---

## Pass 3: Responsive Behavior Analysis

**Objective:** Document exact behavior at each breakpoint

**Breakpoints to Test:**
- Mobile Small: 375px
- Mobile Large: 414px
- Tablet: 768px
- Tablet Large: 834px (iPad)
- Desktop: 1024px
- Desktop Large: 1440px
- Wide: 1920px
- Ultra-Wide: 2560px (optional)

**Actions:**

### Layout Changes
- Grid column changes (3-col → 2-col → 1-col)
- Content reflow patterns
- Sidebar collapse/expansion
- Card layout adjustments

### Navigation
- Horizontal menu → Hamburger menu transition
- Menu item visibility changes
- Search bar treatment
- CTA button positioning

### Typography
- Font size scaling
- Line height adjustments
- Letter spacing changes
- Text wrapping behavior

### Images
- Aspect ratio changes
- Cropping patterns
- Image stacking
- Caption positioning

### Visibility
- Elements hidden at certain breakpoints
- Content priority changes
- Feature reordering

**Screenshots:** 20-30 images

**Capture Points:**
- Hero section at each breakpoint
- Navigation at each breakpoint
- Card grids at each breakpoint
- Form layouts at each breakpoint
- Footer at each breakpoint
- Any complex section that changes significantly

**Quality Standard:** Every major section documented at 3+ breakpoints (mobile, tablet, desktop)

---

## Pass 4: Component Isolation & Micro-Analysis

**Objective:** Extract pixel-perfect component specifications

**Components to Analyze:**

### 1. Header/Navigation
**Capture:**
- Sticky behavior during scroll
- Background opacity/blur effects
- Logo sizing and spacing
- Menu item spacing and alignment
- CTA button in header
- Search bar styling
- User profile dropdown
- Hover effects on menu items

**Measurements:**
- Header height (initial and scrolled)
- Logo dimensions
- Menu item padding
- CTA button size and spacing
- Search input width and height

### 2. Hero Section
**Capture:**
- Layout variations (centered, split, full-bleed)
- Background treatments (gradient, image, video)
- Content alignment and spacing
- CTA buttons (primary and secondary)
- Typography hierarchy
- Decorative elements

**Measurements:**
- Section padding (top, bottom)
- Content max-width
- Heading font sizes
- Button sizes and spacing
- Image/video dimensions

### 3. Cards
**Capture:**
- Default card layout
- Card hover state
- Card with image
- Card without image
- Card with badge/tag
- Card with actions/buttons
- Card shadow treatments

**Measurements:**
- Card padding
- Image aspect ratio
- Border radius
- Shadow values
- Spacing between cards
- Content padding inside card

### 4. Forms
**Capture:**
- Input variants (text, email, tel, number)
- Textarea
- Select/dropdown
- Checkboxes
- Radio buttons
- Toggle switches
- Field labels and hints
- Error messages
- Success messages
- Submit button

**Measurements:**
- Input height
- Input padding
- Border width and color
- Focus ring size and color
- Label spacing
- Error message spacing
- Button dimensions

### 5. Buttons
**Capture:**
- Primary button (all states)
- Secondary button (all states)
- Outlined/ghost button
- Text/link button
- Icon button
- Button with icon + text
- Large/small variants
- Full-width button

**Measurements:**
- Button height
- Horizontal padding
- Border width
- Border radius
- Icon size and spacing
- Minimum width

### 6. Modals/Overlays
**Capture:**
- Backdrop/overlay opacity
- Modal container
- Header with close button
- Content area
- Footer with actions
- Entry animation
- Exit animation
- Different sizes (sm, md, lg)

**Measurements:**
- Modal max-width for each size
- Modal padding
- Header height
- Footer height
- Border radius
- Shadow values
- Animation duration

### 7. Footer
**Capture:**
- Layout and columns
- Link styling
- Social media icons
- Newsletter signup
- Copyright text
- Logo treatment
- Back-to-top button

**Measurements:**
- Footer padding
- Column spacing
- Link spacing
- Icon size
- Input dimensions
- Logo size

**Screenshots:** 15-25 images

**Quality Standard:** Every component must have exact measurements and CSS values documented

---

## Pass 5: Gap Filling & Quality Validation

**Objective:** Ensure 100% completeness

**Completeness Checklist:**

- [ ] All pages documented with screenshots
- [ ] All interactive elements have state variations
- [ ] All breakpoints covered for critical sections
- [ ] All component types fully specified
- [ ] Accessibility features noted
  - [ ] Focus indicators visible
  - [ ] Alt text patterns identified
  - [ ] ARIA label usage documented
  - [ ] Color contrast ratios verified
- [ ] Performance considerations logged
  - [ ] Lazy loading patterns
  - [ ] Image optimization strategies
  - [ ] Animation performance notes
- [ ] Animation timing and easing documented
- [ ] Color values extracted accurately
- [ ] Typography scale fully mapped
- [ ] Spacing system identified
- [ ] No missing interaction patterns
- [ ] Form validation flows complete
- [ ] Error and success states captured
- [ ] Loading states documented

**Actions:**
- Review all previous passes
- Identify any gaps
- Re-capture missing elements
- Verify against checklist
- Add any edge cases discovered
- Document any special behaviors

**Screenshots:** 5-10 images (only for gaps)

**Output:** Verified, complete specification

---

## Screenshot Naming Convention

```
YYYYMMDD_HHMMSS_pass-<n>_step-<nn>_<route>_<element>_<state>.png
```

**Examples:**
```
20251108_143012_pass-01_step-01_home_navigate.png
20251108_143045_pass-02_step-05_hero-button_default.png
20251108_143046_pass-02_step-06_hero-button_hover.png
20251108_143102_pass-02_step-08_modal_opening-transition.png
20251108_144230_pass-03_step-12_hero_mobile-375px.png
20251108_144245_pass-03_step-13_hero_tablet-768px.png
20251108_145015_pass-04_step-18_card-component_default.png
20251108_145020_pass-04_step-19_card-component_hover.png
20251108_150010_pass-05_step-22_form-field_error-state.png
```

---

## Storage Structure

```
output/captures/
├── pass-01-structure/
│   ├── 20251108_143012_step-01_home_navigate.png
│   ├── 20251108_143025_step-02_about_navigate.png
│   └── ...
├── pass-02-interactions/
│   ├── 20251108_143045_step-05_button_default.png
│   ├── 20251108_143046_step-06_button_hover.png
│   ├── 20251108_143102_step-08_modal_opening.png
│   └── ...
├── pass-03-responsive/
│   ├── 20251108_144230_step-12_hero_mobile-375px.png
│   ├── 20251108_144245_step-13_hero_tablet-768px.png
│   ├── 20251108_144300_step-14_hero_desktop-1440px.png
│   └── ...
├── pass-04-components/
│   ├── 20251108_145015_step-18_button_primary-default.png
│   ├── 20251108_145020_step-19_button_primary-hover.png
│   ├── 20251108_145030_step-20_card_default.png
│   └── ...
├── pass-05-validation/
│   ├── 20251108_150010_step-22_form_error-state.png
│   └── ...
└── route-map.json
```

---

## Evidence Logging

Every screenshot must be logged in the output JSON:

```json
{
  "mcpExploration": {
    "totalPasses": 5,
    "totalScreenshots": 87,
    "evidence": [
      {
        "passNumber": 2,
        "stepNumber": 5,
        "timestamp": "20251108_143045",
        "action": "hover",
        "targetElement": "button.hero-cta",
        "stateCaptured": "hover",
        "screenshotPath": "output/captures/pass-02-interactions/20251108_143045_pass-02_step-05_hero-button_hover.png",
        "observedResult": {
          "backgroundColor": "#C19A2E (darkened from #D4AF37)",
          "transform": "translateY(-2px)",
          "boxShadow": "0 4px 12px rgba(0,0,0,0.15)"
        },
        "performanceNotes": "Smooth transition, 200ms duration",
        "accessibilityNotes": "Focus ring visible on keyboard navigation"
      }
    ]
  }
}
```

---

## Quality Benefits

### Before (Single-Pass Analysis):
- ❌ ~10-15 screenshots total
- ❌ States often missed
- ❌ Responsive behavior unclear
- ❌ Component specs incomplete
- ❌ "Similar to" approximations
- ❌ Missing edge cases

### After (Multi-Pass Analysis):
- ✅ 60-100+ comprehensive screenshots
- ✅ All states documented
- ✅ Exact responsive behavior
- ✅ Complete component specifications
- ✅ Exact CSS values
- ✅ Edge cases identified
- ✅ Evidence-based decisions
- ✅ Production-ready accuracy

---

## Implementation Checklist

When executing multi-pass strategy:

**Pre-Analysis:**
- [ ] Verify MCP tools available (Kapture or browsermcp)
- [ ] Create output/captures directory structure
- [ ] Review reference sites provided
- [ ] Estimate time required (3-5x normal)

**During Each Pass:**
- [ ] Follow pass-specific action list
- [ ] Capture all required screenshots
- [ ] Log evidence immediately
- [ ] Organize screenshots in correct subdirectory
- [ ] Document observed behaviors
- [ ] Note any anomalies or special cases

**Post-Analysis:**
- [ ] Review completeness checklist
- [ ] Verify all screenshots captured
- [ ] Cross-reference evidence in JSON
- [ ] Generate comprehensive report
- [ ] Notify user of results and quality metrics

---

## Success Metrics

**A successful multi-pass analysis includes:**
- ✅ 60+ screenshots minimum
- ✅ 100% of interactive elements have state documentation
- ✅ 100% of components have detailed specifications
- ✅ All critical sections captured at 3+ breakpoints
- ✅ Every specification references screenshot evidence
- ✅ No "placeholder" or "similar to" values
- ✅ Complete accessibility notes
- ✅ Performance considerations documented

---

## Version History

- **v1.0.0** (2025-11-08): Initial multi-pass strategy implementation
