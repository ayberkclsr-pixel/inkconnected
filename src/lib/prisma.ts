import { PrismaClient } from "@prisma/client";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// In production (Vercel), ensure the path resolves correctly to where the DB is traced
const dbPath = process.env.NODE_ENV === "production" 
  ? `file:${path.join(process.cwd(), "prisma", "dev.db")}`
  : process.env.DATABASE_URL;

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: dbPath,
    },
  },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
