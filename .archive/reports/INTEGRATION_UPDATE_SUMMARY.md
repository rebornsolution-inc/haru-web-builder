# 파이프라인 통합 업데이트 요약

**날짜:** 2025-11-10  
**목적:** 충돌하는 지침 통합 및 명확한 정책 수립

---

## ✅ 완료된 주요 변경사항

### 1. MCP 도구 정책 단일화

**확정:**
- ✅ **Kapture MCP만 사용** (`mcp_kapture_*`)
- ❌ Playwright MCP 완전 제거
- ❌ Generic Browser MCP 제거

**적용 파일:**
- `.github/copilot-instructions.md` ← 정책 명확화
- `PIPELINE_GUIDE.md` ← 정책 반영
- `MCP_TOOL_GUIDE.md` ← Kapture만 설명

---

### 2. 스크린샷 정책 명확화

**확정: 메모리/대화 기록 기반 분석**

**원칙:**
1. ✅ 스크린샷 찍기 → 즉시 분석
2. ✅ 대화 기록에서 이전 스크린샷 참조 가능
3. ❌ 파일로 저장하지 않음 (`output/captures/` 사용 안 함)
4. ⚠️ 413 에러 방지: 과도한 누적 주의

**이전 스크린샷 비교 방법:**
```
사용자: "이전 스크린샷과 비교해줘"
AI: 대화 기록의 이전 응답에서 base64 데이터 참조하여 비교
```

**적용 파일:**
- `.github/copilot-instructions.md` ← 새 정책 추가
- `PIPELINE_GUIDE.md` ← 사용자 가이드 업데이트

**삭제/아카이브:**
- `CRITICAL_CHECKLIST.md` → `.archive/` (파일 저장 정책이었음)

---

### 3. 폴더 구조 재설계

**변경: `instruction/` → `analysis/`**

**이유:**
- "instruction"은 AI가 읽는 지침서로 오해됨
- 실제로는 AI가 **분석 결과를 쓰는 공간**
- "analysis"가 용도를 명확히 표현

**새 구조:**
```
analysis/
├── web-pipeline/
│   ├── 01_contents_web.json    ← AI가 콘텐츠 분석 결과 저장
│   ├── 02_style_web.json       ← AI가 스타일 분석 결과 저장
│   ├── 03_integrate_web.json   ← AI가 통합 사양서 저장
│   └── generators/
│       └── 04_generate_tailwind.json  ← 코드 생성 로직 (읽기)
└── presentation-pipeline/
    └── (유사 구조)
```

**파일 역할 명확화:**
- `01_`, `02_`, `03_`: **OUTPUT 파일** (AI가 씀)
- `04_generate_*.json`: **INPUT 로직** (AI가 읽음)

---

### 4. 출력 파일 경로 확정

**최종 출력 위치:**

```
output/
├── web_contents.json          ← analysis/01_*.json 복사본
├── web_style.json             ← analysis/02_*.json 복사본
├── WebDevSpec.json            ← analysis/03_*.json 복사본
└── web/
    └── index.html             ← 최종 Tailwind 코드
```

**이유:**
- 사용자는 `output/` 폴더만 확인
- `analysis/`는 내부 작업 공간
- 명확한 역할 분리

---

### 5. 중복 문서 아카이브

**아카이브된 파일:**
- `MULTIPASS_IMPLEMENTATION.md` → `.archive/`
- `MULTIPASS_STRATEGY.md` → `.archive/`
- `CRITICAL_CHECKLIST.md` → `.archive/`
- `scripts/explore_website_agent.js` → `.archive/`

**이유:**
- 모두 `copilot-instructions.md`에 통합됨
- 중복된 정책으로 AI 혼란 유발
- 참고용으로만 보관

**유지되는 문서:**
- `.github/copilot-instructions.md` - 메인 시스템 지침
- `PIPELINE_GUIDE.md` - 사용자 가이드 (한글)
- `MCP_TOOL_GUIDE.md` - 도구 레퍼런스 (한글)
- `AI_BEHAVIOR_ANALYSIS.md` - 참고 문서
- `CONFLICT_ANALYSIS.md` - 이번 분석 결과

---

### 6. 파이프라인 실행 프로세스 단순화

**새 프로세스:**

```
1. 사용자: /web https://example.com
2. AI: Kapture MCP로 탭 연결
3. 사용자: "스크롤 10%해"
4. AI: keypress + screenshot + 분석
5. 사용자: "이전 스크린샷과 비교해줘"
6. AI: 대화 기록 참조하여 비교
7. 반복...
8. AI: analysis/web-pipeline/*.json 작성
9. AI: Tailwind 코드 생성
10. AI: output/ 폴더에 결과 복사
```

