# 🔍 파이프라인 충돌 분석 리포트

**작성일:** 2025-11-10  
**분석 대상:** 전체 지침 문서 및 파이프라인 구조  
**목적:** 서로 충돌하는 지침 식별 및 통합 방안 제시

---

## 📊 전체 문서 구조 현황

### 주요 지침 문서들

| 파일명 | 위치 | 역할 | 상태 |
|--------|------|------|------|
| `copilot-instructions.md` | `.github/` | **메인 시스템 지침** (3,427줄) | ✅ 활성 |
| `PIPELINE_GUIDE.md` | 루트 | 사용자 가이드 (한글) | ✅ 활성 |
| `MCP_TOOL_GUIDE.md` | 루트 | MCP 도구 사용법 (한글) | ✅ 활성 |
| `MULTIPASS_IMPLEMENTATION.md` | 루트 | 멀티패스 전략 설명 | ⚠️ 중복 |
| `AI_BEHAVIOR_ANALYSIS.md` | 루트 | AI 행동 패턴 분석 | ⚠️ 참고용 |
| `CRITICAL_CHECKLIST.md` | `.github/` | 필수 실행 체크리스트 | ⚠️ 중복 |
| `MULTIPASS_STRATEGY.md` | `.github/` | 5패스 전략 상세 | ⚠️ 중복 |
| `explore_website_agent.js` | `scripts/` | DOM 탐색 자동화 스크립트 | ⚠️ 미사용 |
| `01_contents_web.json` | `instruction/web-pipeline/` | 콘텐츠 분석 로직 | ❌ 빈 파일 |
| `02_style_web.json` | `instruction/web-pipeline/` | 스타일 분석 로직 | ❌ 빈 파일 |
| `04_generate_tailwind.json` | `instruction/web-pipeline/generators/` | Tailwind 생성 로직 | ✅ 활성 |

---

## 🚨 발견된 주요 충돌 사항

### 1. MCP 도구 선택 충돌 ⚠️⚠️⚠️

**충돌 내용:**

#### copilot-instructions.md (라인 1-200)
```markdown
### ⚠️ CRITICAL: USE KAPTURE MCP ONLY

**YOU MUST USE KAPTURE MCP TOOLS, NOT MICROSOFT PLAYWRIGHT:**
- ✅ **Use:** `mcp_kapture_*` tools
- ❌ **DO NOT USE:** `mcp_microsoft_pla_*` tools
- ❌ **DO NOT USE:** `mcp_browsermcp_*` tools
```

#### MULTIPASS_IMPLEMENTATION.md (라인 1-50)
```markdown
### 사용 가능한 MCP 도구:

1. **Kapture MCP** (기본) ✅
2. **Browser MCP with Playwright** (대체) ✅
   - 함수: `mcp_microsoft_pla_browser_navigate`
   - 최적 사용처: 복잡한 인터랙션
```

**문제점:**
- `copilot-instructions.md`는 **Kapture만** 허용
- `MULTIPASS_IMPLEMENTATION.md`는 **Playwright도 허용**
- AI가 혼란스러워할 가능성 100%

**영향도:** 🔴 **CRITICAL**

---

### 2. 스크린샷 정책 충돌 ⚠️⚠️

**충돌 내용:**

#### copilot-instructions.md (라인 20-40)
```markdown
### Key Changes:
- ✅ **NO screenshot storage** - temporary captures only
- ✅ **DOM/Elements API** - direct interaction state analysis
- ✅ **Memory-based comparison** - state changes tracked in memory
```

#### CRITICAL_CHECKLIST.md (라인 1-100)
```markdown
## ⛔ CRITICAL: 413 Request Too Large 에러 방지

**해결책: 캡처 즉시 파일 저장 + 응답 데이터 버림**

async function captureAndSave(tabId, step, percent) {
  const result = await mcp_kapture_screenshot({...});
  
  // 2. 즉시 파일로 저장
  fs.writeFileSync(`output/captures/${filename}`, buffer);
}
```

