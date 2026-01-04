import Link from "next/link";
import { notFound } from "next/navigation";

// 더미 데이터 (실제로는 API나 데이터베이스에서 가져올 것)
const participants: Record<
  number,
  {
    id: number;
    name: string;
    department: string;
    age: number;
    bio: string;
    image: string;
    interests: string[];
    contact: string;
  }
> = {
  1: {
    id: 1,
    name: "김철수",
    department: "개발팀",
    age: 28,
    bio: "프론트엔드 개발자입니다. 운동과 독서를 좋아해요! 새로운 기술을 배우는 것을 즐기며, 팀과 함께 성장하는 것을 좋아합니다.",
    image: "👨‍💻",
    interests: ["운동", "독서", "개발", "영화"],
    contact: "kim@company.com",
  },
  2: {
    id: 2,
    name: "이영희",
    department: "디자인팀",
    age: 26,
    bio: "UI/UX 디자이너입니다. 카페 탐방을 즐겨요. 사용자 경험을 개선하는 것에 관심이 많습니다.",
    image: "👩‍🎨",
    interests: ["디자인", "카페", "사진", "여행"],
    contact: "lee@company.com",
  },
  3: {
    id: 3,
    name: "박민수",
    department: "기획팀",
    age: 30,
    bio: "프로덕트 기획자입니다. 여행과 사진을 좋아합니다. 새로운 아이디어를 만드는 것을 즐겨요.",
    image: "👨‍💼",
    interests: ["기획", "여행", "사진", "독서"],
    contact: "park@company.com",
  },
  4: {
    id: 4,
    name: "최지은",
    department: "마케팅팀",
    age: 27,
    bio: "디지털 마케터입니다. 요리와 영화 감상을 좋아해요. 브랜드 스토리텔링에 관심이 많습니다.",
    image: "👩‍💼",
    interests: ["마케팅", "요리", "영화", "음악"],
    contact: "choi@company.com",
  },
  5: {
    id: 5,
    name: "정대현",
    department: "개발팀",
    age: 29,
    bio: "백엔드 개발자입니다. 게임과 음악을 즐겨요. 시스템 아키텍처에 관심이 많습니다.",
    image: "👨‍💻",
    interests: ["개발", "게임", "음악", "운동"],
    contact: "jung@company.com",
  },
  6: {
    id: 6,
    name: "한소영",
    department: "인사팀",
    age: 25,
    bio: "HR 담당자입니다. 독서와 요가를 좋아합니다. 사람들과 소통하는 것을 즐겨요.",
    image: "👩‍💼",
    interests: ["인사", "독서", "요가", "카페"],
    contact: "han@company.com",
  },
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const participant = participants[id];

  if (!participant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-block mb-6 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-700 font-medium"
        >
          ← 돌아가기
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{participant.image}</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {participant.name}
            </h1>
            <p className="text-xl text-pink-600 font-semibold mb-1">
              {participant.department}
            </p>
            <p className="text-gray-500">{participant.age}세</p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b">
                소개
              </h2>
              <p className="text-gray-600 leading-relaxed">{participant.bio}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b">
                관심사
              </h2>
              <div className="flex flex-wrap gap-2">
                {participant.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b">
                연락처
              </h2>
              <p className="text-gray-600">{participant.contact}</p>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-1 px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                좋아요 ❤️
              </button>
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                메시지 보내기 💬
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