**특징:**
- ❌ 자동화 스크립트 없음 (작동 안 함)
- ✅ 사용자 가이드 방식
- ✅ 단계별 검증 가능
- ✅ 명확한 피드백

---

## 📊 변경 전후 비교

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| **MCP 도구** | Kapture + Playwright 허용 | **Kapture만** |
| **스크린샷** | 파일 저장 필수 | **메모리 분석** (저장X) |
| **폴더명** | `instruction/` | **`analysis/`** |
| **파일 역할** | 모호함 | **명확함** (읽기 vs 쓰기) |
| **출력 위치** | instruction/ vs output/ 혼재 | **output/ 통일** |
| **문서 수** | 10개+ 충돌 | **4개 핵심** |
| **실행 방식** | 스크립트 자동화 (실패) | **수동 가이드** (검증됨) |

---

## 🎯 해결된 충돌

✅ **1. MCP 도구 선택 충돌** - Kapture로 단일화  
✅ **2. 스크린샷 정책 충돌** - 메모리 분석으로 확정  
✅ **3. 파일 역할 불명확** - analysis(쓰기) vs generators(읽기)  
✅ **4. 출력 경로 충돌** - output/ 루트로 통일  
✅ **5. 탐색 방법론 충돌** - 수동 가이드 방식 확정  
✅ **6. 중복 문서** - 4개 핵심 문서만 유지  
✅ **7. Semantic HTML 정책** - Tailwind만 사용  

---

## 📁 최종 파일 구조

```
workspace/
├── .github/
│   └── copilot-instructions.md    ← 메인 시스템 지침 (유일)
│
├── PIPELINE_GUIDE.md              ← 사용자 가이드 (한글)
├── MCP_TOOL_GUIDE.md              ← 도구 레퍼런스 (한글)
├── AI_BEHAVIOR_ANALYSIS.md        ← 참고 문서
├── CONFLICT_ANALYSIS.md           ← 충돌 분석 리포트
│
├── analysis/                      ← AI 분석 결과 저장소
│   └── web-pipeline/
│       ├── 01_contents_web.json   ← AI가 씀 (콘텐츠)
│       ├── 02_style_web.json      ← AI가 씀 (스타일)
│       ├── 03_integrate_web.json  ← AI가 씀 (통합)
│       └── generators/
│           └── 04_generate_tailwind.json  ← AI가 읽음
│
├── output/                        ← 사용자용 최종 결과
│   ├── web_contents.json
│   ├── web_style.json
│   ├── WebDevSpec.json
│   └── web/
│       └── index.html
│
└── .archive/                      ← 아카이브된 중복 문서
    ├── MULTIPASS_IMPLEMENTATION.md
    ├── MULTIPASS_STRATEGY.md
    ├── CRITICAL_CHECKLIST.md
    └── explore_website_agent.js
```

---

## ✅ 검증 체크리스트

### 정책 확인
- [x] Kapture MCP만 사용 명시됨
- [x] 스크린샷 메모리 분석 정책 명시됨
- [x] analysis/ 폴더 역할 명확함
- [x] output/ 경로 통일됨

### 파일 확인
- [x] `analysis/web-pipeline/*.json` 파일 생성됨 (기본 구조)
- [x] 중복 문서 `.archive/`로 이동됨
- [x] 핵심 문서만 루트에 유지됨

### 문서 업데이트
- [x] `copilot-instructions.md` 업데이트
- [x] `PIPELINE_GUIDE.md` 업데이트
- [ ] `MCP_TOOL_GUIDE.md` 업데이트 필요 (Playwright 제거)

---

## 🚀 다음 단계

### 즉시 수행
1. [ ] MCP_TOOL_GUIDE.md에서 Playwright 언급 삭제
2. [ ] 실제 URL로 파이프라인 테스트
3. [ ] analysis/*.json 파일 생성 확인
4. [ ] output/ 결과물 생성 확인

### 개선 사항
1. [ ] 대화 기록 참조 시 413 에러 모니터링
2. [ ] 스크린샷 누적 제한 정책 수립 (예: 최대 20장)
3. [ ] 분석 결과 품질 검증 프로세스

---

## 📝 주요 학습

1. **단일 진실 공급원**: 지침은 한 곳에만 (`copilot-instructions.md`)
2. **명확한 용도**: 파일/폴더명이 역할을 표현해야 함
3. **실용성 우선**: 이론적 완벽함보다 실제 작동하는 방식 채택
4. **대화 기록 활용**: 파일 저장 없이도 이전 데이터 참조 가능

---

**업데이트 완료일:** 2025-11-10
