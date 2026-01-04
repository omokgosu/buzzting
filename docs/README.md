# Buzzting 프로젝트 스펙 문서

이 폴더에는 Buzzting 프로젝트의 모든 스펙 문서가 포함되어 있습니다.

## 문서 구조

### 📋 [개요 (Overview)](./overview.md)
프로젝트 전반적인 개요 및 핵심 요구사항

### 🔐 [인증 시스템 (Authentication)](./authentication.md)
직원 인증 방법 및 세션 관리 스펙

### 💾 [데이터베이스 (Database)](./database.md)
데이터베이스 선택 및 설정 스펙

### 🗄️ [데이터 모델 (Data Model)](./data-model.md)
데이터베이스 스키마 및 ERD

### 🔌 [API 명세서 (API Specification)](./api-spec.md)
모든 API 엔드포인트 상세 명세

### ⚙️ [기능 명세서 (Features)](./features.md)
각 기능별 상세 명세 및 사용자 플로우

## 개발 순서 제안

1. **데이터베이스 설정** ([database.md](./database.md) 참고)
   - Supabase 계정 생성 및 프로젝트 설정
   - Prisma 또는 ORM 설정

2. **데이터 모델 구현** ([data-model.md](./data-model.md) 참고)
   - 스키마 정의
   - 마이그레이션 실행

3. **인증 시스템 구현** ([authentication.md](./authentication.md) 참고)
   - 이메일 도메인 검증
   - 인증 코드 발송 기능
   - 세션 관리

4. **API 구현** ([api-spec.md](./api-spec.md) 참고)
   - 인증 API
   - 프로필 API
   - 매칭 API

5. **프론트엔드 구현** ([features.md](./features.md) 참고)
   - 페이지 구조
   - 사용자 플로우 구현

## 스펙 변경 사항

스펙 문서를 수정할 경우, 이 README에 변경 이력을 기록하는 것을 권장합니다.

---

**작성일**: 2024년
**최종 수정일**: 2024년

