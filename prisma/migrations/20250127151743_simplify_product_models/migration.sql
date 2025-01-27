/*
  Warnings:

  - You are about to drop the column `file_name` on the `pdf_products` table. All the data in the column will be lost.
  - You are about to drop the column `file_path` on the `pdf_products` table. All the data in the column will be lost.
  - You are about to drop the column `file_size` on the `pdf_products` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `video_products` table. All the data in the column will be lost.
  - Added the required column `file_url` to the `pdf_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pdf_products" DROP COLUMN "file_name",
DROP COLUMN "file_path",
DROP COLUMN "file_size",
ADD COLUMN     "file_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "video_products" DROP COLUMN "duration";
