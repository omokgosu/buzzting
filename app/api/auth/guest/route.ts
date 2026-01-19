import { successResponse } from "@/lib/api-response";
import { createGuestToken } from "@/lib/auth";

export async function POST() {
  const token = await createGuestToken();

  return successResponse({
    user: {
      id: "guest",
      email: "guest@buzzting.com",
      nickname: "게스트",
      isGuest: true,
    },
    token,
  });
}
