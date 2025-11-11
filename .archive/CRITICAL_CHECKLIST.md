# ⚠️ CRITICAL EXECUTION CHECKLIST

## 목적
이 문서는 AI가 웹 파이프라인 실행 시 **반드시 지켜야 할** 필수 단계를 명시합니다.

---

## 🔥 핵심 원칙 (절대 위반 금지!)

### ⚠️ 스크린샷 캡처 원칙

## ⛔ CRITICAL: 413 Request Too Large 에러 방지

**문제:**
- 스크린샷 20장 × 500KB = 10MB+ → GitHub Copilot Chat 응답 한계 초과
- 각 screenshot 응답에 Base64 데이터 포함 → 누적 시 너무 큼

**해결책: 캡처 즉시 파일 저장 + 응답 데이터 버림**

```javascript
// ✅ 올바른 방법: 스크린샷 즉시 저장 (간단한 경로)
async function captureAndSave(tabId, step, percent) {
  // 1. 캡처 (WebP, 낮은 해상도)
  const result = await mcp_kapture_screenshot({
    tabId,
    format: 'webp',    // PNG보다 작음
    quality: 0.7,      // 70% 품질 (분석엔 충분)
    scale: 0.2         // 20% 해상도 (더 작게!)
  });
  
  // 2. 즉시 파일로 저장 (output/captures/ 바로 하위)
  const response = await fetch(result.preview);
  const buffer = await response.buffer();
  
  const filename = `step-${step.toString().padStart(2,'0')}_scroll-${percent}.webp`;
  fs.writeFileSync(`output/captures/${filename}`, buffer);
  
  // 3. 메모리에서 삭제 (중요!)
  // Base64 데이터를 응답에 포함하지 않음
  return {
    step,
    percent,
    filename,
    fileSize: buffer.length  // 숫자만 반환 (작음)
  };
}

// ⚠️ 새 요청 시작 전: 기존 스크린샷 정리
function cleanupPreviousCaptures() {
  const files = fs.readdirSync('output/captures');
  files.forEach(file => {
    if (file.endsWith('.webp') || file.endsWith('.png')) {
      fs.unlinkSync(`output/captures/${file}`);
    }
  });
  console.log('✅ 기존 스크린샷 정리 완료');
}

// 사용:
cleanupPreviousCaptures();  // 새 분석 시작 전 정리
const metadata = await captureAndSave(tabId, 1, 0);
console.log(`✅ ${metadata.filename} (${metadata.fileSize} bytes)`);
// → 응답 크기: ~100 bytes (Base64 없음!)
```

**저장 경로:**
- ✅ 간단: `output/captures/step-01_scroll-0.webp`
- ❌ 복잡: `output/captures/nauta_analysis/step-01_scroll-0.webp`

**새 요청 시:**
1. 기존 `output/captures/*.webp` 파일 전부 삭제
2. 새 스크린샷 저장 (같은 위치)
3. 폴더 생성/관리 불필요

**핵심:**
- ❌ 스크린샷 데이터를 메모리에 누적 (10MB+)
- ✅ 즉시 파일로 저장 → 메모리 해제 (응답 크기 최소화)

---

## ⛔ CRITICAL ERROR PATTERN (절대 금지!)

**❌ 여러분이 지금 하고 있는 잘못된 패턴:**
```
keypress → keypress → keypress → screenshot
keypress → keypress → keypress → keypress → screenshot
```

**이것은 명백한 규칙 위반입니다!**

**왜 연속 keypress가 발생하는가?**
1. 🤖 AI 효율성 추구 → "여러 번 스크롤을 한꺼번에"
2. 🤖 Tool Call 최소화 심리 → "20번 대신 10번으로"
3. 🤖 병렬 실행 선호 → "빠른 keypress 먼저 다 실행"

**결과:**
- ❌ 중간 위치 스크린샷 누락
- ❌ 전체 페이지의 20-30%만 캡처
- ❌ 분석 불가능

---

## ✅ 유일하게 허용되는 패턴

**단 하나의 올바른 방식:**

