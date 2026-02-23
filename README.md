## 과제 체크포인트

### 배포 링크
[기본과제 (Vanilla SSR & SSG)](https://rlacodud.github.io/front_7th_chapter4-1/vanilla)
[심화과제 (React SSR & SSG)](https://rlacodud.github.io/front_7th_chapter4-1/react)
<!--
배포 링크를 적어주세요
예시: https://<username>.github.io/front-7th-chapter4-1/

배포가 완료되지 않으면 과제를 통과할 수 없습니다.
배포 후에 정상 작동하는지 확인해주세요.
-->

### 기본과제 (Vanilla SSR & SSG)

#### Express SSR 서버
- [x] Express 미들웨어 기반 서버 구현
- [x] 개발/프로덕션 환경 분기 처리
- [x] HTML 템플릿 치환 (`<!--app-html-->`, `<!--app-head-->`)

#### 서버 사이드 렌더링
- [x] 서버에서 동작하는 Router 구현
- [x] 서버 데이터 프리페칭 (상품 목록, 상품 상세)
- [x] 서버 상태관리 초기화

#### 클라이언트 Hydration
- [x] `window.__INITIAL_DATA__` 스크립트 주입
- [x] 클라이언트 상태 복원
- [x] 서버-클라이언트 데이터 일치

#### Static Site Generation
- [x] 동적 라우트 SSG (상품 상세 페이지들)
- [x] 빌드 타임 페이지 생성
- [x] 파일 시스템 기반 배포

### 심화과제 (React SSR & SSG)

#### React SSR
- [x] `renderToString` 서버 렌더링
- [x] TypeScript SSR 모듈 빌드
- [x] Universal React Router (서버/클라이언트 분기)
- [x] React 상태관리 서버 초기화

#### React Hydration
- [x] Hydration 불일치 방지
- [x] 클라이언트 상태 복원

#### Static Site Generation
- [x] 동적 라우트 SSG (상품 상세 페이지들)
- [x] 빌드 타임 페이지 생성
- [x] 파일 시스템 기반 배포

## 아하! 모먼트 (A-ha! Moment)
<!--
과제를 진행하며 "아!" 하고 깨달음을 얻었던 순간이 있다면 공유해주세요.
어떤 부분에서 어려움을 겪다가, 어떤 계기로 개념이 명확해졌나요?
-->

### 1. SSR VS SSG VS CSR
SSR, SSG, CSR의 본질적인 차이는 **HTML을 누가, 언제, 어떤 책임으로 생성하느냐**이다.

#### (1) 서버 VS 클라이언트
**(1-1) 서버**
- 요청을 받는 주체
- 데이터 조회 가능
- HTML 문자열을 만들어서 내려줄 수 있음
- 결과물에 책임을 짐

**(1-2) 클라이언트**
- 서버가 준 걸 받아서 실행
- DOM을 만들고 JS를 실행
- 사용자 입력 처리
- HTML을 조립하거나 수정

#### (2) HTML 생성 시점으로 비교
**(2-1) SSG**
- 빌드 타임
- HTML 파일 생성
- CDN / 서버에 저장
- 요청 시 파일 전달
HTML은 이미 만들어져있고 => 서버는 클라이언트한테 파일을 전달하여 => 클라이언트가 받아서 그리기만 한다.
즉, **SSG는 빌드 타임에 끝난 SSR**이라고 이해할 수 있다!

**(2-2) SSR**
- 요청 발생
- 서버가 데이터 조회
- HTML 문자열 생성
- 응답으로 전달
HTML을 요청 시점에 서버가 생성해서 => 서버는 매 요청마다 계산하기 때문에 => **사용자마다 다른 결과**를 보여줄 수 있다.

**(2-3) CSR**
- 요청 발생
- 빈 HTML + JS 다운로드
- 브라우저에서 JS 실행
- DOM 생성
- 서버는 화면의 실제 콘텐츠 HTML 생성에는 관여하지 않고 => 브라우저가 직접 HTML 구조를 생성하고 데이터 fetch도 브라우저가 한다.

#### (3) 비유 시간
SSG는 **편의점 도시락**으로, 전자레인지에 데우면 바로 먹을 수 있고 요리하는 과정은 이미 완료되어있다.
SSR은 **실비집**으로, 주문이 들어오면 그 때 바로 요리를 하는데 요청마다 다른 메뉴를 제공해준다.
CSR은 **직접 요리**하는 것으로, 재료만 마트에서 사오고 집에서 직접 조리한다.
CDN은 도심 곳곳에 배치된 편의점같은 **중간 픽업 허브**다.

수범님이랑 얘기하면서 비유의 확장을 진행해보았다.

**(3-1) SSG**
편의점 도시락의 장점은 이미 만들어져있어서(빌드 타임 + HTML 파일 생성) 편의점에 비치되어있고(CDN / 서버에 저장)
먹고싶을 때 구매하고(요청 발생) 그냥 그대로 전자레인지에 데워먹으면 좋다(파일 전달)는 점이다.
그러나 내가 만약 편의점 도시락에 계란말이를 원한다 해도 그건 추가가 불가능하다.
**즉, 새로운 요청은 받을 수 있지만 요청마다 다른 결과를 생성할 수는 없다.**

**(3-2) SSR**
실비집은 내가 김치볶음밥이 먹고 싶다고 주문하면(요청 발생) 사장님이 주문을 받고(서버가 데이터 조회) 김치볶음밥을 만들어주시고(HTML 문자열 생성) 내 테이블로 갖다주신다.(응답으로 전달)
주문하는대로 먹을 수 있어서 좋다!!
하지만 사장님이 요청을 받고 요리를 해주시는 데에 시간이 걸려서 **그만큼의 딜레이**가 있다는 건 아쉽다ㅜ

**(3-3) CSR**
요리는 내가 김치볶음밥을 먹고 싶으면(요청 발생) 필요한 재료인 김치, 밥, 간장, 설탕 등을 마트에서 사서(빈 HTML + JS 다운로드) 집에서 레시피대로 요리하고(브라우저에서 JS 실행) 김치볶음밥을 완성(DOM 생성)해서 먹을 수 있다.
대신 마트에서 장보고 요리하는 데 **시간이 꽤 소요**된다ㅜ

**(3-4) CDN**
픽업 허브는 완제품이나 재료를 가장 가까운 곳에서 빠르게 전달해주는 **중간 거점**이다.

### 2. Hydration의 중요성
이번 과제를 진행하며 가장 크게 체감한 또 하나의 포인트는
**SSR/SSG에서 화면을 “보여주는 것”보다, 그 이후의 Hydration이 훨씬 중요하다는 점**이었다.

서버에서 HTML을 내려주면 사용자는 즉시 콘텐츠를 볼 수 있지만,
이 상태의 화면은 아직 정적인 HTML일 뿐, 실제 사용자 상호작용은 불가능하다.

이후 클라이언트에서 Javascript가 실행되며
서버에서 내려온 HTML과 동일한 상태로 React/Vainlla 앱이 복원되는 과정을 Hydration이라고 한다.

이 과정에서 서버와 클라이언트의 상태나 마크업이 조금이라도 어긋나면
- 화면 깜빡임
- 이벤트 바인딩 실패
- 콘솔 경고(hydration mismatch)
와 같은 문제가 발생할 수 있다.

이번 과제에서 `window.__INITIAL_DATA__`를 통해 서버 상태를 전달하고 클라이언트에서 동일한 초기 상태로 복원하는 작업을 직접 구현하면서
**SSR/SSG의 핵심은 “HTML을 빨리 보여주는 것”이 아니라 “서버와 클라이언트의 상태를 정확히 일치시키는 것”이라는 점을 명확히 이해하게 되었다.**

### 3. 전체적인 흐름
전통적인 웹 개발 방식은 SSR이었다.
그러나 Javascript가 점점 발전하면서 Javascript로 할 수 있는 일이 많아지게 되었고 그러면서 파생된 프레임워크가 등장하면서 **모든 렌더링을 전부 브라우저(클라이언트)에게 위임**하게 되었다.

그로 인해 프론트엔드 개발자들이 CSR을 주로 다루게 되었다.
그런데 CSR은 위에서 다뤘듯 SEO 최적화 문제로 인해 서비스적인 한계가 존재했고 다시 SSR이 필요해지게 되었다.

즉, 지금까지의 흐름은 **SSR => CSR => SSR+CSR**인 것이다.

단, 모든 상황에 SSR을 적용하는 것은 아니다.
검색엔진의 최적화가 필요할 때, 사용자에게 비어있는 화면없이 빠르게 페이지를 보여줘야할 때에만 SSR을 적용하면 된다.

### 4. 그 외에 처음 접한 개념들
**(1) ISR (Incremental Static Regeneration)**
- Next.js 등 최신 프레임워크에서 제공하는 기능으로, 정적 페이지를 필요할 때만 갱신한다.
- 전체 사이트를 다시 빌드하지 않고 특정 페이지만 업데이트할 수 있어, SSG의 단점(정적이라 업데이트 어려움)을 보완한다.

**(2) Edge Computing / Serverless**
- SSR을 글로벌 규모로 빠르게 제공하려면 서버를 중앙에 두기보다는 사용자 가까운 엣지 위치에서 렌더링하는 것이 중요하다.
- AWS Lambda\@Edge, Vercel Edge Functions, Cloudflare Workers 등이 대표적이다.
(위 개념은 어렴풋이 들어봐왔고 정확한 이름은 처음 안 것 같다.)

**(3) Streaming SSR**
- 서버가 HTML을 한 번에 다 그려서 보내는 대신, 조각 단위로 스트리밍해 사용자에게 더 빠르게 첫 화면을 보여주는 기법.
- React 18, Next.js, Remix 등이 지원. 특히 데이터가 무겁거나 비동기 호출이 많은 경우 유리.

---

## 자유롭게 회고하기

<!-- 여태까지는 정해진 템플릿을 기반으로 회고를 진행했습니다. 이번에는 자유롭게 회고해주세요. -->

### 😎 과제 진행 과정
일단 과제의 본질에 대해 이해하는 시간부터 가졌다.
발제 노션과 준일 코치님의 이전 블로그 글을 보았을 때 이번 과제에서 요구하는 바는 아래와 같다고 생각했다.
```
서버를 직접 구축한 뒤, 이 페이지는 SSR, 이 페이지는 SSG, 어떤 영역은 CSR이라는 판단 근거를 가지고
각 렌더링 방식을 실제로 구현하고 연결
```

즉, 구현 자체도 중요하지만 그뿐만 아니라 왜 각 영역에 각 방식을 도입하고자 했는지에 대해 사고하고 판단할 줄 아는 것이 중요하다고 생각했다.

#### (1) 개념 정리
늘 그렇듯 각 **개념에 대해 비유까지 가능할 정도로 이해**하고 정리하는 시간을 가졌다.
이 때 수범님과 비유 내용을 공유하며 생각의 확장과 피드백을 주고받은 게 도움되었다.

#### (2) 서버 구현
과제 TODO를 순차적으로 진행하여 서버 구현을 첫번째로 진행했다.

코치님이 라이브 코딩으로 보여주셨던 방식을 활용하여 서버 구현을 했는데 vite에서 제공한 SSR 관련 코드를 복붙하다보니 모르는 키워드도 있어서 찾아보고 정리했다.

**(2-1) compression**
말 그대로 **HTTP 응답을 압축**하는 용도로 사용되는 Express 미들웨어다.
HTML, JS, CSS는 텍스트 파일이기 때문에 그대로 보내면 용량이 커서 전송 최적화를 위해 사용한다.
```js
const compression = (await import("compression")).default;
app.use(compression());
```

**그럼 왜 개발 환경에서는 사용하지 않을까?**
개발 서버는 빠른 재빌드, 디버깅, 소스 확인이 필요하기 때문에 **압축하는 과정은 오히려 디버깅을 방해**하게 되어 배포 환경에서만 사용한다.

**(2-2) sirv**
**정적 파일을 전달**하는 초경량 서버 미들웨어로, ./dist/vanilla에서 파일을 찾아서 파일이 있으면 그대로 응답을 보낸다.
```js
app.use(base, sirv("./dist/vanilla", { extensions: [] }));
```

예를 들어 아래와 같이 요청이 오면 지정한 경로를 기준으로 파일을 찾아서 응답을 보낸다.
```
GET /assets/main.js  → dist/vanilla/assets/main.js
GET /style.css      → dist/vanilla/style.css
```
무엇의 약자일지 궁금해서 찾아보니 딱히 약자는 아니고 **serve와 같은 의미**로, 빌드된 정적 파일 서버라고 생각해주면 될 것 같다.

#### (3) 테스트 지옥-가장 깨달음이 컸던 지점
**(3-1) 문제의 발단**
시작됐다..테스트 지옥

동일한 테스트를 여러 포트에서 동시에 실행하면 특정 포트에서는 기대한 "총 340개" 같은 문자열 대신 TypeError, fetch 에러, 혹은 MSW 관련 에러 스택이 HTML에 그대로 섞여 내려오고,
결국 expect(...).toContain("총") 같은 assertion이 실패하는 현상이 반복적으로 발생했다..

특히 테스트를 한 번만 순차적으로 돌릴 때는 잘 통과하는데,
Playwright가 **병렬로 돌릴 때, 여러 포트 조합을 함께 돌릴 때** 불안정하게 깨지는 것이 특징이었다.
```js
  await this.page.waitForFunction(() => {
    const text = document.body.textContent;
    return text?.includes("총") && text?.includes("개");
  });
```

**(3-2) 환경 구조 이해**
﻿문제를 제대로 보려면 환경 구성을 먼저 이해할 필요가 있었다.
```
Vanilla:
CSR: http://localhost:5173/
SSR: http://localhost:5174/
SSG: http://localhost:4173/front_7th_chapter4-1/vanilla/, 4174, 4178 등
React:
CSR: http://localhost:5175/
SSR: http://localhost:5176/
SSG: http://localhost:4175/front_7th_chapter4-1/react/, 4176, 4179 등
```
E2E 스펙은 각 포트를 모두 타겟으로 **같은 사용자 시나리오를 반복 실행**하며, 실제 백엔드 서버는 없고 MSW로 API를 모킹하고 있다.
```
클라이언트:
browser.ts + mockServiceWorker.js
서버:
nodeServer.js / nodeServer.ts + msw/node의 setupServer(...handlers)
```

**(3-3) MSW 서버 초기화/모킹 문제??**
증상을 보면 공통점은 다음과 같았다.

- 실패할 때 HTML 안에 순수 데이터가 아니라 에러 스택이 들어 있음
- 특히 SSR/SSG 엔드포인트(417x, 5174, 5176)에서 더 자주 발생
- MSW가 제대로 동작하지 않는 순간에는 모든 상품/카테고리 요청이 실패 => E2E의 텍스트 매칭 실패

**(3-4) Node 환경에서의 MSW 동작 방식**
같은 Node 프로세스 안에서 여러 서버가 돌아가더라도 MSW는 전역적으로 네트워크 계층(fetch/http)을 패치하기 때문에 **여러 서버의 요청을 동일한 MSW 상태가 공유**하게 된다.

테스트를 병렬로 실행하면 각 서버가 서로 다른 타이밍에 MSW의 listen()을 호출하게 되고 일부 요청은 MSW가 활성화되기 이전에 발생하여 실제 네트워크 요청으로 빠질 수 있다.

이 **타이밍/전역 상태 문제** 때문에, 포트/모드(CSR, SSR, SSG) 조합에 따라 결과가 들쭉날쭉했던 것이다.

**(3-5) onUnhandledRequest: "bypass"  추가**
```js
mswServer.listen({
  onUnhandledRequest: "bypass",
});
```

이 설정이 의미하는 것은 다음과 같다.

**1. MSW는 항상 켜둔다**
- SSR/SSG 요청을 처리하는 서버가 뜨는 시점에 MSW를 명시적으로 listen()
- 최소한 “서버가 준비된 후 들어오는 SSR 요청”에 대해서는 모킹 일관성이 올라감

**2. 모킹하지 않은 요청은 실 서버로 그냥 흘려보낸다**
- 등록되지 않은 엔드포인트, 정적 리소스, 예외적인 요청들이 있어도
- 테스트를 깨뜨리는 에러를 던지지 않는다
- SSR 결과 HTML에 개발용 에러 텍스트가 섞여 들어오는 일을 방지

결과적으로 SSR/SSG 테스트에서 API 응답이 **안정적으로 모킹**되기 시작했고
예외적인 요청이 에러를 유발해 페이지 전체를 망가뜨리는 일이 줄어들면서 createTests.ts가 기대하는 "총 340개" 같은 문구를 모든 포트 조합에서 일관되게 확인할 수 있게 되었다.

#### (4) Vanilla VS React - 같은 SSR, 전혀 다른 책임

같은 결과를 만들어내지만, 구현 과정에서 개발자가 직접 책임져야 하는 범위는 완전히 달랐다.

**(4-1) SSR 구현 방식의 차이**
**1️⃣ Vanilla**
Vanilla 환경에서는 SSR 과정이 매우 직관적이면서도,
 그만큼 모든 책임이 명확히 드러났다.
```js
const result = await router.target(params);
return {
  html: result.html,
  __INITIAL_DATA__: result.data ?? {},
};
```
- 페이지 함수가 HTML 문자열을 직접 반환
- 템플릿 리터럴을 이용해 문자열 기반 HTML 생성
- 초기 데이터는 hydrateStoreFromSSR()를 통해 스토어에 직접 dispatch
=> HTML 생성, 데이터 주입, 상태 전달을 모두 개발자가 직접 관리

**2️⃣ React**
React SSR에서는 **renderToString**을 통해 컴포넌트 트리 전체가 그대로 서버에서 실행된다.
```js
htmlString = renderToString(
  <RouterProvider router={router}>
    <ProductProvider productStore={createProductStore(result || {})}>
      <App />
    </ProductProvider>
  </RouterProvider>
);
```
- renderToString으로 컴포넌트 트리를 HTML 문자열로 변환
- JSX 기반 컴포넌트가 서버/클라이언트에서 동일하게 사용
- 초기 데이터는 createProductStore(initData)를 통해 Context에 주입
=> SSR 흐름 자체가 컴포넌트 구조 안으로 자연스럽게 녹아 있음

**(4-2) Hydration 방식의 차이**
**1️⃣ Vanilla**
Vanilla에서는 hydration 역시 전적으로 수동이다.
```js
productStore.dispatch({
  type: PRODUCT_ACTIONS.SETUP,
  payload: {
    products: initialData.products ?? [],
    categories: initialData.categories ?? {},
  },
});
```
- 서버 HTML을 그대로 사용하거나, 필요 시 다시 렌더링
- 각 스토어에 초기 데이터를 직접 dispatch
- 상태 복원과 DOM 사용 방식 모두 개발자가 제어
=> hydration은 “자동 과정”이 아니라 명시적으로 설계해야 하는 단계라는 걸 체감했다.

**2️⃣ React**
React에서는 hydration 과정이 상대적으로 단순해진다.
```js
const initData = window.__INITIAL_DATA__;
<ProductProvider productStore={createProductStore(initData || {})}>
  <App />
</ProductProvider>
```
- hydrateRoot를 통해 서버 DOM에 이벤트 리스너만 연결
- Context 초기화로 상태가 자연스럽게 복원
- 클라이언트에서는 데이터 정리만 수행
=> React가 hydration의 복잡성을 프레임워크 차원에서 흡수하고 있다는 걸 실감했다.

**(4-3) 라우팅 처리 방식의 차이**
**1️⃣ Vanilla**
```js
// Vanilla 라우팅
import { router } from "./router";
const PageComponent = router.target;
rootElement.innerHTML = PageComponent();
```
- 전역 router 인스턴스를 직접 import
- router.target, router.params에 직접 접근
- 라우터 변경 시 render 함수를 수동 호출
=> 흐름은 명확하지만, 관리 포인트가 많음

**2️⃣ React**
```js
// React 라우팅
const router = useRouterContext();
const PageComponent = useCurrentPage();
return PageComponent ? <PageComponent /> : null;
```
- RouterProvider로 라우터를 Context에 주입
- useRouterContext, useCurrentPage 같은 Hook 사용
- 라우터 변경 시 컴포넌트가 자동 리렌더링
=> 라우팅 또한 선언적인 구조로 추상화됨

**[깨달은 점]**
같은 SSR/SSG라도
Vanilla에서는 **SSR이 무엇인지**를 몸으로 이해하게 되었고,
React에서는 **왜 이런 추상화가 필요한지**를 이해하게 되었다.

이 비교를 통해 hydration이 단순한 후처리가 아니라,
SSR 구조에서 가장 중요한 연결 지점이라는 걸 명확히 깨달았다.

---

## 리뷰 받고 싶은 내용
### 1. MSW 동시성 문제 해결 방식 검토

#### 현재 구현
```javascript
// packages/vanilla/server.js:28-30
// packages/react/server.ts:31-33
mswServer.listen({
  onUnhandledRequest: "bypass", // 모킹하지 않은 요청은 그대로 통과
});
```

#### 질문
1. **현재 해결책의 한계**
   - `onUnhandledRequest: "bypass"`로 해결했지만, 여러 서버가 동시에 MSW를 사용할 때 전역 상태 공유 문제가 완전히 해결되었는지 확인이 필요합니다.
   - 각 서버마다 독립적인 MSW 인스턴스를 생성하는 것이 더 나은 방법일까요?

2. **프로덕션 환경 고려**
   - 현재 프로덕션 환경에서도 MSW가 실행되는데 (`packages/vanilla/server.js:28`, `packages/react/server.ts:31`), 프로덕션에서는 MSW를 사용하지 않으므로 환경 변수로 분기하는 것이 좋을까요?
   ```javascript
   // 제안: 프로덕션에서는 MSW 비활성화
   if (process.env.NODE_ENV !== "production") {
     mswServer.listen({ onUnhandledRequest: "bypass" });
   }
   ```

3. **테스트 환경에서의 안정성**
   - E2E 테스트에서 여러 포트를 동시에 테스트할 때, MSW의 전역 상태가 여전히 간섭할 가능성이 있는지 검토가 필요합니다.

<!--
SSR/SSG 구현과 관련된 구체적인 피드백을 요청해주세요.

구체적인 질문 예시:
- "packages/vanilla/src/main-server.js의 라우터 매개변수 추출 로직에서 정규식 패턴이 복잡한 URL에도 안정적으로 동작할지 검토 부탁드립니다."
- "React SSR에서 서버와 클라이언트의 상태 동기화 로직이 대용량 데이터에서도 성능상 문제없을지 조언 부탁드립니다."
- "현재 구현한 SSG 빌드 과정이 상품 개수가 1000개 이상으로 늘어날 때도 효율적으로 동작할지, 최적화 방안이 있다면 제안해주세요."
- "TypeScript SSR 모듈의 타입 정의에서 놓친 부분이나 더 안전하게 개선할 수 있는 부분이 있는지 검토해주세요."
- "Universal Router 구현에서 메모리 누수나 성능 이슈 가능성은 없는지 확인 부탁드립니다."
-->

---

자세한 구현 과정과 회고는 아래 블로그에 정리했습니다! 😊

[9주차_성능최적화: SSR(Server Side Rendering), SSG(Static Site Generation), Infra](https://chaeng03.tistory.com/entry/%ED%95%AD%ED%95%B499-9%EC%A3%BC%EC%B0%A8%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94-SSRServer-Side-Rendering-SSGStatic-Site-Generation-Infra)

[WIL 9주차_Chapter 4-1. 성능최적화: SSR, SSG, Infra](https://chaeng03.tistory.com/entry/%ED%95%AD%ED%95%B499-WIL-9%EC%A3%BC%EC%B0%A8Chapter-4-1-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94-SSR-SSG-Infra)
