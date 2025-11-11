# 작업영역 정리 리스트

**날짜:** 2025-11-10  
**기준:** Web 파이프라인 통합 완료 후 상태  
**PPTX 파이프라인:** 유지 (변경 없음)

---

## 📋 정리 대상 파일 분류

### 🗑️ 1. 완전 삭제 추천 (중복/구식/불필요)

#### 루트 폴더
```
❌ SYSTEM_STATUS.md
   - 이유: 이미 통합된 정보, INTEGRATION_UPDATE_SUMMARY.md로 대체
   - 액션: 삭제

❌ PIPELINE_UPDATE_SUMMARY.md
   - 이유: INTEGRATION_UPDATE_SUMMARY.md와 중복
   - 액션: 삭제
```

#### .github/ 폴더
```
❌ 413_ERROR_SOLUTION.md
   - 이유: 스크린샷 파일 저장 안 함 정책으로 더 이상 관련 없음
   - 액션: 삭제

❌ EXPLORATION_MANUAL.md
   - 이유: copilot-instructions.md에 통합됨
   - 액션: .archive/ 이동

❌ PROCESS_IMPROVEMENTS.md
   - 이유: 중복 개선 제안 문서, 이미 적용됨
   - 액션: .archive/ 이동

❌ ROOT_CAUSE_ANALYSIS.md
   - 이유: AI_BEHAVIOR_ANALYSIS.md와 유사, 참고용으로만 필요
   - 액션: .archive/ 이동

❌ CHECKPOINT_ENFORCEMENT.md
   - 이유: 스크립트 자동화 관련 문서, 더 이상 사용 안 함
   - 액션: .archive/ 이동

❌ MCP_AUTO_SAVE_README.md
   - 이유: 스크린샷 자동 저장 관련, 새 정책과 충돌
   - 액션: 삭제

❌ MCP_SCREENSHOT_SAVER.md
   - 이유: 스크린샷 파일 저장 관련, 새 정책과 충돌
   - 액션: 삭제

❌ SCREENSHOT_FORMAT_GUIDE.md
   - 이유: 스크린샷 저장 안 함으로 불필요
   - 액션: 삭제

❌ MCP_TOOL_COMPARISON.md
   - 이유: Kapture만 사용으로 비교 불필요
   - 액션: .archive/ 이동

❌ SCREENSHOT_FIX_SUMMARY.md
   - 이유: 스크린샷 저장 관련 이슈, 더 이상 관련 없음
   - 액션: 삭제

❌ ENHANCED_EXPLORATION.md
   - 이유: copilot-instructions.md에 통합됨
   - 액션: .archive/ 이동

❌ MULTIPASS_QUICKREF.md
   - 이유: 멀티패스 전략 폐기됨
   - 액션: .archive/ 이동

❌ AI_EXECUTABLE_PROCESS.md
   - 이유: 스크립트 자동화 관련, 더 이상 사용 안 함
   - 액션: .archive/ 이동
```

#### scripts/ 폴더
```
❌ download_screenshot.js.backup
   - 이유: 백업 파일, 더 이상 사용 안 함
   - 액션: 삭제

❌ explore_website.js.backup
   - 이유: 백업 파일, 더 이상 사용 안 함
   - 액션: 삭제

❌ execute_exploration.js
   - 이유: 자동화 스크립트, 작동 안 함
   - 액션: .archive/ 이동

❌ mcp_exploration.js
   - 이유: 구식 탐색 스크립트
   - 액션: .archive/ 이동

❌ mcp_screenshot_saver.js
   - 이유: 스크린샷 저장 스크립트, 새 정책과 충돌
   - 액션: 삭제

❌ playwright_explore.js
   - 이유: Playwright MCP 사용 (금지됨)
   - 액션: 삭제

❌ simple_capture.js
   - 이유: 스크린샷 캡처 스크립트, 더 이상 사용 안 함
   - 액션: 삭제

❌ validate_captures.sh
   - 이유: 스크린샷 검증 스크립트, 불필요
   - 액션: 삭제
```

---

### ✅ 2. 유지 필요 (핵심 문서)

#### 루트 폴더
```
✅ PIPELINE_GUIDE.md
   - 역할: 사용자 가이드 (한글)
   - 상태: 최신 업데이트 완료

✅ MCP_TOOL_GUIDE.md
   - 역할: Kapture MCP 도구 레퍼런스
   - 상태: 업데이트 필요 (Playwright 언급 제거)

✅ AI_BEHAVIOR_ANALYSIS.md
   - 역할: AI 행동 패턴 분석 참고 문서
   - 상태: 유지 (참고용)

✅ CONFLICT_ANALYSIS.md
   - 역할: 이번 통합 작업의 충돌 분석 리포트
   - 상태: 유지 (기록용)

✅ INTEGRATION_UPDATE_SUMMARY.md
   - 역할: 통합 업데이트 최종 요약
   - 상태: 최신
```

#### .github/ 폴더
```
✅ copilot-instructions.md
   - 역할: 메인 시스템 지침 (유일)
   - 상태: 최신 업데이트 완료
```