```javascript
// ⚠️ 이 패턴만 허용됨!

// Step 1
await keypress('PageDown');  // 1회 스크롤
await screenshot();          // 즉시 캡처 ✅

// Step 2  
await keypress('PageDown');  // 1회 스크롤
await screenshot();          // 즉시 캡처 ✅

// Step 3
await keypress('PageDown');  // 1회 스크롤
await screenshot();          // 즉시 캡처 ✅

// ... 페이지 끝까지 반복
```

**절대 규칙:**
1. ⛔ **keypress 2회 연속 실행 금지**
2. ⛔ **screenshot 없이 다음 keypress 금지**
3. ✅ **keypress → screenshot 순서 절대 엄수**
4. ✅ **예외 없음! 효율성 고려 금지!**

---

## 🚨 AI에게 직접 전달하는 메시지

**당신(AI)이 읽고 있다면:**

- ❌ "여러 위치를 빠르게 스크롤하자" → 금지!
- ❌ "10% 간격으로 스크롤하니까 한번에 여러 번" → 금지!
- ❌ "Tool Call 횟수를 줄이자" → 금지!
- ❌ "효율적으로 병렬 실행하자" → 금지!

**올바른 사고방식:**
- ✅ "한 번 스크롤 → 즉시 캡처 → 다음 스크롤"
- ✅ "느려도 정확하게"
- ✅ "20번 Tool Call이면 20번 한다"
- ✅ "중간 섹션 누락은 실패다"

**Tool Call 패턴 체크:**
```
keypress → screenshot → keypress → screenshot → keypress → screenshot
   ✅         ✅            ✅          ✅           ✅          ✅
```

**절대 금지 패턴:**
```
keypress → keypress → screenshot
   ✅         ❌         (너무 늦음)
```

---

## 📊 자가 검증 방법

**실행 중 스스로 체크:**

```javascript
let lastAction = null;

function beforeAction(action) {
  // keypress 연속 실행 감지
  if (action === 'keypress' && lastAction === 'keypress') {
    throw new Error('❌ CRITICAL: keypress 연속 실행 금지!');
  }
  
  // screenshot 없이 다음 keypress 감지  
  if (action === 'keypress' && lastAction !== 'screenshot' && lastAction !== null) {
    throw new Error('❌ CRITICAL: screenshot 누락!');
  }
  
  lastAction = action;
}
```

---

## 🚨 파이프라인 실행 전 필수 확인사항

### ✅ 체크포인트 1: 사용자 요청 분석

사용자가 URL과 함께 분석 요청을 하면:

```
예: "https://example.com 분석해줘"
예: "이 사이트 웹으로 만들어줘 https://example.com"
```

**즉시 실행:**
1. ✅ URL 추출 확인
2. ✅ `/web` 파이프라인 자동 라우팅
3. ✅ **MCP 탐색 필수** 플래그 설정

---

## 🔴 MUST DO: MCP 브라우저 탐색 실행

### ⚠️ CRITICAL: Kapture MCP 스크린샷 저장 방법

**⚠️ Kapture MCP 제약사항:**
- ❌ 스크린샷을 자동으로 파일 저장하지 않음
- ⚠️ Preview URL에서 **format=png 표시되지만 실제는 WebP일 수 있음**
- ✅ 하지만 **이미지 데이터는 Base64로 포함됨**
- ✅ 저장 시 원하는 포맷(PNG, WebP, JPEG) 선택 가능

**❌ 잘못된 사용 (파일 저장 안됨):**
```javascript
// 단순 호출만 하면 파일 저장 안됨!
await mcp_kapture_screenshot({ tabId });
// → 결과: output/captures/ 디렉토리 비어있음
```

**✅ 올바른 사용 (이미지 다운로드 → 파일 저장):**

**방법 1: Preview URL에서 다운로드 (WebP)**
```javascript
const result = await mcp_kapture_screenshot({ 
  tabId, 
  format: 'webp',  // Kapture 기본값
  quality: 0.85, 
  scale: 0.5 
});

// Preview URL에서 이미지 다운로드
const previewUrl = result.preview; 
// http://localhost:61822/tab/.../screenshot/view?format=webp&quality=0.85

// fetch로 이미지 다운로드 후 저장
const response = await fetch(previewUrl);
const buffer = await response.buffer();

const filename = `step-${step}_scroll-${percent}.webp`;
fs.writeFileSync(`output/captures/${filename}`, buffer);
```

