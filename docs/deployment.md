# 배포 가이드

## Vercel 배포 시 환경 변수 설정

### 1. 환경 변수 설정 방법

#### 방법 1: Vercel 대시보드 (웹 UI)
1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 (또는 새 프로젝트 생성)
3. **Settings** → **Environment Variables** 메뉴로 이동
4. **Add New** 클릭
5. 다음 정보 입력:
   - **Key**: `DATABASE_URL`
   - **Value**: Neon Connection String
     ```
     postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require
     ```
   - **Environment**: 
     - Production (운영 환경)
     - Preview (프리뷰/스테이징 환경)
     - Development (개발 환경)
     - 모두 선택 가능
6. **Save** 클릭
7. **Redeploy** (기존 배포가 있다면 재배포 필요)

#### 방법 2: Vercel CLI
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 환경 변수 설정
vercel env add DATABASE_URL production
vercel env add DATABASE_URL preview
vercel env add DATABASE_URL development

# 각각 입력 시 Connection String 붙여넣기
```

---

## 환경 변수 분리 전략

### 개발 환경 (로컬)
- `.env` 또는 `.env.local` 파일 사용
- Git에 커밋하지 않음 (`.gitignore`에 포함)

### 프로덕션 환경 (Vercel)
- Vercel 대시보드에서 환경 변수로 설정
- Production, Preview, Development 각각 설정 가능

### 환경별 데이터베이스 분리 (권장)
Neon의 Branching 기능을 활용하여 환경별로 데이터베이스를 분리할 수 있습니다:

1. **Development DB**: 로컬 개발용
2. **Preview DB**: Vercel Preview 배포용 (각 PR마다 생성 가능)
3. **Production DB**: 프로덕션 배포용

각 환경별 Connection String을 Vercel 환경 변수에 설정합니다.

---

## 마이그레이션 배포

### 자동 마이그레이션 (권장하지 않음)
프로덕션 환경에서 자동 마이그레이션은 위험할 수 있습니다.

### 수동 마이그레이션 (권장)
1. 로컬에서 마이그레이션 실행
   ```bash
   npx prisma migrate dev --name migration_name
   ```

2. 프로덕션 DB에 마이그레이션 적용
   ```bash
   # Production DB URL을 환경 변수로 설정
   export DATABASE_URL="production_connection_string"
   
   # 마이그레이션 적용
   npx prisma migrate deploy
   ```

### Vercel Build Command에서 마이그레이션 실행
`vercel.json` 또는 프로젝트 설정에서:
```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install"
}
```

**주의**: `prisma migrate deploy`는 프로덕션 환경에서만 사용하고, `prisma migrate dev`는 로컬 개발에서만 사용합니다.

---

## Prisma Client 생성

Vercel 빌드 시 Prisma Client가 자동으로 생성되도록 `package.json`의 빌드 스크립트를 확인합니다:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

또는 Vercel 대시보드에서:
- **Build Command**: `prisma generate && next build`

---

## 배포 체크리스트

- [ ] Vercel 프로젝트 생성/연결
- [ ] GitHub 저장소 연결 (또는 다른 Git 저장소)
- [ ] `DATABASE_URL` 환경 변수 설정 (Production, Preview, Development)
- [ ] 빌드 명령어 확인 (`prisma generate` 포함)
- [ ] 프로덕션 DB에 마이그레이션 적용
- [ ] 배포 후 동작 확인

---

## 트러블슈팅

### "P1001: Can't reach database server"
- Connection String 확인
- SSL 모드 확인 (`sslmode=require`)
- 방화벽/네트워크 설정 확인

### "P1013: The provided database string is invalid"
- Connection String 형식 확인
- 특수 문자 이스케이프 확인
- URL 인코딩 확인

### Prisma Client가 생성되지 않음
- `package.json`의 `postinstall` 스크립트 확인
- Vercel 빌드 로그에서 `prisma generate` 실행 확인
- 빌드 명령어에 `prisma generate` 포함 여부 확인
