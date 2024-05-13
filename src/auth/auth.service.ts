import { User, Admin } from "@prisma/client";
// Repository
import authRepository from "./auth.repository";
// DTO
import { UserRequest, UserResponse } from "./dto/user.dto";
import { AdminRequest, AdminResponse } from "./dto/admin.dto";
// Utils
import authUtils from "../utils/auth";
import jwtUtils from "../utils/jwt";

const registerUser = async (user: UserRequest): Promise<UserResponse> => {
	const hashedPassword: string = await authUtils.hashPassword(user.password);
	const userData: UserRequest = {
		...user,
		password: hashedPassword,
	};
	const newUser: User = await authRepository.createUser(userData);
	const userResponse: UserResponse = {
		id: newUser.id,
		email: newUser.email,
		name: newUser.name,
		role: newUser.role,
		createdAt: newUser.createdAt,
		updatedAt: newUser.updatedAt,
	};
	return userResponse;
};

const loginUser = async (email: string, password: string): Promise<{ ur: UserResponse; token: string } | string> => {
	const user: User | null = await authRepository.getUser(email);
	if (!user) {
		return `user with email ${email} is not found`;
	} else {
		const isPasswordValid: boolean = await authUtils.verifyPassword(password, user.password);
		if (!isPasswordValid) {
			return "invalid password";
		} else {
			const token: string = jwtUtils.createToken(user);
			const userResponse: UserResponse = {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			};
			return { ur: userResponse, token: token };
		}
	}
};

const getUserDetail = async (email: string): Promise<UserResponse | string> => {
	const user: User | null = await authRepository.getUser(email);
	if (!user) {
		return `user with email ${email} is not found`;
	} else {
		const userResponse: UserResponse = {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
		return userResponse;
	}
};

const updateUser = async (email: string, user: UserRequest): Promise<UserResponse> => {
	const hashedPassword: string = await authUtils.hashPassword(user.password);
	const userData: UserRequest = {
		email: user.email,
		name: user.name,
		password: hashedPassword,
	};
	const updatedUser: User = await authRepository.updateUser(email, userData);
	const userResponse: UserResponse = {
		id: updatedUser.id,
		email: updatedUser.email,
		name: updatedUser.name,
		role: updatedUser.role,
		createdAt: updatedUser.createdAt,
		updatedAt: updatedUser.updatedAt,
	};
	return userResponse;
};

const deleteUser = async (email: string): Promise<UserResponse> => {
	const deletedUser: User = await authRepository.deleteUser(email);
	const userResponse: UserResponse = {
		id: deletedUser.id,
		email: deletedUser.email,
		name: deletedUser.name,
		role: deletedUser.role,
		createdAt: deletedUser.createdAt,
		updatedAt: deletedUser.updatedAt,
	};
	return userResponse;
};

const registerAdmin = async (admin: AdminRequest): Promise<AdminResponse> => {
	const hashedPassword: string = await authUtils.hashPassword(admin.password);
	const adminData: AdminRequest = {
		...admin,
		password: hashedPassword,
	};
	const newAdmin: Admin = await authRepository.createAdmin(adminData);
	const adminResponse: AdminResponse = {
		id: newAdmin.id,
		email: newAdmin.email,
		role: newAdmin.role,
		createdAt: newAdmin.createdAt,
		updatedAt: newAdmin.updatedAt,
	};
	return adminResponse;
};

export default {
	registerAdmin,
	registerUser,
	loginUser,
	getUserDetail,
	updateUser,
	deleteUser,
};
