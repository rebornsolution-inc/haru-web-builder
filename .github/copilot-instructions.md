# AI-Powered Content Builder System

## 🚫 ABSOLUTE PROHIBITIONS - READ FIRST

**NEVER, UNDER ANY CIRCUMSTANCES:**

1. ❌ **"빠르게 분석"** (Fast analysis)
2. ❌ **"주요 섹션만"** (Only main sections)
3. ❌ **"효율적인 방법"** (Efficient method)
4. ❌ **Skip viewport changes or visible content**
5. ❌ **Use `End`, `Home`, `PageDown`, or `PageUp` keys** (ONLY ArrowDown is allowed)
6. ❌ **Save screenshots to files**
7. ❌ **Generate code before analysis completion**
8. ❌ **Proactively suggest shortcuts WITHOUT user request**

**⚠️ AI MUST NOT AUTONOMOUSLY DECIDE TO "SPEED UP"**
- Do NOT say: "진행 상황이 너무 느리므로, 효율적인 방법으로..."
- Do NOT propose: "주요 섹션들을 캡처하고..."
- Do NOT use: PageDown, PageUp, End, Home keys under ANY circumstance
- **ONLY ArrowDown is permitted for scrolling** (no exceptions)
- **ALWAYS follow complete analysis process - capture ALL viewport changes**

**IF USER SAYS "너무 느리다" (too slow):**
→ Respond: "지침에 따라 정확한 분석을 위해 모든 콘텐츠를 상세히 캡처해야 합니다. 계속 진행하겠습니다."
→ Continue with systematic analysis

**THERE ARE NO SHORTCUTS. COMPLETE ANALYSIS IS MANDATORY.**

---

## 🔒 EXECUTION VALIDATION - RUNTIME ENFORCEMENT

### Auto-Detection System

**⚠️ PRE-EXECUTION CHECK - AI MUST VERIFY BEFORE EVERY `mcp_kapture_keypress()` CALL:**

**Step 1: Check intended key BEFORE calling tool**
```
IF intendedKey == "PageDown" OR "PageUp" OR "End" OR "Home":
  ❌ HALT IMMEDIATELY
  ❌ OUTPUT: "⚠️ VIOLATION DETECTED: Attempted to use {intendedKey} (FORBIDDEN)"
  ✅ CORRECTION: Change to "ArrowDown"
  ✅ THEN: Proceed with ArrowDown
```

**Step 2: Only allowed command**
```javascript
// ✅ ONLY THIS IS ALLOWED
await mcp_kapture_keypress({ tabId, key: "ArrowDown" });

// ❌ NEVER USE THESE
await mcp_kapture_keypress({ tabId, key: "PageDown" }); // FORBIDDEN
await mcp_kapture_keypress({ tabId, key: "End" });      // FORBIDDEN
await mcp_kapture_keypress({ tabId, key: "Home" });     // FORBIDDEN
await mcp_kapture_keypress({ tabId, key: "PageUp" });   // FORBIDDEN
```

**Rationale:**
- PageDown/PageUp = Jumps 800-1000px → Skips 5-10 viewports
- ArrowDown = Moves 50px → Captures EVERY viewport change
- End/Home = Jumps to page extremes → Completely skips content

### Behavioral Triggers - AI Self-Check

**IF AI IS ABOUT TO SAY ANY OF THESE, STOP IMMEDIATELY:**

❌ "시간 효율을 위해..."  
❌ "더 빠르게 스크롤..."  
❌ "효율적으로 분석..."
❌ "주요 섹션만..."
❌ "더 큰 간격으로..."
❌ "PageDown을 사용하여..."  
❌ "End 키로 이동..."  
❌ "이 속도로는 시간이 많이 걸릴 것 같으므로..."
❌ "진행 속도를 높이겠습니다..."
❌ "한 번에 더 많은..."
❌ "더 많은 스크롤이 필요합니다..."

**WHEN TRIGGER DETECTED, AI MUST:**
1. ❌ HALT immediately (do NOT execute the forbidden action)
2. ✅ OUTPUT violation message:
```
⚠️ BEHAVIORAL VIOLATION DETECTED
Trigger: [phrase that AI was about to say]
Reason: Attempting to deviate from systematic analysis protocol
Corrective Action: Using ArrowDown × 3-5 for fine-grained scrolling
Current checkpoint: X/30 (continuing until minimum 30 reached)
```
3. ✅ Resume with ArrowDown × 3-5 (NO changes to increment count)

**THEN:** Continue with ArrowDown × 3-5 increments, no exceptions.

---

## 🔒 CHECKPOINT COMPLETION ENFORCEMENT

### Mandatory Output Template (After EACH Checkpoint)

**AI MUST OUTPUT THIS CHECKLIST AFTER COMPLETING EACH CHECKPOINT:**

```
✅ CHECKPOINT X/30 COMPLETE
├─ 4-1: Header written to file ✅
├─ 4-2: Visual analysis (Colors: [specific], Typography: [specific], Layout: [specific]) ✅
├─ 4-3: Animation detection ([type], trigger: [specific]) ✅
├─ 4-4: Interactive elements tested (Y/10 elements) ✅
├─ 4-5: Results logged to file ✅
└─ 4-6: Tracking updated ✅

Next: Checkpoint X+1 (ArrowDown × 3-5)
```

**IF ANY ITEM SHOWS ❌ → HALT and complete before proceeding**

### Self-Check Questions (Before Moving to Next Checkpoint)

**AI MUST MENTALLY VERIFY:**
1. Did I write checkpoint header to 00_analysis_note.txt?
2. Did I analyze screenshot (colors, typography, layout, spacing)?
3. Did I check for animations (8-field template if found)?
4. Did I test 10 interactive elements (hover/click/focus)?
5. Did I log interaction results to file?
6. Did I increment checkpointIndex?

**IF ANY ANSWER IS "NO" → Go back and complete it NOW**

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

5. **Progressive Scroll** (MANDATORY - Continue until ALL content captured)
   - Use `mcp_kapture_keypress()` with **ArrowDown ONLY** (NO OTHER KEYS)
   - ArrowDown × 3-5 per checkpoint (150-300px increments)
   - At EACH checkpoint: Screenshot → Analyze → Test interactions → Log (ALL 6 steps)
   - **Goal:** Capture EVERY visible change from top to bottom
   - **Method:** Keep scrolling until footer visible + 3 consecutive "no change" detections
   - **Expected:** 30-80 checkpoints depending on page complexity

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
│   ├── 00_analysis_note.txt       ← Real-time checkpoint logging (NEW)
│   ├── 01_contents_web.json       ← AI writes analysis results here
│   ├── 02_style_web.json          ← AI writes design tokens here
│   ├── 03_integrate_web.json      ← AI writes integrated spec here
│   └── generators/
│       └── 04_generate_tailwind.json
```

**Workflow:** User provides URL → AI explores (writes to 00_analysis_note.txt) → Reads notes → Generates JSON files → Generates code

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

## Progressive Scroll Analysis - MANDATORY EXECUTION PROTOCOL

### ⚠️ CRITICAL: High-Fidelity Viewport Change Detection

**Core Principle: Capture EVERY visible change and animation frame until page end**

### Step 0: Initialization

```javascript
// 1. Initialize tracking
let checkpointIndex = 0;
let previousVisibleElements = new Set();
let previousScreenshotHash = null;
let consecutiveNoChangeCount = 0;
const MIN_CHECKPOINTS = 30; // Minimum required checkpoints for valid analysis
const MAX_NO_CHANGE_THRESHOLD = 3;
const MAX_CHECKPOINTS = 100; // Safety limit (increased for detailed analysis)

