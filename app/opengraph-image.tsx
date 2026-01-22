import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Buzzting - 버즈빌 사내소개팅";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FAF8F3 0%, #F5EDE5 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Buzzvil B Icon */}
        <svg
          width="120"
          height="120"
          viewBox="18 14 30 20"
          fill="none"
          style={{ marginBottom: 40 }}
        >
          <path
            d="M41.9507 20.8698C42.4453 19.5564 41.7564 18.0655 40.4317 17.604C40.0078 17.462 39.5663 17.4087 39.1246 17.4975L23.4039 20.2486L21.9025 24.4019L26.9014 23.5144L25.4 27.6678C24.9054 28.9811 25.5943 30.4719 26.919 30.9334C27.3429 31.0755 27.7846 31.1287 28.2261 31.0399L43.9292 28.2712L45.4304 24.1179L40.4317 25.0053L41.9507 20.8698ZM35.433 25.8927L30.434 26.7801L31.9355 22.6269L36.9342 21.7395L35.433 25.8927Z"
            fill="#F44336"
          />
        </svg>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#C4956A",
            marginBottom: 20,
          }}
        >
          Buzzting
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: "#5C4A37",
            marginBottom: 40,
          }}
        >
          버즈빌 사내소개팅
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: "#8B7355",
          }}
        >
          동료들이 소개해주는 친구 소개팅 플랫폼
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