**방법 2: PNG로 변환 저장 (권장)**
```javascript
const sharp = require('sharp'); // 이미지 변환 라이브러리

// 1. WebP로 캡처
const result = await mcp_kapture_screenshot({ tabId, format: 'webp' });
const response = await fetch(result.preview);
const buffer = await response.buffer();

// 2. PNG로 변환
const pngBuffer = await sharp(buffer).png().toBuffer();

// 3. PNG 파일로 저장
const filename = `step-${step}_scroll-${percent}.png`;
fs.writeFileSync(`output/captures/${filename}`, pngBuffer);

console.log(`✅ PNG 저장: ${filename}`);
```

**방법 3: WebP 그대로 사용 (가장 빠름)**
```javascript
// WebP 포맷 그대로 사용 (파일 크기 작고 빠름)
const result = await mcp_kapture_screenshot({ 
  tabId, 
  format: 'webp',
  quality: 0.85,
  scale: 0.5 
});

const response = await fetch(result.preview);
const buffer = await response.buffer();

const filename = `step-${step}_scroll-${percent}.webp`;
fs.writeFileSync(`output/captures/${filename}`, buffer);

// ✅ WebP도 분석에 충분함!
```

**필수 검증:**
```bash
# 캡처 완료 후 반드시 확인!
ls -la output/captures/*.{png,webp} 2>/dev/null | wc -l
# → 15개 이상 있어야 함 (포맷 무관)

# 파일 0개면 실패!
FILE_COUNT=$(ls output/captures/*.{png,webp} 2>/dev/null | wc -l)
if [ $FILE_COUNT -eq 0 ]; then
  echo "❌ FAIL: 스크린샷 저장 실패!"
  exit 1
elif [ $FILE_COUNT -lt 15 ]; then
  echo "⚠️ WARNING: 스크린샷 부족 ($FILE_COUNT/15)"
else
  echo "✅ PASS: 스크린샷 $FILE_COUNT개 확보"
fi
```

**⚠️ 중요: 파일 저장 없으면 파이프라인 진행 금지!**
**포맷은 PNG 또는 WebP 둘 다 가능 (분석에는 차이 없음)**

### 1️⃣ 브라우저 연결 확인

```javascript
// Kapture MCP 연결 확인
const tabs = await mcp_kapture_list_tabs();
if (!tabs || tabs.length === 0) {
  throw new Error('❌ FAIL: Kapture MCP 연결 안됨');
}

const tabId = tabs[0].tabId;
console.log(`✅ 브라우저 연결 성공 (Tab ID: ${tabId})`);
```

---

#### 2️⃣ 페이지 네비게이션
```bash
# 필수 실행
mcp_kapture_navigate(
  tabId: "<저장된 tabId>",
  url: "사용자가 제공한 URL"
)
```

**결과 검증:**
- ✅ HTTP 200 응답 확인
- ✅ 페이지 로드 완료

---

#### 3️⃣ 자동 전체 스크롤 캡처 (Option 1 - 구현됨 ✅)

**⚠️ 기존 문제: 수동 스크롤로 페이지 끝까지 도달 못함**

**구현된 솔루션: Option 1 (자동 전체 스크롤)**
- ✅ PageDown 방식으로 페이지 끝까지 자동 탐색
- ✅ 페이지 끝 도달 자동 감지 (`atBottom` 체크)
- ✅ 무한 루프 방지 (동일 위치 3회 연속 체크)
- ✅ 진행률 실시간 표시
- ✅ 최소 15-20장 스크린샷 자동 생성

**자동 실행 로직:**

```javascript
```javascript
// 1. 페이지 상단으로 이동
await scrollToTop(tabId);

// 2. 첫 화면 캡처 (0%)
await captureScreenshot(tabId, 0, 0);

// 3. 자동 스크롤 계산
const fullHeight = pageMetrics.fullPageHeight;
const viewportHeight = pageMetrics.viewportHeight;
const maxSteps = Math.ceil(fullHeight / viewportHeight) + 2;

console.log(`전체 높이: ${fullHeight}px, 예상 단계: ${maxSteps}`);

// 4. PageDown으로 끝까지 자동 스크롤 + 즉시 캡처 ⚠️ 중요!
let step = 1;
let previousScrollY = 0;
let sameScrollCount = 0;

