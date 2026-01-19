import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-[#8B6F47] mb-4">404</h1>
      <p className="text-xl text-[#6B5638] mb-8">페이지를 찾을 수 없습니다</p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#8B6F47] text-white rounded-lg font-semibold hover:bg-[#6B5638] transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