#### PIPELINE_GUIDE.md (라인 300-350)
```markdown
4. **시각적 증거 수집**
   - 각 단계마다 스크린샷 캡처
   - 스크롤 시 10vh마다 자동 캡처 ✨
   - `output/captures/` 디렉토리에 저장
```

**문제점:**
- `copilot-instructions.md`: "스크린샷 저장 안 함, 메모리만"
- `CRITICAL_CHECKLIST.md`: "즉시 파일 저장 필수"
- `PIPELINE_GUIDE.md`: "output/captures/에 저장"
- **서로 완전히 모순됨**

**영향도:** 🔴 **CRITICAL**

---

### 3. 탐색 방법론 충돌 ⚠️⚠️

**충돌 내용:**

#### copilot-instructions.md (라인 50-100)
```markdown
### Step 2: Execute DOM-Based Exploration Agent

node scripts/explore_website_agent.js <tabId> [outputPath]

**The agent will guide you through:**
#### PHASE 1: Multi-Viewport Exploration
#### PHASE 2: Scroll Exploration (Per Viewport)
#### PHASE 3: Interaction Exploration (Per Viewport)
```

#### MULTIPASS_STRATEGY.md (전체 구조)
```markdown
## Pass 1: Structure Scan (10-15 screenshots)
## Pass 2: Interaction Deep Dive (30-50 screenshots)
## Pass 3: Responsive Behavior (20-30 screenshots)
## Pass 4: Component Micro-Analysis (15-25 screenshots)
## Pass 5: Gap Filling & Validation (5-10 screenshots)
```

#### CRITICAL_CHECKLIST.md (라인 200+)
```markdown
### ✅ 체크포인트 1: 사용자 요청 분석
**즉시 실행:**
1. ✅ URL 추출 확인
2. ✅ `/web` 파이프라인 자동 라우팅
3. ✅ **MCP 탐색 필수** 플래그 설정
```

**문제점:**
- `copilot-instructions.md`: **6단계 PHASE** (agent script)
- `MULTIPASS_STRATEGY.md`: **5단계 PASS** (수동 전략)
- `CRITICAL_CHECKLIST.md`: 단일 체크포인트 접근
- **서로 다른 실행 모델**

**영향도:** 🟠 **HIGH**

---

### 4. Instruction JSON 파일 비어있음 ⚠️⚠️⚠️

**발견 사항:**

```bash
instruction/web-pipeline/
├── 01_contents_web.json    ❌ EMPTY (0 bytes)
├── 02_style_web.json       ❌ EMPTY (0 bytes)
├── 03_integrate_web.json   ❌ EMPTY (0 bytes)
└── generators/
    ├── 04_generate_html.json      ❌ 존재하나 사용 안 함
    └── 04_generate_tailwind.json  ✅ 활성 (162줄)
```

**문제점:**
- `PIPELINE_GUIDE.md`에서 01, 02, 03 파일 참조
- 실제로는 **빈 파일**
- AI가 로드할 수 없음
- **파이프라인 자체가 작동 불가**

**영향도:** 🔴 **CRITICAL**

---

### 5. 스크롤 간격 정책 충돌 ⚠️

**충돌 내용:**

#### copilot-instructions.md (라인 3200+)
```markdown
### 9.2.4 Progressive Scroll Capture Strategy

**Methodology:**
"scrollStep": "10vh",
"maxScrollDepth": "full-page-height",
```

#### PIPELINE_GUIDE.md (라인 30-50)
```markdown
### 1. 🔍 스크롤 애니메이션 분석 정밀도 향상

**변경 내용:**
- **스크롤 캡처 간격**: `20vh` → `10vh` (50% 축소)
- **Parallax 섹션**: 10vh → `5vh` 간격
```

#### explore_website_agent.js (라인 40)
```javascript
const EXPLORATION_CONFIG = {
  scrollStep: 100,          // Scroll step in pixels (approx 10vh)
```

**문제점:**
- 세 곳 모두 다른 단위 사용 (vh vs pixels)
- 일관성 없음
- "개선됨"이라고 하지만 실제 구현 불명확

**영향도:** 🟡 **MEDIUM**

---

### 6. 출력 파일 경로 충돌 ⚠️

**충돌 내용:**