for (let i = 0; i < maxSteps; i++) {
  // ⚠️ CRITICAL: 스크롤 1번 → 캡처 1번 (순서 엄수!)
  
  // 1) PageDown 실행
  await mcp_kapture_keypress({ tabId, key: 'PageDown', delay: 300 });
  await wait(500); // 애니메이션 대기
  
  // 2) 현재 위치 확인
  const currentScroll = await getCurrentScrollPosition(tabId);
  const scrollPercent = Math.round((currentScroll.scrollY / (currentScroll.scrollHeight - currentScroll.viewportHeight)) * 100);
  
  console.log(`[Step ${step}] ${scrollPercent}% (${currentScroll.scrollY}px)`);
  
  // 3) ✅ 즉시 스크린샷 캡처 (스크롤 직후!)
  await captureScreenshot(tabId, step, scrollPercent);
  step++;
  
  // 4) 페이지 끝 도달 체크
  if (currentScroll.atBottom) {
    console.log('✅ 페이지 끝 도달!');
    break;
  }
  
  // 5) 무한 루프 방지 (동일 위치 3회 체크)
  if (Math.abs(currentScroll.scrollY - previousScrollY) < 10) {
    sameScrollCount++;
    if (sameScrollCount >= 3) {
      console.log('⚠️ 스크롤 중단 감지');
      break;
    }
  } else {
    sameScrollCount = 0;
  }
  
  previousScrollY = currentScroll.scrollY;
}

console.log(`✅ 완료: ${step}단계, 페이지 끝까지 탐색`);
```

**자동 실행 결과:**
- 페이지 끝까지 완전 탐색 보장
- 15-25장 스크린샷 자동 생성 (페이지 길이에 따라)
- 누락 섹션 없음
- 진행률 실시간 모니터링

**⚠️ Kapture MCP 한계:**
- 스크린샷은 미리보기 URL로만 저장
- 하지만 모든 섹션 탐색은 완료됨
- DOM 분석 + 페이지 메트릭으로 보완
```

**섹션 타입 자동 식별:**

```javascript
function identifySectionType(section) {
  const text = section.text?.toLowerCase() || '';
  const classes = section.className?.toLowerCase() || '';
  
  if (classes.includes('hero') || section.role === 'banner') return 'hero';
  if (classes.includes('feature')) return 'features';
  if (classes.includes('testimonial') || classes.includes('review')) return 'testimonials';
  if (classes.includes('pricing')) return 'pricing';
  if (classes.includes('cta') || text.includes('get started')) return 'cta';
  if (classes.includes('stats') || text.match(/\d+%|\d+\+/)) return 'stats';
  if (classes.includes('gallery') || classes.includes('portfolio')) return 'gallery';
  if (section.role === 'contentinfo' || classes.includes('footer')) return 'footer';
  
  return 'content';
}
```

**인터랙션별 추가 캡처:**

```javascript
### 4️⃣ 디자인 디테일 분석 (중요!)

**목적: 레퍼런스 사이트의 핵심 포인트 파악**

사용자가 왜 이 사이트를 선택했는지 이해하기 위한 상세 분석:

```javascript
// 1. 타이포그래피 분석
const typographyAnalysis = await mcp_kapture_evaluate({
  tabId,
  function: `() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
    return headings.map(h => ({
      tag: h.tagName,
      text: h.textContent.trim().substring(0, 50),
      computed: {
        fontSize: getComputedStyle(h).fontSize,
        fontWeight: getComputedStyle(h).fontWeight,
        fontFamily: getComputedStyle(h).fontFamily,
        lineHeight: getComputedStyle(h).lineHeight,
        letterSpacing: getComputedStyle(h).letterSpacing,
        color: getComputedStyle(h).color
      }
    }));
  }`
});

// 2. 색상 팔레트 추출
const colorPalette = await mcp_kapture_evaluate({
  tabId,
  function: `() => {
    const colors = new Set();
    const elements = document.querySelectorAll('*');
    
    elements.forEach(el => {
      const styles = getComputedStyle(el);
      colors.add(styles.backgroundColor);
      colors.add(styles.color);
      colors.add(styles.borderColor);
    });
    
    return Array.from(colors)
      .filter(c => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent')
      .slice(0, 20); // 상위 20개 색상
  }`
});

