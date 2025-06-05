-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "joinedEvent" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "participant_one_id" INTEGER NOT NULL,
    "participant_two_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "matches_participant_one_id_idx" ON "matches"("participant_one_id");

-- CreateIndex
CREATE INDEX "matches_participant_two_id_idx" ON "matches"("participant_two_id");

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_participant_one_id_fkey" FOREIGN KEY ("participant_one_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_participant_two_id_fkey" FOREIGN KEY ("participant_two_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
