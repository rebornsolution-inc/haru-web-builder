# Generator 설정 수정 완료 (v2.1.0)

## 🎯 수정 목적
JSON 명세와 생성된 HTML 간의 불일치 문제를 근본적으로 해결

---

## 📝 주요 변경사항

### 1. **이미지 처리 정책 강화** (CRITICAL_POLICY 추가)

#### 파일: `analysis/web-pipeline/generators/04_generate_html.json`
```json
"imageHandling": {
  "CRITICAL_POLICY": "ALWAYS use exact paths specified in JSON - NEVER replace with placeholders",
  "rules": [
    "1. If JSON specifies a path (e.g. '/images/hero.svg'), use it EXACTLY as written",
    "2. If path starts with '/', it's relative to site root - use as-is",
    "3. If path starts with 'http', it's absolute - use as-is",
    "4. ONLY use placeholders if JSON explicitly says 'src: random' or 'src: placeholder'",
    "5. Never make assumptions about missing files - implement exactly as specified"
  ]
}
```

**변경 전:**
- AI가 자동으로 모든 이미지를 `picsum.photos`로 변경
- JSON의 실제 경로가 무시됨

**변경 후:**
- JSON에 명시된 경로를 정확히 사용
- `src: "random"` 또는 `src: "placeholder"`일 때만 picsum 사용

---

### 2. **복잡한 기능 완전 구현 정책** (FULL_IMPLEMENTATION 모드)

#### 파일: `analysis/web-pipeline/generators/04_generate_html.json`
```json
"complexFeaturePolicy": {
  "mode": "FULL_IMPLEMENTATION",
  "rules": [
    "1. 3D animations: Implement with Three.js or CSS 3D transforms as specified",
    "2. Video players: Use HTML5 <video> with full controls",
    "3. SVG diagrams: Generate actual SVG paths and animations",
    "4. Interactive elements: Implement all hover/click/scroll behaviors",
    "5. Complex layouts: Use specified technology (Canvas, WebGL, etc.)",
    "6. Never replace complex features with 'placeholder' divs"
  ],
  "libraryPolicy": {
    "allowed": [
      "Three.js (for 3D graphics)",
      "GSAP (for complex animations)",
      "D3.js (for data visualizations)",
      "Any library specified in JSON's 'animations' or 'framework' field"
    ]
  }
}
```

**변경 전:**
- 3D 애니메이션 → 단순 `animate-pulse` div로 대체
- 비디오 플레이어 → 이미지로 대체
- SVG 다이어그램 → 그리드 레이아웃으로 대체

**변경 후:**
- 모든 복잡한 기능을 JSON 명세대로 완전 구현
- 필요한 라이브러리 자동 포함 (Three.js, GSAP 등)

---

### 3. **Tailwind Generator 설정 업데이트**

#### 파일: `analysis/web-pipeline/generators/04_generate_tailwind.json`

**변경 전:**
```json
"requiredElements": [
  "minimal external dependencies (only if necessary)"
]
```

**변경 후:**
```json
"requiredElements": [
  "ALL libraries specified in JSON (GSAP, Three.js, etc.)",
  "external dependencies ARE ALLOWED when JSON specifies complex features"
],
"complexFeatureSupport": {
  "mode": "FULL_IMPLEMENTATION_REQUIRED",
  "allowedLibraries": [
    "GSAP + ScrollTrigger",
    "Three.js",
    "D3.js",
    "Chart.js",
    "Any library explicitly mentioned in JSON"
  ]
}
```

---

### 4. **Copilot Instructions 업데이트**

#### 파일: `.github/copilot-instructions.md`

**추가된 섹션:**

##### 3.1. Complex Feature Implementation (신규)
- 모든 복잡한 기능 완전 구현 요구사항
- 기능별 구현 매핑 테이블
- 라이브러리 통합 정책
- 검증 체크리스트

##### Quality Checklist 강화
- JSON-to-HTML Fidelity Check (MANDATORY) 추가
- 7개 항목의 세부 검증 요구사항

---

## 🔍 수정 전후 비교

### 문제 사례 1: 히어로 섹션 3D 애니메이션

**JSON 명세:**
```json
{
  "visual": {
    "type": "3d-canvas-animation",
    "elements": ["shipping-containers", "cargo-ships", "port-facilities"],
    "animation": "parallax-scroll",
    "perspective": "900px"
  }
}
```

**수정 전 HTML:**
```html
<!-- 3D Canvas Placeholder -->
<div class="animate-pulse"></div>
```

**수정 후 HTML (예상):**
```html
<canvas id="hero-3d-canvas"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
  // Three.js로 실제 3D 컨테이너, 화물선, 항구시설 렌더링
  // 패럴랙스 스크롤 애니메이션 구현
</script>
```

---

### 문제 사례 2: 이미지 경로

**JSON 명세:**
```json
{
  "illustration": "/images/truck-warehouse.svg"
}
```

**수정 전 HTML:**
```html
<img src="https://picsum.photos/seed/truck-warehouse/400/300">
```

**수정 후 HTML:**
```html
<img src="/images/truck-warehouse.svg" alt="Real-time tracking">
```

---

### 문제 사례 3: 비디오 플레이어

**JSON 명세:**
```json
{
  "video": true,
  "videoUrl": "/videos/testimonial-milton.mp4",
  "videoThumbnail": "/images/testimonials/milton-video-thumb.jpg"
}
```

**수정 전 HTML:**
```html
<img src="https://picsum.photos/seed/milton/80/80">
```

**수정 후 HTML (예상):**
```html
<video controls poster="/images/testimonials/milton-video-thumb.jpg">
  <source src="/videos/testimonial-milton.mp4" type="video/mp4">
</video>
```

---

## ✅ 검증 체크리스트

코드 생성 시 다음 항목들을 필수로 확인:

- [ ] Every visual element from JSON is rendered
- [ ] All animations from JSON are implemented
- [ ] All images use exact paths from JSON (no placeholders unless specified)
- [ ] All complex features (3D, video, SVG) are fully implemented
- [ ] All specified libraries are included via CDN
- [ ] No simplification or placeholder replacements
- [ ] Interactive behaviors match JSON specifications

---

## 🚀 다음 단계

### 새로운 HTML 생성 명령:
```
03_integrate_web.json을 기반으로 HTML을 생성해줘.
- v2.1.0 정책 준수
- 모든 복잡한 기능 완전 구현
- JSON의 모든 경로 정확히 사용
```

### 테스트 방법:
1. 생성된 HTML 열기
2. 검증 체크리스트 확인
3. JSON 명세와 1:1 비교
4. 누락/단순화된 요소 확인

---

## 📊 수정 영향도

| 파일 | 변경 사항 | 영향 |
|------|----------|------|
| `04_generate_html.json` | 이미지 정책 + 복잡한 기능 정책 추가 | 🔴 High |
| `04_generate_tailwind.json` | 라이브러리 정책 완화 | 🔴 High |
| `copilot-instructions.md` | 구현 요구사항 명확화 | 🟡 Medium |

---

## 📌 핵심 원칙 (v2.1.0)

1. **JSON 명세는 절대적** - 명시된 모든 것을 정확히 구현
2. **플레이스홀더 사용 최소화** - 명시적으로 요청된 경우만
3. **복잡도 단순화 금지** - 필요한 라이브러리 모두 포함
4. **검증 필수** - 생성 후 체크리스트 확인

---

**변경일:** 2025-11-11  
**버전:** v2.1.0  
**상태:** ✅ 완료
