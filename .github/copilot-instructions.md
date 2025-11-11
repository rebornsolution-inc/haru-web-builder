# AI-Powered Content Builder System

## 🚫 ABSOLUTE PROHIBITIONS - READ FIRST

**NEVER, UNDER ANY CIRCUMSTANCES:**

1. ❌ **"빠르게 분석"** (Fast analysis)
2. ❌ **"주요 섹션만"** (Only main sections)
3. ❌ **"효율적인 방법"** (Efficient method)
4. ❌ **Skip any of the 21 checkpoints**
5. ❌ **Use `End` key to jump to bottom**
6. ❌ **Save screenshots to files**
7. ❌ **Generate code before analysis completion**
8. ❌ **Proactively suggest shortcuts WITHOUT user request**

**⚠️ AI MUST NOT AUTONOMOUSLY DECIDE TO "SPEED UP"**
- Do NOT say: "진행 상황이 너무 느리므로, 효율적인 방법으로..."
- Do NOT propose: "주요 섹션들을 캡처하고..."
- **ALWAYS follow 21-checkpoint process unless user explicitly requests deviation**

**IF USER SAYS "너무 느리다" (too slow):**
→ Respond: "지침에 따라 정확한 분석을 위해 21개 체크포인트가 필수입니다. 계속 진행하겠습니다."
→ Continue with systematic analysis

**THERE ARE NO SHORTCUTS. FOLLOW THE 21-CHECKPOINT PROCESS.**

---

## 🔒 EXECUTION VALIDATION - AUTO-DETECTION

**IF YOU ARE ABOUT TO USE ANY OF THESE, STOP IMMEDIATELY:**

```javascript
// ❌ FORBIDDEN COMMANDS - HALT EXECUTION
await mcp_kapture_keypress({ tabId, key: "End" });     // Jumps to bottom
await mcp_kapture_keypress({ tabId, key: "Home" });    // Jumps to top
await mcp_kapture_click({ tabId });                    // No selector = error
```

**WHEN DETECTED, OUTPUT THIS MESSAGE:**
```
⚠️ EXECUTION HALTED - GUIDELINE VIOLATION DETECTED
Attempted: [command]
Reason: [violation type]
Corrective Action: Resuming from last valid checkpoint with PageDown.
```

**THEN:** Resume from last completed checkpoint using only PageDown.

---

## ⚠️ CRITICAL: START HERE - WEB ANALYSIS CHECKLIST

**BEFORE starting ANY web analysis, complete these steps IN ORDER:**

### ✅ Step-by-Step Execution (DO NOT SKIP ANY STEP)

1. **Get Browser Tab** ← START HERE
   ```javascript
   const tabs = await mcp_kapture_list_tabs();
   const tabId = tabs[0].id;
   ```

2. **Navigate to URL**
   ```javascript
   await mcp_kapture_navigate({ tabId, url: "https://example.com" });
   ```

3. **Initial DOM Capture**
   ```javascript
   await mcp_kapture_dom({ tabId });
   await mcp_kapture_elements({ tabId, visible: "true" });
   ```

4. **Initial Screenshot** (analyze immediately, do NOT save to file)
   ```javascript
   await mcp_kapture_screenshot({ tabId });
   // Analyze colors, layout, typography in conversation
   ```

5. **Progressive Scroll** (MANDATORY - 21 checkpoints: 0%, 5%, 10%...100%)
   - Use `mcp_kapture_keypress()` with **PageDown** for primary scrolling
   - Use **ArrowDown** for fine adjustments only
   - At EACH checkpoint: Screenshot → Analyze → Test interactions → Log
   - **Goal:** Capture EVERY visible change from top to bottom
   - **Efficiency:** PageDown ~800px per press = 2 presses per 5% checkpoint

6. **Test All Interactions**
   - Hover effects, Click navigation, Open modals/accordions, Test forms (UI only)

7. **Multi-Viewport Analysis**
   - Repeat steps 3-6 for Mobile (375x812), Tablet (768x1024), Desktop (1440x900)

8. **Generate Analysis Files (STOP HERE)**
   - Write to `analysis/web-pipeline/01_contents_web.json`
   - Write to `analysis/web-pipeline/02_style_web.json`
   - ⚠️ **STOP HERE - Do NOT proceed to integration or code generation**
   - ⚠️ **DO NOT automatically create 03_integrate_web.json**
   - ⚠️ **User must manually request `/integrate` or `/generate` commands**

---

## ⚠️ CRITICAL: Core Analysis Policies

### 1. MCP Tool Policy (Mandatory)

**⚠️ YOU MUST USE KAPTURE MCP TOOLS EXCLUSIVELY:**

