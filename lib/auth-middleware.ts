import { NextRequest } from "next/server";
import { verifyToken } from "./auth";
import { errorResponse } from "./api-response";

export async function getAuthUser(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);
    const payload = await verifyToken(token);
    
    return payload;
  } catch (error) {
    return null;
  }
}

export function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse("UNAUTHORIZED", "인증이 필요합니다.", 401);
  }

  return null;
}