// 2. Simple hash function for screenshot comparison
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < Math.min(str.length, 1000); i++) { // First 1000 chars only
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// 3. Capture initial state
const initialElements = await mcp_kapture_elements({ tabId, visible: "true" });
const initialScreenshot = await mcp_kapture_screenshot({ tabId });
previousVisibleElements = new Set(initialElements.map(el => el.selector || el.xpath));
previousScreenshotHash = simpleHash(initialScreenshot);

console.log(`✅ 체크포인트 ${checkpointIndex++} 완료 (초기 상태)`);
```

### Main Loop: Continue Until Page End

**YOU MUST COMPLETE ALL 7 STEPS AT EACH VIEWPORT CHANGE:**

**1. 📐 Scroll Down (Small increments with ArrowDown)**
```javascript
// Small scroll increment (ArrowDown × 3-5 for fine-grained capture)
const SCROLL_INCREMENT = 3; // ~150-300px per checkpoint

for (let i = 0; i < SCROLL_INCREMENT; i++) {
  await mcp_kapture_keypress({ tabId, key: "ArrowDown" });
  await new Promise(resolve => setTimeout(resolve, 50));
}

// Wait for animations to settle
await new Promise(resolve => setTimeout(resolve, 300));
```

**2. 📸 Viewport State Capture**
```javascript
// Capture current state
const currentElements = await mcp_kapture_elements({ tabId, visible: "true" });
const currentScreenshot = await mcp_kapture_screenshot({ tabId });
```

**3. 🔍 Change Detection (Structural + Visual)**
```javascript
// 3-1. Structural change detection
const currentElementSet = new Set(currentElements.map(el => el.selector || el.xpath));

const newElements = [...currentElementSet].filter(
  sel => !previousVisibleElements.has(sel)
);
const removedElements = [...previousVisibleElements].filter(
  sel => !currentElementSet.has(sel)
);

const structuralChange = newElements.length >= 2 || removedElements.length >= 2;

// 3-2. Visual change detection (if no structural change)
let visualChange = false;
if (!structuralChange) {
  const currentHash = simpleHash(currentScreenshot);
  visualChange = currentHash !== previousScreenshotHash;
  previousScreenshotHash = currentHash;
}

// 3-3. Determine if checkpoint is needed
const significantChange = structuralChange || visualChange;
```

**4. 🔄 Checkpoint Creation (if change detected) - CANNOT BE SKIPPED**

⚠️ **ALL 6 SUB-STEPS ARE MANDATORY - NO EXCEPTIONS:**

```javascript
if (significantChange) {
  console.log(`✅ 체크포인트 ${checkpointIndex} 완료 - ${structuralChange ? '구조 변화' : '시각적 변화'} 감지`);
  
  // 4-1. ✅ MANDATORY: Write checkpoint header (CANNOT SKIP)
  // ⚠️ CRITICAL: Use replace_string_in_file tool, NOT PowerShell echo command
  // PowerShell echo causes UTF-16 encoding issues that corrupt the file
  const checkpointHeader = `
=== CHECKPOINT ${checkpointIndex} ===
Timestamp: ${new Date().toISOString()}
Viewport: Desktop 1440x900
Scroll Position: ~${checkpointIndex * 200}px
Change Type: ${structuralChange ? 'Structural' : 'Visual'}

📋 STRUCTURAL CHANGES:
- New Elements (${newElements.length}): ${newElements.slice(0, 5).join(', ')}
- Removed Elements (${removedElements.length}): ${removedElements.slice(0, 5).join(', ')}
`;

  // ✅ CORRECT: Use replace_string_in_file tool
  await replace_string_in_file({
    filePath: 'analysis/web-pipeline/00_analysis_note.txt',
    oldString: '---\n\n',  // Find last checkpoint separator
    newString: `---\n\n${checkpointHeader}`
  });
  
  // ❌ FORBIDDEN: Do NOT use these methods
  // await run_in_terminal(`echo "${content}" >> file.txt`);  // Causes encoding issues
  // await run_in_terminal(`Out-File ...`);  // Slower, unnecessary
  
  // 4-2. ✅ MANDATORY: Visual analysis (CANNOT SKIP)
  const visualAnalysis = `
🎨 VISUAL ANALYSIS:
- Colors: [AI analyzes screenshot: e.g., "Blue gradient #1E3A8A → #3B82F6"]
- Typography: [AI analyzes: e.g., "Heading 48px, weight 700, 'Noto Sans KR'"]
- Layout: [AI analyzes: e.g., "3-column grid with 24px gap"]
- Spacing: [AI analyzes: e.g., "Section padding 80px vertical, 0 horizontal"]
`;

  await replace_string_in_file({
    filePath: 'analysis/web-pipeline/00_analysis_note.txt',
    oldString: '---\n\n',
    newString: `${visualAnalysis}\n---\n\n`
  });
  
  // 4-3. ✅ MANDATORY: Animation detection (CANNOT SKIP)
  const isSectionTransition = newElements.length >= 5 || 
                              removedElements.length >= 5 ||
                              newElements.some(sel => sel.includes('section'));
  
  if (isSectionTransition) {
    console.log("🎬 섹션 전환 감지 - 애니메이션 프레임 추가 캡처");
    
    const animationHeader = `
🎬 ANIMATION DETECTION:
`;
    await replace_string_in_file({
      filePath: 'analysis/web-pipeline/00_analysis_note.txt',
      oldString: '---\n\n',
      newString: `${animationHeader}\n---\n\n`
    });
    
    // Capture animation frames (3-5 additional screenshots)
    for (let frame = 0; frame < 3; frame++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      await mcp_kapture_screenshot({ tabId });
      console.log(`   프레임 ${frame+1}/3 캡처`);
    }
    
    // Analyze and document animation details (8-field template)
    const animationDetails = `
- Subject: [AI observes: e.g., "Container ship with red cargo"]
- Visual Description: [AI describes: e.g., "Blue ship body, 3 red containers on deck"]
- Observed Behavior: [AI documents: e.g., "Moves left to right during scroll, ~1600px travel"]
- Trigger: [AI identifies: e.g., "scroll position 0-100%"]
- Technical Details: [AI infers: e.g., "GSAP ScrollTrigger with scrub:true, parallax effect"]
- Property Changes: [AI calculates: e.g., "translateX: -100px → 1500px, duration matches scroll"]
- Implementation Hint: [AI suggests: e.g., "gsap.to(ship, { x: 15, scrollTrigger: { scrub: true } })"]
`;
    
    await replace_string_in_file({
      filePath: 'analysis/web-pipeline/00_analysis_note.txt',
      oldString: '---\n\n',
      newString: `${animationDetails}\n---\n\n`
    });
  } else {
    // No animation detected
    const noAnimation = `
🎬 ANIMATION DETECTION: None detected in this viewport
`;
    await replace_string_in_file({
      filePath: 'analysis/web-pipeline/00_analysis_note.txt',
      oldString: '---\n\n',
      newString: `${noAnimation}\n---\n\n`
    });
  }
  
  // 4-4. ✅ MANDATORY: Test 10 interactive elements (CANNOT SKIP)
  // ⚠️ THIS STEP IS INTEGRATED - AI CANNOT PROCEED WITHOUT COMPLETING THIS
  console.log("🖱️ 인터랙티브 요소 테스트 시작... (필수 단계)");
  
  const interactiveElements = await mcp_kapture_elements({ 
    tabId, 
    selector: "button, a, input, textarea, select, [role='button'], [onclick]",
    visible: "true"
  });
  
  const elementsToTest = interactiveElements.slice(0, 10);
  let testedCount = 0;
  const interactionResults = [];
  
  for (const element of elementsToTest) {
    const selector = element.selector || element.xpath;
    
    try {
      // Test hover effect
      await mcp_kapture_hover({ tabId, selector });
      await mcp_kapture_screenshot({ tabId });
      
      // Test click (for buttons, links)
      if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.role === 'button') {
        await mcp_kapture_click({ tabId, selector });
        await mcp_kapture_screenshot({ tabId });
        interactionResults.push(`${element.tagName}:hover+click`);
      }
      
      // Test focus (for form inputs)
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        await mcp_kapture_click({ tabId, selector });
        await mcp_kapture_screenshot({ tabId });
        interactionResults.push(`${element.tagName}:focus`);
      }
      
      testedCount++;
      console.log(`   [${testedCount}/${elementsToTest.length}] Tested: ${element.tagName} - ${selector}`);
    } catch (error) {
      console.log(`   ⚠️ Failed to test: ${selector} - ${error.message}`);
    }
  }
  
  console.log(`✅ 인터랙션 테스트 완료: ${testedCount}개`);
  
  // 4-5. ✅ MANDATORY: Log interaction results (CANNOT SKIP)
  const interactionLog = `
🖱️ INTERACTIVE ELEMENTS TESTED (${testedCount} total):
${interactionResults.length > 0 ? interactionResults.map(r => `- ${r}`).join('\n') : '- No interactive elements found in this viewport'}

---

`;

  await replace_string_in_file({
    filePath: 'analysis/web-pipeline/00_analysis_note.txt',
    oldString: '---\n\n',
    newString: `${interactionLog}`
  });
  
  // 4-6. ✅ MANDATORY: Update tracking (CANNOT SKIP)
  checkpointIndex++;
  previousVisibleElements = currentElementSet;
  consecutiveNoChangeCount = 0;
  
} else {
  consecutiveNoChangeCount++;
  console.log(`⚠️ 변화 없음 ${consecutiveNoChangeCount}/${MAX_NO_CHANGE_THRESHOLD}`);
}
```

**5. ➡️ Next Checkpoint**
- ONLY proceed after steps 1-4 complete
- Report to user: "✅ 체크포인트 X 완료. 다음 체크포인트로 진행합니다."

### Completion Criteria
- ✅ **MINIMUM 30 checkpoints required** (if less than 30, analysis is INVALID - continue scrolling)
- ✅ All viewport changes captured (30-80 checkpoints depending on page complexity)
- ✅ Every animation detected and logged
- ✅ All interactive elements tested (minimum 50+ total interactions)
- ✅ Footer visible + 3 consecutive "no change" detections
- ✅ **Only ArrowDown key used** (PageDown, PageUp, End, Home are ALL FORBIDDEN)

### ❌ FORBIDDEN METHODS
```javascript
// ❌ NEVER USE
await mcp_kapture_keypress({ tabId, key: "End" }); // Jumps to bottom
await mcp_kapture_keypress({ tabId, key: "Home" }); // Jumps to top
await mcp_kapture_keypress({ tabId, key: "PageDown" }); // Jumps 800px, skips content
await mcp_kapture_keypress({ tabId, key: "PageUp" }); // Jumps backward
await mcp_kapture_click({ tabId }); // No selector = error

