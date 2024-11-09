-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('DineIn', 'Takeaway');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Ongoing', 'Complete');

-- CreateEnum
CREATE TYPE "TableStatus" AS ENUM ('available', 'unavailable', 'reserved');

-- CreateTable
CREATE TABLE "MenuItem" (
    "_id" UUID NOT NULL,
    "itemName" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "PriceOption" (
    "_id" UUID NOT NULL,
    "size" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "menuItemId" UUID NOT NULL,

    CONSTRAINT "PriceOption_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "_id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "_id" UUID NOT NULL,
    "type" "OrderType" NOT NULL,
    "customerId" UUID,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "_id" UUID NOT NULL,
    "menuItemId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" UUID NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Table" (
    "_id" UUID NOT NULL,
    "tno" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "status" "TableStatus" NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_itemName_key" ON "MenuItem"("itemName");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Table_tno_key" ON "Table"("tno");

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceOption" ADD CONSTRAINT "PriceOption_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