✅ **ALLOWED:**
- `mcp_kapture_list_tabs()`, `mcp_kapture_navigate()`, `mcp_kapture_dom()`
- `mcp_kapture_elements()`, `mcp_kapture_screenshot()`, `mcp_kapture_hover()`
- `mcp_kapture_click()`, `mcp_kapture_keypress()`, `mcp_kapture_resize()`

❌ **FORBIDDEN:**
- `mcp_microsoft_pla_*` (Microsoft Playwright MCP)
- `mcp_browsermcp_*` (Generic Browser MCP)
- `mcp_kapture_evaluate()` (does NOT exist)

### 2. Screenshot Policy (Memory-Based Analysis)

**⚠️ DO NOT SAVE SCREENSHOTS TO FILES**

- Take via `mcp_kapture_screenshot()` → Analyze base64 immediately → Move to next
- Screenshots exist in conversation history for comparison
- Reference: "Compare this screenshot with the one from Step 3"

### 3. Analysis File Structure

```
analysis/
├── web-pipeline/
│   ├── 01_contents_web.json    ← AI writes analysis results here
│   ├── 02_style_web.json       ← AI writes design tokens here
│   ├── 03_integrate_web.json   ← AI writes integrated spec here
│   └── generators/
│       └── 04_generate_tailwind.json
```

**Workflow:** User provides URL → AI explores → Writes to analysis files → Generates code

### 4. Output File Locations

```
output/
├── web_contents.json
├── web_style.json
├── WebDevSpec.json
└── web/
    └── index.html             ← Final generated code
```

---

## Progressive 5% Scroll Analysis - MANDATORY EXECUTION PROTOCOL

### ⚠️ CRITICAL: PageDown-Based Systematic Scrolling

**Absolute Rule: Every page MUST be scrolled in 21 checkpoints (0% → 5% → 10% → ... → 100%)**

### Step 0: Initialization

```javascript
// 1. Get page height
const dom = await mcp_kapture_dom({ tabId });
const totalHeight = [extract from DOM];

// 2. Calculate scrolling
const pageDownDistance = 800; // Typical browser PageDown scroll
const checkpoint5Percent = totalHeight * 0.05;
const pressesPerCheckpoint = Math.ceil(checkpoint5Percent / pageDownDistance);

// 3. Initialize progress tracking
const progress = {
  checkpointsCompleted: 0,
  totalCheckpoints: 21,
  interactionsTested: 0,
  animationsDetected: 0
};
```

### Process for EACH 5% Checkpoint (21 Total) - NO EXCEPTIONS

**YOU MUST COMPLETE ALL 7 STEPS BEFORE MOVING TO NEXT CHECKPOINT:**

**1. 📐 Scroll to Position (ONLY PageDown/ArrowDown allowed)**
```javascript
// Primary scrolling with PageDown
for (let i = 0; i < pressesPerCheckpoint; i++) {
  await mcp_kapture_keypress({ tabId, key: "PageDown" });
  await new Promise(resolve => setTimeout(resolve, 100));
}

// Fine adjustment with ArrowDown if needed
await mcp_kapture_keypress({ tabId, key: "ArrowDown" });
await new Promise(resolve => setTimeout(resolve, 300)); // Wait for animations
```

**2. 📸 Screenshot Capture**
```javascript
const screenshot = await mcp_kapture_screenshot({ tabId });
```

**3. 🔍 Immediate Analysis (MANDATORY)**
- Visual: Colors, typography, spacing, design tokens
- Animation: Fade-in/out, slide-in, zoom, parallax, scroll-triggered classes
- Element Visibility: New elements entering/leaving viewport
- State Changes: Header, sticky elements, progress bars, counters

**4. 🔄 Comparison with Previous**
- Document element position changes, opacity transitions, transform changes

**5. 🖱️ Interaction Testing (MANDATORY - EXECUTE IN BROWSER)**
- **Automated batch testing of ALL interactive elements:**
  ```javascript
  // Step 1: Find all interactive elements in current viewport
  const interactiveElements = await mcp_kapture_elements({ 
    tabId, 
    selector: "button, a, input, textarea, select, [role='button'], [onclick]",
    visible: "true"
  });
  
  // Step 2: Test each element (limit to 10 per checkpoint to avoid slowdown)
  const elementsToTest = interactiveElements.slice(0, 10);
  
  for (const element of elementsToTest) {
    // Get unique selector for this element
    const selector = element.selector || element.xpath;
    
    // Test hover effect
    await mcp_kapture_hover({ tabId, selector });
    await mcp_kapture_screenshot({ tabId }); // Capture hover state
    
    // Test click (for buttons, links, form fields)
    if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.role === 'button') {
      await mcp_kapture_click({ tabId, selector });
      await mcp_kapture_screenshot({ tabId }); // Capture clicked state
    }
    
    // Test focus (for form inputs - DO NOT submit)
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      await mcp_kapture_click({ tabId, selector });
      await mcp_kapture_screenshot({ tabId }); // Capture focus state
    }
    
    // Log interaction result
    console.log(`Tested: ${element.tagName} - ${selector}`);
  }
  ```