#### scripts/ 폴더
```
✅ setup_pptx.sh
   - 역할: PPTX 생성 환경 설정
   - 상태: PPTX 파이프라인용, 유지

✅ spec_to_pptx.py
   - 역할: PPTX 생성 스크립트
   - 상태: PPTX 파이프라인용, 유지

✅ fix_permissions.sh
   - 역할: 권한 수정 유틸리티
   - 상태: 유지 (범용)
```

#### docs/ 폴더
```
✅ PPTX_GENERATION.md
   - 역할: PPTX 파이프라인 가이드
   - 상태: 유지 (PPTX 관련)
```

---

### 🔄 3. 통합 후 삭제 추천

현재 상태에서는 통합할 문서 없음. 모두 이미 통합 완료.

---

## 📊 정리 통계

| 분류 | 개수 | 상태 |
|------|------|------|
| **삭제 대상** | 20개 | 중복/구식/충돌 |
| **유지 필요** | 10개 | 핵심 문서 |
| **통합 대상** | 0개 | 이미 완료 |

---

## 🎯 실행 계획

### Phase 1: 즉시 삭제 (위험도 낮음)

```bash
# 백업 파일 삭제
rm scripts/download_screenshot.js.backup
rm scripts/explore_website.js.backup

# 스크린샷 관련 스크립트 삭제
rm scripts/mcp_screenshot_saver.js
rm scripts/simple_capture.js
rm scripts/validate_captures.sh
rm scripts/playwright_explore.js

# 스크린샷 관련 문서 삭제
rm .github/413_ERROR_SOLUTION.md
rm .github/MCP_AUTO_SAVE_README.md
rm .github/MCP_SCREENSHOT_SAVER.md
rm .github/SCREENSHOT_FORMAT_GUIDE.md
rm .github/SCREENSHOT_FIX_SUMMARY.md

# 중복 요약 문서 삭제
rm SYSTEM_STATUS.md
rm PIPELINE_UPDATE_SUMMARY.md
```

### Phase 2: 아카이브 이동 (참고용 보존)

```bash
# 탐색 전략 관련
mv .github/EXPLORATION_MANUAL.md .archive/
mv .github/ENHANCED_EXPLORATION.md .archive/
mv .github/MULTIPASS_QUICKREF.md .archive/

# 프로세스 개선 문서
mv .github/PROCESS_IMPROVEMENTS.md .archive/
mv .github/ROOT_CAUSE_ANALYSIS.md .archive/
mv .github/CHECKPOINT_ENFORCEMENT.md .archive/
mv .github/AI_EXECUTABLE_PROCESS.md .archive/

# 도구 비교 문서
mv .github/MCP_TOOL_COMPARISON.md .archive/

# 스크립트 아카이브
mv scripts/execute_exploration.js .archive/
mv scripts/mcp_exploration.js .archive/
```

### Phase 3: 필수 업데이트

```bash
# MCP_TOOL_GUIDE.md에서 Playwright 언급 제거 필요
# (수동 편집)
```

---

## 📁 정리 후 최종 구조

```
workspace/
├── .github/
│   └── copilot-instructions.md          ← 유일한 지침
│
├── PIPELINE_GUIDE.md                    ← 사용자 가이드
├── MCP_TOOL_GUIDE.md                    ← 도구 레퍼런스 (업데이트 필요)
├── AI_BEHAVIOR_ANALYSIS.md              ← 참고 문서
├── CONFLICT_ANALYSIS.md                 ← 분석 리포트
├── INTEGRATION_UPDATE_SUMMARY.md        ← 통합 요약
│
├── analysis/                            ← 분석 결과 저장소
│   ├── web-pipeline/
│   └── presentation-pipeline/
│
├── scripts/
│   ├── setup_pptx.sh                    ← PPTX용
│   ├── spec_to_pptx.py                  ← PPTX용
│   └── fix_permissions.sh               ← 유틸리티
│
├── docs/
│   └── PPTX_GENERATION.md               ← PPTX 가이드
│
├── output/                              ← 결과물
└── .archive/                            ← 아카이브 (대폭 증가)
```

---

## ⚠️ 주의사항

1. **PPTX 파이프라인 보존**
   - `setup_pptx.sh`, `spec_to_pptx.py`, `docs/PPTX_GENERATION.md` 유지
   - `analysis/presentation-pipeline/` 유지

2. **삭제 전 확인**
   - Git history에 보존되므로 안전
   - 혹시 모를 경우 `.archive/`로 이동

3. **즉시 업데이트 필요**
   - `MCP_TOOL_GUIDE.md` - Playwright 언급 제거

---

## ✅ 실행 체크리스트

- [ ] Phase 1 삭제 실행 (백업, 스크린샷 스크립트, 중복 문서)
- [ ] Phase 2 아카이브 실행 (참고 문서들)
- [ ] Phase 3 MCP_TOOL_GUIDE.md 업데이트
- [ ] 정리 후 파일 구조 검증
- [ ] Git commit (큰 변경사항)

---

**작성 완료:** 2025-11-10
