# 데이터베이스 선택 및 설정

## 요구사항
- Next.js 풀스택 환경에서 사용
- 무료 티어 제공
- 서버리스 환경(Vercel 등)과 호환
- TypeScript 지원

## 데이터베이스 옵션 비교

### 옵션 1: Neon (Serverless PostgreSQL) - 추천 ⭐
**장점**:
- **Vercel과 공식 파트너십** (Vercel 배포 시 최적)
- Serverless PostgreSQL (Vercel의 서버리스 환경과 완벽하게 통합)
- 좋은 무료 티어 (0.5GB storage, 무제한 프로젝트)
- Auto-scaling (자동 스케일링)
- Branching 기능 (Git과 유사한 DB 버전 관리)
- Prisma와 완벽한 통합
- 지연 시간 최소화 (서버리스 아키텍처)
- Vercel 대시보드에서 통합 관리 가능

**단점**:
- 비교적 새로운 서비스 (하지만 안정적)

**가격**: 무료 티어 (0.5GB storage, 충분한 개발 단계)

**Next.js 통합**: 
- Prisma 또는 `@neondatabase/serverless` 드라이버 사용
- 환경 변수로 연결 정보 관리
- Vercel 환경 변수와 자동 통합

---

### 옵션 2: Vercel Postgres
**장점**:
- Vercel 배포 시 완벽한 통합
- Serverless Postgres
- Vercel 대시보드에서 관리

**단점**:
- Vercel 배포 환경에 종속
- 로컬 개발 환경 설정 필요
- 무료 티어가 제한적

**가격**: 무료 티어 제공 (제한적)

---

### 옵션 3: Supabase (PostgreSQL)
**장점**:
- 완전 무료 티어 (500MB DB, 2GB 대역폭)
- PostgreSQL (강력한 관계형 DB)
- 실시간 기능 포함
- 인증 시스템 내장 (필요 시 활용 가능)
- 좋은 Next.js 통합 예제
- REST API 자동 생성
- 대시보드 제공

**단점**:
- Vercel과의 통합은 Neon만큼 최적화되지 않음
- PostgreSQL 학습 곡선 (SQL 필요)

**가격**: 무료 티어 충분 (개발 단계)

**Next.js 통합**: 
- `@supabase/supabase-js` 라이브러리
- 환경 변수로 연결 정보 관리

---

### 옵션 4: PlanetScale (MySQL)
**장점**:
- MySQL 호환
- Serverless
- Branching 기능
- 무료 티어

**단점**:
- MySQL (PostgreSQL 대비)

**가격**: 무료 티어 (5GB storage)

---

### 옵션 5: Turso (SQLite)
**장점**:
- 매우 빠름
- 간단한 구조
- 무료 티어

**단점**:
- SQLite 제약사항 (관계형 기능 제한)
- 스케일링 제한

---

## 추천 선택

### 1순위: **Neon (Serverless PostgreSQL)** ⭐
**Vercel 배포에 최적의 선택**
- Vercel과 공식 파트너십
- Serverless PostgreSQL로 Vercel의 서버리스 환경과 완벽하게 통합
- Branching 기능으로 개발/프로덕션 환경 관리 용이
- Prisma와 완벽한 통합
- 좋은 무료 티어 (0.5GB storage)
- Auto-scaling으로 트래픽 증가 시 자동 확장
- 지연 시간 최소화

### 2순위: **Supabase**
- 무료 티어가 넉넉함 (500MB)
- PostgreSQL의 강력한 기능
- Next.js 통합 예제가 많음
- 실시간 기능 등 확장 가능성
- 인증 시스템도 필요 시 활용 가능

## 구현 방식

### Neon 사용 시 (Prisma 추천)
```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// .env
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

또는 Neon Serverless 드라이버 직접 사용:
```typescript
// lib/db.ts
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql)
```

### ORM 사용 여부
- **Prisma** 추천 (TypeScript 친화적, 타입 안전성, Neon과 완벽한 통합)
- 또는 **Drizzle ORM** (경량, TypeScript 네이티브, Neon과 잘 통합)

### Vercel 환경 변수 설정
1. Neon 대시보드에서 Connection String 복사
2. Vercel 프로젝트 설정 → Environment Variables에 `DATABASE_URL` 추가
3. 로컬 개발용 `.env.local` 파일에도 동일하게 설정

## 마이그레이션 전략
- **Prisma Migration** 사용 (추천)
- 버전 관리 (Git)
- 스키마 변경 시 `prisma migrate dev` 실행
- Neon Branching 기능으로 개발/프로덕션 환경 분리 가능

## 설정 가이드

### 1. Neon 계정 생성
1. https://neon.tech 접속
2. GitHub 또는 이메일로 계정 생성
3. 새 프로젝트 생성

### 2. Prisma 설정
```bash
npm install -D prisma
npm install @prisma/client
npx prisma init
```

### 3. 연결 정보 설정
- Neon 대시보드에서 Connection String 복사
- `.env` 파일에 `DATABASE_URL` 추가
- Vercel 환경 변수에도 동일하게 설정

### 4. 스키마 정의 및 마이그레이션
```bash
# prisma/schema.prisma 파일에 스키마 작성
npx prisma migrate dev --name init
```

