import { successResponse } from "@/lib/api-response";

export async function POST() {
  // JWT 토큰은 클라이언트에서 삭제
  // 서버에서는 특별한 처리가 필요 없음
  return successResponse({ message: "로그아웃되었습니다." });
}
