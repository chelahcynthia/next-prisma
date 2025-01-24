-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('pdf', 'video', 'appointment');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "VideoPlatform" AS ENUM ('youtube', 'dropbox', 'other');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('mpesa', 'airtel', 'pesalink', 'card');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('mpesa', 'airtel', 'pesalink', 'card');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'completed', 'failed');
