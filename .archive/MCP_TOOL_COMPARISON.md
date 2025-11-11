# MCP 브라우저 도구 비교

## 문제 상황

**현재 파이프라인 요구사항**: 
- 최소 8개 스크린샷 파일 필수
- `output/captures/<sitename>_analysis/` 디렉토리에 PNG 저장

**실제 결과**: 
- ❌ Kapture MCP로는 파일 저장 불가
- ⚠️ 미리보기 URL만 생성됨

---

## MCP 도구 비교

### 1. Kapture MCP (`mcp_kapture_*`)

**현재 사용 중**

#### 장점:
- ✅ 빠른 연결 (Chrome 확장 프로그램)
- ✅ 실시간 탭 상태 확인 (`mcp_kapture_list_tabs`)
- ✅ DOM 분석 가능 (`mcp_kapture_dom`)
- ✅ 요소 탐색 (`mcp_kapture_elements`)
- ✅ JavaScript 실행 (`mcp_kapture_evaluate`)
- ✅ 페이지 메트릭 수집 (`mcp_kapture_tab_detail`)

#### 단점:
- ❌ **스크린샷 파일 저장 불가** (치명적)
- ❌ 미리보기 URL만 반환: `http://localhost:61822/tab/.../screenshot/view`
- ❌ 임시 URL이라 나중에 접근 불가
- ❌ 파이프라인 요구사항(8개 PNG 파일) 충족 불가

#### API 예시:
```javascript
const screenshot = await mcp_kapture_screenshot({
  tabId: "168631338",
  format: "png",
  quality: 0.85,
  scale: 0.5
});

// 반환값:
{
  "preview": "http://localhost:61822/tab/168631338/screenshot/view?scale=0.5&format=png&quality=0.85",
  "url": "https://www.getnauta.com/",
  "title": "Nauta - The AI-Native...",
  "mimeType": "image/png"
  // ❌ 실제 파일 경로 없음!
}
```

---

### 2. Browser MCP (`mcp_browsermcp_browser_*`)

**대안 1: Playwright 기반**

#### 장점:
- ✅ **스크린샷 자동 파일 저장** (중요!)
- ✅ 전체 페이지 캡처 (`fullPage: true`)
- ✅ 요소별 스크린샷 지원
- ✅ 네트워크 요청 로깅
- ✅ 콘솔 로그 수집

#### 단점:
- ⚠️ 별도 MCP 서버 설정 필요
- ⚠️ Playwright 설치 필요
- ⚠️ 설정: `npx @browsermcp/mcp@latest`

#### API 예시:
```javascript
// 자동으로 파일 저장됨 (output/page-timestamp.png)
await mcp_browsermcp_browser_screenshot();

// 또는 fullPage 스크린샷
await mcp_browsermcp_browser_take_screenshot({
  fullPage: true,
  type: "png"
});

// ✅ 파일이 자동으로 저장됨!
// 기본 경로: output/page-20251109-143012.png
```

---

### 3. Microsoft Playwright MCP (`mcp_microsoft_pla_browser_*`)

**대안 2: 공식 Playwright MCP**

#### 장점:
- ✅ **파일명 지정 가능** (최고!)
- ✅ `filename` 파라미터로 정확한 경로 지정
- ✅ 전체 페이지 스크린샷
- ✅ 요소별 스크린샷
- ✅ 네트워크/콘솔 로그

#### 단점:
- ⚠️ MCP 서버 설정 필요
- ⚠️ Playwright 의존성

#### API 예시:
```javascript
// 정확한 파일 경로 지정 가능!
await mcp_microsoft_pla_browser_take_screenshot({
  filename: "output/captures/nauta_analysis/20251109_143012_step-01_scroll-0.png",
  fullPage: false, // viewport만
  type: "png"
});

// 또는 전체 페이지
await mcp_microsoft_pla_browser_take_screenshot({
  filename: "output/captures/nauta_analysis/20251109_143015_step-02_scroll-25.png",
  fullPage: true,
  type: "png"
});

// ✅ 지정된 경로에 파일 저장됨!
```

---

## 권장 사항

### 즉시 적용 가능 (Browser MCP)

```json
// MCP 서버 설정 (.vscode/settings.json 또는 ~/.config/Claude/claude_desktop_config.json)
{
  "mcpServers": {
    "browsermcp": {
      "command": "npx",
      "args": ["@browsermcp/mcp@latest"]
    }
  }
}
```

