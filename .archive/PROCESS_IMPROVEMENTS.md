# ✅ 프로세스 개선 완료

## 문제 진단 (사용자 테스트 기반)

### 발견된 문제

**사용자:** "진행중에 미안한데 지금 이 스크린샷들 저장되고 있는거 맞아?"

**AI 응답:** "❌ 저장 안 되고 있습니다!"

**근본 원인:**
1. ❌ AI가 `mcp_kapture_screenshot()` 만 호출
2. ❌ Preview URL 받지만 **파일로 저장 안 함**
3. ❌ 사용자가 물어보기 전까지 **문제를 인지 못함**
4. ❌ `output/captures/`에 `.gitkeep`만 존재

---

## ✅ 해결책

### 1. Terminal 기반 자동 저장 스크립트

**생성된 파일:**
- `scripts/download_screenshot.js` - Preview URL → 파일 저장

**사용법:**
```bash
# MCP 캡처 후 즉시:
echo "https://preview.url..." | node scripts/download_screenshot.js 1 0
# → output/captures/20251109_143012_step-01_scroll-0.webp
```

### 2. 자동 검증 스크립트

**생성된 파일:**
- `scripts/validate_captures.sh` - 저장된 파일 검증

**사용법:**
```bash
bash scripts/validate_captures.sh
# → ✅ VALIDATION PASSED: 18 screenshots ready
```

### 3. 강제 실행 프로세스

**업데이트된 파일:**
- `.github/copilot-instructions.md` - AI 실행 프로세스 강제화

**핵심 변경:**
```typescript
// ❌ 이전 (저장 안 됨)
const result = await mcp_kapture_screenshot({ ... });
// → 다음 단계 진행

// ✅ 개선 후 (자동 저장)
const result = await mcp_kapture_screenshot({ ... });

await run_in_terminal({
  command: `echo "${result.preview}" | node scripts/download_screenshot.js ${step} ${percent}`,
  explanation: `Saving screenshot step ${step}`,
  isBackground: false
});
// → ✅ 파일 저장 확인
```

---

## 새 프로세스 플로우

### Phase 1: 준비

```bash
# 1. 기존 캡처 정리
rm -f output/captures/*.webp output/captures/*.png
```

### Phase 2: 탐색 루프

```
FOR each scroll position:
  1. mcp_kapture_screenshot()
     ↓
  2. run_in_terminal(download_screenshot.js)  ← 필수!
     ↓
  3. Terminal 출력 확인: "✅ step-XX saved (YY KB)"
     ↓
  4. mcp_kapture_keypress('PageDown')
     ↓
  5. sleep(500)
     ↓
  6. IF (step % 3 === 0):
       → ls -1 *.webp | wc -l
       → 예상 개수 != 실제 개수? STOP!
```

### Phase 3: 최종 검증

```bash
bash scripts/validate_captures.sh
# ✅ PASSED: 18 screenshots
# ❌ FAILED: Only 5 screenshots → 재실행!
```

### Phase 4: 분석 진행

```
IF validation PASSED:
  → Write 01_contents_web.json
  → Write 02_style_web.json
  → Write 03_integrate_web.json
  → Generate index.html
ELSE:
  → STOP! Re-run exploration
```

---

## 검증 체크포인트

### ✅ 체크포인트 1: 초기화

**시점:** 탐색 시작 전

**명령:**
```bash
rm -f output/captures/*.webp
```

**기대 결과:**
```
✅ Captures directory cleaned
```

---

### ✅ 체크포인트 2: 매 캡처

**시점:** 스크린샷 캡처 직후

**명령:**
```bash
echo "URL" | node scripts/download_screenshot.js 1 0
```

**기대 결과:**
```
✅ 20251109_143012_step-01_scroll-0.webp (45 KB)
```

**실패 시:**
```
❌ Download failed: HTTP 403
→ Preview URL 잘못됨, 재시도
```

---

### ✅ 체크포인트 3: 3번마다 검증

**시점:** 3, 6, 9, 12... 번째 캡처 후

**명령:**
```bash
ls -1 output/captures/*.webp | wc -l
```

**기대 결과:**
```
3  # 3번째 캡처 후
6  # 6번째 캡처 후
9  # 9번째 캡처 후
```

**실패 시:**
```
2  # 기대: 3
→ ❌ CRITICAL: 파일 누락! 중단 후 재실행
```

---

### ✅ 체크포인트 4: 최종 검증

**시점:** 탐색 완료 후, 분석 시작 전

**명령:**
```bash
bash scripts/validate_captures.sh
```

**기대 결과:**
```
📊 Validating screenshots...
   Files found: 18
   Minimum required: 15
✅ VALIDATION PASSED
```

**실패 시:**
```
📊 Validating screenshots...
   Files found: 5
   Minimum required: 15
❌ VALIDATION FAILED
   → DO NOT proceed to analysis!
```

---

## 개선 전 vs 개선 후

### ❌ 개선 전

