# ⚠️ CRITICAL FIX: AI가 실제로 실행할 수 있는 프로세스

## 문제 진단

**사용자 테스트에서 발견된 문제:**

1. ❌ AI가 `mcp_kapture_screenshot()` 호출만 함
2. ❌ Preview URL이 반환되지만 **파일로 저장 안 함**
3. ❌ 사용자가 물어보기 전까지 **문제를 인지 못함**
4. ❌ `mcp_screenshot_saver.js` 함수는 **AI가 직접 호출 불가**

**근본 원인:**
- AI는 JavaScript 함수를 직접 실행할 수 없음
- `run_in_terminal`만 사용 가능
- 각 스크린샷마다 terminal 명령 실행 필요

---

## ✅ 해결책: Terminal 기반 워크플로우

### Step 1: 초기화

```bash
# 기존 캡처 정리
rm -f output/captures/*.webp output/captures/*.png
echo "✅ Captures directory cleaned"
```

### Step 2: 각 스크린샷 캡처 + 즉시 저장

**⚠️ AI가 실제로 실행해야 하는 패턴:**

```typescript
// Loop iteration 1
// 1. MCP로 캡처
const result1 = await mcp_kapture_screenshot({
  tabId: "168631338",
  format: "webp",
  quality: 0.7,
  scale: 0.3
});

// 2. 즉시 저장 (Terminal 명령)
await run_in_terminal({
  command: `echo "${result1.preview}" | node scripts/download_screenshot.js 1 0`,
  explanation: "Saving screenshot step 1 (0%)",
  isBackground: false
});

// 3. 스크롤
await mcp_kapture_keypress({ tabId: "168631338", key: "PageDown" });

// 4. 대기
await sleep(500);

// Loop iteration 2
// 1. MCP로 캡처
const result2 = await mcp_kapture_screenshot({
  tabId: "168631338",
  format: "webp",
  quality: 0.7,
  scale: 0.3
});

// 2. 즉시 저장
await run_in_terminal({
  command: `echo "${result2.preview}" | node scripts/download_screenshot.js 2 12`,
  explanation: "Saving screenshot step 2 (12%)",
  isBackground: false
});

// 3. 스크롤
await mcp_kapture_keypress({ tabId: "168631338", key: "PageDown" });

// ... 반복
```

---

## ⚠️ 핵심: 매 루프마다 검증

**문제 방지를 위해 3번마다 체크:**

```bash
# 3번째 스크린샷 후
ls -1 output/captures/*.webp | wc -l
# 기대: 3

# 6번째 스크린샷 후
ls -1 output/captures/*.webp | wc -l
# 기대: 6

# 9번째 스크린샷 후
ls -1 output/captures/*.webp | wc -l
# 기대: 9
```

**만약 예상과 다르면:**
- ❌ 즉시 중단
- 🔄 재실행

---

## 완전한 AI 실행 템플릿