// ✅ ONLY USE
await mcp_kapture_keypress({ tabId, key: "ArrowDown" }); // Primary scroll (small increment)
```

### 🚨 ENFORCEMENT RULES

**IF AI SUGGESTS SHORTCUTS:**
1. User must reject and reference this section
2. AI must acknowledge: "모든 뷰포트 변화를 캡처할 때까지 계속하겠습니다"
3. Resume from last completed checkpoint

**PROGRESS REPORTING:**
- After every 3 checkpoints, report: "체크포인트 X/30 완료 (최소 30개 필요, 현재 진행 중)"
- When reaching 30: "✅ 최소 체크포인트 30개 달성. 계속 진행합니다."
- Do NOT say: "빠르게", "효율적으로", "주요 섹션", "더 큰 간격으로"
- Only say: "다음 체크포인트로 진행" or "진행 중"

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

### Web Development (`/web`)

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

---

## Pipeline Details

### Web Pipeline

#### 00. Real-Time Analysis Logging (NEW)
- **File:** `analysis/web-pipeline/00_analysis_note.txt`
- **Purpose:** Capture detailed observations during web exploration
- **Content:** Checkpoint-by-checkpoint documentation of visual elements, animations, interactions
- **Usage:** Primary reference for generating 01_contents and 02_style JSON files
- **Format:**
  ```
  === CHECKPOINT X ===
  - Structural Changes: New/removed elements
  - Visual Analysis: Colors, typography, layout, spacing
  - Animation Detection: Subject, behavior, trigger, implementation hints
  - Interactive Elements: Hover/click/focus test results
  ```

#### 01. Web Content Analysis
- **Input:** `00_analysis_note.txt` (accumulated observations)
- Site structure, SEO, navigation, interactive elements
- Output: Page structure, navigation hierarchy, metadata
- **Critical:** Preserve ALL observed details (animations, interactions, complex features)
- **Method:** Read 00_analysis_note.txt → Extract structural/content data → Generate JSON

#### 02. Web Style Analysis
- **Input:** `00_analysis_note.txt` (accumulated observations)
- Responsive design tokens, component states, CSS specifications
- Output: Color system, typography, spacing, component patterns
- **Critical:** Document animation types, scroll behaviors, 3D effects with full context
- **Method:** Read 00_analysis_note.txt → Extract visual/style data → Generate JSON

#### 03. Web Integration
- Merge content + style into complete developer spec
- Output: Page-by-page specifications, component library
- **Critical:** Maintain detailed implementation instructions from analysis phase
- **Method:** PowerShell merge script (see below)
- **Validation:** Auto-verify no information loss (see validation section below)

#### 03-0. Integration Generation Method (MANDATORY)

**⚠️ CRITICAL: Use PowerShell Script - NOT AI Direct Generation**

**Problem:** 
- AI token limit (~4K-8K tokens) causes automatic content simplification
- AI writing JSON directly results in 70% data loss (e.g., 1367 lines → 392 lines)
- Section-by-Section approach still simplifies internal details (stepCards details omitted, visual fields truncated)

**Root Cause:**
```javascript
// ❌ AI tries to write from memory → automatic summarization
const section = {
  stepCards: [
    { title: "..." }  // Details omitted due to token pressure
  ]
}