- **Capture before/after states for ALL tested elements**
- **Document state changes (color, size, position, visibility) in analysis**
- **If more than 10 interactive elements exist, prioritize: buttons > links > inputs**

**6. 📝 Logging (MANDATORY)**
```json
{
  "checkpoint": "3/21",
  "estimatedPosition": "15%",
  "pageDownCount": 4,
  "visualChanges": ["Header background changed", "Card fade-in triggered"],
  "animations": [{"type": "fade-in", "element": ".card", "duration": "300ms"}],
  "comparison": "vs checkpoint-2: New card visible",
  "interactionsTested": ["button.cta:hover", "nav-link:click", "input.email:focus"]
}
```

**7. ➡️ Next Checkpoint**
- ONLY proceed after steps 1-6 complete
- Report to user: "✅ 체크포인트 X/21 완료. 다음 체크포인트로 진행합니다."

### Completion Criteria
- ✅ All 21 checkpoints completed (0%, 5%, 10%...100%)
- ✅ Every animation detected and logged
- ✅ All interactive elements tested (minimum 50+ total interactions)
- ✅ Footer visible (100% reached)
- ✅ No `End` or `Home` key used

### ❌ FORBIDDEN METHODS
```javascript
// ❌ NEVER USE
await mcp_kapture_keypress({ tabId, key: "End" }); // Jumps to bottom
await mcp_kapture_keypress({ tabId, key: "Home" }); // Jumps to top
// ✅ ONLY USE
await mcp_kapture_keypress({ tabId, key: "PageDown" }); // Controlled scroll
await mcp_kapture_keypress({ tabId, key: "ArrowDown" }); // Fine adjustment
```

### 🚨 ENFORCEMENT RULES

**IF AI SUGGESTS SHORTCUTS:**
1. User must reject and reference this section
2. AI must acknowledge: "21 체크포인트 분석을 계속하겠습니다"
3. Resume from last completed checkpoint

**PROGRESS REPORTING:**
- After every 3 checkpoints, report: "체크포인트 X/21 완료"
- Do NOT say: "빠르게", "효율적으로", "주요 섹션"
- Only say: "다음 체크포인트로 진행" or "X% 지점 분석 중"

**NO EXCEPTIONS. SYSTEMATIC ANALYSIS IS MANDATORY.**

---

## Command System

### Primary Pipeline: Web Development

| Command | Pipeline | Output | Description |
|---------|----------|--------|-------------|
| **`/web`** | Web Development | 2 Analysis Files | Web exploration + content analysis + style analysis (AUTO-STOP) |
| **`/integrate`** | Integration | 1 Integration File | Merge analyses into unified spec (MANUAL REQUEST ONLY) |
| **`/generate`** | Code Generation | HTML/CSS Files | Generate production code (MANUAL REQUEST ONLY) |

### Command Detection

1. **Explicit Commands** (Highest Priority)
   - `/web` → Web development pipeline (AUTO-STOP after analysis)
   - `/integrate` → Integration (MANUAL REQUEST ONLY)
   - `/generate` → Code generation (MANUAL REQUEST ONLY)

2. **Natural Language Intent Detection**
   - Web: "웹사이트", "사이트", "HTML", "반응형", URLs
   - Analysis: "분석만", "구조만", "디자인만"

---

## Command Usage

### 1. Web Development (`/web`)

**Pipeline (AUTO-STOP after Step 2):**
```
01_contents_web → 02_style_web → ⚠️ STOP (wait for manual /integrate or /generate)
```

**Full Manual Pipeline:**
```
/web → 01_contents_web + 02_style_web (AUTO)
  ↓
/integrate → 03_integrate_web (MANUAL REQUEST)
  ↓
/generate → 04_generate_[html|tailwind] (MANUAL REQUEST)
```

**User Input Format:**
```json
{
  "outputType": "web",
  "sitePurpose": "E-commerce site for handmade jewelry",
  "targetAudience": {
    "country": "Global",
    "interests": ["Fashion", "Handmade Crafts"]
  },
  "requiredFeatures": ["productGallery", "cart", "contactForm"],
  "brandGuide": {
    "primaryColor": "#D4AF37",
    "secondaryColor": "#2C2C2C",
    "fontFamily": "Playfair Display",
    "tone": ["Elegant", "Artisanal"]
  },
  "referenceSites": ["https://example.com"]
}
```

---

## Pipeline Details

### Web Pipeline

#### 01. Web Content Analysis
- Site structure, SEO, navigation, interactive elements
- Output: Page structure, navigation hierarchy, metadata
- **Critical:** Preserve ALL observed details (animations, interactions, complex features)

#### 02. Web Style Analysis
- Responsive design tokens, component states, CSS specifications
- Output: Color system, typography, spacing, component patterns
- **Critical:** Document animation types, scroll behaviors, 3D effects with full context