// 3. 레이아웃 패턴 분석
const layoutPatterns = await mcp_kapture_evaluate({
  tabId,
  function: `() => {
    const sections = Array.from(document.querySelectorAll('section, main > div'));
    
    return sections.map(section => ({
      type: section.className || section.id,
      layout: {
        display: getComputedStyle(section).display,
        gridTemplateColumns: getComputedStyle(section).gridTemplateColumns,
        flexDirection: getComputedStyle(section).flexDirection,
        gap: getComputedStyle(section).gap,
        padding: getComputedStyle(section).padding
      },
      children: section.children.length,
      backgroundImage: getComputedStyle(section).backgroundImage !== 'none'
    }));
  }`
});

// 4. 애니메이션/인터랙션 패턴
const animations = await mcp_kapture_evaluate({
  tabId,
  function: `() => {
    const animated = document.querySelectorAll('[class*="animate"], [data-aos], [data-scroll]');
    
    return Array.from(animated).map(el => ({
      selector: el.className,
      animation: getComputedStyle(el).animation,
      transition: getComputedStyle(el).transition,
      transform: getComputedStyle(el).transform
    }));
  }`
});

// 5. 버튼 스타일 패턴
const buttonStyles = await mcp_kapture_evaluate({
  tabId,
  function: `() => {
    const buttons = document.querySelectorAll('button, a[class*="btn"], [role="button"]');
    
    return Array.from(buttons).slice(0, 10).map(btn => ({
      text: btn.textContent.trim(),
      computed: {
        backgroundColor: getComputedStyle(btn).backgroundColor,
        color: getComputedStyle(btn).color,
        borderRadius: getComputedStyle(btn).borderRadius,
        padding: getComputedStyle(btn).padding,
        fontSize: getComputedStyle(btn).fontSize,
        fontWeight: getComputedStyle(btn).fontWeight,
        boxShadow: getComputedStyle(btn).boxShadow,
        border: getComputedStyle(btn).border
      }
    }));
  }`
});

console.log('✅ 디자인 디테일 분석 완료');
console.log(`  - 타이포그래피: ${typographyAnalysis.length}개 분석`);
console.log(`  - 색상 팔레트: ${colorPalette.length}개 추출`);
console.log(`  - 레이아웃 패턴: ${layoutPatterns.length}개 섹션`);
console.log(`  - 애니메이션: ${animations.length}개 요소`);
console.log(`  - 버튼 스타일: ${buttonStyles.length}개 패턴`);
```

**이 분석이 중요한 이유:**
- 사용자가 **어떤 디자인 요소**에 관심있는지 파악
- **실제 구현 가능한** 스타일 값 추출
- 가정이 아닌 **실측 데이터** 기반 분석
```

**현실적인 캡처 개수:**
- 섹션 캡처: 10-15장 (페이지 복잡도에 따라)
- 인터랙션 테스트: 5-10장 (before/after 쌍)
- 상태 변화: 2-5장 (hover, scroll animations)
- **총 15-30장** (상세 분석을 위한 최소 권장량)

**⚠️ Kapture MCP 한계:**
- 모든 스크린샷은 **미리보기 URL만** 생성
- 실제 파일 저장 안됨
- 대신 DOM 분석 + 페이지 메트릭으로 보완
- ✅ `output/captures/` 디렉토리에 파일 존재
- ✅ 각 스크린샷 파일 크기 > 0

---

#### 4️⃣ 인터랙티브 요소 테스트 (최소 3개 필수)

**필수 테스트 항목:**

1. **헤더 네비게이션**
   ```javascript
   // 메뉴 항목 찾기
   const navItems = await mcp_kapture_elements({
     tabId: tabId,
     selector: "nav a, header a"
   });
   
   // 첫 3개 메뉴 클릭 (또는 모든 메뉴)
   for (let i = 0; i < Math.min(3, navItems.length); i++) {
     await mcp_kapture_click({
       tabId: tabId,
       selector: navItems[i].selector
     });
     
     await wait(500);
     
     await mcp_kapture_screenshot({
       tabId: tabId
     });
     
     // 원래 페이지로 복귀
     await mcp_kapture_back({ tabId: tabId });
   }
   ```

