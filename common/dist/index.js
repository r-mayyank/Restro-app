"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendance = exports.createAttendance = exports.userDetails = exports.updateInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    phoneNo: zod_1.default.string().min(10).max(10),
    password: zod_1.default.string().min(6),
    role: zod_1.default.string(),
    addedById: zod_1.default.string()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.updateInput = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    phoneNo: zod_1.default.string().min(10).max(10),
    role: zod_1.default.string(),
});
exports.userDetails = zod_1.default.object({
    id: zod_1.default.number(),
    addedById: zod_1.default.number(),
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    phoneNo: zod_1.default.string().min(10).max(10),
    password: zod_1.default.string().min(6),
    role: zod_1.default.string(),
    createdAt: zod_1.default.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    updatedAt: zod_1.default.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
});
exports.createAttendance = zod_1.default.object({
    userId: zod_1.default.number(),
    status: zod_1.default.string()
});
exports.getAttendance = zod_1.default.object({
    userId: zod_1.default.string()
});