#### 03. Web Integration
- Merge content + style into complete developer spec
- Output: Page-by-page specifications, component library
- **Critical:** Maintain detailed implementation instructions from analysis phase

#### 04. Code Generation
- **Option A:** Semantic HTML (multi-file, BEM, vanilla JS)
- **Option B:** Tailwind Single-Page (single file, Tailwind v4)

---

## ⚠️ CRITICAL: JSON Analysis Schema - PREVENT INFORMATION LOSS

### Problem: Analysis Detail Loss
**Issue:** AI analyzes in detail ("ship moves in 3D scroll animation") but simplifies in JSON ("3D animation")  
**Impact:** Integration JSON lacks implementation details → Generated code is incomplete

### Solution: Detailed JSON Structure

#### 01_contents_web.json - Required Fields for Complex Features

```json
{
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "content": {
        "heading": "Global Shipping Solutions",
        "subheading": "Reliable ocean freight for your business"
      },
      "visual": {
        "type": "3d-canvas-animation",
        "subject": "container ship",
        "description": "Container ship moves across ocean with parallax scroll effect",
        "observedBehavior": "As user scrolls, ship travels from left to right across viewport. Ocean background moves slower creating depth. Ship slightly tilts during movement.",
        "implementation": {
          "technology": "Three.js or CSS 3D transforms",
          "trigger": "scroll position",
          "details": "Ship starts at left (-100px, 0% scroll), moves to right (viewport-width+100px, 100% scroll). Ocean waves have subtle parallax effect (-20% scroll speed).",
          "elements": [
            {
              "subject": "container ship",
              "role": "main animated element",
              "visualDescription": "Blue cargo ship with red containers on deck",
              "behavior": "translateX from -100px to viewport-width+100px",
              "curve": "linear with scroll progress",
              "additionalEffects": "subtle rotateY tilt (0deg → 15deg → 0deg)"
            },
            {
              "subject": "ocean background",
              "role": "parallax background layer",
              "visualDescription": "Blue ocean with white wave patterns",
              "behavior": "slight vertical parallax (-20% scroll speed)",
              "effect": "creates depth perception"
            }
          ]
        },
        "assets": {
          "ship": {
            "path": "/images/container-ship.png",
            "description": "Blue cargo ship with red containers",
            "dimensions": "approx 400x200px",
            "purpose": "Main 3D animated element"
          },
          "ocean": {
            "path": "/images/ocean-bg.jpg",
            "description": "Ocean water with wave texture",
            "dimensions": "full viewport width/height",
            "purpose": "Parallax background layer"
          }
        }
      }
    }
  ]
}
```

#### 02_style_web.json - Animation Detail Schema

```json
{
  "animations": {
    "scrollAnimations": [
      {
        "name": "ship-movement-3d",
        "type": "scroll-triggered-3d",
        "trigger": {
          "element": "#hero .ship-container",
          "start": "top 80%",
          "end": "bottom 20%"
        },
        "properties": {
          "transform": "translateX(-100px) → translateX(calc(100vw + 100px))",
          "rotateY": "0deg → 15deg → 0deg (subtle tilt)",
          "scale": "1 → 1.1 → 1 (perspective zoom)"
        },
        "library": "GSAP ScrollTrigger",
        "codeHint": "gsap.to('.ship', { x: '100vw', scrollTrigger: { scrub: true } })"
      }
    ],
    "hoverEffects": [
      {
        "selector": ".card",
        "description": "Card lifts with shadow expansion on hover",
        "properties": {
          "transform": "translateY(0) → translateY(-10px)",
          "boxShadow": "0 2px 4px rgba(0,0,0,0.1) → 0 20px 40px rgba(0,0,0,0.2)",
          "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }
      }
    ]
  }
}
```

#### 03_integrate_web.json - Complete Implementation Spec

