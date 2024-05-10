import { PrismaClient, User, Admin } from "@prisma/client";
import { UserRequest } from "./dto/user.dto";
import { AdminRequest } from "./dto/admin.dto";

const prisma = new PrismaClient();

const getUser = async (email: string): Promise<User | null> => {
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
};

const createUser = async (user: UserRequest): Promise<User> => {
	return prisma.user.create({
		data: user,
	});
};

const updateUser = async (email: string, user: UserRequest): Promise<User> => {
	return prisma.user.update({
		where: {
			email
		},
		data: user,
	});
};

const deleteUser = async (email: string): Promise<User> => {
	return prisma.user.delete({
		where: {
			email
		},
	});
};

const createAdmin = async (admin: AdminRequest): Promise<Admin> => {
	return prisma.admin.create({
		data: admin,
	});
};

export default {
	getUser,
	createUser,
	updateUser,
	deleteUser,
	createAdmin,
};