#### copilot-instructions.md (라인 400+)
```markdown
**Directory Rules:**
- **`output/web/`**: All HTML, CSS, JS (final deliverable)
- **`instruction/web-pipeline/*.json`**: OVERWRITE during pipeline
- **`output/captures/`**: MCP exploration screenshots
- ⚠️ **DO NOT create new JSON files in `output/` root**
```

#### PIPELINE_GUIDE.md (라인 250+)
```markdown
output/
├── web_contents.json          ← 01단계 출력
├── web_style.json             ← 02단계 출력
├── WebDevSpec.json            ← 03단계 출력
├── web/                       ← 04단계 출력
```

**문제점:**
- `copilot-instructions.md`: "instruction/ 폴더에 OVERWRITE"
- `PIPELINE_GUIDE.md`: "output/ 루트에 생성"
- **정반대 지시**

**영향도:** 🟠 **HIGH**

---

### 7. Semantic HTML vs Tailwind 정책 충돌 ⚠️

**충돌 내용:**

#### PIPELINE_GUIDE.md (라인 200-250)
```markdown
#### `/html` - 멀티 파일 HTML/CSS/JS 생성

#### `/html-tailwind` - Tailwind CSS 싱글 파일 앱 (기본값)

**⚠️ 참고**: v2.0 이후 `/html` 옵션은 비활성화되었습니다.
```

#### copilot-instructions.md (라인 600+)
```markdown
**Option A: Semantic HTML** (`04_generate_html.json`)
- Multi-file structure

**Option B: Tailwind Single-Page** (`04_generate_tailwind.json`)
- Single-file app
```

**문제점:**
- `PIPELINE_GUIDE.md`: "/html 비활성화됨"
- `copilot-instructions.md`: "두 옵션 모두 사용 가능"
- **정책 불일치**

**영향도:** 🟡 **MEDIUM**

---

### 8. Component ID 규칙 중복 기술 ⚠️

**발견 사항:**

#### copilot-instructions.md (라인 2800+)
```markdown
### 8.4 Component ID Requirements

**⚠️ CRITICAL: Every component must have a unique ID**

**Format**: `{section}-{type}-{identifier}`
```

#### PIPELINE_GUIDE.md (라인 80-120)
```markdown
### 3. 🆔 모든 컴포넌트에 고유 ID 필수 부여

**ID 네이밍 규칙:**
**포맷**: `{section}-{type}-{identifier}`
```

#### 04_generate_tailwind.json (라인 50-70)
```json
"componentIdPolicy": {
  "requirement": "EVERY component MUST have a unique ID",
  "format": "{section}-{type}-{identifier}"
}
```

**문제점:**
- 동일한 내용이 **3곳에 중복**
- 한 곳만 수정하면 불일치 발생
- 유지보수 부담

**영향도:** 🟢 **LOW** (내용은 일치하나 중복)

---

### 9. AI 행동 패턴 분석 vs 실행 지침 충돌 ⚠️

**충돌 내용:**

#### AI_BEHAVIOR_ANALYSIS.md (전체)
```markdown
# 🔴 AI 행동 패턴 문제 - 최종 분석 리포트

**상태:** ❌ **FAILED - AI가 지시를 무시하는 패턴 확인됨**

### Pattern 1: "효율성" 판단의 자동 개입
AI: "이미 초기에 DOM 받았으니 다시 받을 필요 없음"
→ DOM 수집 단계 스킵
```

#### CRITICAL_CHECKLIST.md (라인 100-200)
```markdown
## 🚨 AI에게 직접 전달하는 메시지

**당신(AI)이 읽고 있다면:**
- ❌ "여러 위치를 빠르게 스크롤하자" → 금지!
- ❌ "효율적으로 병렬 실행하자" → 금지!
```

**문제점:**
- `AI_BEHAVIOR_ANALYSIS.md`: "AI는 지시를 무시함" (사실 분석)
- `CRITICAL_CHECKLIST.md`: "AI야, 무시하지 마" (희망적 지시)
- **서로 모순** (분석은 "안 됨", 지시는 "하라")

**영향도:** 🟡 **MEDIUM** (철학적 문제)

---

### 10. 스크립트 vs 수동 실행 충돌 ⚠️

**충돌 내용:**

#### copilot-instructions.md (라인 50-80)
```markdown
### Step 2: Execute DOM-Based Exploration Agent

node scripts/explore_website_agent.js <tabId> [outputPath]
```

#### explore_website_agent.js (라인 1-100)
```javascript
/**
 * Usage:
 *   node scripts/explore_website_agent.js <tabId> [outputPath]
 * 
 * Process:
 *   1. Multi-viewport exploration
 *   2. DOM-based interaction detection
 */