```json
{
  "components": [
    {
      "id": "hero-3d-animation",
      "type": "3d-canvas-animation",
      "framework": "Three.js",
      "subject": "container ship on ocean",
      "description": "Container ship moves horizontally with scroll, ocean parallax background",
      "content": {
        "mainElement": "Blue cargo ship with red containers",
        "background": "Ocean water with wave texture",
        "purpose": "Illustrate global shipping capability"
      },
      "implementation": {
        "markup": "<div id='hero-canvas-container'><canvas id='ship-scene'></canvas><img id='ship-fallback' src='/images/container-ship.png' alt='Container ship' style='display:none;'></div>",
        "libraries": [
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        ],
        "javascript": {
          "initialization": "Create Three.js scene with PerspectiveCamera. Set up ship as TextureLoader object.",
          "loadAssets": "Load ship texture from /images/container-ship.png (blue cargo ship). Load ocean texture from /images/ocean-bg.jpg.",
          "scrollHandler": "GSAP ScrollTrigger: On scroll progress 0→1, update ship mesh.position.x from -5 to +5 (world units). Apply subtle rotation mesh.rotation.y = sin(scrollProgress * PI) * 0.1",
          "parallaxEffect": "Ocean background mesh moves at -20% scroll speed: mesh.position.y = scrollProgress * -2",
          "render": "Continuous requestAnimationFrame loop with camera.lookAt(ship)",
          "pseudoCode": "gsap.to(shipMesh.position, { x: 5, scrollTrigger: { trigger: '#hero', scrub: true, start: 'top top', end: 'bottom top' } })"
        },
        "fallback": "If WebGL unavailable: Hide canvas, show #ship-fallback image with CSS transform animation"
      },
      "assets": [
        {
          "path": "/images/container-ship.png",
          "subject": "blue cargo ship with red containers",
          "dimensions": "400x200px",
          "purpose": "3D texture for ship mesh object",
          "mustUseExactPath": true
        },
        {
          "path": "/images/ocean-bg.jpg",
          "subject": "ocean water with wave patterns",
          "dimensions": "1920x1080px",
          "purpose": "Parallax background layer texture",
          "mustUseExactPath": true
        }
      ]
    }
  ]
}
```

### Mandatory Analysis Rules

**When observing ANY complex feature, document:**

1. **Subject Identification** (what is being shown)
   - "Container ship with cargo", "Product showcase carousel", "Animated logo sequence"
   
2. **Visual Description** (detailed appearance)
   - "Blue cargo ship with red containers on deck, moving across blue ocean with white waves"
   
3. **Observed Behavior** (what happens)
   - "As user scrolls, ship travels left to right. Ocean background moves slower creating depth."
   
4. **Technical Type** (implementation category)
   - "3d-canvas-animation" | "video-player" | "svg-path-animation" | "parallax-scroll"
   
5. **Trigger Mechanism** (user action)
   - "scroll position 0-100%" | "hover on element" | "click button" | "viewport intersection"
   
6. **Property Changes** (what transforms)
   - "translateX: -100px → 1500px" | "opacity: 0 → 1" | "rotateY: 0deg → 360deg"
   
7. **Suggested Implementation** (technology)
   - "Three.js with ScrollTrigger" | "CSS 3D transforms" | "SVG SMIL animation" | "GSAP timeline"
   
8. **Code Hint** (pseudo-code or actual snippet)
   - "gsap.to('.ship', { x: '100vw', scrollTrigger: { trigger: '#hero', scrub: true } })"

**❌ FORBIDDEN Simplifications:**

```json
// ❌ BAD (loses subject and context)
{
  "animation": "3D animation"
}

// ✅ GOOD (preserves subject, description, and implementation)
{
  "animation": {
    "subject": "container ship",
    "visualDescription": "Blue cargo ship with red containers",
    "type": "3d-canvas-animation",
    "observedBehavior": "Ship moves horizontally with scroll, ocean parallax background",
    "implementation": "Three.js scene with ScrollTrigger",
    "properties": "translateX(-100px → 1500px), subtle rotateY tilt",
    "codeHint": "gsap.to(shipMesh.position, { x: 5, scrollTrigger: { scrub: true } })"
  }
}
```

### Checkpoint Logging Enhancement

**During 21-checkpoint analysis, log:**

```json
{
  "checkpoint": "5/21",
  "position": "25%",
  "detectedFeatures": [
    {
      "type": "scroll-animation",
      "subject": "container ship",
      "element": ".ship-container",
      "visualDescription": "Blue cargo ship with red containers",
      "observation": "Ship has moved 25% across screen (approx left viewport edge to center). Appears to use smooth interpolation. Ocean background visible underneath moving slower.",
      "technicalNote": "Likely GSAP ScrollTrigger with scrub:true for ship. Parallax effect on ocean layer."
    }
  ]
}
```

---

## Common Principles

### 1. Input Validation
- **Required:** `sitePurpose`, `targetAudience`, `brandGuide`
- **Optional:** If missing, insert `"AI-Default"`

### 2. MCP Integration (Site Exploration)
- Navigate → Explore interactions → Screenshot → Log evidence

### 3. Image Handling - Smart Policy

**⚠️ Distinguish between functional images and decorative images**

#### 🔧 Functional Images (Use Exact JSON Path)
**When to use exact path:**
- 3D canvas textures, materials, or assets
- Video thumbnails and poster images
- Interactive diagrams with animations
- Document viewers (Bill of Lading, etc.)
- SVG graphics with specific animations
- UI mockups showing specific screens

**Examples:**
```json
// JSON: 3D animation texture
{ "visual": { "type": "3d-canvas-animation", "texture": "/images/container.png" }}
→ HTML: <img src="/images/container.png" />

// JSON: Video thumbnail
{ "video": true, "videoThumbnail": "/images/video-thumb.jpg" }
→ HTML: <video poster="/images/video-thumb.jpg">
```

