import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

const restaurant = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

restaurant.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const restaurant = await prisma.restaurant.create({
        data: {
            name: body.name,
            address: body.address,
            phoneNo: body.phoneNo,
            ownerId: body.ownerId,
            type: body.type,
        }
    })

    return c.json({ restaurant });
});

export default restaurant