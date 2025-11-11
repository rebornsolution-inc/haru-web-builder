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
   - Write to `analysis/web-pipeline/03_integrate_web.json`
   - ⚠️ **DO NOT generate HTML/CSS code automatically**
   - ⚠️ **STOP after 03_integrate_web.json is written**

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
| **`/web`** | Web Development | HTML/CSS/JS Files | Complete web analysis → responsive site code |

### Command Detection

1. **Explicit Commands** (Highest Priority)
   - `/web` → Web development pipeline
   - `/contents` → Content analysis only
   - `/style` → Visual analysis only
   - `/full` → Complete pipeline

2. **Natural Language Intent Detection**
   - Web: "웹사이트", "사이트", "HTML", "반응형", URLs
   - Analysis: "분석만", "구조만", "디자인만"

---

## Command Usage

### 1. Web Development (`/web`)

**Pipeline:**
```
01_contents_web → 02_style_web → 03_integrate_web → 04_generate_[html|tailwind]
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

#### 02. Web Style Analysis
- Responsive design tokens, component states, CSS specifications
- Output: Color system, typography, spacing, component patterns

#### 03. Web Integration
- Merge content + style into complete developer spec
- Output: Page-by-page specifications, component library

#### 04. Code Generation
- **Option A:** Semantic HTML (multi-file, BEM, vanilla JS)
- **Option B:** Tailwind Single-Page (single file, Tailwind v4)

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

### Web Pipeline
```
/web [input]
  ↓ 01. Analyze content → OVERWRITE 01_contents_web.json
  ↓ 02. Extract style → OVERWRITE 02_style_web.json
  ↓ 03. Merge → OVERWRITE 03_integrate_web.json
  ↓ ⚠️ STOP HERE - Do NOT proceed to code generation
  ↓ User must manually request code generation via /generate command
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

## Version History

- **v2.1.0** (2025-11-11): Fixed JSON-to-HTML fidelity issues
  - Added CRITICAL_POLICY for image handling (use exact paths)
  - Added FULL_IMPLEMENTATION mode for complex features
  - Updated generator configs (04_generate_html.json, 04_generate_tailwind.json)
  - Added mandatory verification checklist
  - Removed "minimal dependencies" constraint for complex features
- **v2.0.0** (2025-11-07): Separate pipelines, no shared analysis
- **v1.0.0** (2025-11-07): Initial modular architecture