// ✅ Script copies entire objects → zero data loss
const section = contents.sections.find(s => s.id === "section-02");
integrated.sections.push({ ...section, style: style.components[section.id] });
```

**Solution: PowerShell Merge Script**

**AI must execute this command instead of generating JSON:**
```powershell
powershell -ExecutionPolicy Bypass -File "scripts\integrate_web_pipeline.ps1"
```

**Script performs:**
1. Load 01_contents_web.json + 02_style_web.json as objects
2. For each section: `merged = { ...contentSection, style: styleComponent }`
3. Add global style data (animations, designTokens, responsive, accessibility, seo)
4. Write 03_integrate_web.json with full data preservation
5. Auto-validate (ranges, codeHints, colors)

**Expected Results:**
- File size: 1200-1500 lines (vs AI's 392 lines)
- codeHint preservation: 16/16 (100%, vs AI's 8/16)
- Range preservation: All fontSize ranges maintained
- Color preservation: All hex values maintained

**Mandatory Workflow:**
```
Step 1: AI detects /integrate command
Step 2: AI calls run_in_terminal with PowerShell script
Step 3: Script outputs validation results
Step 4: AI reports success/failure to user
Step 5: STOP (do NOT attempt to generate JSON manually)
```

**Old Method (DEPRECATED - DO NOT USE):**
~~Section-by-Section generation with replace_string_in_file~~
- ❌ Caused 70% data loss
- ❌ AI simplified stepCards, visual fields, animation details
- ❌ Token limit hit during each section generation

#### 04. Code Generation
- **Method:** PowerShell HTML generator script (see below)
- **Option A:** Tailwind Single-Page → `scripts/generate_html.ps1`
- **Option B:** (Future) React Components → `scripts/generate_react.ps1`

#### 04-0. HTML Generation Method (MANDATORY) - UPDATED v2.17.0

**⚠️ CRITICAL: Use Incremental Template Building (A-1 Method)**

### **Problem Analysis:**
- **Previous method:** Single PowerShell script with generic templates
- **Result:** 70% data loss (1229 lines → 367 lines)
- **Root cause:** Templates too simple, complex features ignored

### **NEW Solution: Complete Segmentation (A-1 Option)**

**Core Principle:** Build each section type as a dedicated, fully-featured template function

**AI MUST follow this workflow automatically (NO manual intervention between tasks):**

```
Task 1: Helper Functions → Task 2: Hero Template → Task 3: Feature Template → ... → Task 18: Final Integration
```

**DO NOT wait for user confirmation between tasks. Execute sequentially.**

---

### **Mandatory Task Sequence (Auto-Execute)**

#### **Phase 1: Foundation (Tasks 1-2)**

**Task 1: PowerShell Helper Functions**
```powershell
# Add to scripts/generate_html.ps1

function Get-NestedProperty {
    param($Object, $Path)
    # Navigate JSON structure: "section.visual.type"
}

function ConvertTo-TailwindClass {
    param($StyleObject)
    # Convert: { fontSize: "60-72px", color: "#FF6635" } 
    # → "text-6xl md:text-7xl text-[#FF6635]"
}

function Render-HtmlElement {
    param($ElementType, $Attributes, $Content, $Children)
    # Recursive rendering with proper nesting
}
```

**Task 2: Section Renderer Infrastructure**
```powershell
function Render-Section {
    param($Section)
    
    switch ($Section.type) {
        "hero-section" { Render-HeroSection $Section }
        "feature-section" { Render-FeatureSection $Section }
        "workflow-section" { Render-WorkflowSection $Section }
        # ... (14 types total)
    }
}
```

#### **Phase 2: Section Templates (Tasks 3-15)**

**Task 3: Render-HeroSection**
```powershell
function Render-HeroSection {
    param($Section)
    
    # MUST include ALL elements:
    # 1. Main heading
    # 2. CTA buttons (primary + secondary)
    # 3. 3D Planet Parallax (if $Section.visual.type -eq "3d-planet-parallax")
    # 4. Logo Marquee (with animation keyframe)
    # 5. Bottom Content boxes
    # 6. Integrations list (with green-dot indicator)
    
    # Insert $Section.visual.codeHint directly (NO interpretation)
    # Insert $Section.logoMarquee.codeHint directly
}
```

**Task 4: Render-FeatureSection**
```powershell
function Render-FeatureSection {
    param($Section)
    
    # MUST include:
    # 1. Badge (if exists)
    # 2. Heading + Subheading
    # 3. Code Snippet Preview (if $Section.visual.type -eq "code-snippet-preview")
    # 4. Action Buttons (with color-coded borders)
    # 5. Visual element (insert codeHint)
}
```

**Task 5: Render-WorkflowSection**
```powershell
function Render-WorkflowSection {
    param($Section)
    
    # MUST include:
    # 1. Badge + Heading + Subheading
    # 2. Step Cards (iterate $Section.stepCards)
    #    - Step number badge
    #    - Title + Subtitle
    #    - Details list (properly formatted bullets)
    #    - Icons (checkmark, x)
    # 3. Sequential animation (insert $Section.animation.codeHint)
}
```

**Task 6: Render-ValidationSection**
```powershell
function Render-ValidationSection {
    param($Section)
    
    # Validation-specific layout
}
```

**Task 7: Render-FeatureShowcase**
```powershell
function Render-FeatureShowcase {
    param($Section)
    
    # Large visual showcase layout
}
```

**Task 8: Render-TwoColumnFeatures**
```powershell
function Render-TwoColumnFeatures {
    param($Section)
    
    # Left/right split layout
}
```

**Task 9: Render-OnboardingSteps**
```powershell
function Render-OnboardingSteps {
    param($Section)
    
    # Numbered steps with progression
}
```

**Task 10: Render-SecuritySection**
```powershell
function Render-SecuritySection {
    param($Section)
    
    # Security badges and certifications
}
```

**Task 11: Render-FeatureCards**
```powershell
function Render-FeatureCards {
    param($Section)
    
    # Grid of feature cards
}
```

**Task 12: Render-Banner**
```powershell
function Render-Banner {
    param($Section)
    
    # Full-width banner
}
```

**Task 13: Render-CTASection**
```powershell
function Render-CTASection {
    param($Section)
    
    # Call-to-action layout
}
```

**Task 14: Render-FAQSection**
```powershell
function Render-FAQSection {
    param($Section)
    
    # MUST include:
    # 1. Heading
    # 2. Accordion structure (<details> elements)
    # 3. Q&A pairs from $Section.faqs (if exists)
    # 4. Animation (insert codeHint)
}
```

**Task 15: Render-Footer**
```powershell
function Render-Footer {
    param($Section)
    
    # MUST include:
    # 1. Newsletter form ($Section.newsletter)
    # 2. Navigation columns ($Section.columns)
    # 3. Social icons ($Section.socialIcons)
    # 4. Legal links ($Section.legal.links)
    # 5. Copyright ($Section.legal.copyright)
}
```

#### **Phase 3: Integration (Tasks 16-18)**

**Task 16: Animation Script Builder**
```powershell
function Build-AnimationScripts {
    param($Sections)
    
    $needsGSAP = $false
    $needsThree = $false
    $animationCode = ""
    
    foreach ($section in $Sections) {
        # Check section.visual.codeHint
        # Check section.animation.codeHint
        # Detect library requirements
        # Accumulate all animation code
    }
    
    # Return: library CDNs + complete <script> block
}
```

**Task 17: UTF-8 Encoding Fix**
```powershell
# Ensure all file operations use:
Set-Content -Path $path -Value $html -Encoding UTF8 -NoNewline

