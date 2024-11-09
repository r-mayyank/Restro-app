import z from "zod";
export declare const signupInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phoneNo: z.ZodString;
    password: z.ZodString;
    role: z.ZodString;
    addedById: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phoneNo: string;
    password: string;
    role: string;
    addedById: string;
}, {
    name: string;
    email: string;
    phoneNo: string;
    password: string;
    role: string;
    addedById: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const updateInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phoneNo: z.ZodString;
    role: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phoneNo: string;
    role: string;
}, {
    name: string;
    email: string;
    phoneNo: string;
    role: string;
}>;
export declare const userDetails: z.ZodObject<{
    id: z.ZodNumber;
    addedById: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    phoneNo: z.ZodString;
    password: z.ZodString;
    role: z.ZodString;
    createdAt: z.ZodEffects<z.ZodString, string, string>;
    updatedAt: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phoneNo: string;
    password: string;
    role: string;
    addedById: number;
    id: number;
    createdAt: string;
    updatedAt: string;
}, {
    name: string;
    email: string;
    phoneNo: string;
    password: string;
    role: string;
    addedById: number;
    id: number;
    createdAt: string;
    updatedAt: string;
}>;
export declare const createAttendance: z.ZodObject<{
    userId: z.ZodNumber;
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    userId: number;
}, {
    status: string;
    userId: number;
}>;
export declare const getAttendance: z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type UpdateInput = z.infer<typeof updateInput>;
export type UserDetails = z.infer<typeof userDetails>;
export type CreateAttendance = z.infer<typeof createAttendance>;
export type GetAttendance = z.infer<typeof getAttendance>;
