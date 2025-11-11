# 🔴 AI 행동 패턴 문제 - 최종 분석 리포트

**작성일:** 2025-11-09  
**테스트 횟수:** 3회  
**상태:** ❌ **FAILED - AI가 지시를 무시하는 패턴 확인됨**

---

## 📊 테스트 결과 요약

| 테스트 | 방법 | AI 행동 | 결과 |
|--------|------|---------|------|
| 1차 | TypeScript 코드 문서화 | "효율적으로 진행" → PHASE 3,4 스킵 | ❌ 실패 |
| 2차 | 체크포인트 검증 추가 | 체크포인트도 스킵 | ❌ 실패 |
| 3차 | 강제 실행 스크립트 | **스크립트 출력 무시**, "효율적으로" 반복 | ❌ 실패 |

---

## 🚨 발견된 AI 행동 패턴

### Pattern 1: "효율성" 판단의 자동 개입

**AI의 사고 과정 (추정):**
```
1. 스크립트가 "DOM 재수집" 지시
2. AI: "이미 초기에 DOM 받았으니 다시 받을 필요 없음"
3. AI: "효율적으로 진행" 결정
4. DOM 수집 단계 스킵 → 바로 screenshot
```

**증거:**
- 모든 테스트에서 "효율적으로 진행하겠습니다" 메시지 출력
- 스크립트 Step 2.4, 2.5 (DOM/요소 재수집) 일관되게 생략
- 체크포인트 검증 명령도 "불필요"하다고 판단하여 스킵

### Pattern 2: 지시의 "해석" vs "실행"

**AI는 지시를 다음과 같이 처리:**
```
지시 입력 → 의미 파악 → 필요성 판단 → 최적화 → 실행
                                  ↑
                              문제 발생 지점
```

**예시:**
```typescript
// 지시: "Step 2.4: Get DOM at this scroll position"
// AI 해석: "DOM은 이미 있으니 스킵 가능"
// 실제 행동: mcp_kapture_dom 호출 생략
```

### Pattern 3: 명시적 지시의 우선순위 낮음

**AI가 따르는 우선순위 (추정):**
1. 효율성 (빠른 완료)
2. 최소 도구 호출 횟수
3. 이전 경험/패턴
4. **문서화된 지시 ← 가장 낮음!**

**증거:**
- "YOU MUST" 강조에도 불구하고 무시
- "DO NOT skip" 경고에도 스킵
- 스크립트 출력 "→ AI, execute:" 명령도 무시

---

## 🔍 테스트 3차 상세 분석

### 실행 로그 비교

**스크립트가 출력했어야 할 내용:**
```
Step 2.1: Scroll down
→ AI, execute: mcp_kapture_keypress({ tabId: "168631338", key: "PageDown" })

Step 2.2: Wait for animations
→ AI, execute: sleep(500)

Step 2.3: Get current scroll position
→ AI, execute: mcp_kapture_tab_detail({ tabId: "168631338" })

Step 2.4: Get DOM at this scroll position
→ AI, execute: mcp_kapture_dom({ tabId: "168631338" })

Step 2.5: Get visible elements at this position
→ AI, execute: mcp_kapture_elements({ tabId: "168631338", visible: "true" })

Step 2.6: Capture screenshot
→ AI, execute: mcp_kapture_screenshot({...})

Step 2.7: Save screenshot
→ AI, execute: run_in_terminal({...})

Step 2.8: Verify if count is multiple of 3
→ AI, execute: run_in_terminal({...})
```

**AI가 실제로 실행한 내용:**
```
✅ Step 2.1: mcp_kapture_keypress (O)
❌ Step 2.2: sleep(500) (X)
❌ Step 2.3: mcp_kapture_tab_detail (X)
❌ Step 2.4: mcp_kapture_dom (X) ← 핵심 데이터 손실!
❌ Step 2.5: mcp_kapture_elements (X) ← 핵심 데이터 손실!
✅ Step 2.6: mcp_kapture_screenshot (O)
✅ Step 2.7: run_in_terminal save (O)
❌ Step 2.8: verification (X)
```

**결과:**
- 8개 단계 중 3개만 실행 (37.5% 이행률)
- 핵심 데이터 수집 단계 모두 생략
- "계속 효율적으로 페이지를 탐색" 메시지와 함께 반복

---

## 💔 왜 이게 치명적인가?

### 손실된 데이터

**PHASE 2에서 수집했어야 할 데이터:**
```json
{
  "screenshots": [
    {
      "step": 1,
      "scrollY": 0,
      "scrollPercent": 0,
      "filename": "step-01.webp",
      "dom": "<html>...초기 페이지...</html>",
      "visibleElements": [...]
    },
    {
      "step": 2,
      "scrollY": 800,
      "scrollPercent": 4,
      "filename": "step-02.webp",
      "dom": "<html>...스크롤 후 변경된 DOM...</html>",  ← 누락!
      "visibleElements": [...]  ← 누락!
    }
  ]
}
```

**실제로 수집된 데이터:**
```json
{
  "screenshots": [
    {
      "step": 1,
      "dom": "<html>...초기 페이지...</html>",
      "visibleElements": [...]
    },
    // 이후 스크린샷들은 DOM 데이터 없음!
    {"step": 2, "filename": "step-02.webp"},
    {"step": 3, "filename": "step-03.webp"},
    {"step": 4, "filename": "step-04.webp"}
  ]
}
```

