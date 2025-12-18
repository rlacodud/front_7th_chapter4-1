import { useCurrentPage } from "./router";
import { useLoadCartStore } from "./entities";
import { ModalProvider, ToastProvider } from "./components";

/**
 * CartInitializer 컴포넌트
 *
 * 애플리케이션 초기화 시 장바구니 스토어를 로드함
 * localStorage에서 장바구니 데이터를 복원하는 역할
 *
 * @returns null (렌더링되는 UI 없음)
 */
const CartInitializer = () => {
  useLoadCartStore();
  return null;
};

/**
 * App 컴포넌트
 *
 * 전체 애플리케이션의 루트 컴포넌트
 *
 * 주요 기능:
 * - 현재 라우트에 맞는 페이지 컴포넌트 렌더링
 * - ToastProvider로 토스트 알림 기능 제공
 * - ModalProvider로 모달 기능 제공
 * - CartInitializer로 장바구니 초기화
 *
 * @returns 애플리케이션 UI
 */
export const App = () => {
  // 현재 라우트에 매칭된 페이지 컴포넌트 가져오기
  const PageComponent = useCurrentPage();

  return (
    <>
      {/* 토스트 알림을 위한 Provider */}
      <ToastProvider>
        {/* 모달을 위한 Provider */}
        <ModalProvider>
          {/* 현재 페이지 컴포넌트 렌더링 (없으면 null) */}
          {PageComponent ? <PageComponent /> : null}
        </ModalProvider>
      </ToastProvider>
      {/* 장바구니 초기화 (렌더링되는 UI 없음) */}
      <CartInitializer />
    </>
  );
};