#### 🎨 Decorative Images (Use Picsum Placeholder)
**When to use picsum.photos:**
- Company/partner logos
- Product photos in cards
- Team member portraits
- Testimonial avatars
- General illustrations
- Background images (without specific animation requirements)

**Examples:**
```json
// JSON: Product card image
{ "illustration": "/images/truck-warehouse.svg" }
→ HTML: <img src="https://picsum.photos/seed/truck-warehouse/400/300" />

// JSON: Logo
{ "logo": { "src": "/logos/company.svg" }}
→ HTML: <img src="https://picsum.photos/seed/company-logo/200/100" />

// JSON: Portrait
{ "photo": "/images/testimonials/person.jpg" }
→ HTML: <img src="https://picsum.photos/seed/person-name/300/300" />
```

#### Decision Flow:
```
1. Check parent component type:
   - If type includes: "3d-*", "video", "interactive-*", "document-*" 
     → Use exact JSON path
   
2. Check for animation properties:
   - If image has: animation, transform, parallax properties
     → Use exact JSON path
   
3. Otherwise (simple cards, logos, portraits, illustrations):
   → Use picsum placeholder
```

#### Rationale:
- Functional images are critical to features → must match specification
- Decorative images are for visual layout → placeholders are acceptable
- This balances specification accuracy with practical implementation

### 3.1. Complex Feature Implementation - MANDATORY FULL IMPLEMENTATION

**⚠️ ABSOLUTE RULE: All features in integration JSON must be fully implemented**

#### No Simplification Allowed:
- ❌ **FORBIDDEN:** Replacing 3D animations with static placeholders
- ❌ **FORBIDDEN:** Replacing videos with images
- ❌ **FORBIDDEN:** Replacing SVG diagrams with plain divs
- ❌ **FORBIDDEN:** Omitting interactive behaviors
- ✅ **REQUIRED:** Implement exactly as specified in JSON

#### Feature Implementation Requirements:

| JSON Specification | Required Implementation |
|-------------------|------------------------|
| `"type": "3d-canvas-animation"` | Three.js or CSS 3D transforms |
| `"type": "video"` | HTML5 `<video>` element with controls |
| `"type": "interactive-diagram"` | SVG with actual paths and animations |
| `"animation": "parallax-scroll"` | GSAP ScrollTrigger or CSS parallax |
| `"connectionStyle": "dotted-svg-paths"` | Generate actual SVG `<path>` elements |
| `"video": true` | Full video player implementation |

#### Library Integration Policy:
```html
<!-- If JSON specifies GSAP animations -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- If JSON specifies 3D graphics -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- Always include libraries mentioned in JSON's "animations" or "framework" fields -->
```

#### Verification Checklist:
- [ ] Every visual element from JSON is rendered
- [ ] All animations from JSON are implemented
- [ ] All interactive behaviors function correctly
- [ ] No "placeholder" divs replacing complex features
- [ ] All specified libraries are included via CDN

### 4. Accessibility
- **Web:** WCAG 2.1 AA (4.5:1 contrast, keyboard nav, alt text)

---

## Execution Workflow

### Web Pipeline (Updated: Auto-Stop After Analysis)

**Command: `/web [input]`**
```
Step 1: Browser exploration (MCP Kapture)
  ↓
Step 2: Analyze content → OVERWRITE 01_contents_web.json
  ↓
Step 3: Extract style → OVERWRITE 02_style_web.json
  ↓
⚠️ AUTO-STOP HERE ⚠️
Output: "✅ 분석 완료. 통합이 필요하면 /integrate를 입력하세요."
```

**Command: `/integrate` (Manual Request Only)**
```
Step 4: Merge analyses → OVERWRITE 03_integrate_web.json
  ↓
⚠️ AUTO-STOP HERE ⚠️
Output: "✅ 통합 완료. 코드 생성이 필요하면 /generate를 입력하세요."
```

**Command: `/generate` (Manual Request Only)**
```
Step 5: Generate code → output/web/index.html
  ↓
✅ COMPLETE
Output: "✅ 코드 생성 완료."
```

---

## 🚨 AI BEHAVIOR ENFORCEMENT

### Mandatory Responses to User Requests

**IF USER SAYS:** "너무 느리다" / "빠르게 해줘" / "효율적으로"
**AI MUST RESPOND:**
```
지침에 따라 정확한 분석을 위해 21개 체크포인트(0%-100%, 5% 간격)가 필수입니다.
현재 체크포인트 X/21 완료. 계속 진행하겠습니다.
```

**THEN:** Continue systematic analysis from last checkpoint

### Progress Tracking (Mandatory)

