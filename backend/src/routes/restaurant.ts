import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { logger } from "hono/logger";

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
    console.log("Received restaurant data:", body);

    const restaurant = await prisma.restaurant.create({
        data: {
            name: body.name,
            address: body.address,
            country: body.country,
            phoneNo: body.phoneNo,
            type: body.type,
            licenseNo: body.licenseNo,
            owner: {
                connect: { id: body.ownerId }
            }
        }
    })

    return c.json({ restaurant });
});

export default restaurant