2. **버튼/CTA 요소**
   ```javascript
   const buttons = await mcp_kapture_elements({
     tabId: tabId,
     selector: "button, a.btn, a.cta"
   });
   
   // 첫 2개 버튼 클릭
   for (let i = 0; i < Math.min(2, buttons.length); i++) {
     await mcp_kapture_click({
       tabId: tabId,
       selector: buttons[i].selector
     });
     
     await mcp_kapture_screenshot({ tabId: tabId });
   }
   ```

3. **모달/드로어 (있는 경우)**
   ```javascript
   // 모달 트리거 찾기
   const modalTriggers = await mcp_kapture_elements({
     tabId: tabId,
     selector: "[data-modal], [data-toggle='modal']"
   });
   
   if (modalTriggers.length > 0) {
     await mcp_kapture_click({
       tabId: tabId,
       selector: modalTriggers[0].selector
     });
     
     await wait(300);
     await mcp_kapture_screenshot({ tabId: tabId });
     
     // 모달 닫기
     await mcp_kapture_press_key({
       tabId: tabId,
       key: "Escape"
     });
   }
   ```

**결과 검증:**
- ✅ 최소 3개 인터랙션 스크린샷 생성
- ✅ 각 인터랙션 전/후 상태 캡처

---

#### 5️⃣ DOM 구조 분석

```javascript
// 전체 DOM 캡처
const fullDOM = await mcp_kapture_dom({
  tabId: tabId
});

// 페이지 크기 측정
const pageMetrics = {
  domSize: fullDOM.length,
  viewport: await getViewportSize(tabId),
  fullPageHeight: await getFullPageHeight(tabId)
};
```

**결과 검증:**
- ✅ `domSize` > 0
- ✅ `viewport` 정보 존재
- ✅ `fullPageHeight` > viewport.height

---

## 📁 파일 생성 검증

### MCP 탐색 후 필수 파일 확인

```bash
# 스크린샷 디렉토리 확인
ls -la output/captures/<sitename>_analysis/

# 예상 파일 개수: 최소 8개
# - 5개: 스크롤 스크린샷
# - 3개: 인터랙션 스크린샷
```

**검증 스크립트:**
```javascript
const fs = require('fs');
const capturesDir = 'output/captures/<sitename>_analysis/';

// 디렉토리 존재 확인
if (!fs.existsSync(capturesDir)) {
  throw new Error("❌ FAIL: 스크린샷 디렉토리가 생성되지 않음");
}

// 파일 개수 확인
const files = fs.readdirSync(capturesDir);
const screenshotFiles = files.filter(f => f.endsWith('.png'));

if (screenshotFiles.length < 8) {
  throw new Error(`❌ FAIL: 스크린샷 개수 부족 (${screenshotFiles.length}/8)`);
}

console.log(`✅ PASS: ${screenshotFiles.length}개 스크린샷 생성됨`);
```

---

## 🔄 JSON 파일에 증거 기록

### 01_contents_web.json에 추가

```json
{
  "mcpExploration": {
    "executed": true,
    "timestamp": "2025-11-09T10:30:00Z",
    "tabId": "168631221",
    "screenshots": [
      {
        "step": 1,
        "action": "scroll",
        "position": "0%",
        "file": "output/captures/nauta_analysis/20251109_103001_step-01_scroll-0.png"
      },
      {
        "step": 2,
        "action": "scroll",
        "position": "25%",
        "file": "output/captures/nauta_analysis/20251109_103005_step-02_scroll-25.png"
      }
      // ... 모든 스크린샷 로그
    ],
    "interactions": [
      {
        "step": 10,
        "action": "click",
        "target": "nav a[href='#company']",
        "result": "Section scroll",
        "screenshot": "output/captures/nauta_analysis/20251109_103020_step-10_click-nav.png"
      }
    ],
    "pageMetrics": {
      "domSize": "3.4MB",
      "fullPageSize": "1470x16951px",
      "viewport": "1470x712px"
    }
  }
}
```

---

## 🚦 실행 순서 요약

