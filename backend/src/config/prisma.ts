import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";


// Initialize Prisma Client with a direct database URL
const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMDBkYTNlZGUtZGZjNi00ZmQ1LWFjZWMtYjAyMzNiOWZkZWVkIiwidGVuYW50X2lkIjoiMGViMjEyZTNlZWFlY2M2YTFlZjczNDY4ZGEyY2RlNzU5ZDZlNDlhYjU0ZTc2YjIzY2Y5ZWM0NDBiOWRkZTI3NiIsImludGVybmFsX3NlY3JldCI6IjlkZWZkZWJkLTEyNWEtNDQ4YS1iMzc1LTZlOWYxMDdjZDdmZCJ9.65Yuf2KDMR_DsOjkMwPuDWgvgwXOjsXgi9XQjW-6MlQ"
}).$extends(withAccelerate());

export default prisma;