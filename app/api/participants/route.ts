import { NextResponse } from "next/server";

// 간단한 더미 데이터 (실제로는 데이터베이스에서 가져올 것)
const participants = [
  {
    id: 1,
    name: "김철수",
    department: "개발팀",
    age: 28,
    bio: "프론트엔드 개발자입니다. 운동과 독서를 좋아해요!",
    image: "👨‍💻",
    interests: ["운동", "독서", "개발", "영화"],
    contact: "kim@company.com",
  },
  {
    id: 2,
    name: "이영희",
    department: "디자인팀",
    age: 26,
    bio: "UI/UX 디자이너입니다. 카페 탐방을 즐겨요.",
    image: "👩‍🎨",
    interests: ["디자인", "카페", "사진", "여행"],
    contact: "lee@company.com",
  },
  {
    id: 3,
    name: "박민수",
    department: "기획팀",
    age: 30,
    bio: "프로덕트 기획자입니다. 여행과 사진을 좋아합니다.",
    image: "👨‍💼",
    interests: ["기획", "여행", "사진", "독서"],
    contact: "park@company.com",
  },
  {
    id: 4,
    name: "최지은",
    department: "마케팅팀",
    age: 27,
    bio: "디지털 마케터입니다. 요리와 영화 감상을 좋아해요.",
    image: "👩‍💼",
    interests: ["마케팅", "요리", "영화", "음악"],
    contact: "choi@company.com",
  },
  {
    id: 5,
    name: "정대현",
    department: "개발팀",
    age: 29,
    bio: "백엔드 개발자입니다. 게임과 음악을 즐겨요.",
    image: "👨‍💻",
    interests: ["개발", "게임", "음악", "운동"],
    contact: "jung@company.com",
  },
  {
    id: 6,
    name: "한소영",
    department: "인사팀",
    age: 25,
    bio: "HR 담당자입니다. 독서와 요가를 좋아합니다.",
    image: "👩‍💼",
    interests: ["인사", "독서", "요가", "카페"],
    contact: "han@company.com",
  },
];

export async function GET() {
  return NextResponse.json(participants);
}

