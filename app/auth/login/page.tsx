"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api-client";
import { setToken } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.login(email);
      if (response.success && response.data?.token) {
        setToken(response.data.token);
        router.push("/home");
      } else {
        setError(response.error?.message || "로그인에 실패했습니다.");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await authApi.guest();
      if (response.success && response.data?.token) {
        setToken(response.data.token);
        router.push("/home");
      } else {
        setError("게스트 로그인에 실패했습니다.");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center py-8 px-4 relative overflow-hidden">
      {/* 떠다니는 하트들 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] text-2xl animate-float-slow opacity-30">💛</div>
        <div className="absolute top-[20%] right-[15%] text-xl animate-float-medium opacity-25">🧡</div>
        <div className="absolute top-[60%] left-[5%] text-lg animate-float-fast opacity-30">💛</div>
        <div className="absolute top-[40%] right-[8%] text-2xl animate-float-slow opacity-20">🤎</div>
        <div className="absolute bottom-[20%] left-[20%] text-xl animate-float-medium opacity-30">🧡</div>
        <div className="absolute bottom-[30%] right-[20%] text-lg animate-float-fast opacity-25">💛</div>
        <div className="absolute top-[75%] right-[35%] text-sm animate-float-slow opacity-30">✨</div>
        <div className="absolute top-[15%] left-[40%] text-sm animate-float-medium opacity-25">✨</div>
      </div>

      <div className="w-full max-w-sm space-y-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#C4956A] mb-3 drop-shadow-sm">
            Buzzting
          </h1>
          <p className="text-[#A08060] text-sm">
            버즈빌 친구들 소개해드려요 💫
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#E8DDD4]">
          <p className="text-center text-[#8B7355] text-sm mb-4 font-medium">
            버즈빌 직원이신가요?
          </p>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-[#E0D4C8] rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] text-[#5C4A37] placeholder:text-[#B8A090] transition-all"
              placeholder="회사 이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-white bg-gradient-to-r from-[#C4956A] to-[#B8A080] disabled:opacity-50 transition-all font-medium shadow-md active:scale-[0.97]"
            >
              {loading ? "💛" : "시작하기"}
            </button>
          </form>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E0D4C8]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-transparent text-[#B8A090]">또는</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGuestLogin}
          disabled={loading}
          className="w-full py-4 px-4 rounded-xl text-white bg-gradient-to-r from-[#A08060] to-[#8B7355] shadow-md disabled:opacity-50 transition-all font-medium active:scale-[0.97]"
        >
          <span className="block text-sm">버즈빌 직원의 친구인가요?</span>
          <span className="block text-xs text-white/80 mt-1">
            👀 프로필 구경하기
          </span>
        </button>

        <p className="text-center text-xs text-[#B8A090] mt-6">
          두근두근, 도파민 터지는 내 친구 소개시켜주기
        </p>
      </div>
    </div>
  );
}