```

#### AI_BEHAVIOR_ANALYSIS.md (라인 200+)
```markdown
## 🎯 실용적 해결책

### Option A: 수동 체크리스트 (현실적)

AI를 신뢰하지 말고, **사람이 체크리스트로 확인**
```

**문제점:**
- `copilot-instructions.md`: "스크립트 실행"
- `explore_website_agent.js`: 스크립트 존재함
- `AI_BEHAVIOR_ANALYSIS.md`: "스크립트 작동 안 함, 수동으로"
- **스크립트가 신뢰할 수 없다면 왜 존재?**

**영향도:** 🟠 **HIGH**

---

## 🎯 통합 해결 방안

### 우선순위 1: CRITICAL 충돌 해결 (즉시 필요)

#### 해결안 1-1: MCP 도구 정책 단일화

**제안:**
```markdown
### ⚠️ 공식 MCP 도구 정책

**기본 도구: Kapture MCP**
- ✅ 모든 웹 탐색에 사용
- ✅ 함수: `mcp_kapture_*`

**Playwright MCP는 사용 금지**
- ❌ `mcp_microsoft_pla_*` - 완전히 제거
- ❌ `mcp_browsermcp_*` - 완전히 제거

**이유:**
- 일관성 유지
- AI 혼란 방지
- 단일 도구 마스터
```

**적용 위치:**
- ✅ `copilot-instructions.md` (이미 올바름)
- 🔧 `MULTIPASS_IMPLEMENTATION.md` - Playwright 언급 삭제
- 🔧 `MCP_TOOL_GUIDE.md` - Kapture만 남기기

---

#### 해결안 1-2: 스크린샷 정책 명확화

**제안:**
```markdown
### 📸 스크린샷 저장 정책 (확정)

**원칙:**
1. ✅ **파일로 저장 필수** (`output/captures/`)
2. ✅ **즉시 저장** (메모리 부담 방지)
3. ✅ **WebP 포맷** (용량 최소화)
4. ✅ **낮은 해상도** (scale: 0.2-0.3)
5. ❌ **Base64 응답 보존 금지** (413 에러 방지)

**저장 구조:**
output/captures/
  ├── step-01_scroll-0.webp
  ├── step-02_scroll-10.webp
  └── step-03_scroll-20.webp

**코드 예시:**
const result = await mcp_kapture_screenshot({
  tabId,
  format: 'webp',
  quality: 0.7,
  scale: 0.3
});

// 즉시 저장
const buffer = await fetch(result.preview).then(r => r.buffer());
fs.writeFileSync(`output/captures/step-${n}.webp`, buffer);