```
1. 사용자 요청 수신
   ↓
2. URL 감지 → /web 파이프라인 시작
   ↓
3. ⚠️ MCP 탐색 시작 (필수!)
   ├─ 브라우저 연결 확인
   ├─ 페이지 로드
   ├─ 전체 스크롤 (5개 포인트)
   ├─ 인터랙션 테스트 (3개 이상)
   └─ DOM 분석
   ↓
4. 스크린샷 검증 (최소 8개)
   ↓
5. JSON 파일 생성
   ├─ 01_contents_web.json (MCP 로그 포함)
   ├─ 02_style_web.json
   └─ 03_integrate_web.json
   ↓
6. 코드 생성 (output/web/index.html)
```

---

## ❌ 실패 시나리오 (다음 중 하나라도 해당되면 FAIL)

1. **스크린샷이 0개인 경우**
   - `output/captures/` 디렉토리 비어있음
   - **해결:** MCP 탐색 단계를 실행하지 않았음. 반드시 실행 필요.

2. **스크린샷이 3개 이하인 경우**
   - 스크롤 캡처 생략됨
   - **해결:** 5개 스크롤 포인트 모두 캡처 필요.

3. **JSON 파일에 `mcpExploration` 섹션이 없는 경우**
   - MCP 실행 증거 누락
   - **해결:** JSON 생성 시 MCP 로그 포함 필수.

4. **브라우저 연결 없이 JSON 파일만 생성한 경우**
   - 추측 기반 분석 (증거 없음)
   - **해결:** 반드시 실제 사이트 탐색 후 데이터 수집.

---

## ✅ 성공 기준

다음 모든 조건을 충족해야 성공:

- ✅ `output/captures/<sitename>_analysis/` 디렉토리 생성됨
- ✅ 최소 8개 이상의 `.png` 파일 존재
- ✅ 파일명이 `YYYYMMDD_HHMMSS_step-<nn>_<action>.png` 형식
- ✅ `01_contents_web.json`에 `mcpExploration` 섹션 존재
- ✅ 모든 스크린샷 경로가 JSON에 기록됨
- ✅ 페이지 메트릭 (DOM 크기, 뷰포트) 측정됨

---

## 🔧 디버깅 가이드

### 문제: "스크린샷이 생성되지 않음"

**해결 단계:**

1. Kapture MCP 연결 확인
   ```javascript
   const tabs = await mcp_kapture_list_tabs();
   console.log("연결된 탭:", tabs);
   ```

2. 스크린샷 저장 경로 확인
   ```javascript
   const capturesDir = 'output/captures/nauta_analysis/';
   if (!fs.existsSync(capturesDir)) {
     fs.mkdirSync(capturesDir, { recursive: true });
   }
   ```

3. 스크린샷 캡처 함수 테스트
   ```javascript
   const result = await mcp_kapture_screenshot({
     tabId: "YOUR_TAB_ID",
     format: "png"
   });
   
   console.log("스크린샷 결과:", result);
   ```

---

## 📝 다음 분석부터 적용할 워크플로우

```javascript
async function executeWebPipeline(url) {
  console.log("🚀 웹 파이프라인 시작:", url);
  
  // 1. 브라우저 연결
  const tabs = await mcp_kapture_list_tabs();
  const tabId = tabs[0].id;
  console.log("✅ 브라우저 연결:", tabId);
  
  // 2. 페이지 로드
  await mcp_kapture_navigate({ tabId, url });
  console.log("✅ 페이지 로드 완료");
  
  // 3. 스크롤 캡처
  const scrollPoints = [0, 25, 50, 75, 100];
  for (const point of scrollPoints) {
    await scrollToPercent(tabId, point);
    await wait(300);
    const screenshot = await mcp_kapture_screenshot({ tabId });
    console.log(`✅ 스크롤 ${point}% 캡처 완료`);
  }
  
  // 4. 인터랙션 테스트
  const navItems = await mcp_kapture_elements({
    tabId,
    selector: "nav a"
  });
  
  for (let i = 0; i < Math.min(3, navItems.length); i++) {
    await mcp_kapture_click({ tabId, selector: navItems[i].selector });
    await wait(500);
    await mcp_kapture_screenshot({ tabId });
    console.log(`✅ 네비게이션 ${i+1} 테스트 완료`);
  }
  
  // 5. 파일 검증
  const screenshotCount = countScreenshots('output/captures/');
  if (screenshotCount < 8) {
    throw new Error(`❌ 스크린샷 부족: ${screenshotCount}/8`);
  }
  
  console.log(`✅ MCP 탐색 완료: ${screenshotCount}개 스크린샷 생성`);
  
  // 6. JSON 생성 (MCP 로그 포함)
  await generate01ContentsWeb(/* mcpLogs */);
  await generate02StyleWeb(/* mcpLogs */);
  await generate03IntegrateWeb();
  
  console.log("✅ 파이프라인 완료");
}
```

