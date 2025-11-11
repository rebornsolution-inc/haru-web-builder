#!/usr/bin/env node

/**
 * ⚠️ CRITICAL: DOM-Based Website Exploration Script
 * 
 * This script uses Kapture MCP to explore websites through direct DOM analysis.
 * NO screenshot storage - only DOM, elements, and state comparison in memory.
 * 
 * Usage:
 *   node scripts/explore_website_agent.js <tabId> [outputPath]
 * 
 * Process:
 *   1. Multi-viewport exploration (mobile → tablet → desktop)
 *   2. DOM-based interaction detection
 *   3. Real-time state comparison (before/after)
 *   4. Route discovery and navigation
 *   5. Output to IntegrationPrompt.json
 * 
 * Key Features:
 *   - No screenshot files saved
 *   - Memory-based state comparison
 *   - UI-only checks (no form submissions/API calls)
 *   - Comprehensive interaction coverage
 */

const fs = require('fs');
const path = require('path');

// ==================== CONFIGURATION ====================

const VIEWPORTS = {
  mobile: { width: 375, height: 812, name: 'mobile' },
  tablet: { width: 768, height: 1024, name: 'tablet' },
  desktop: { width: 1440, height: 900, name: 'desktop' }
};

const EXPLORATION_CONFIG = {
  maxDepth: 3,              // Route traversal depth
  maxInteractionsPerPage: 50,  // Maximum interactions per page
  pageTimeout: 300000,      // 5 minutes per page
  scrollStep: 100,          // Scroll step in pixels (approx 10vh)
  animationWait: 300,       // Wait time for animations (ms)
  maxRoutes: 10            // Maximum routes to explore
};

// ==================== MAIN EXECUTION ====================

const tabId = process.argv[2];
const outputPath = process.argv[3] || './output/IntegrationPrompt.json';

if (!tabId) {
  console.error('❌ ERROR: tabId is required');
  console.error('Usage: node scripts/explore_website_agent.js <tabId> [outputPath]');
  process.exit(1);
}

console.log(`
═══════════════════════════════════════════════════════════
🤖 DOM-Based Website Exploration Agent
═══════════════════════════════════════════════════════════
Tab ID: ${tabId}
Output: ${outputPath}
Strategy: Multi-viewport DOM analysis with state comparison
═══════════════════════════════════════════════════════════
`);

// ==================== DATA STRUCTURES ====================

const explorationData = {
  metadata: {
    tabId,
    startTime: new Date().toISOString(),
    endTime: null,
    totalDuration: null
  },
  viewports: [],
  integration: {
    mcp: {
      runtime: "mcp_kapture",
      strategy: "dom-based-analysis"
    },
    exploration: {
      entryUrl: null,
      depth: EXPLORATION_CONFIG.maxDepth,
      routeMap: [],
      events: []
    },
    evidence: {
      domSnapshots: [],
      stateComparisons: [],
      interactions: [],
      animations: [],
      issues: []
    }
  }
};

// ==================== INSTRUCTION OUTPUT ====================

console.log(`
⚠️  AI AGENT INSTRUCTIONS
════════════════════════════════════════════════════════════

This script will guide you through DOM-based exploration.
Execute each MCP command as instructed and provide the results.

⚠️ CRITICAL: USE KAPTURE MCP TOOLS ONLY
  - Tool prefix: "mcp_kapture_" (e.g., mcp_kapture_dom)
  - DO NOT use Microsoft Playwright MCP tools (mcp_microsoft_pla_)
  - All commands below use Kapture MCP exclusively

CRITICAL RULES:
1. ✅ Execute commands in order (no skipping)
2. ✅ Use DOM/Elements API (not screenshots)
3. ✅ Compare states in memory
4. ✅ Test all 3 viewports sequentially
5. ✅ Use Kapture MCP tools ONLY (mcp_kapture_*)

════════════════════════════════════════════════════════════
`);

// ==================== PHASE 1: MULTI-VIEWPORT EXPLORATION ====================

