import Link from "next/link";

// 간단한 더미 데이터
const participants = [
  {
    id: 1,
    name: "김철수",
    department: "개발팀",
    age: 28,
    bio: "프론트엔드 개발자입니다. 운동과 독서를 좋아해요!",
    image: "👨‍💻",
  },
  {
    id: 2,
    name: "이영희",
    department: "디자인팀",
    age: 26,
    bio: "UI/UX 디자이너입니다. 카페 탐방을 즐겨요.",
    image: "👩‍🎨",
  },
  {
    id: 3,
    name: "박민수",
    department: "기획팀",
    age: 30,
    bio: "프로덕트 기획자입니다. 여행과 사진을 좋아합니다.",
    image: "👨‍💼",
  },
  {
    id: 4,
    name: "최지은",
    department: "마케팅팀",
    age: 27,
    bio: "디지털 마케터입니다. 요리와 영화 감상을 좋아해요.",
    image: "👩‍💼",
  },
  {
    id: 5,
    name: "정대현",
    department: "개발팀",
    age: 29,
    bio: "백엔드 개발자입니다. 게임과 음악을 즐겨요.",
    image: "👨‍💻",
  },
  {
    id: 6,
    name: "한소영",
    department: "인사팀",
    age: 25,
    bio: "HR 담당자입니다. 독서와 요가를 좋아합니다.",
    image: "👩‍💼",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-center text-pink-600">
            Buzzting 💕
          </h1>
          <p className="text-center text-gray-600 mt-2">
            사내 동료들과 함께하는 소개팅
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map((participant) => (
            <Link
              key={participant.id}
              href={`/profile/${participant.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
            >
              <div className="text-6xl mb-4">{participant.image}</div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {participant.name}
              </h2>
              <p className="text-pink-600 font-semibold mb-1">
                {participant.department}
              </p>
              <p className="text-sm text-gray-500 mb-3">{participant.age}세</p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {participant.bio}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