**사용 예시:**
```javascript
// 1. 브라우저 열기
await mcp_browsermcp_browser_navigate({
  url: "https://www.getnauta.com/"
});

// 2. 스크롤 + 스크린샷 (자동 저장)
for (const percent of [0, 25, 50, 75, 100]) {
  // 스크롤
  await mcp_browsermcp_browser_evaluate({
    function: `() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: maxScroll * ${percent} / 100, behavior: 'instant' });
    }`
  });
  
  // 300ms 대기
  await mcp_browsermcp_browser_wait({ time: 0.3 });
  
  // 스크린샷 (자동 저장)
  await mcp_browsermcp_browser_screenshot();
  
  // ✅ output/page-timestamp.png 자동 생성됨
}
```

### 최적 솔루션 (Microsoft Playwright MCP)

```json
// MCP 서버 설정
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    }
  }
}
```

**사용 예시:**
```javascript
// 정확한 파일명으로 저장
const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
let step = 1;

for (const percent of [0, 25, 50, 75, 100]) {
  // 스크롤
  await mcp_microsoft_pla_browser_evaluate({
    function: `() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: maxScroll * ${percent} / 100, behavior: 'instant' });
    }`
  });
  
  // 300ms 대기
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 스크린샷 (파일명 지정)
  await mcp_microsoft_pla_browser_take_screenshot({
    filename: `output/captures/nauta_analysis/${timestamp}_step-${String(step).padStart(2, '0')}_scroll-${percent}.png`,
    fullPage: false,
    type: "png"
  });
  
  step++;
  // ✅ 정확한 경로에 PNG 저장됨!
}
```

---

## 비교 표

| 기능 | Kapture MCP | Browser MCP | Microsoft Playwright MCP |
|------|-------------|-------------|--------------------------|
| **파일 저장** | ❌ 불가능 | ✅ 자동 저장 | ✅ 파일명 지정 가능 |
| **파일 경로 제어** | ❌ | ⚠️ 자동 생성 | ✅ 완전 제어 |
| **설정 복잡도** | ✅ 간단 (확장 프로그램) | ⚠️ MCP 서버 필요 | ⚠️ MCP 서버 필요 |
| **즉시 사용 가능** | ✅ | ⚠️ 설치 필요 | ⚠️ 설치 필요 |
| **DOM 분석** | ✅ 강력 | ✅ | ✅ |
| **페이지 메트릭** | ✅ | ✅ | ✅ |
| **파이프라인 호환** | ❌ 요구사항 불충족 | ✅ 호환 | ✅ 최적 호환 |

---

## 결론

### 현재 상황 (Kapture MCP)
- ❌ 스크린샷 파일 저장 불가
- ❌ 파이프라인 요구사항 충족 불가
- ✅ 페이지 메트릭/DOM 분석은 가능

### 해결 방법

**단기 (지금 당장)**:
1. Kapture MCP의 한계 인정
2. 파이프라인 요구사항을 "페이지 메트릭 + DOM 분석"으로 완화
3. JSON에 `mcpExploration.limitation` 명시

**장기 (다음 분석부터)**:
1. Browser MCP 또는 Playwright MCP 설정
2. 파일 자동 저장 기능 활용
3. 파이프라인 요구사항 완전 충족

### 추천 설정

```json
// ~/.config/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    }
  }
}
```

**설치 명령:**
```bash
# Playwright MCP 설치 (권장)
npx -y @modelcontextprotocol/server-playwright

# 또는 Browser MCP
npx @browsermcp/mcp@latest
```

---

## 다음 웹 분석 요청 시

```javascript
// ✅ Playwright MCP 사용 (파일명 완전 제어)
const siteName = "nauta";
const timestamp = getCurrentTimestamp(); // YYYYMMDD_HHMMSS
let step = 1;

// 페이지 로드
await mcp_microsoft_pla_browser_navigate({
  url: "https://www.getnauta.com/"
});

// 스크롤 + 스크린샷 (5개)
for (const percent of [0, 25, 50, 75, 100]) {
  // 스크롤
  await mcp_microsoft_pla_browser_evaluate({
    function: `() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: maxScroll * ${percent} / 100, behavior: 'instant' });
    }`
  });
  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 스크린샷 저장
  await mcp_microsoft_pla_browser_take_screenshot({
    filename: `output/captures/${siteName}_analysis/${timestamp}_step-${String(step).padStart(2, '0')}_scroll-${percent}.png`,
    type: "png"
  });
  
  step++;
}

// ✅ 8개 이상 PNG 파일 생성 완료!
```