console.log(`
═══════════════════════════════════════════════════════════
PHASE 1: MULTI-VIEWPORT EXPLORATION
═══════════════════════════════════════════════════════════

We will explore the site in 3 different viewport sizes:
1. Mobile (375x812)
2. Tablet (768x1024)  
3. Desktop (1440x900)

Each viewport will undergo complete exploration before moving to next.

`);

Object.entries(VIEWPORTS).forEach(([key, viewport], index) => {
  console.log(`
───────────────────────────────────────────────────────────
VIEWPORT ${index + 1}/3: ${viewport.name.toUpperCase()} (${viewport.width}x${viewport.height})
───────────────────────────────────────────────────────────

Step ${index + 1}.1: Resize browser window
→ AI, execute: mcp_kapture_resize({
    tabId: "${tabId}",
    width: ${viewport.width},
    height: ${viewport.height}
  })

Step ${index + 1}.2: Get initial page state
→ AI, execute: mcp_kapture_tab_detail({ tabId: "${tabId}" })
→ Store result as: viewportData.${key}.initialState

Step ${index + 1}.3: Get DOM structure
→ AI, execute: mcp_kapture_dom({ tabId: "${tabId}" })
→ Store result as: viewportData.${key}.dom.initial

Step ${index + 1}.4: Get accessibility snapshot
→ AI, execute: mcp_kapture_snapshot({ tabId: "${tabId}" })
→ Store result as: viewportData.${key}.snapshot.initial

Step ${index + 1}.5: Get all interactive elements
→ AI, execute: mcp_kapture_elements({
    tabId: "${tabId}",
    visible: "true"
  })
→ Store result as: viewportData.${key}.elements.interactive

NEXT: Proceed to scroll exploration for ${viewport.name}...
`);
});

// ==================== PHASE 2: SCROLL EXPLORATION ====================

console.log(`
═══════════════════════════════════════════════════════════
PHASE 2: SCROLL EXPLORATION (PER VIEWPORT)
═══════════════════════════════════════════════════════════

For EACH viewport, perform complete scroll exploration:

2.1: Get page height
→ AI, execute: mcp_kapture_evaluate({
    tabId: "${tabId}",
    function: "() => document.documentElement.scrollHeight"
  })
→ Calculate scroll steps: Math.ceil(pageHeight / ${EXPLORATION_CONFIG.scrollStep})

2.2: Scroll through page
FOR EACH scroll position (0%, 10%, 25%, 50%, 75%, 90%, 100%):

  2.2.1: Scroll to position
  → AI, execute: mcp_kapture_evaluate({
      tabId: "${tabId}",
      function: "(window.scrollTo(0, <position>), true)"
    })
  
  2.2.2: Wait for animations (${EXPLORATION_CONFIG.animationWait}ms)
  
  2.2.3: Get DOM state at this position
  → AI, execute: mcp_kapture_dom({ tabId: "${tabId}" })
  
  2.2.4: Get elements in viewport
  → AI, execute: mcp_kapture_elements({
      tabId: "${tabId}",
      visible: "true"
    })
  
  2.2.5: Compare with previous scroll state
  → Detect: new elements, CSS changes, animation triggers
  → Log differences in explorationData.integration.evidence.stateComparisons

  2.2.6: Check for sticky/fixed elements
  → AI, execute: mcp_kapture_elements({
      tabId: "${tabId}",
      selector: "[style*='position: fixed'], [style*='position: sticky']"
    })

SPECIAL DETECTION:
- Header state changes (transparent → solid)
- Fade-in/slide-in animations triggered
- Parallax effects
- Progress indicators
- Number counters

`);

// ==================== PHASE 3: INTERACTION EXPLORATION ====================