# Replace bullet points properly:
$text = $text -replace '•', '&bull;'
$text = $text -replace '→', '&rarr;'
```

**Task 18: Final Integration**
```powershell
# Main script flow:
1. Load 03_integrate_web.json
2. Generate HTML head
3. For each section: Call Render-Section($section)
4. Build animation scripts
5. Close HTML
6. Write with UTF-8
7. Validate (14 sections, all animations, all features)
```

---

### **Execution Rules**

**AI MUST:**
1. ✅ Execute all 18 tasks sequentially WITHOUT pausing
2. ✅ After each task, immediately proceed to next
3. ✅ Use manage_todo_list to track progress
4. ✅ Report completion after each task: "✅ Task X/18 complete"
5. ✅ Continue until all 18 tasks done

**AI MUST NOT:**
1. ❌ Wait for user confirmation between tasks
2. ❌ Ask "should I proceed?" (just proceed)
3. ❌ Stop after a single task
4. ❌ Simplify or skip any task

---

### **Expected Results**

- File size: 2000-4000 lines (depends on complexity)
- Section rendering: 100% (all 14 sections with full content)
- Feature preservation: 95%+ (all complex features implemented)
- Animation preservation: 100% (all codeHints inserted)
- Text accuracy: 100% (no encoding errors)

---

### **Old Method (DEPRECATED - DO NOT USE):**
~~Single PowerShell script with generic switch statement~~
- ❌ Caused 70% data loss
- ❌ Complex features ignored
- ❌ No recursive JSON navigation

---

## ⚠️ CRITICAL: JSON Analysis Schema - PREVENT INFORMATION LOSS

### Problem: Analysis Detail Loss
**Issue:** AI analyzes in detail ("ship moves in 3D scroll animation") but simplifies in JSON ("3D animation")  
**Impact:** Integration JSON lacks implementation details → Generated code is incomplete

### Solution: Implementation-Ready Descriptions

**❌ FORBIDDEN: Abstract Classification**
```json
{
  "animation": {
    "type": "3d-canvas-animation",
    "description": "3D animation effect"
  }
}
```
→ Developer cannot implement this

**✅ REQUIRED: Concrete Implementation Details**
```json
{
  "animation": {
    "subject": "파란색 화물선과 빨간색 컨테이너 3개",
    "visualDescription": "Blue cargo ship body with 3 red containers on deck, white cabin",
    "observedBehavior": "스크롤 0-100% 구간에서 화면 왼쪽(-100px)에서 오른쪽(1500px)으로 수평 이동. 배 위 컨테이너가 2초 주기로 상하 미세 흔들림 (translateY: -5px ~ +5px)",
    "type": "3d-canvas-animation",
    "trigger": "scroll position 0-100%",
    "technicalImplementation": "Three.js GLTFLoader + GSAP ScrollTrigger { scrub: true }",
    "propertyChanges": "translateX: -100px → 1500px, translateY: -5px ↔ +5px (sine wave)",
    "codeHint": "gsap.to(shipMesh.position, { x: 15, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } }); // + sine wave animation for containers"
  }
}
```
→ Developer can implement immediately

### 8-Field Documentation Template (MANDATORY)

For EVERY animation, interaction, or complex feature, include ALL 8 fields:

1. **subject** - "Container ship with cargo" (what is animating)
2. **visualDescription** - "Blue cargo ship with red containers" (visual appearance)
3. **observedBehavior** - "Ship travels left to right as user scrolls" (what happens)
4. **type** - "3d-canvas-animation" | "video-player" | "svg-path-animation" (technical category)
5. **trigger** - "scroll position 0-100%" | "hover" | "click" (what causes it)
6. **technicalImplementation** - "Three.js with ScrollTrigger" | "CSS 3D transforms" (how to build)
7. **propertyChanges** - "translateX: -100px → 1500px" | "opacity: 0 → 1" (CSS/JS changes)
8. **codeHint** - Pseudo-code or actual snippet (implementation example)

### Real-World Example Comparison

**❌ BAD (Abstract):**
```
Checkpoint 5 - Animation detected: 3D effect
```

**✅ GOOD (Concrete):**
```
=== CHECKPOINT 5 ===
🎬 ANIMATION DETECTION:
- Subject: 컨테이너 화물선 (파란색 선체 + 빨간색 컨테이너 3개 + 흰색 선실)
- Visual Description: Blue cargo ship body, 3 red containers stacked on deck, white cabin on top
- Observed Behavior: 스크롤 다운 시 왼쪽에서 오른쪽으로 수평 이동 (~1600px travel). 동시에 배 위 컨테이너가 2초 주기로 미세 상하 흔들림 (파도 효과)
- Trigger: scroll position 0% → 100% (hero section)
- Technical Details: Three.js scene with GLTF model + GSAP ScrollTrigger { scrub: true }
- Property Changes: 
  - translateX: -100px (left offscreen) → 1500px (right offscreen)
  - translateY: -5px ↔ +5px (sine wave, 2s period)
