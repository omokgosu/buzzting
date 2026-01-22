import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthUser } from "@/lib/auth-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const department = searchParams.get("department");
    const gender = searchParams.get("gender");

    const skip = (page - 1) * limit;

    // 필터 조건
    const where = {
      isActive: true,
      ...(department && { department }),
      ...(gender && { gender }),
    };

    // 프로필 목록 조회
    const [profiles, total, maleCount, femaleCount] = await Promise.all([
      prisma.profile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          character: true,
          nickname: true,
          gender: true,
          birthYear: true,
          bio: true,
          height: true,
          mbti: true,
          location: true,
          job: true,
          smoking: true,
          drinking: true,
          interests: true,
          idealTypes: true,
          dateStyles: true,
          datingStyles: true,
          contactStyles: true,
          createdAt: true,
        },
      }),
      prisma.profile.count({ where }),
      prisma.profile.count({ where: { isActive: true, gender: "male" } }),
      prisma.profile.count({ where: { isActive: true, gender: "female" } }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return successResponse({
      profiles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      genderCounts: {
        total: maleCount + femaleCount,
        male: maleCount,
        female: femaleCount,
      },
    });
  } catch (error) {
    console.error("Get profiles error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}

// 프로필 등록
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);

    if (!authUser) {
      return errorResponse("UNAUTHORIZED", "인증이 필요합니다.", 401);
    }

    const body = await request.json();
    const {
      userId,
      character,
      nickname,
      gender,
      birthYear,
      bio,
      height,
      mbti,
      location,
      job,
      smoking,
      drinking,
      interests,
      idealTypes,
      dateStyles,
      datingStyles,
      contactStyles,
      contactPreference,
    } = body;

    // 입력 검증
    if (!userId || !nickname) {
      return errorResponse("VALIDATION_ERROR", "사용자 ID와 닉네임은 필수입니다.");
    }

    // 사용자 존재 확인
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return errorResponse("USER_NOT_FOUND", "사용자를 찾을 수 없습니다.", 404);
    }

    // 권한 확인: 본인 또는 친구만 등록 가능 (일단 본인만 허용)
    if (userId !== authUser.userId) {
      return errorResponse("FORBIDDEN", "본인의 프로필만 등록할 수 있습니다.", 403);
      // TODO: 친구 대신 등록하는 경우 추가 로직 구현
    }

    // 활성 프로필 존재 확인 (한 사용자당 하나의 활성 프로필만 허용)
    const existingProfile = await prisma.profile.findFirst({
      where: {
        userId,
        isActive: true,
      },
    });

    if (existingProfile) {
      return errorResponse("ALREADY_HAS_ACTIVE_PROFILE", "이미 활성 프로필이 존재합니다.", 400);
    }

    // 프로필 생성
    const profile = await prisma.profile.create({
      data: {
        userId,
        registeredById: authUser.userId,
        character: character || null,
        nickname,
        gender: gender || null,
        birthYear: birthYear || null,
        bio: bio || null,
        height: height || null,
        mbti: mbti || null,
        location: location || null,
        job: job || null,
        smoking: smoking || null,
        drinking: drinking || null,
        interests: interests || [],
        idealTypes: idealTypes || [],
        dateStyles: dateStyles || [],
        datingStyles: datingStyles || [],
        contactStyles: contactStyles || [],
        contactPreference: contactPreference || null,
      },
    });

    return successResponse({ profile });
  } catch (error) {
    console.error("Create profile error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}