console.log(`
═══════════════════════════════════════════════════════════
PHASE 3: INTERACTION EXPLORATION (PER VIEWPORT)
═══════════════════════════════════════════════════════════

3.1: Identify Interactive Elements
→ AI, execute: mcp_kapture_elements({
    tabId: "${tabId}",
    selector: "button, a, [role='button'], [onclick], input, select, textarea"
  })

3.2: Navigation Testing
FOR EACH navigation link (header, footer):
  
  3.2.1: Get initial state
  → Store DOM snapshot
  
  3.2.2: Hover over link
  → AI, execute: mcp_kapture_hover({
      tabId: "${tabId}",
      selector: "<selector>"
    })
  
  3.2.3: Check for hover effects
  → AI, execute: mcp_kapture_elements({
      tabId: "${tabId}",
      selector: "<selector>"
    })
  → Compare computed styles (transform, color, opacity)
  
  3.2.4: Click link (if navigates to new page)
  → AI, execute: mcp_kapture_click({
      tabId: "${tabId}",
      selector: "<selector>"
    })
  
  3.2.5: Detect route change
  → AI, execute: mcp_kapture_tab_detail({ tabId: "${tabId}" })
  → Compare URL, title, DOM structure
  
  3.2.6: Go back to original page
  → AI, execute: mcp_kapture_back({ tabId: "${tabId}" })

3.3: Button/CTA Testing
FOR EACH button:
  
  3.3.1: Check button state
  → AI, execute: mcp_kapture_elements({
      tabId: "${tabId}",
      selector: "<button_selector>"
    })
  
  3.3.2: Hover test
  → AI, execute: mcp_kapture_hover({
      tabId: "${tabId}",
      selector: "<button_selector>"
    })
  → Detect: scale, shadow, color changes
  
  3.3.3: Click test
  → AI, execute: mcp_kapture_click({
      tabId: "${tabId}",
      selector: "<button_selector>"
    })
  
  3.3.4: Check for modal/drawer
  → AI, execute: mcp_kapture_dom({ tabId: "${tabId}" })
  → Detect: new overlay elements, modal containers
  
  3.3.5: If modal opened, explore modal content
  → Get modal elements
  → Test close button
  → Return to base state

3.4: Tab/Accordion Testing
FOR EACH tab or accordion:
  
  3.4.1: Get all tab triggers
  → AI, execute: mcp_kapture_elements({
      tabId: "${tabId}",
      selector: "[role='tab'], [data-tab], .accordion-trigger"
    })
  
  3.4.2: Click each tab
  → Store content before
  → Click tab
  → Get content after
  → Compare: which content shown/hidden
  → Log tab switching behavior

3.5: Form Testing (UI ONLY - NO SUBMISSION)
FOR EACH form:
  
  3.5.1: Get form structure
  → AI, execute: mcp_kapture_dom({
      tabId: "${tabId}",
      selector: "<form_selector>"
    })
  
  3.5.2: Get all form fields
  → AI, execute: mcp_kapture_elements({
      tabId: "${tabId}",
      selector: "input, select, textarea"
    })
  
  3.5.3: Test empty submission (validation)
  → AI, execute: mcp_kapture_click({
      tabId: "${tabId}",
      selector: "button[type='submit']"
    })
  → Check for error messages
  → AI, execute: mcp_kapture_elements({
      tabId: "${tabId}",
      selector: ".error, [role='alert'], .validation-message"
    })
  
  3.5.4: Test input interactions
  → Focus on input
  → AI, execute: mcp_kapture_focus({
      tabId: "${tabId}",
      selector: "<input_selector>"
    })
  → Check for: label float, border highlight, helper text
  
  3.5.5: Fill with valid data (test only, don't submit)
  → AI, execute: mcp_kapture_fill({
      tabId: "${tabId}",
      selector: "<input_selector>",
      value: "test@example.com"
    })
  → Check success state styling
  
  ⚠️ DO NOT actually submit forms

3.6: Carousel/Slider Testing
FOR EACH carousel:
  
  3.6.1: Get carousel structure
  → Identify: slides, nav buttons, indicators
  
  3.6.2: Click next/prev buttons
  → Capture slide transitions
  → Detect animation type
  
  3.6.3: Check auto-play behavior
  → Wait and observe slide changes

3.7: Dropdown/Select Testing
FOR EACH dropdown:
  
  3.7.1: Click to open
  → AI, execute: mcp_kapture_click({
      tabId: "${tabId}",
      selector: "<dropdown_selector>"
    })
  
  3.7.2: Get options
  → AI, execute: mcp_kapture_elements({
      tabId: "${tabId}",
      selector: "option, [role='option']"
    })
  
  3.7.3: Select an option
  → AI, execute: mcp_kapture_select({
      tabId: "${tabId}",
      selector: "<select_selector>",
      value: "<option_value>"
    })
  
  3.7.4: Verify selection UI update

`);

