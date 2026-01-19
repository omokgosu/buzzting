-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "MatchRequestStatus" AS ENUM ('pending', 'accepted', 'rejected', 'cancelled');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('active', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "ContactPreference" AS ENUM ('email', 'kakao', 'phone');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "registered_by" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "bio" TEXT,
    "department" TEXT,
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "profile_image_url" TEXT,
    "contact_preference" "ContactPreference",
    "contact_info" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_requests" (
    "id" TEXT NOT NULL,
    "requester_profile_id" TEXT NOT NULL,
    "target_profile_id" TEXT NOT NULL,
    "status" "MatchRequestStatus" NOT NULL DEFAULT 'pending',
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "responded_at" TIMESTAMP(3),

    CONSTRAINT "match_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "match_request_id" TEXT NOT NULL,
    "profile1_id" TEXT NOT NULL,
    "profile2_id" TEXT NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "profiles_user_id_idx" ON "profiles"("user_id");

-- CreateIndex
CREATE INDEX "profiles_registered_by_idx" ON "profiles"("registered_by");

-- CreateIndex
CREATE INDEX "profiles_is_active_idx" ON "profiles"("is_active");

-- CreateIndex
CREATE INDEX "profiles_created_at_idx" ON "profiles"("created_at");

-- CreateIndex
CREATE INDEX "match_requests_requester_profile_id_idx" ON "match_requests"("requester_profile_id");

-- CreateIndex
CREATE INDEX "match_requests_target_profile_id_idx" ON "match_requests"("target_profile_id");

-- CreateIndex
CREATE INDEX "match_requests_status_idx" ON "match_requests"("status");

-- CreateIndex
CREATE UNIQUE INDEX "match_requests_requester_profile_id_target_profile_id_key" ON "match_requests"("requester_profile_id", "target_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "matches_match_request_id_key" ON "matches"("match_request_id");

-- CreateIndex
CREATE INDEX "matches_match_request_id_idx" ON "matches"("match_request_id");

-- CreateIndex
CREATE INDEX "matches_profile1_id_idx" ON "matches"("profile1_id");

-- CreateIndex
CREATE INDEX "matches_profile2_id_idx" ON "matches"("profile2_id");

-- CreateIndex
CREATE INDEX "matches_status_idx" ON "matches"("status");

-- CreateIndex
CREATE UNIQUE INDEX "matches_profile1_id_profile2_id_key" ON "matches"("profile1_id", "profile2_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_registered_by_fkey" FOREIGN KEY ("registered_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_requests" ADD CONSTRAINT "match_requests_requester_profile_id_fkey" FOREIGN KEY ("requester_profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_requests" ADD CONSTRAINT "match_requests_target_profile_id_fkey" FOREIGN KEY ("target_profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_match_request_id_fkey" FOREIGN KEY ("match_request_id") REFERENCES "match_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_profile1_id_fkey" FOREIGN KEY ("profile1_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_profile2_id_fkey" FOREIGN KEY ("profile2_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
