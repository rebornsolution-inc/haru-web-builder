# Multi-Pass MCP Strategy - Quick Reference

## When to Use

**ALWAYS** use Multi-Pass Strategy when:
- `referenceSites` are provided in user input
- User requests detailed analysis
- Production-quality code is required

**SKIP** Multi-Pass Strategy when:
- No reference sites (only user requirements)
- Quick prototype requested
- User explicitly requests fast/basic analysis

---

## The 5 Passes

```
Pass 1: Structure (10-15 screenshots)
   └─ Overall layout, navigation, page hierarchy

Pass 2: Interactions (30-50 screenshots)  
   └─ All states: hover, focus, active, disabled, error, etc.

Pass 3: Responsive (20-30 screenshots)
   └─ Behavior at mobile, tablet, desktop, wide

Pass 4: Components (15-25 screenshots)
   └─ Pixel-perfect specs with exact measurements

Pass 5: Validation (5-10 screenshots)
   └─ Gap filling, quality check, completeness
```

**Total:** 60-100+ screenshots
**Quality:** 5-10x more detailed than single-pass

---

## Implementation in Instructions

Each instruction file references this strategy:

### 01_contents_web.json
- **Contains:** Full `mcpStrategy` object with all 5 passes detailed
- **Executes:** Pass 1 (structure) and Pass 2 (interactions) for content analysis
- **Outputs:** web_contents.json + evidence log

### 02_style_web.json
- **References:** mcpStrategy from 01_contents_web.json
- **Leverages:** Pass 2, 3, 4 screenshots for visual analysis
- **Outputs:** web_style.json + measurement details

### 03_integrate_web.json
- **Uses:** All screenshots from passes 1-5
- **Links:** Each specification to supporting screenshot evidence
- **Outputs:** WebDevSpec.json with full evidence trail

---

## Evidence Logging

Every action must be logged:

```json
{
  "passNumber": 2,
  "stepNumber": 5,
  "action": "hover",
  "targetElement": "button.cta",
  "stateCaptured": "hover",
  "screenshotPath": "output/captures/pass-02-interactions/step-05_button_hover.png",
  "observedResult": "background darkens, shadow increases"
}
```

---

## Quality Standards

- ✅ **100% state coverage:** Every interactive element in all states
- ✅ **Exact values:** No approximations or "similar to"
- ✅ **Evidence-based:** Every spec references a screenshot
- ✅ **Complete responsive:** 3+ breakpoints for critical sections
- ✅ **Accessibility:** Focus, ARIA, contrast documented

---

## See Full Documentation

📖 [.github/MULTIPASS_STRATEGY.md](.github/MULTIPASS_STRATEGY.md)

Complete details on:
- Pass-by-pass action lists
- Screenshot naming conventions
- Storage structure
- Quality checklist
- Success metrics