// ==================== PHASE 4: ROUTE EXPLORATION ====================

console.log(`
═══════════════════════════════════════════════════════════
PHASE 4: ROUTE EXPLORATION
═══════════════════════════════════════════════════════════

4.1: Build Route Map (BFS, depth=${EXPLORATION_CONFIG.maxDepth})

  4.1.1: Get all links on current page
  → AI, execute: mcp_kapture_elements({
      tabId: "${tabId}",
      selector: "a[href]"
    })
  
  4.1.2: Filter internal links
  → Extract href attributes
  → Filter: same-origin URLs only
  → Deduplicate
  
  4.1.3: For each discovered route (up to ${EXPLORATION_CONFIG.maxRoutes}):
    
    4.1.3.1: Navigate to route
    → AI, execute: mcp_kapture_navigate({
        tabId: "${tabId}",
        url: "<route_url>"
      })
    
    4.1.3.2: Wait for page load
    
    4.1.3.3: Get page info
    → AI, execute: mcp_kapture_tab_detail({ tabId: "${tabId}" })
    → Store: URL, title, status
    
    4.1.3.4: Get page DOM
    → AI, execute: mcp_kapture_dom({ tabId: "${tabId}" })
    
    4.1.3.5: Get page elements
    → AI, execute: mcp_kapture_elements({
        tabId: "${tabId}",
        visible: "true"
      })
    
    4.1.3.6: Identify sections on this page
    → Detect: header, hero, features, gallery, testimonials, CTA, footer
    → Analyze layout pattern
    → Extract content structure
    
    4.1.3.7: Check for new routes (recursive, depth limit)
    
    4.1.3.8: Go back to previous page
    → AI, execute: mcp_kapture_back({ tabId: "${tabId}" })

4.2: Route Relationship Analysis

  Compare routes to identify:
  - Shared components (header, footer, nav)
  - Unique sections per route
  - Content patterns
  - Design consistency

4.3: Single-Page Integration Planning

  Determine section order for single-page output:
  1. Identify Hero section (usually from homepage)
  2. Aggregate content sections from all routes
  3. Organize logical flow: Hero → Features → Works → About → Contact
  4. Map navigation to anchor links

`);

// ==================== PHASE 5: DATA ANALYSIS ====================

console.log(`
═══════════════════════════════════════════════════════════
PHASE 5: DATA ANALYSIS & COMPARISON
═══════════════════════════════════════════════════════════

5.1: Cross-Viewport Comparison

  Compare data across mobile/tablet/desktop:
  
  5.1.1: Navigation differences
  → Mobile: hamburger menu
  → Desktop: horizontal nav
  → Detect: menu structure changes
  
  5.1.2: Layout differences
  → Grid columns: mobile (1) vs tablet (2) vs desktop (3)
  → Spacing adjustments
  → Image sizes
  
  5.1.3: Hidden elements
  → Elements visible in one viewport, hidden in another
  → Collapsible sections
  
  5.1.4: Typography scaling
  → Font size differences
  → Line height adjustments
  → Text overflow handling

5.2: Interaction Pattern Analysis

  Aggregate all interaction findings:
  - Hover effects catalog
  - Click behaviors
  - Animation types
  - Transition patterns
  - State changes

5.3: Animation Detection Summary

  List all detected animations:
  - Scroll-triggered (fade-in, slide-in)
  - Hover effects (scale, shadow, color)
  - Loading animations
  - Transition effects
  - Parallax effects

5.4: Accessibility & SEO Check

  5.4.1: Check for accessibility issues
  → Missing alt text
  → Missing ARIA labels
  → Keyboard navigation problems
  → Color contrast issues
  
  5.4.2: SEO verification
  → Meta tags (title, description)
  → Heading hierarchy
  → Semantic HTML structure
  → OG tags

`);

