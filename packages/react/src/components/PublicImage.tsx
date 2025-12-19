import { BASE_URL } from "../constants";
import { type ComponentProps, memo } from "react";

/**
 * PublicImage 컴포넌트
 * BASE_URL을 사용하여 정적 리소스 경로를 올바르게 조합함
 */
export const PublicImage = memo(({ src, ...props }: ComponentProps<"img">) => {
  // src가 절대 경로로 시작하는 경우 그대로 사용, 아니면 BASE_URL과 조합
  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;
  // BASE_URL이 /로 끝나고 src도 /로 시작하면 중복 제거
  const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  const url = `${baseUrl}${normalizedSrc}`;

  return <img src={url} {...props} />;
});

PublicImage.displayName = "PublicImage";
