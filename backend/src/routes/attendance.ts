import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createAttendance } from "@r_mayyank/restroapp-common";
import { Hono } from "hono";


const attendance = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

attendance.post('/create', async (c) => {
    const getCurrentDateInIndia = () => {
        const indiaTime = new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        // return new Date(indiaTime); // Converts it back to Date format
        return indiaTime
    };

    const currentDateInIndia = getCurrentDateInIndia();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = createAttendance.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text('Invalid input');
    }

    const attendance = await prisma.attendance.create({
        data: {
            userId: Number(body.userId),
            date: currentDateInIndia,
            status: body.status
        }
    })

    return c.json({ attendance });
});

attendance.get('/get/:id', async (c) => {
    const id = c.req.param('id');
    // return c.json({ id });

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const attendance = await prisma.user.findMany({
        where: {
            id: parseInt(id)
        },
        select: {
            attendance: true
        }
    })

    return c.json({ attendance });
});

attendance.post('/get-date', async (c) => {
    const body = await c.req.json();
    // return c.json({ body });

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const attendance = await prisma.attendance.findMany({
        where: {
            date: body.date
        }
    })

    return c.json({ attendance });
});

attendance.put('/update-status', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const attendance = await prisma.attendance.updateMany({
        where: {
            userId: Number(body.userId),
            date: body.date
        },
        data: {
            status: body.status
        }
    })

    return c.json({ attendance });
})

export default attendance;