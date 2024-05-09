import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../dto/user";

const prisma = new PrismaClient();

export const getUser = async (email: string) => {
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
};

export const createUser = async (user: UserRequest) => {
    return prisma.user.create({
        data: user,
    });
};

export const updateUser = async (id: number, user: UserRequest) => {
    return prisma.user.update({
        where: {
            id,
        },
        data: user,
    });
};

export const deleteUser = async (id: number) => {
    return prisma.user.delete({
        where: {
            id,
        },
    });
};