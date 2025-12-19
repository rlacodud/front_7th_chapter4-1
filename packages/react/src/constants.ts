// 환경 구분 상수
export const isClient = typeof window !== "undefined";

export const isServer = !isClient;

// 애플리케이션 기본 설정
// Vite의 import.meta.env.BASE_URL을 직접 사용 (vite.config.ts의 base 설정과 항상 일치)
// BASE_URL은 항상 /로 시작하고 /로 끝남 (예: "/front_7th_chapter4-1/react/" 또는 "/")
export const BASE_URL =
  typeof import.meta !== "undefined" && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : "/";

// 빌드 디렉토리 경로 상수
/**
 * 로컬 빌드 디렉토리 (패키지 내부)
 * 클라이언트 빌드 결과물이 저장되는 경로
 */
export const DIST_CLIENT_DIR = "./dist/react";

/**
 * SSG용 빌드 디렉토리 (루트 레벨)
 * 정적 사이트 생성 시 루트의 dist 폴더에 빌드됨
 */
export const DIST_SSG_DIR = "../../dist/react";

/**
 * SSR 서버 빌드 디렉토리
 * 서버 사이드 렌더링용 빌드 결과물이 저장되는 경로
 */
export const DIST_SSR_DIR = "./dist/react-ssr";