```typescript
// ===== PHASE 1: 준비 =====
await run_in_terminal({
  command: 'rm -f output/captures/*.webp output/captures/*.png',
  explanation: 'Cleaning old screenshots',
  isBackground: false
});

// ===== PHASE 2: 페이지 정보 수집 =====
const tabs = await mcp_kapture_list_tabs();
const tabId = tabs[0].id;

const detail = await mcp_kapture_tab_detail({ tabId });
const pageHeight = detail.scrollHeight;

console.log(`Page height: ${pageHeight}px`);

// ===== PHASE 3: 탐색 루프 =====
let step = 1;
let scrollY = 0;
let captureCount = 0;

// 초기 캡처 (스크롤 전)
const initial = await mcp_kapture_screenshot({
  tabId,
  format: 'webp',
  quality: 0.7,
  scale: 0.3
});

await run_in_terminal({
  command: `echo "${initial.preview}" | node scripts/download_screenshot.js ${step} 0`,
  explanation: `Saving screenshot step ${step} (0%)`,
  isBackground: false
});

captureCount++;
step++;

// 페이지 끝까지 스크롤
while (scrollY < pageHeight && step <= 30) {
  // 1. 스크롤
  await mcp_kapture_keypress({ tabId, key: 'PageDown' });
  
  // 2. 대기 (애니메이션)
  await sleep(500);
  
  // 3. 위치 확인
  const current = await mcp_kapture_tab_detail({ tabId });
  scrollY = current.scrollY;
  const scrollPercent = Math.round((scrollY / pageHeight) * 100);
  
  // 4. 캡처
  const result = await mcp_kapture_screenshot({
    tabId,
    format: 'webp',
    quality: 0.7,
    scale: 0.3
  });
  
  // 5. ✅ 즉시 저장 (필수!)
  await run_in_terminal({
    command: `echo "${result.preview}" | node scripts/download_screenshot.js ${step} ${scrollPercent}`,
    explanation: `Saving screenshot step ${step} (${scrollPercent}%)`,
    isBackground: false
  });
  
  captureCount++;
  step++;
  
  // 6. ⚠️ 3번마다 검증
  if (captureCount % 3 === 0) {
    const checkResult = await run_in_terminal({
      command: 'ls -1 output/captures/*.webp 2>/dev/null | wc -l',
      explanation: 'Verifying screenshot count',
      isBackground: false
    });
    
    const fileCount = parseInt(checkResult.trim());
    
    if (fileCount !== captureCount) {
      throw new Error(`❌ CRITICAL: Expected ${captureCount} files, found ${fileCount}`);
    }
    
    console.log(`✅ Verified: ${fileCount} screenshots saved`);
  }
  
  // 7. 페이지 끝 체크
  if (current.atBottom) {
    console.log('✅ Reached page bottom');
    break;
  }
}

// ===== PHASE 4: 최종 검증 =====
const finalCheck = await run_in_terminal({
  command: `
    echo "📊 Final Validation:"
    count=$(ls -1 output/captures/*.webp 2>/dev/null | wc -l | xargs)
    echo "   Total files: $count"
    
    if [ "$count" -lt 15 ]; then
      echo "❌ FAILED: Only $count files (minimum 15)"
      exit 1
    else
      echo "✅ PASSED: $count screenshots saved"
      du -sh output/captures/
      exit 0
    fi
  `,
  explanation: 'Final validation of screenshots',
  isBackground: false
});

console.log(finalCheck);

// ===== PHASE 5: 분석 시작 =====
console.log('✅ All screenshots saved, starting analysis...');
// → Now proceed to write 01_contents_web.json, etc.
```

---

## ⚠️ AI 체크리스트

**탐색 시작 전:**
- [ ] `rm -f output/captures/*.webp` 실행
- [ ] 결과 확인: "✅ Captures directory cleaned"

**매 스크린샷마다:**
- [ ] `mcp_kapture_screenshot()` 호출
- [ ] **즉시** `run_in_terminal` + `download_screenshot.js` 실행
- [ ] Terminal 출력 확인: "✅ {filename} (XX KB)"

**3번마다:**
- [ ] `ls -1 output/captures/*.webp | wc -l` 실행
- [ ] 예상 개수와 일치 확인
- [ ] 불일치 시 **즉시 중단**

**탐색 완료 후:**
- [ ] 최종 검증 스크립트 실행
- [ ] 결과가 "✅ PASSED" 아니면 **분석 금지**
- [ ] "❌ FAILED" 시 재탐색

---

## 실패 시나리오 대응

### Case 1: 파일 저장 실패

**증상:**
```bash
$ ls output/captures/
.gitkeep
```

**원인:**
- `download_screenshot.js` 호출 안 함
- Preview URL이 잘못됨

**해결:**
```bash
# 수동 테스트
echo "https://..." | node scripts/download_screenshot.js 1 0

# 결과 확인
ls -lh output/captures/
```

---

### Case 2: 예상보다 적은 파일

**증상:**
```bash
$ ls -1 output/captures/*.webp | wc -l
5  # 기대: 18
```

**원인:**
- 루프 도중 저장 명령 누락
- 스크립트 실행 실패 (에러 무시됨)

**해결:**
```bash
# 에러 로그 확인
cat output/captures/error.log

# 재실행
rm -f output/captures/*.webp
# → 탐색 다시 시작
```

---

### Case 3: 파일이 너무 큼

**증상:**
```bash
$ du -h output/captures/*.webp
450K  step-01.webp  # 너무 큼!
```

**해결:**
```javascript
// scale 낮추기
const result = await mcp_kapture_screenshot({
  tabId,
  format: 'webp',
  quality: 0.7,
  scale: 0.2  // ← 0.3 → 0.2
});
```

---

## 요약: AI가 반드시 지켜야 할 것

### ✅ DO

1. **매 스크린샷마다** `run_in_terminal` + `download_screenshot.js` 호출
2. **3번마다** 파일 개수 검증
3. **탐색 완료 후** 최종 검증
4. **검증 실패 시** 즉시 중단 + 재실행

### ❌ DON'T

1. ~~"캡처했다"고만 로그 남기기~~ → 파일 저장 없으면 실패
2. ~~검증 없이 다음 단계 진행~~ → 15개 미만이면 중단
3. ~~사용자가 물어볼 때까지 대기~~ → 자동 검증
4. ~~JavaScript 함수 직접 호출 시도~~ → Terminal만 사용

---

## 개선 전 vs 개선 후

### ❌ 개선 전 (사용자 테스트에서 발생)

```
AI: screenshot() 호출
AI: screenshot() 호출
AI: screenshot() 호출
...
사용자: "저장되고 있는 거 맞아?"
AI: "확인해보니 저장 안 됨" ← 너무 늦음!
```

### ✅ 개선 후

```
AI: screenshot() 호출
AI: run_in_terminal("download...") 호출
AI: "✅ step-01 saved (45 KB)"

AI: screenshot() 호출
AI: run_in_terminal("download...") 호출
AI: "✅ step-02 saved (52 KB)"

AI: screenshot() 호출
AI: run_in_terminal("download...") 호출
AI: "✅ step-03 saved (48 KB)"
AI: run_in_terminal("ls ... | wc -l")
AI: "✅ Verified: 3 files"

...

AI: 탐색 완료
AI: run_in_terminal("final validation")
AI: "✅ PASSED: 18 screenshots"
AI: → 분석 시작
```

---

## 실제 실행 예시

```bash
# AI가 실행하는 명령어 시퀀스

# 1. 정리
rm -f output/captures/*.webp

# 2-1. 첫 번째 캡처
echo "https://..." | node scripts/download_screenshot.js 1 0
# → ✅ 20251109_143012_step-01_scroll-0.webp (45 KB)

# 2-2. 두 번째 캡처
echo "https://..." | node scripts/download_screenshot.js 2 12
# → ✅ 20251109_143015_step-02_scroll-12.webp (52 KB)

# 2-3. 세 번째 캡처
echo "https://..." | node scripts/download_screenshot.js 3 25
# → ✅ 20251109_143018_step-03_scroll-25.webp (48 KB)

# 3. 검증 (3번마다)
ls -1 output/captures/*.webp | wc -l
# → 3

# ... 계속 반복 ...

# 최종 검증
ls -1 output/captures/*.webp | wc -l
# → 18 (기대: ≥15)

# 통과! 분석 시작
```

---

이 프로세스를 **copilot-instructions.md**에 업데이트하고, AI가 **자동으로 이 패턴을 따르도록** 만들겠습니다.
