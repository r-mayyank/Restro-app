import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const table = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

table.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const table = await prisma.table.create({
        data: {
            tno: body.tno,
            capacity: body.capacity,
            available: true,
            status: body.status,
            restaurant: {
                connect: {
                    id: body.restaurantId
                }
            }
        }
    })

    return c.json({ table });
});

export default table