// 메타데이터만 반환 (Base64 버림)
return { step: n, filename: `step-${n}.webp`, size: buffer.length };
```

**적용 위치:**
- 🔧 `copilot-instructions.md` - "NO screenshot storage" 문구 삭제
- ✅ `CRITICAL_CHECKLIST.md` (이미 올바름)
- 🔧 `PIPELINE_GUIDE.md` - 일치시키기

---

#### 해결안 1-3: Instruction JSON 파일 복원

**제안:**

**01_contents_web.json 기본 구조:**
```json
{
  "systemName": "WebContentAnalyzer",
  "version": "2.0.0",
  "description": "Analyze website content structure and requirements",
  "trigger": "/contents",
  "inputRequired": ["sitePurpose", "targetAudience", "requiredFeatures"],
  "outputFormat": {
    "filename": "web_contents.json",
    "location": "output/"
  },
  "buildPrinciples": {
    "seo": "Analyze meta tags, structured data, keywords",
    "navigation": "Map all pages, routes, and hierarchy",
    "interaction": "Identify forms, modals, animations",
    "accessibility": "WCAG 2.1 AA requirements"
  },
  "mcpExploration": {
    "enabled": true,
    "tool": "mcp_kapture",
    "actions": [
      "Navigate to entry URL",
      "Get full page DOM structure",
      "Extract navigation menu",
      "Map all routes (BFS, depth=3)",
      "Identify interactive elements"
    ]
  }
}
```

**02_style_web.json 기본 구조:**
```json
{
  "systemName": "WebStyleAnalyzer",
  "version": "2.0.0",
  "description": "Extract design system and visual patterns",
  "trigger": "/style",
  "inputRequired": ["referenceSites or imageAssets"],
  "outputFormat": {
    "filename": "web_style.json",
    "location": "output/"
  },
  "buildPrinciples": {
    "colors": "Extract brand colors, semantic colors, states",
    "typography": "Define scale with clamp() for responsiveness",
    "spacing": "Consistent scale (0.5rem base)",
    "components": "Document all states (default, hover, focus, active)"
  },
  "mcpExploration": {
    "enabled": true,
    "tool": "mcp_kapture",
    "actions": [
      "Resize to 3 viewports (375, 768, 1440)",
      "Progressive scroll (10% intervals)",
      "Hover all interactive elements",
      "Click modals, tabs, accordions",
      "Extract computed styles from DevTools"
    ]
  }
}
```

**03_integrate_web.json 기본 구조:**
```json
{
  "systemName": "WebSpecIntegrator",
  "version": "2.0.0",
  "description": "Merge contents + style into complete dev spec",
  "trigger": "/integrate",
  "inputRequired": ["web_contents.json", "web_style.json"],
  "outputFormat": {
    "filename": "WebDevSpec.json",
    "location": "output/"
  },
  "buildPrinciples": {
    "completeness": "Every page fully specified",
    "consistency": "Design tokens applied everywhere",
    "accessibility": "WCAG 2.1 AA mapped to implementation",
    "responsiveness": "Breakpoint behaviors documented"
  }
}
```

---

#### 해결안 1-4: 출력 경로 정책 단일화

**제안:**
```markdown
### 📁 파일 출력 정책 (확정)

**중간 분석 파일:**
- 위치: `output/` 루트
- 파일: `web_contents.json`, `web_style.json`, `WebDevSpec.json`
- 덮어쓰기: 매 실행 시 갱신

**최종 코드:**
- 위치: `output/web/`
- 파일: `index.html`, `styles/`, `scripts/`

**스크린샷:**
- 위치: `output/captures/`
- 파일: `step-NN_*.webp`
- 정리: 새 분석 시작 전 기존 파일 삭제

**Instruction 파일:**
- 위치: `instruction/web-pipeline/`
- 역할: 템플릿 (읽기 전용)
- 수정: 개발자만 (런타임 중 변경 안 함)
```

**이유:**
- `output/`은 사용자 결과물 → 쉽게 접근
- `instruction/`은 시스템 설정 → 보호 필요
- 명확한 역할 분리

**적용 위치:**
- 🔧 `copilot-instructions.md` - 정책 업데이트
- 🔧 `PIPELINE_GUIDE.md` - 일치시키기

---

### 우선순위 2: HIGH 충돌 해결

#### 해결안 2-1: 탐색 방법론 통합

**제안: 단일 탐색 프로세스 정의**

```markdown
### 🔍 웹사이트 탐색 표준 프로세스

**단계:**

1. **초기 로드** (1회)
   - URL 네비게이션
   - 전체 페이지 DOM 수집
   - Viewport: Desktop (1440x900)

2. **스크롤 탐색** (10-15회)
   - 10% 간격으로 전체 페이지 스크롤
   - 각 위치에서 스크린샷 + DOM 수집
   - 애니메이션 트리거 감지

3. **인터랙션 탐색** (20-30회)
   - 네비게이션 hover (5개)
   - 버튼 hover (5개)
   - 모달/탭 open (3개)
   - 폼 validation check (2개)

