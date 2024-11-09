import z, { date } from "zod";

export const signupInput = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNo: z.string().min(10).max(10),
    password: z.string().min(6),
    role: z.string(),
    addedById: z.string()
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const updateInput = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNo: z.string().min(10).max(10),
    role: z.string(),
})

export const userDetails = z.object({
    id: z.number(),
    addedById: z.number(),
    name: z.string(),
    email: z.string().email(),
    phoneNo: z.string().min(10).max(10),
    password: z.string().min(6),
    role: z.string(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
})

export const createAttendance = z.object({
    userId: z.number(),
    status: z.string()
})

export const getAttendance = z.object({
    userId: z.string()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type UpdateInput = z.infer<typeof updateInput>
export type UserDetails = z.infer<typeof userDetails>
export type CreateAttendance = z.infer<typeof createAttendance>
export type GetAttendance = z.infer<typeof getAttendance>