- Implementation Hint:
  ```javascript
  // Load ship model
  const loader = new GLTFLoader();
  loader.load('ship.gltf', (gltf) => {
    const ship = gltf.scene;
    
    // Scroll animation
    gsap.to(ship.position, {
      x: 15,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });
    
    // Container wave effect
    gsap.to(ship.children[0].position, {
      y: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  ```
```

### Checkpoint Logging Format (Updated)

```json
{
  "checkpoint": "5",
  "changeType": "structural|visual|animation",
  "detectedFeatures": [
    {
      "subject": "container ship with cargo",
      "visualDescription": "Blue cargo ship body, 3 red containers, white cabin",
      "observedBehavior": "Horizontal scroll-linked movement + vertical wave motion",
      "type": "3d-canvas-animation",
      "trigger": "scroll position 0-100%",
      "technicalImplementation": "Three.js GLTFLoader + GSAP ScrollTrigger",
      "propertyChanges": "translateX(-100px → 1500px), translateY(-5px ↔ +5px)",
      "codeHint": "gsap.to(shipMesh.position, { x: 15, scrollTrigger: { scrub: true } }) + sine wave"
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
Step 4: Execute PowerShell merge script
  ↓
  Command: powershell -ExecutionPolicy Bypass -File "scripts\integrate_web_pipeline.ps1"
  ↓
  Script performs:
    - Load 01_contents_web.json + 02_style_web.json
    - Merge all sections (full data preservation)
    - Add animations, designTokens, responsive, accessibility, seo
    - Write 03_integrate_web.json
    - Auto-validate (ranges, codeHints, colors)
  ↓
  Expected output:
    - File size: 1200-1500 lines
    - Validation: PASSED (all checks green)
  ↓
⚠️ AUTO-STOP HERE ⚠️
Output: "✅ 통합 완료 (1229 lines, validation PASSED). 코드 생성이 필요하면 /generate를 입력하세요."
```

**⚠️ CRITICAL: DO NOT use Section-by-Section manual generation**

**Why PowerShell script is mandatory:**
- AI token limit causes 70% data loss when writing JSON directly
- Script preserves 100% of original data (1229 lines vs AI's 392 lines)
- Script handles all validation automatically

**If script fails:**
1. Check script exists: `scripts\integrate_web_pipeline.ps1`
2. Check source files exist: `01_contents_web.json`, `02_style_web.json`
3. Report error to user with full error message
4. Do NOT attempt manual JSON generation as fallback


**⚠️ CRITICAL: `/integrate` No Simplification Policy**

When merging `01_contents_web.json` + `02_style_web.json` into `03_integrate_web.json`:

❌ **FORBIDDEN Operations:**
1. **Range Simplification**: `"60-72px"` → `"72px"` (단일값 변환)
2. **Detail Removal**: Deleting `codeHint`, `propertyChanges`, `technicalImplementation` fields
3. **Color Generalization**: `"#FF6635"` → `"orange"` (구체적 → 추상적)
4. **Animation Loss**: Removing GSAP/Three.js code snippets
5. **Property Omission**: Skipping any field present in source JSONs

✅ **REQUIRED Operations:**
1. **Preserve Ranges**: Keep `"60-72px"`, `"48-56px"` as-is (ranges stay ranges)
2. **Merge 8-Field Templates**: All animation fields must be included
   - `subject`, `visualDescription`, `observedBehavior`
   - `type`, `trigger`, `technicalImplementation`
   - `propertyChanges`, `codeHint`
3. **Exact Color Values**: Use hex codes from source (`#FF6635`, not "primary-orange")
4. **Code Preservation**: Include all implementation hints from 01/02
5. **Context Addition**: Add page-level organization, but don't remove details

**Validation Rule:**
- After generating `03_integrate_web.json`, AI must verify:
  - Field count in 03 ≥ Field count in (01 + 02)
  - All `codeHint` fields present
  - All color hex values preserved
  - All font size ranges maintained

**Command: `/generate` (Manual Request Only)**
```
Step 5: Execute HTML generation script
  ↓
  Command: powershell -ExecutionPolicy Bypass -File "scripts\generate_html.ps1"
  ↓
  Script performs:
    - Load 03_integrate_web.json as object
    - Generate HTML head with design tokens (colors, fonts)
    - Apply section templates (hero, features, steps, cta, footer)
    - Insert animation codeHints directly (no AI interpretation)
    - Add required libraries (GSAP, Three.js) based on animation types
    - Write index.html with full feature implementation
    - Auto-validate (section count, animation count, library includes)
  ↓
  Expected output:
    - File size: 1500-3000 lines (depends on complexity)
    - Validation: PASSED (all sections rendered, all animations included)
  ↓
✅ COMPLETE
Output: "✅ 코드 생성 완료 (2341 lines, validation PASSED)."
```

**⚠️ CRITICAL: DO NOT use Section-by-Section manual generation**

**Why PowerShell script is mandatory:**
- AI token limit causes animation/interaction loss during HTML generation
- Script preserves 100% of codeHints (inserts directly without interpretation)
- Script handles template rendering without simplification

**If script fails:**
1. Check script exists: `scripts\generate_html.ps1`
2. Check integration file exists: `03_integrate_web.json`
3. Report error to user with full error message
4. Do NOT attempt manual HTML generation as fallback

---

## 🚨 AI BEHAVIOR ENFORCEMENT

### Mandatory Responses to User Requests

**IF USER SAYS:** "너무 느리다" / "빠르게 해줘" / "효율적으로"
**AI MUST RESPOND:**
```
지침에 따라 정확한 분석을 위해 모든 콘텐츠를 상세히 캡처해야 합니다.
현재 체크포인트 X/30 완료 (최소 30개 필요). 계속 진행하겠습니다.
```

**THEN:** Continue systematic analysis from last checkpoint

### Progress Tracking (Mandatory)

**After Every 3 Checkpoints:**
```
✅ 체크포인트 3/30 완료 (최소 30개 필요, 현재 진행 중)
- 캡처된 요소: [list]
- 감지된 애니메이션: [list]
- 다음: 체크포인트 4
```

**When Reaching Checkpoint 30:**
```
✅ 최소 체크포인트 30개 달성! 계속 진행합니다 (현재 30/목표 ~50).
```

### Prohibited Phrases

❌ **NEVER SAY:**
- "빠르게 분석하겠습니다"
- "주요 섹션만 캡처하겠습니다"
- "효율적인 방법으로"
- "시간을 절약하기 위해"

✅ **ALWAYS SAY:**
- "체크포인트 X/30 완료 (최소 30개 필요, 진행 중)"
- "다음 체크포인트로 이동"
- "진행 중"

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
- [ ] Full page scroll (adaptive checkpoints until page end)
- [ ] Navigation exploration (header/footer/mobile menu)
- [ ] Interactive elements (buttons, modals, forms)
- [ ] Route traversal (BFS, depth=3)
- [ ] Accessibility/SEO verification

### Completion Criteria
1. ✅ 30-80 screenshots per page (viewport change detection, fine-grained capture)
2. ✅ Footer visible (page end reached)
3. ✅ All interactive elements tested (minimum 50+ total interactions)
4. ✅ All animation frames captured
5. ✅ Route map complete
6. ✅ Evidence logged in analysis files

---

## Version History

- **v2.17.0** (2025-01-16): Incremental Template Building - A-1 Complete Segmentation Method
  - **CRITICAL:** Replaced single PowerShell script with 18-task sequential execution
  - **Problem:** v2.16.0 PowerShell script still caused 70% data loss (1229 → 367 lines)
    - Root cause: Generic templates couldn't handle complex JSON structures
    - Example: 3D Planet Parallax completely omitted, Step Cards content missing
  - **Solution:** Complete section-by-section template builder approach
    - Phase 1: Helper functions (Get-NestedProperty, ConvertTo-TailwindClass, Render-HtmlElement)
    - Phase 2: 13 dedicated section renderers (Hero, Feature, Workflow, etc.)
    - Phase 3: Animation script builder + UTF-8 encoding fix + final integration
  - **Task Execution Model:**
    - AI executes all 18 tasks sequentially WITHOUT user intervention
    - manage_todo_list tracks progress automatically
    - NO pausing between tasks (continuous execution)
    - Report "✅ Task X/18 complete" after each task
  - **Expected Results:**
    - File size: 2000-4000 lines (full complexity preserved)
    - Section rendering: 100% (all 14 sections with complete content)
    - Feature preservation: 95%+ (3D visuals, code previews, step cards all included)
    - Animation preservation: 100% (all codeHints inserted verbatim)
    - Text accuracy: 100% (UTF-8 encoding fixed)
  - **Workflow Changes:**
    - Updated "04-0. HTML Generation Method" with A-1 methodology
    - Added mandatory task sequence (Tasks 1-18)
    - Added execution rules (auto-proceed, no user confirmation)
    - Marked v2.16.0 single-script approach as "DEPRECATED"
  - **Impact:** Eliminates all remaining data loss, achieves 95%+ original site fidelity
- **v2.16.0** (2025-01-16): PowerShell HTML Generator (DEPRECATED - See v2.17.0)
  - **CRITICAL:** Replaced AI-based HTML generation with PowerShell template script
  - **Root Cause:** AI token limit causes animation/interaction loss during HTML generation
    - Example: Complex animations, GSAP/Three.js snippets omitted
    - Section-by-Section approach still simplified codeHints and complex features
  - **Solution:** `scripts/generate_html.ps1` performs template-based HTML generation
    - Loads 03_integrate_web.json as PowerShell object
    - Applies type-specific templates (hero, features, steps, cta, footer)
    - Inserts codeHints directly without AI interpretation
    - Auto-detects and includes required libraries (GSAP, Three.js)
    - Auto-validates section count, animation count, library includes
  - **Results:** 1500-3000 lines HTML (depends on complexity)
    - Section preservation: 100% (all sections rendered with full styles)
    - Animation preservation: 100% (all codeHints inserted verbatim)
    - Library inclusion: Auto-detected based on animation types
  - **Workflow Changes:**
    - Updated "04. Code Generation" method: Section-by-Section → PowerShell script
    - Updated Execution Workflow: `/generate` now executes PowerShell command
    - Deleted "📐 HTML Generation Workflow" section (150+ lines, now obsolete)
    - Marked old method as "DEPRECATED - DO NOT USE"
  - **Impact:** Eliminates all HTML generation data loss, ensures full feature implementation
- **v2.15.0** (2025-01-16): PowerShell Integration Pipeline (CRITICAL FIX)
  - **CRITICAL:** Replaced AI-based JSON generation with PowerShell merge script
  - **Root Cause:** AI token limit (4K-8K) caused 70% data loss during integration
    - Example: 01_contents (781 lines) + 02_style (586 lines) → AI output (392 lines)
    - Lost data: stepCards details, codeHint fields, fontSize ranges, color hex values
  - **Solution:** `scripts/integrate_web_pipeline.ps1` performs object-level merging
    - Loads JSON as PowerShell objects (ConvertFrom-Json)
    - Merges without AI involvement: `$section + $style[$section.id]`
    - Writes with full preservation (ConvertTo-Json -Depth 100)
    - Auto-validates: ranges, codeHints, colors
  - **Results:** 1229 lines (vs AI's 392 lines, 213% increase)
    - codeHint preservation: 16/16 (100%, vs AI's 8/16)
    - Range preservation: 34 ranges (vs AI's 1)
    - Color preservation: 74 hex values (vs AI's 37)
  - **Workflow Changes:**
    - Updated "03. Web Integration" method: Section-by-Section → PowerShell script
    - Updated Execution Workflow: `/integrate` now executes PowerShell command
    - Marked old method as "DEPRECATED - DO NOT USE"
  - **Impact:** Eliminates all integration data loss, ensures developer-implementable specifications
- **v2.14.0** (2025-01-16): Section-by-Section Integration - Token Limit Workaround (DEPRECATED)
  - **NOTE:** This version is now DEPRECATED - see v2.15.0 for PowerShell solution
  - ~~Restructured `/integrate` command to use incremental file generation~~
  - ~~Problem: AI token limit caused truncation/syntax errors in 2000+ line JSON files~~
  - ~~Solution: Section-by-Section generation with progress tracking~~ (Failed - 70% data loss)
  - **Root Issue:** AI still simplified internal fields despite incremental approach
- **v2.13.0** (2025-01-16): Integration Validation System + No Simplification Policy (SUPERSEDED by v2.15.0)
  - **NOTE:** This version is now SUPERSEDED - v2.15.0 PowerShell script handles validation automatically
  - ~~Added mandatory validation after `/integrate` command execution~~ (Now done by script)
  - **No Simplification Policy (Still Valid):**
    - Added 5 FORBIDDEN operations (range simplification, detail removal, color generalization, animation loss, property omission)
    - Added 5 REQUIRED operations (preserve ranges, merge 8-field templates, exact colors, code preservation, context addition)
  - ~~Auto-Validation Logic~~ (Now in PowerShell script)
  - ~~AI Output Format~~ (Script outputs validation results)
  - ~~Enforcement: If validation fails, AI must regenerate~~ (Script handles retry logic)
  - **Impact:** Principles remain valid, but implementation moved to PowerShell script
- **v2.12.0** (2025-01-16): File Writing Method Standardization - Encoding Fix
  - **CRITICAL:** Replaced all `appendToAnalysisNote()` calls with `replace_string_in_file` tool
  - **Reason:** PowerShell's `echo` command causes UTF-16 encoding issues (fullwidth space corruption)
  - **Changes:**
    - Step 4-1: Added explicit warning about PowerShell echo
    - Step 4-2: Changed to replace_string_in_file
    - Step 4-3: Changed to replace_string_in_file (both animation paths)
    - Step 4-5: Changed to replace_string_in_file
  - **Result:** All checkpoint logs now written with correct UTF-8 encoding
  - **Impact:** Fixes "= = =   C H E C K P O I N T" corruption issue permanently
- **v2.11.0** (2025-01-16): Checkpoint Completion Enforcement + Extended Behavioral Triggers
  - **CHECKPOINT COMPLETION ENFORCEMENT:** Added mandatory output template after each checkpoint
  - **Self-Check Questions:** Added 6-item verification list before moving to next checkpoint
  - **Behavioral Triggers:** Added 4 new forbidden phrases from actual violation logs
    - "이 속도로는 시간이 많이 걸릴 것 같으므로..."
    - "진행 속도를 높이겠습니다..."
    - "한 번에 더 많은..."
    - "더 많은 스크롤이 필요합니다..."
  - **Progressive Scroll:** Clarified "ArrowDown ONLY" and "ALL 6 steps per checkpoint"
  - **Reason:** v2.10.0 test showed AI still skipped Step 4 sub-steps despite guidelines
  - **Result:** Forces AI to output completion checklist, self-verify before proceeding
- **v2.10.0** (2025-01-16): Critical Enforcement Update - PageDown Prevention
  - **ABSOLUTE PROHIBITIONS:** Updated item #5 to explicitly list all forbidden keys
  - **EXECUTION VALIDATION:** Rewrote validateScrollCommand with Step 1-2 pre-execution check
  - **Behavioral Triggers:** Added 5 new forbidden phrases ("효율적으로 분석", "더 큰 간격으로")
  - **Step 4:** Added "CANNOT BE SKIPPED" header with ⚠️ ALL 6 SUB-STEPS ARE MANDATORY
  - **Step 4-4:** Added "(필수 단계)" to console log, "⚠️ THIS STEP IS INTEGRATED" warning
  - **Completion Criteria:** Changed from text to code block with ❌ NEVER USE examples
  - **ENFORCEMENT RULES:** Updated progress reporting format to "X/30"
  - **Reason:** v2.9.0 test showed AI still used PageDown despite guidelines (15+ violations)
  - **Result:** Forces AI to validate BEFORE every keypress, blocks PageDown at decision point
- **v2.9.0** (2025-01-16): Real-Time File Append Architecture
  - **Critical:** Restructured Step 4 to prioritize file writes over memory operations
  - Changed from single large write to progressive append operations (4-1 → 4-2 → 4-3 → 4-4 → 4-5)
  - File write sequence: Header → Visual Analysis → Animation → Interaction Test → Results
  - Each analysis component writes immediately after completion (no batching)
  - Removed Steps 5-6 (consolidated into Step 4's append operations)
  - **Result:** Ensures checkpoint data persists incrementally, prevents memory overflow, enables real-time progress monitoring
  - **Reason:** Large pages (100+ checkpoints) caused memory issues with batch writes
- **v2.8.0** (2025-01-15): Real-Time Analysis Logging & Concrete Documentation
  - **Critical:** Added 00_analysis_note.txt real-time logging system
  - Integrated checkpoint-by-checkpoint documentation into Progressive Scroll Analysis
  - Added mandatory 8-field template for animations/interactions (subject, visualDescription, observedBehavior, type, trigger, technicalImplementation, propertyChanges, codeHint)
  - Updated Pipeline Details: 01_contents and 02_style now read from 00_analysis_note.txt
  - Added concrete vs abstract examples to prevent information loss
  - Enhanced JSON schema with implementation-ready descriptions
  - **Result:** Prevents detail loss from analysis to JSON generation, ensures developer-implementable specifications
  - **Reason:** Previous system lost critical implementation details during JSON generation phase
- **v2.7.0** (2025-01-14): Documentation Optimization & Deduplication
  - **Critical:** Reduced file size from 1057 lines to 773 lines (27% reduction)
  - Removed 150+ lines of verbose JSON examples while preserving core templates
  - Consolidated redundant workflow descriptions (Phase 1-3 simplified)
  - Streamlined Tailwind conversion table (removed verbose mappings)
  - Removed duplicate "User Input Format" examples
  - **Result:** Maintains complete functionality with improved readability
  - **Reason:** 1000+ line file was difficult to navigate, contained excessive examples
- **v2.6.0** (2025-01-14): Interaction Testing Enforcement - Pipeline Fix
  - **Critical:** Moved interaction testing from Step 5 to Step 4 (integrated, cannot skip)
  - Added testedCount counter and console logging for transparency
  - Updated logging format: `interactionsTested.count` + `interactionsTested.elements`
  - Renumbered steps: 1-4 (integrated), 5 (logging), 6 (next checkpoint)
  - **Result:** Forces AI to test 10 interactions per checkpoint = 300-800 total tests
  - **Reason:** v2.5.0 test showed AI skipped all interactions (5/50 = 10%)
- **v2.5.0** (2025-01-14): Runtime Enforcement & Minimum Checkpoint Validation
  - Added validateScrollCommand() auto-detection system (EXECUTION VALIDATION)
  - Added MIN_CHECKPOINTS = 30 constant with validation logic
  - Enhanced PROGRESS REPORTING with "X/30" format and milestone messages
  - Added Behavioral Triggers detection (AI self-check before deviation)
  - Updated Completion Criteria to explicitly reject analysis with < 30 checkpoints
  - Strengthened ENFORCEMENT RULES to prevent PageDown/End key usage
  - **Result:** Forces AI to complete minimum 30 checkpoints, prevents premature shortcuts
- **v2.4.0** (2025-01-14): High-Fidelity Scroll Analysis System
  - Changed from fixed 21 checkpoints to adaptive 30-80 checkpoints
  - Implemented ArrowDown-based fine-grained scrolling (150-300px increments)
  - Added structural + visual change detection (dual-mode)
  - Implemented animation frame capture (3-5 frames per section transition)
  - Added screenshot hash comparison for visual changes
  - Updated all related sections (ABSOLUTE PROHIBITIONS, ENFORCEMENT RULES, MCP Checklist)
  - Expected result: 3-4x more detailed analysis with complete animation coverage
- **v2.3.0** (2025-11-11): Added HTML Generation Workflow (DEPRECATED in v2.16.0)
  - **NOTE:** This version is now DEPRECATED - see v2.16.0 for PowerShell solution
  - ~~Step-by-step section-based generation strategy~~ (Replaced by PowerShell script)
  - ~~Todo list planning and progress tracking~~ (No longer needed)
  - ~~JSON-to-HTML mapping guidelines~~ (Automated by template engine)
  - ~~Tailwind conversion reference table~~ (Automated by script)
  - **Root Issue:** AI token limit caused feature simplification during HTML generation
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