4. **반응형 탐색** (15-20회)
   - Mobile (375x812): 주요 섹션 3장
   - Tablet (768x1024): 주요 섹션 3장
   - Desktop: 이미 완료

5. **라우트 탐색** (5-10회)
   - BFS로 주요 페이지 방문 (depth=2)
   - 각 페이지에서 Step 1-4 반복

**총 스크린샷 예상:** 50-85장
**총 소요 시간:** 5-10분
```

**적용 위치:**
- 🔧 `copilot-instructions.md` - 이 프로세스로 대체
- 🗑️ `MULTIPASS_STRATEGY.md` - 삭제 (중복)
- 🗑️ `MULTIPASS_IMPLEMENTATION.md` - 삭제 (중복)
- 🔧 `CRITICAL_CHECKLIST.md` - 이 프로세스 참조하도록 수정

---

#### 해결안 2-2: 스크립트 vs 수동 실행 정리

**제안:**

**현실 인정:**
- `explore_website_agent.js`는 **사용 안 함**
- AI가 스크립트 출력을 따라가지 않음 (이미 검증됨)

**해결:**
1. 스크립트 삭제 OR 주석 처리
2. 수동 체크리스트만 사용

```markdown
### 실행 방법

**자동화 스크립트는 현재 사용 불가**
- AI가 스크립트 출력을 무시하는 패턴 확인됨
- 수동 체크리스트 방식 사용 필수

**수동 체크리스트:**
1. ✅ 사용자: "Step 1: 스크롤 10%해"
2. ✅ AI: keypress 실행
3. ✅ AI: screenshot 저장
4. ✅ 사용자: "Step 2: 스크롤 20%해"
5. ✅ AI: keypress 실행
6. ✅ AI: screenshot 저장
...
```

**적용 위치:**
- 🗑️ `explore_website_agent.js` - 삭제 또는 `/scripts/archive/`로 이동
- 🔧 `copilot-instructions.md` - 스크립트 언급 삭제
- ✅ `AI_BEHAVIOR_ANALYSIS.md` - 유지 (참고용)

---

### 우선순위 3: MEDIUM/LOW 충돌 정리

#### 해결안 3-1: 중복 문서 통합

**제안:**

**통합 대상:**
1. `MULTIPASS_STRATEGY.md` → `copilot-instructions.md`로 통합
2. `MULTIPASS_IMPLEMENTATION.md` → `PIPELINE_GUIDE.md`로 통합
3. Component ID 규칙 → `copilot-instructions.md` 한 곳에만

**삭제 대상:**
- `MULTIPASS_STRATEGY.md` (529줄) - 완전 중복
- `MULTIPASS_IMPLEMENTATION.md` (286줄) - 대부분 중복
- `MULTIPASS_QUICKREF.md` (있다면) - 중복

**유지 대상:**
- `copilot-instructions.md` - **메인 시스템 지침**
- `PIPELINE_GUIDE.md` - **사용자 가이드** (한글)
- `MCP_TOOL_GUIDE.md` - **도구 레퍼런스** (한글)
- `AI_BEHAVIOR_ANALYSIS.md` - **참고 문서** (수정 금지)

---

#### 해결안 3-2: Semantic HTML 정책 정리

**제안:**

```markdown
### 코드 생성 정책 (확정)

**단일 옵션: Tailwind CSS v4**
- `/html-tailwind` 또는 `/web` → Tailwind 생성
- `/html` 명령어 제거 (비활성화)
- `04_generate_html.json` 파일 삭제 또는 아카이브

