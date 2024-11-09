import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@r_mayyank/medium-common";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const user = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

user.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text('Invalid input');
    }

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            phoneNo: body.phoneNo,
            password: body.password,
            role: body.role,
            addedById: body.addedById
        }
    })

    const jwt = await sign({ userId: user.id, email: user.email }, c.env.JWT_SECRET)

    return c.json({ jwt });
})

user.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text('Invalid input');
    }

    const users = await prisma.user.findFirst({
        where: {
            email: body.email,
            password: body.password,
        }
    })

    if (!users) {
        c.status(401);
        return c.text('Invalid credentials');
    }

    const jwt = await sign({ userId: users.id, email: users.email }, c.env.JWT_SECRET)

    return c.json({ jwt });
})

user.get('/getUsers', async (c) => {
    const id = c.req.query('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const users = await prisma.user.findMany({
            where: {
                addedById: id ? parseInt(id) : undefined
            }
        });
        return c.json({
            users
        });
    } catch (error) {
        c.status(500);
        console.log(error);
        return c.text('Internal server error');
    }
})

user.get('/get-user/:id', async (c) => {
    const id = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const users = await prisma.user.findFirst({
            where: {
                id: id ? parseInt(id) : undefined
            }
        });
        return c.json({
            users
        });
    } catch (error) {
        c.status(500);
        console.log(error);
        return c.text('Internal server error');
    }
})

user.get('/get-user-att/:id', async (c) => {
    const id = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const users = await prisma.user.findFirst({
            where: {
                id: id ? parseInt(id) : undefined
            }
        });
        return c.json({
            users
        });
    } catch (error) {
        c.status(500);
        console.log(error);
        return c.text('Internal server error');
    }
})

user.put('/edit-user/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Make sure the input is valid via zod validation
    // const { success } = signupInput.safeParse(body);
    // if (!success) {
    //     c.status(411);
    //     return c.text('Invalid input');
    // }

    const user = await prisma.user.update({
        where: {
            id: id ? parseInt(id) : undefined
        },
        data: {
            name: body.name,
            email: body.email,
            phoneNo: body.phoneNo,
            role: body.role
        }
    })

    return c.json({
        id: user.id
    })
})
user.delete('/del-user/:id', async (c) => {
    //Set permission so that either admin or owner or the user itself can delete this user
    const id = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.delete({
        where: {
            id: id ? parseInt(id) : undefined
        }
    })

    return c.json({
        id: user.id
    })
})

export default user;