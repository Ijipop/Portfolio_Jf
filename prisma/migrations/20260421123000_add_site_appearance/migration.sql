-- CreateTable
CREATE TABLE "SiteAppearance" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "beigePresentationBgUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteAppearance_pkey" PRIMARY KEY ("id")
);