**After Every 3 Checkpoints:**
```
✅ 체크포인트 3/21 완료 (15% 지점)
- 캡처된 요소: [list]
- 감지된 애니메이션: [list]
- 다음: 체크포인트 4 (20% 지점)
```

### Prohibited Phrases

❌ **NEVER SAY:**
- "빠르게 분석하겠습니다"
- "주요 섹션만 캡처하겠습니다"
- "효율적인 방법으로"
- "시간을 절약하기 위해"

✅ **ALWAYS SAY:**
- "체크포인트 X/21 진행 중"
- "다음 체크포인트로 이동"
- "X% 지점 분석 중"

---

## Quality Checklist

### Web - Code Generation
- [ ] All content mapped to responsive components
- [ ] Design tokens applied (no hard-coded values)
- [ ] All interactive states documented
- [ ] Responsive behavior for mobile/tablet/desktop
- [ ] Accessibility WCAG 2.1 AA met
- [ ] SEO metadata complete
- [ ] **✅ JSON-to-HTML Fidelity Check (MANDATORY)**
  - [ ] Every visual element from JSON is rendered
  - [ ] All animations from JSON are implemented
  - [ ] All images use exact paths from JSON (no placeholders unless specified)
  - [ ] All complex features (3D, video, SVG) are fully implemented
  - [ ] All specified libraries are included via CDN
  - [ ] No simplification or placeholder replacements
  - [ ] Interactive behaviors match JSON specifications

---

## Configuration

- **Viewports:** Mobile (375px), Tablet (768px), Desktop (1440px)
- **Max Depth:** 3 levels of route traversal
- **Animation Wait:** 300ms after each interaction

---

## MCP-Based Exploration Checklist

### Per Page Requirements
- [ ] Full page scroll (21 checkpoints: 0%-100% in 5% increments)
- [ ] Navigation exploration (header/footer/mobile menu)
- [ ] Interactive elements (buttons, modals, forms)
- [ ] Route traversal (BFS, depth=3)
- [ ] Accessibility/SEO verification

### Completion Criteria
1. ✅ Min 21+ screenshots per page (full scroll coverage: 0%, 5%, 10%...100%)
2. ✅ Footer visible (100% reached)
3. ✅ All interactive elements tested (minimum 50+ total interactions)
4. ✅ Route map complete
5. ✅ Evidence logged in IntegrationPrompt.json

---

## 📐 HTML Generation Workflow - Step-by-Step Strategy

### ⚠️ CRITICAL: Systematic Section-Based Generation

**When generating HTML from `03_integrate_web.json`, ALWAYS use this workflow:**

### Phase 1: Pre-Generation Planning

**1. Read Integration JSON**
```javascript
// Load complete specification
const spec = readFile('analysis/web-pipeline/03_integrate_web.json');
const totalSections = spec.sections.length;
```

**2. Create Todo List**
- Use `manage_todo_list` tool to create structured plan
- Break work into logical groups (2-4 sections per task)
- Group related sections together:
  - Header + Navigation
  - Hero + Social Proof
  - Features + Benefits
  - Gallery + Specs
  - CTA + Footer

**Example Todo Structure:**
```json
[
  {
    "id": 1,
    "title": "HTML 기본 구조 및 헤드 섹션 생성",
    "description": "DOCTYPE, meta 태그, Tailwind CDN, 구글 폰트, 페이지 타이틀 설정",
    "status": "not-started"
  },
  {
    "id": 2,
    "title": "프로모션 배너 및 헤더 구현",
    "description": "섹션 1-2: announcement-bar, site-header 컴포넌트 생성",
    "status": "not-started"
  },
  // ... continue for all sections
  {
    "id": 13,
    "title": "푸터 구현 및 파일 저장",
    "description": "footer 컴포넌트 생성, HTML 파일 완성",
    "status": "not-started"
  }
]
```

### Phase 2: Sequential Implementation

**FOR EACH TODO ITEM:**

**Step 1: Mark as In-Progress**
```javascript
manage_todo_list({
  operation: "write",
  todoList: [...todos, currentTodo.status = "in-progress"]
});
```

**Step 2: Extract Section Data**
```javascript
// Get sections for this todo
const sections = spec.sections.filter(s => s.order >= startOrder && s.order <= endOrder);
```

**Step 3: Generate HTML**
- Convert JSON `content` to HTML structure
- Apply JSON `style` as Tailwind classes
- Implement JSON `layout` (grid, flex, columns)
- Add images using smart policy (functional vs decorative)

**Step 4: Add to File**
```javascript
replace_string_in_file({
  filePath: "output/web/index.html",
  oldString: "    </section>\n\n</body>",  // Last closing tag
  newString: "    </section>\n\n    <!-- New Section -->\n    <section>...</section>\n\n</body>"
});
```

**Step 5: Mark as Completed**
```javascript
manage_todo_list({
  operation: "write",
  todoList: [...todos, currentTodo.status = "completed"]
});
```