// ==================== PHASE 6: JSON GENERATION ====================

console.log(`
═══════════════════════════════════════════════════════════
PHASE 6: INTEGRATION PROMPT JSON GENERATION
═══════════════════════════════════════════════════════════

6.1: Compile Exploration Data

  Aggregate all collected data into IntegrationPrompt.json structure:
  
  {
    "metadata": {
      "explorationTimestamp": "<timestamp>",
      "totalViewports": 3,
      "totalRoutes": <count>,
      "totalInteractions": <count>
    },
    "viewportAnalysis": {
      "mobile": { ... },
      "tablet": { ... },
      "desktop": { ... }
    },
    "integration": {
      "mcp": {
        "runtime": "mcp_kapture",
        "strategy": "dom-based-analysis"
      },
      "exploration": {
        "entryUrl": "<url>",
        "routeMap": [ ... ],
        "events": [ ... ]
      },
      "evidence": {
        "stateComparisons": [ ... ],
        "interactions": [ ... ],
        "animations": [ ... ],
        "responsivePatterns": [ ... ]
      }
    },
    "devPromptJSON": {
      "globalSettings": { ... },
      "pages": [ ... ],
      "components": { ... },
      "responsive": { ... }
    }
  }

6.2: Save to File

  → Write JSON to: ${outputPath}
  → Validate JSON structure
  → Report file size and location

═══════════════════════════════════════════════════════════
EXPLORATION COMPLETE
═══════════════════════════════════════════════════════════

Next steps:
1. Review generated IntegrationPrompt.json
2. Use for /html or /html-tailwind generation
3. Verify responsive behavior matches analysis

`);

// ==================== HELPER INSTRUCTIONS ====================

console.log(`
═══════════════════════════════════════════════════════════
📚 HELPER FUNCTIONS FOR AI
═══════════════════════════════════════════════════════════

State Comparison Template:
{
  "before": {
    "dom": "<dom_snapshot>",
    "elements": [ ... ],
    "computedStyles": { ... }
  },
  "after": {
    "dom": "<dom_snapshot>",
    "elements": [ ... ],
    "computedStyles": { ... }
  },
  "changes": {
    "domMutations": [ ... ],
    "classChanges": [ ... ],
    "styleChanges": [ ... ],
    "animationsDetected": [ ... ]
  }
}

Interaction Event Template:
{
  "step": <number>,
  "viewport": "mobile|tablet|desktop",
  "action": "hover|click|scroll|focus|fill",
  "target": {
    "selector": "<css_selector>",
    "element": "<element_description>"
  },
  "beforeState": { ... },
  "afterState": { ... },
  "detectedChanges": {
    "visual": [ ... ],
    "dom": [ ... ],
    "route": <boolean>
  }
}

Animation Detection Template:
{
  "type": "scroll-triggered|hover|click|load",
  "element": "<selector>",
  "properties": ["transform", "opacity", "..."],
  "trigger": {
    "type": "scroll|hover|click",
    "threshold": "25%" // for scroll
  },
  "effect": {
    "before": { "opacity": "0", "transform": "translateY(40px)" },
    "after": { "opacity": "1", "transform": "translateY(0)" }
  }
}

═══════════════════════════════════════════════════════════
`);

// ==================== COMPLETION ====================

console.log(`
✅ Exploration script loaded successfully.

AI: Begin execution following the phases above.
    Store all results in memory and compile into IntegrationPrompt.json.
    
    DO NOT skip any steps or phases.
    Each viewport must be fully explored before moving to next.
    
    Good luck! 🚀
`);

// Save this instruction file for reference
const instructionPath = './output/exploration-instructions.txt';
// Note: The actual exploration will be done by AI following these instructions
// This script serves as a guide and instruction manual