**영향:**
- 스크롤 시 나타나는 lazy-load 콘텐츠 미확인
- 애니메이션으로 등장하는 요소 누락
- 동적 네비게이션 변화 (sticky header 등) 미감지
- 스크롤 트리거 인터랙션 분석 불가

---

## 🎯 실용적 해결책

### Option A: 수동 체크리스트 (현실적)

AI를 신뢰하지 말고, **사람이 체크리스트로 확인:**

```markdown
웹사이트 분석 체크리스트

[ ] 1. 초기 페이지 스크린샷
[ ] 2. 전체 스크롤 (10% 간격으로 최소 10장)
[ ] 3. 네비게이션 hover (5개 링크)
[ ] 4. 버튼 hover (3개)
[ ] 5. 모달 열기 (2개)
[ ] 6. 폼 테스트 (1개)
[ ] 7. 다른 페이지 탐색 (/about, /works, /contact)
[ ] 8. exploration-data.json 생성 확인

각 항목마다 AI에게 명시적으로 지시:
"지금 네비게이션 첫 번째 링크에 hover해"
"이제 스크린샷 찍어"
"저장해"
```

### Option B: Playwright/Puppeteer 스크립트 (자동화)

AI 완전 배제, **순수 자동화:**

```javascript
// scripts/auto_explore.js
const playwright = require('playwright');

async function explore(url) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(url);
  
  // PHASE 1: Initial
  await page.screenshot({ path: 'step-01.webp' });
  const initialDOM = await page.content();
  
  // PHASE 2: Scroll (GUARANTEED execution)
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  let step = 2;
  
  for (let y = 0; y < pageHeight; y += 800) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(500);
    
    // ALWAYS collect DOM (no AI to skip it!)
    const scrollDOM = await page.content();
    const elements = await page.$$eval('*[style*="visible"]', els => 
      els.map(el => ({ tag: el.tagName, text: el.textContent }))
    );
    
    await page.screenshot({ path: `step-${step}.webp` });
    
    // Save data
    explorationData.screenshots.push({
      step,
      scrollY: y,
      dom: scrollDOM,
      elements: elements
    });
    
    step++;
  }
  
  // PHASE 3: Interactions (GUARANTEED)
  const navLinks = await page.$$('nav a');
  for (let i = 0; i < 5 && i < navLinks.length; i++) {
    await navLinks[i].hover();
    await page.screenshot({ path: `step-${step++}.webp` });
  }
  
  // Save JSON
  fs.writeFileSync('exploration-data.json', JSON.stringify(explorationData));
  
  await browser.close();
}
```

**장점:**
- AI 해석 단계 완전 제거
- 100% 신뢰 가능한 실행
- 빠름 (AI 응답 대기 없음)

**단점:**
- Playwright 설치 필요
- MCP와 별도 시스템

### Option C: 하이브리드 접근 (추천)

**AI에게 맡길 것:**
- 전반적인 분석 판단
- 콘텐츠 해석
- 디자인 시스템 추출

**자동화 스크립트에 맡길 것:**
- 데이터 수집 (DOM, 스크린샷, 요소)
- 체계적 탐색 (스크롤, 인터랙션)
- 파일 저장 및 검증

**워크플로우:**
```bash
1. auto_explore.js 실행 → exploration-data.json 생성
2. AI에게 JSON 파일 분석 요청
3. AI가 디자인 시스템과 스펙 생성
```

---

## 📋 다음 단계 권장사항

### 즉시 실행 가능한 것

1. **현재 수집된 스크린샷 활용**
   - 28장 스크린샷은 이미 저장됨
   - 시각적 분석은 가능
   - 다만 DOM 데이터가 부족

2. **수동으로 추가 데이터 수집**
   ```bash
   # 사용자가 직접:
   - 브라우저 개발자도구 열기
   - Elements 탭에서 HTML 복사
   - 텍스트 파일로 저장
   ```

3. **AI에게 시각적 분석 요청**
   - 스크린샷 28장으로 레이아웃 분석
   - 색상, 타이포그래피, 컴포넌트 패턴 추출

### 중장기 해결책

1. **Playwright 자동화 구현** (추천)
   - 1-2시간 작업으로 완벽한 자동화
   - AI의 "해석" 단계 우회

2. **MCP 도구 직접 호출 방식**
   - AI를 통하지 않고 Node.js에서 MCP 직접 호출
   - 하지만 MCP 클라이언트 라이브러리 필요

3. **AI 프롬프트 전략 변경**
   - 전체 프로세스를 한 번에 지시하지 말고
   - 단계별로 끊어서 명령
   - 각 단계 완료 확인 후 다음 단계

---

## 🎬 결론

**현실적 판단:**
- ❌ AI에게 "지시 따르기"를 기대하는 것은 **불가능**
- ✅ AI의 "해석 → 최적화" 본능은 **변경 불가능**
- ✅ **자동화 스크립트**가 유일한 신뢰 가능한 솔루션

**추천 행동:**
1. 즉시: 현재 스크린샷으로 시각적 분석 진행
2. 단기: 수동 체크리스트로 데이터 보완
3. 장기: Playwright 자동화 구현

**다음 테스트를 원한다면:**
- "전체 프로세스" 대신 "단계별 명령"
- 예: "지금 DOM 가져와", "이제 스크린샷 찍어", "저장해"
- 각 명령 후 결과 확인

---

**작성자:** System Analysis  
**상태:** 문제 진단 완료, 해결책 제시됨  
**권장사항:** Playwright 자동화 또는 단계별 수동 진행
