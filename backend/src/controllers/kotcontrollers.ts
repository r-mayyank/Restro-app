import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

const kot = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

kot.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const kot = await prisma.kOTs.create({
        data: {
            orderId: body.orderId,
            tableId: body.tableNo,
            items: body.items
        }
    })

    return c.json({ kot });
});

export default kot;