## 🎯 최종 체크리스트 (현실적 버전)

### 준비 단계:

- [ ] URL이 제공되었는가?
- [ ] Kapture MCP 브라우저가 연결되었는가? (`mcp_kapture_list_tabs` 성공)
- [ ] 페이지가 정상적으로 로드되었는가? (HTTP 200)

### 섹션 분석 단계:

- [ ] 모든 섹션 식별 완료? (`section`, `main > div` 쿼리)
- [ ] 각 섹션의 타입 분류 완료? (hero, features, testimonials 등)
- [ ] 각 섹션의 레이아웃 분석 완료? (grid, flex, positioning)
- [ ] 섹션별 바운딩 박스 측정 완료?

### 디자인 디테일 분석:

- [ ] 타이포그래피 분석 완료? (10개 이상 요소)
- [ ] 색상 팔레트 추출 완료? (15개 이상 실제 색상)
- [ ] 버튼 스타일 패턴 분석 완료? (4개 이상 변형)
- [ ] 간격/여백 시스템 파악 완료?
- [ ] 애니메이션 패턴 식별 완료?

### 인터랙션 분석:

- [ ] 네비게이션 동작 테스트 완료? (3개 이상)
- [ ] 버튼/CTA 인터랙션 테스트 완료? (3개 이상)
- [ ] 모달/드로어 동작 확인?
- [ ] Hover 상태 변화 확인?
- [ ] 스크롤 애니메이션 동작 확인?

### 페이지 메트릭 수집:

- [ ] 전체 페이지 크기 측정? (width x height)
- [ ] 뷰포트 크기 확인?
- [ ] DOM 크기 측정? (MB 단위)
- [ ] 섹션 개수 카운트?
- [ ] 인터랙티브 요소 개수 파악?

### JSON 생성 검증:

- [ ] `01_contents_web.json`에 `mcpExploration` 섹션 존재?
- [ ] `sections` 배열에 10개 이상 항목?
- [ ] `interactions` 배열에 5개 이상 항목?
- [ ] `pageMetrics` 객체에 실측 데이터?
- [ ] `02_style_web.json`에 실제 computed styles 포함?
- [ ] `designSystem.colors`에 15개 이상 색상?
- [ ] `componentPatterns`에 실제 스타일 값?

### 품질 확인:

- [ ] 사용자가 관심가질 **핵심 디자인 포인트** 파악했는가?
- [ ] 단순 추정이 아닌 **실제 측정값** 기반인가?
- [ ] 특정 섹션의 **구현 방법**을 이해했는가?
- [ ] **재현 가능한** 수준의 상세도인가?

**⚠️ 중요: 스크린샷 파일은 없지만, 분석 데이터가 충분히 상세해야 함**

**모든 항목이 체크되어야 다음 단계(통합 스펙 생성) 진행 가능**

---

다음 분석 요청 시 **반드시** 확인:

- [ ] URL이 제공되면 MCP 탐색 자동 시작
- [ ] 브라우저 연결 성공 (tabId 획득)
- [ ] 페이지 네비게이션 완료
- [ ] 5개 스크롤 포인트 캡처 (0%, 25%, 50%, 75%, 100%)
- [ ] 3개 이상 인터랙션 테스트
- [ ] 최소 8개 스크린샷 파일 생성
- [ ] `output/captures/<sitename>_analysis/` 디렉토리에 파일 저장
- [ ] JSON 파일에 `mcpExploration` 섹션 포함
- [ ] 모든 스크린샷 경로를 JSON에 기록
- [ ] 페이지 메트릭 (DOM, viewport, 높이) 측정

**모든 체크박스가 ✅ 여야만 파이프라인 성공!**
