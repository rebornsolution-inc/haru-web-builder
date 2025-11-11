/**
 * MCP 브라우저 탐색 자동화 스크립트
 * 
 * 목적: URL 제공 시 자동으로 전체 페이지 탐색 및 스크린샷 캡처
 * 사용법: AI가 웹 파이프라인 시작 시 이 로직을 따라 실행
 */

// ====================================
// 설정
// ====================================

const CONFIG = {
  // Option 1: 자동 전체 스크롤 설정
  scrollStrategy: 'auto-full', // 'auto-full' | 'percentage' | 'section-based'
  minScreenshots: 15, // 최소 스크린샷 개수 (전체 페이지용)
  screenshotFormat: 'png',
  screenshotQuality: 0.85,
  screenshotScale: 0.5, // 파일 크기 최적화
  waitAfterScroll: 500, // ms (애니메이션 대기)
  waitAfterClick: 500, // ms
  waitAfterNavigation: 1000, // ms
  maxScrollSteps: 30, // 최대 스크롤 단계 (무한 루프 방지)
};

// ====================================
// 유틸리티 함수
// ====================================

/**
 * 현재 타임스탬프를 YYYYMMDD_HHMMSS 형식으로 반환
 */
function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}_${hour}${minute}${second}`;
}

/**
 * URL에서 사이트 이름 추출
 * 예: https://www.getnauta.com/ → nauta
 */
function extractSiteName(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace('www.', '');
    const parts = hostname.split('.');
    return parts[0]; // 첫 번째 부분만 사용
  } catch (error) {
    return 'site';
  }
}

/**
 * 대기 함수
 */
async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ====================================
// 메인 탐색 함수
// ====================================

/**
 * 웹 파이프라인 MCP 탐색 실행
 * 
 * @param {string} url - 분석할 URL
 * @returns {Object} 탐색 결과 (스크린샷 경로, 메트릭 등)
 */
async function executeWebPipelineMCP(url) {
  console.log('🚀 MCP 브라우저 탐색 시작:', url);
  
  const siteName = extractSiteName(url);
  const capturesDir = `output/captures/${siteName}_analysis/`;
  const explorationLog = {
    url,
    siteName,
    timestamp: getTimestamp(),
    screenshots: [],
    interactions: [],
    pageMetrics: {},
  };
  
  // ====================================
  // 1단계: 브라우저 연결
  // ====================================
  
  console.log('📱 1단계: 브라우저 연결 확인...');
  
  const tabs = await mcp_kapture_list_tabs();
  if (!tabs || tabs.length === 0) {
    throw new Error('❌ FAIL: 연결된 브라우저 탭이 없습니다. Kapture MCP를 먼저 시작하세요.');
  }
  
  const tabId = tabs[0].id;
  console.log(`✅ 브라우저 연결 성공 (Tab ID: ${tabId})`);
  explorationLog.tabId = tabId;
  
  // ====================================
  // 2단계: 페이지 로드
  // ====================================
  
  console.log('🌐 2단계: 페이지 네비게이션...');
  
  await mcp_kapture_navigate({
    tabId,
    url,
    timeout: 10000
  });
  
  await wait(CONFIG.waitAfterNavigation);
  console.log('✅ 페이지 로드 완료');
  
  // 페이지 정보 수집
  const tabDetail = await mcp_kapture_tab_detail({ tabId });
  explorationLog.pageMetrics.title = tabDetail.title;
  explorationLog.pageMetrics.url = tabDetail.url;
  
  // ====================================
  // 3단계: 전체 페이지 자동 스크롤 캡처 (Option 1)
  // ====================================
  
  console.log('📸 3단계: 전체 페이지 자동 스크롤 캡처...');
  console.log('⚙️ Option 1 전략: PageDown 방식으로 페이지 끝까지 완전 탐색');
  
  let stepCounter = 1;
  
  // 페이지 상단으로 이동
  await mcp_kapture_evaluate({
    tabId,
    function: `() => window.scrollTo({ top: 0, behavior: 'instant' })`
  });
  await wait(500);
  
  // 첫 화면 캡처 (0%)
  console.log(`  [Step ${stepCounter}] 스크롤 위치: 0% (페이지 상단)`);
  const screenshot0 = await mcp_kapture_screenshot({
    tabId,
    format: CONFIG.screenshotFormat,
    quality: CONFIG.screenshotQuality,
    scale: 0.5
  });
  
  explorationLog.screenshots.push({
    step: stepCounter,
    action: 'scroll',
    position: '0%',
    scrollY: 0,
    preview: screenshot0.preview,
    timestamp: getTimestamp()
  });
  
  stepCounter++;
  
  // 자동 스크롤 계산
  const fullHeight = tabDetail.fullPageDimensions.height;
  const viewportHeight = tabDetail.viewportDimensions.height;
  const maxScrollSteps = Math.ceil(fullHeight / viewportHeight) + 2; // 여유분 추가
  
  console.log(`  📏 전체 높이: ${fullHeight}px`);
  console.log(`  📐 뷰포트: ${viewportHeight}px`);
  console.log(`  🔢 예상 스크롤 단계: ${maxScrollSteps}단계`);
  
  let previousScrollY = 0;
  let sameScrollCount = 0;
  
  // PageDown 방식으로 끝까지 스크롤
  for (let i = 0; i < maxScrollSteps; i++) {
    // PageDown 실행
    await mcp_kapture_keypress({
      tabId,
      key: 'PageDown',
      delay: 300
    });
    
    // 애니메이션 완료 대기
    await wait(CONFIG.waitAfterScroll);
    
    // 현재 스크롤 위치 확인
    const currentScroll = await mcp_kapture_evaluate({
      tabId,
      function: `() => ({
        scrollY: window.scrollY,
        scrollHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
        atBottom: (window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 10
      })`
    });
    
    const scrollPercent = Math.round((currentScroll.scrollY / (currentScroll.scrollHeight - currentScroll.viewportHeight)) * 100);
    
    console.log(`  [Step ${stepCounter}] 스크롤 위치: ${scrollPercent}% (${currentScroll.scrollY}px / ${currentScroll.scrollHeight}px)`);
    
    // 스크린샷 캡처
    const screenshotResult = await mcp_kapture_screenshot({
      tabId,
      format: CONFIG.screenshotFormat,
      quality: CONFIG.screenshotQuality,
      scale: 0.5
    });
    
    explorationLog.screenshots.push({
      step: stepCounter,
      action: 'scroll',
      position: `${scrollPercent}%`,
      scrollY: currentScroll.scrollY,
      preview: screenshotResult.preview,
      timestamp: getTimestamp()
    });
    
    stepCounter++;
    
    // 페이지 끝 도달 확인
    if (currentScroll.atBottom) {
      console.log(`  ✅ 페이지 끝 도달! (${currentScroll.scrollY}px)`);
      break;
    }
    
    // 스크롤이 더 이상 진행되지 않는 경우 확인
    if (Math.abs(currentScroll.scrollY - previousScrollY) < 10) {
      sameScrollCount++;
      if (sameScrollCount >= 3) {
        console.log(`  ⚠️ 스크롤 진행 중단 감지 (동일 위치 3회)`);
        break;
      }
    } else {
      sameScrollCount = 0;
    }
    
    previousScrollY = currentScroll.scrollY;
    
    // 진행률 표시
    if (stepCounter % 5 === 0) {
      console.log(`  📊 진행률: ${scrollPercent}% (${stepCounter-1}단계 완료)`);
    }
  }
  
  console.log(`✅ 전체 페이지 스크롤 완료: ${stepCounter-1}단계, ${explorationLog.screenshots.length}개 스크린샷`);
  
  // 페이지 크기 측정
  const pageSize = await mcp_kapture_evaluate({
    tabId,
    function: `() => {
      return {
        scrollHeight: document.documentElement.scrollHeight,
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        domSize: document.documentElement.outerHTML.length
      };
    }`
  });
  
  explorationLog.pageMetrics.fullPageSize = `${pageSize.scrollWidth}x${pageSize.scrollHeight}px`;
  explorationLog.pageMetrics.viewport = `${pageSize.viewportWidth}x${pageSize.viewportHeight}px`;
  explorationLog.pageMetrics.domSize = `${(pageSize.domSize / 1024 / 1024).toFixed(1)}MB`;
  
  console.log(`✅ 페이지 메트릭: ${explorationLog.pageMetrics.fullPageSize} (DOM: ${explorationLog.pageMetrics.domSize})`);
  
  // 페이지 상단으로 복귀
  await mcp_kapture_evaluate({
    tabId,
    function: `() => window.scrollTo({ top: 0, behavior: 'instant' })`
  });
  await wait(300);
  
  // ====================================
  // 4단계: 네비게이션 인터랙션 테스트
  // ====================================
  
  console.log('🔗 4단계: 네비게이션 인터랙션 테스트...');
  
  const navElements = await mcp_kapture_elements({
    tabId,
    selector: 'nav a, header a'
  });
  
  const navToTest = navElements.slice(0, 3); // 처음 3개만 테스트
  
  for (let i = 0; i < navToTest.length; i++) {
    const navItem = navToTest[i];
    console.log(`  - 네비게이션 ${i + 1}/${navToTest.length} 테스트: ${navItem.text || navItem.selector}`);
    
    try {
      await mcp_kapture_click({
        tabId,
        selector: navItem.selector
      });
      
      await wait(CONFIG.waitAfterClick);
      
      const screenshotResult = await mcp_kapture_screenshot({
        tabId,
        format: CONFIG.screenshotFormat
      });
      
      const screenshotFilename = `${getTimestamp()}_step-${String(stepCounter).padStart(2, '0')}_click-nav-${i + 1}.png`;
      const screenshotPath = `${capturesDir}${screenshotFilename}`;
      
      explorationLog.interactions.push({
        step: stepCounter,
        action: 'click',
        target: navItem.selector,
        text: navItem.text,
        result: 'Navigation triggered',
        screenshot: screenshotPath,
        timestamp: getTimestamp()
      });
      
      console.log(`  ✅ 스크린샷 저장: ${screenshotFilename}`);
      stepCounter++;
      
      // 원래 페이지로 복귀
      await mcp_kapture_navigate({ tabId, url });
      await wait(CONFIG.waitAfterNavigation);
      
    } catch (error) {
      console.log(`  ⚠️ 네비게이션 ${i + 1} 테스트 실패:`, error.message);
    }
  }
  
  // ====================================
  // 5단계: 버튼/CTA 인터랙션 테스트
  // ====================================
  
  console.log('🔘 5단계: 버튼/CTA 인터랙션 테스트...');
  
  const buttonElements = await mcp_kapture_elements({
    tabId,
    selector: 'button, a.btn, a.cta, [role="button"]'
  });
  
  const buttonsToTest = buttonElements.slice(0, 2); // 처음 2개만 테스트
  
  for (let i = 0; i < buttonsToTest.length; i++) {
    const button = buttonsToTest[i];
    console.log(`  - 버튼 ${i + 1}/${buttonsToTest.length} 테스트: ${button.text || button.selector}`);
    
    try {
      await mcp_kapture_click({
        tabId,
        selector: button.selector
      });
      
      await wait(CONFIG.waitAfterClick);
      
      const screenshotResult = await mcp_kapture_screenshot({
        tabId,
        format: CONFIG.screenshotFormat
      });
      
      const screenshotFilename = `${getTimestamp()}_step-${String(stepCounter).padStart(2, '0')}_click-btn-${i + 1}.png`;
      const screenshotPath = `${capturesDir}${screenshotFilename}`;
      
      explorationLog.interactions.push({
        step: stepCounter,
        action: 'click',
        target: button.selector,
        text: button.text,
        result: 'Button interaction',
        screenshot: screenshotPath,
        timestamp: getTimestamp()
      });
      
      console.log(`  ✅ 스크린샷 저장: ${screenshotFilename}`);
      stepCounter++;
      
      // 모달이 열렸다면 ESC로 닫기
      await mcp_kapture_press_key({ tabId, key: 'Escape' });
      await wait(300);
      
    } catch (error) {
      console.log(`  ⚠️ 버튼 ${i + 1} 테스트 실패:`, error.message);
    }
  }
  
  // ====================================
  // 6단계: DOM 구조 분석
  // ====================================
  
  console.log('🧩 6단계: DOM 구조 분석...');
  
  const domHTML = await mcp_kapture_dom({ tabId });
  explorationLog.pageMetrics.domElements = domHTML.match(/<[^>]+>/g)?.length || 0;
  
  console.log(`✅ DOM 요소 개수: ${explorationLog.pageMetrics.domElements}`);
  
  // ====================================
  // 7단계: 결과 검증
  // ====================================
  
  console.log('✅ 7단계: 결과 검증...');
  
  const totalScreenshots = explorationLog.screenshots.length + explorationLog.interactions.length;
  
  if (totalScreenshots < CONFIG.minScreenshots) {
    throw new Error(
      `❌ FAIL: 스크린샷 개수 부족 (${totalScreenshots}/${CONFIG.minScreenshots})\n` +
      `최소 ${CONFIG.minScreenshots}개의 스크린샷이 필요합니다.`
    );
  }
  
  console.log(`✅ 검증 완료: ${totalScreenshots}개 스크린샷 생성`);
  console.log(`   - 스크롤 캡처: ${explorationLog.screenshots.length}개`);
  console.log(`   - 인터랙션 캡처: ${explorationLog.interactions.length}개`);
  
  // ====================================
  // 8단계: 탐색 로그 반환
  // ====================================
  
  console.log('📝 MCP 탐색 완료!');
  console.log('📁 스크린샷 저장 위치:', capturesDir);
  
  return {
    success: true,
    explorationLog,
    capturesDir,
    totalScreenshots,
    message: `✅ MCP 탐색 완료: ${totalScreenshots}개 스크린샷 생성됨`
  };
}

// ====================================
// 간단한 탐색 (빠른 버전)
// ====================================

/**
 * 간단한 MCP 탐색 (스크롤만)
 * 인터랙션 테스트 없이 빠르게 페이지 스크린샷만 캡처
 */
async function executeQuickMCP(url) {
  console.log('⚡ 빠른 MCP 탐색 시작:', url);
  
  const tabs = await mcp_kapture_list_tabs();
  const tabId = tabs[0].id;
  
  await mcp_kapture_navigate({ tabId, url });
  await wait(1000);
  
  const screenshots = [];
  const scrollPoints = [0, 25, 50, 75, 100];
  
  for (const scrollPercent of scrollPoints) {
    await mcp_kapture_evaluate({
      tabId,
      function: `() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const maxScroll = scrollHeight - viewportHeight;
        const targetScroll = maxScroll * (${scrollPercent} / 100);
        window.scrollTo({ top: targetScroll, behavior: 'instant' });
      }`
    });
    
    await wait(300);
    await mcp_kapture_screenshot({ tabId });
    
    screenshots.push(`scroll-${scrollPercent}%`);
    console.log(`✅ 스크린샷 ${scrollPercent}% 캡처 완료`);
  }
  
  console.log(`✅ 빠른 탐색 완료: ${screenshots.length}개 스크린샷`);
  
  return { success: true, screenshots };
}

// ====================================
// 익스포트
// ====================================

module.exports = {
  executeWebPipelineMCP,
  executeQuickMCP,
  CONFIG
};

// ====================================
// 사용 예시
// ====================================

/*

// AI가 웹 파이프라인 시작 시:

const mcpResult = await executeWebPipelineMCP('https://www.getnauta.com/');

if (!mcpResult.success) {
  throw new Error('MCP 탐색 실패');
}

// JSON 파일에 mcpExploration 섹션 추가
const contentsJSON = {
  // ... 기존 콘텐츠 ...
  
  mcpExploration: {
    executed: true,
    timestamp: mcpResult.explorationLog.timestamp,
    tabId: mcpResult.explorationLog.tabId,
    url: mcpResult.explorationLog.url,
    screenshots: mcpResult.explorationLog.screenshots,
    interactions: mcpResult.explorationLog.interactions,
    pageMetrics: mcpResult.explorationLog.pageMetrics
  }
};

// 파일 저장
await saveJSON('instruction/web-pipeline/01_contents_web.json', contentsJSON);

*/
