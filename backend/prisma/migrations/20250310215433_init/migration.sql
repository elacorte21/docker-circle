-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "availableStock" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
