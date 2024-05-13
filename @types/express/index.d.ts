import { Admin, User } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            user: User,
            admin: Admin
        }
    }
}