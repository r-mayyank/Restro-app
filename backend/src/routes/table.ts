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
            available: body.available,
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

table.put('/update', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const table = await prisma.table.update({
        where: {
            id: body.id
        },
        data: {
            tno: body.tno,
            capacity: body.capacity,
            available: body.available,
            status: body.status,
        }
    })

    return c.json({ table });
});

table.get('/get/:id', async (c) => {
    const id = c.req.param('id');    

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const tables = await prisma.user.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            restaurants: {
                select: {
                    id: true,
                    name: true,
                    tables: true
                }
            }
        }
    });    
    return c.json({ tables: tables });
});

export default table