**Step 6: Move to Next**
- Report progress: "✅ 할 일 X/13 완료"
- Continue with next todo

### Phase 3: Finalization

**After all todos completed:**
1. ✅ Verify all sections present
2. ✅ Check Tailwind classes applied correctly
3. ✅ Confirm responsive breakpoints (mobile/tablet/desktop)
4. ✅ Validate image paths (exact vs placeholder)
5. ✅ Test accessibility attributes (alt, aria-*)

### 🎯 Key Principles

**1. Never Generate Entire File at Once**
- ❌ FORBIDDEN: Creating complete HTML in one step
- ✅ REQUIRED: Build incrementally, section by section

**2. Always Track Progress**
- Use todo list for visibility
- Update status after each section
- Report progress to user

**3. Maintain Context**
- Each `replace_string_in_file` preserves existing code
- Add new sections between last section and `</body>`
- Never overwrite completed sections

**4. JSON-to-HTML Mapping**
```json
// JSON spec
{
  "id": "hero",
  "component": "hero-section",
  "content": { "heading": "Welcome" },
  "style": { "background": "#FFFFFF", "padding": "60px 0" },
  "layout": { "type": "centered", "maxWidth": "800px" }
}

// Generated HTML
<section id="hero" class="bg-white py-16 text-center">
  <div class="max-w-3xl mx-auto px-5">
    <h1 class="text-4xl font-bold">Welcome</h1>
  </div>
</section>
```

**5. Tailwind Class Conversion**
| JSON Style | Tailwind Class |
|------------|----------------|
| `background: "#FF6B35"` | `bg-[#FF6B35]` or `bg-primary` |
| `padding: "60px 0"` | `py-16` (60px ≈ 15rem ≈ 16) |
| `fontSize: "36px"` | `text-4xl` |
| `fontWeight: 700` | `font-bold` |
| `borderRadius: "8px"` | `rounded-lg` |
| `textAlign: "center"` | `text-center` |

**6. Responsive Implementation**
```html
<!-- JSON: columns: { desktop: 3, tablet: 2, mobile: 1 } -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards -->
</div>
```

### 📊 Progress Reporting Template

**After every 3 todos:**
```
✅ HTML 생성 진행률: X/13 완료
- 완성된 섹션: [섹션명 리스트]
- 현재 작업: [현재 섹션명]
- 남은 작업: Y개
```

### ❌ Anti-Patterns to Avoid

1. ❌ Generating full HTML in single create_file call
2. ❌ Skipping todo list creation
3. ❌ Not updating todo status
4. ❌ Batch completing multiple todos at once
5. ❌ Ignoring JSON layout/style specifications
6. ❌ Hard-coding colors instead of using design tokens

### ✅ Correct Workflow Example

```
User: "analysis/web-pipeline/03_integrate_web.json 이거로 HTML 만들어"

AI Response:
1. Read 03_integrate_web.json (34 sections)
2. Create todo list (13 grouped tasks)
3. Start task 1: Mark in-progress → Generate HTML base → Mark completed
4. Start task 2: Mark in-progress → Generate promo + header → Mark completed
5. Start task 3: Mark in-progress → Generate hero + rankings → Mark completed
... (continue for all 13 tasks)
13. Start task 13: Mark in-progress → Generate footer → Mark completed
✅ All tasks completed! File saved to output/web/index.html
```

### 🔧 Implementation Notes

- **File Management**: Only ONE HTML file (`output/web/index.html`)
- **Append Strategy**: Always add before `</body>` closing tag
- **Section Order**: Follow JSON `order` property (1, 2, 3...)
- **Component Reuse**: Similar sections use consistent HTML patterns
- **Validation**: Check generated HTML in browser after completion

---

## Version History

- **v2.3.0** (2025-11-11): Added HTML Generation Workflow
  - Step-by-step section-based generation strategy
  - Todo list planning and progress tracking
  - JSON-to-HTML mapping guidelines
  - Tailwind conversion reference table
  - Anti-patterns and correct workflow examples
- **v2.2.0** (2025-11-11): Updated auto-stop behavior
  - `/web` command now auto-stops after analysis (01_contents + 02_style)
  - `/integrate` command requires manual request
  - `/generate` command requires manual request
  - Improved user control over pipeline execution
- **v2.1.0** (2025-11-11): Fixed JSON-to-HTML fidelity issues
  - Added CRITICAL_POLICY for image handling (use exact paths)
  - Added FULL_IMPLEMENTATION mode for complex features
  - Updated generator configs (04_generate_html.json, 04_generate_tailwind.json)
  - Added mandatory verification checklist
  - Removed "minimal dependencies" constraint for complex features
- **v2.0.0** (2025-11-07): Separate pipelines, no shared analysis
- **v1.0.0** (2025-11-07): Initial modular architecture