```
사용자: "https://example.com 분석해줘"
↓
AI: mcp_kapture_screenshot() × 20
AI: "탐색 완료"
AI: "분석 시작..."
↓
사용자: "스크린샷 저장됐어?"
AI: "확인해보니 저장 안 됨" ← 너무 늦음!
↓
결과: 추측/가정 기반 분석
```

### ✅ 개선 후

```
사용자: "https://example.com 분석해줘"
↓
AI: rm -f output/captures/*.webp
AI: "✅ Captures directory cleaned"
↓
AI: mcp_kapture_screenshot()
AI: run_in_terminal(download...)
AI: "✅ step-01 saved (45 KB)"
↓
AI: mcp_kapture_screenshot()
AI: run_in_terminal(download...)
AI: "✅ step-02 saved (52 KB)"
↓
AI: mcp_kapture_screenshot()
AI: run_in_terminal(download...)
AI: "✅ step-03 saved (48 KB)"
AI: ls -1 *.webp | wc -l → "3"
AI: "✅ Verified: 3 files"
↓
... (계속) ...
↓
AI: bash scripts/validate_captures.sh
AI: "✅ VALIDATION PASSED: 18 screenshots"
↓
AI: "분석 시작..."
↓
결과: 실제 스크린샷 기반 정확한 분석
```

---

## 파일 구조

```
.github/
├── copilot-instructions.md           ← AI 메인 가이드 (업데이트됨)
├── AI_EXECUTABLE_PROCESS.md         ← 실행 가능한 프로세스 문서 (신규)
├── MCP_AUTO_SAVE_README.md          ← 자동 저장 상세 가이드 (신규)
└── PROCESS_IMPROVEMENTS.md          ← 이 문서 (신규)

scripts/
├── download_screenshot.js            ← Preview URL → 파일 저장 (신규)
├── validate_captures.sh              ← 검증 스크립트 (신규)
└── mcp_screenshot_saver.js           ← 헬퍼 함수 (기존, 참고용)

output/
└── captures/
    ├── .gitkeep
    └── (스크린샷 파일들이 여기 저장됨)
```

---

## 사용자를 위한 체크리스트

### ✅ AI가 제대로 작동하는지 확인

**탐색 중:**
- [ ] Terminal에 "✅ step-XX saved" 메시지 보임
- [ ] `output/captures/`에 `.webp` 파일 생성 중
- [ ] 3번마다 "✅ Verified: N files" 메시지

**탐색 완료 후:**
- [ ] "✅ VALIDATION PASSED" 메시지
- [ ] 최소 15개 파일 확인: `ls output/captures/*.webp | wc -l`
- [ ] 각 파일 20-100 KB 범위: `du -h output/captures/*.webp`

**분석 중:**
- [ ] JSON 파일에 실제 데이터 기록됨
- [ ] "가정/추측" 대신 "실제 관찰" 언급
- [ ] `integration.exploration.totalScreenshots` 값이 실제 파일 개수와 일치

---

## 문제 발생 시 대응

### Case 1: 파일이 저장 안 됨

**증상:**
```bash
$ ls output/captures/
.gitkeep
```

**원인:** `download_screenshot.js` 호출 누락

**해결:**
1. 탐색 중단
2. AI에게 지적: "스크린샷 저장 안 되고 있어요"
3. AI가 프로세스 재시작
4. 매 캡처마다 `run_in_terminal` 호출 확인

---

### Case 2: 파일 개수 부족

**증상:**
```bash
$ bash scripts/validate_captures.sh
❌ VALIDATION FAILED: Only 8 files
```

**원인:** 중간에 저장 실패

**해결:**
1. 재탐색 요청: "파일이 8개밖에 없어요. 다시 탐색해주세요"
2. AI가 cleanup → 재탐색
3. 검증 통과 확인

---

### Case 3: AI가 검증 건너뜀

**증상:** 탐색 후 바로 JSON 작성 시작

**해결:**
1. 즉시 중단: "검증부터 해주세요"
2. `bash scripts/validate_captures.sh` 실행 요청
3. 통과하면 계속, 실패하면 재탐색

---

## 요약

### ✅ 개선 완료 사항

1. **자동 저장 스크립트** (`download_screenshot.js`)
2. **자동 검증 스크립트** (`validate_captures.sh`)
3. **강제 실행 프로세스** (copilot-instructions.md)
4. **4단계 검증** (초기화 → 매 캡처 → 3번마다 → 최종)

### 🎯 기대 효과

1. ✅ **100% 파일 저장 보장** (Terminal 명령 기반)
2. ✅ **조기 오류 감지** (3번마다 검증)
3. ✅ **사용자 개입 불필요** (자동 검증)
4. ✅ **정확한 분석** (실제 스크린샷 기반)

### 🚀 다음 실행 시

**사용자:** "https://example.com 분석해줘"

**AI가 자동으로:**
1. ✅ 기존 파일 정리
2. ✅ 탐색 + 매 캡처마다 저장
3. ✅ 3번마다 검증
4. ✅ 최종 검증
5. ✅ 통과 시에만 분석 진행

**결과:** 사용자가 확인할 필요 없이 **자동으로 정확한 분석!**