**이유:**
- 일관성 유지
- AI 선택 부담 제거
- 모던 프론트엔드 방식 정렬
- 유지보수 용이
```

**적용 위치:**
- ✅ `PIPELINE_GUIDE.md` (이미 올바름)
- 🔧 `copilot-instructions.md` - Option A 삭제
- 🗑️ `04_generate_html.json` - 삭제

---

## 📋 액션 아이템 체크리스트

### Phase 1: 긴급 (CRITICAL 충돌)

- [ ] 1-1. `MULTIPASS_IMPLEMENTATION.md`에서 Playwright 언급 삭제
- [ ] 1-2. `copilot-instructions.md`에서 "NO screenshot storage" 문구 수정
- [ ] 1-3. `01_contents_web.json` 작성 (최소 기본 구조)
- [ ] 1-4. `02_style_web.json` 작성 (최소 기본 구조)
- [ ] 1-5. `03_integrate_web.json` 작성 (최소 기본 구조)
- [ ] 1-6. 출력 경로 정책 통일 (`output/` vs `instruction/`)

### Phase 2: 중요 (HIGH 충돌)

- [ ] 2-1. 탐색 프로세스 단일화 (6 PHASE → 5 Step)
- [ ] 2-2. `explore_website_agent.js` 아카이브 처리
- [ ] 2-3. `MULTIPASS_STRATEGY.md` 내용 통합 후 삭제
- [ ] 2-4. `CRITICAL_CHECKLIST.md`를 새 프로세스 기반으로 재작성

### Phase 3: 정리 (MEDIUM/LOW)

- [ ] 3-1. Component ID 규칙 단일화 (3곳 → 1곳)
- [ ] 3-2. Semantic HTML 언급 완전 제거
- [ ] 3-3. `04_generate_html.json` 삭제
- [ ] 3-4. 스크롤 간격 단위 통일 (vh vs pixels)
- [ ] 3-5. 전체 문서 교차 검증

### Phase 4: 검증

- [ ] 4-1. 실제 URL로 파이프라인 테스트
- [ ] 4-2. 생성된 파일 위치 확인
- [ ] 4-3. 스크린샷 저장 확인
- [ ] 4-4. AI 행동 패턴 재검증
- [ ] 4-5. 문서 최종 통합 검토

---

## 🎯 최종 추천 구조

### 통합 후 문서 구조

```
workspace/
├── .github/
│   └── copilot-instructions.md    ← 🌟 메인 시스템 지침 (유일)
│
├── PIPELINE_GUIDE.md              ← 📘 사용자 가이드 (한글)
├── MCP_TOOL_GUIDE.md              ← 📗 도구 레퍼런스 (한글)
├── AI_BEHAVIOR_ANALYSIS.md        ← 📄 참고 문서 (읽기 전용)
│
├── instruction/
│   └── web-pipeline/
│       ├── 01_contents_web.json    ← ✅ 작성 필요
│       ├── 02_style_web.json       ← ✅ 작성 필요
│       ├── 03_integrate_web.json   ← ✅ 작성 필요
│       └── generators/
│           └── 04_generate_tailwind.json  ← ✅ 이미 존재
│
├── scripts/
│   └── (자동화 스크립트 제거 또는 아카이브)
│
└── output/
    ├── web_contents.json          ← 중간 결과
    ├── web_style.json             ← 중간 결과
    ├── WebDevSpec.json            ← 최종 사양
    ├── web/                       ← 최종 코드
    └── captures/                  ← 스크린샷
```

### 역할 분리

| 파일 | 독자 | 목적 | 언어 |
|------|------|------|------|
| `copilot-instructions.md` | AI | 시스템 동작 규칙 | English |
| `PIPELINE_GUIDE.md` | 사용자 | 사용법 설명 | 한글 |
| `MCP_TOOL_GUIDE.md` | 개발자 | 도구 레퍼런스 | 한글 |
| `AI_BEHAVIOR_ANALYSIS.md` | 참고 | 문제 분석 기록 | 한글 |
| `instruction/*.json` | AI | 단계별 실행 로직 | JSON |

---

## ✅ 통합 작업 후 기대 효과

1. ✅ **단일 진실 공급원** - 충돌하는 지침 제거
2. ✅ **명확한 실행 경로** - AI 혼란 최소화
3. ✅ **유지보수 용이** - 한 곳만 수정하면 됨
4. ✅ **실행 가능성 증가** - 빈 파일 채워짐
5. ✅ **문서 가독성 향상** - 중복 제거

---

## 📝 다음 단계

1. **이 분석 리포트 검토**
2. **우선순위별 액션 아이템 실행**
3. **통합 후 테스트 실시**
4. **업데이트된 문서 검증**

---

**작성 완료: 2025-11-10**
