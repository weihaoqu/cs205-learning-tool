-- Add semester cohort to User.
--
-- Prisma 7 does NOT wrap migration SQL in a transaction, so this file wraps
-- itself. Without it, a failure between the backfill and the CHECK constraint
-- would leave students with NULL semesters and no invariant to catch it.
--
-- Order is significant:
--   1. add the column NULLABLE and with NO DEFAULT. A retained default would
--      silently mislabel any future insert that omits the field.
--   2. backfill existing students to the historical cohort. Hardcoded because
--      this is a one-time fact about data that already exists, not config.
--   3. only then add the invariant -- it would fail against step 1's NULLs.
--   4. index last.
--
-- ADMIN rows are intentionally left NULL: staff are not enrolled in a semester.

BEGIN;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "semester" TEXT;

-- Backfill: every pre-existing student belongs to the Spring 2026 cohort
-- (accounts created 2026-02-15..2026-04-01, last activity 2026-05-30).
UPDATE "User" SET "semester" = '2026-spring' WHERE "role" = 'STUDENT';

-- Invariant: students are enrolled, staff are not.
ALTER TABLE "User" ADD CONSTRAINT "user_semester_role_ck" CHECK (
  ("role" = 'STUDENT' AND "semester" IS NOT NULL) OR
  ("role" = 'ADMIN'   AND "semester" IS NULL)
);

-- CreateIndex
CREATE INDEX "User_semester_idx" ON "User"("semester");

COMMIT;
