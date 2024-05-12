import { Request, Response, NextFunction } from "express";
import authRepository from "../auth.repository";
import handler from "../../utils/handler";
import { User } from "@prisma/client";

// ===================================== AUTHENTICATION INPUT VALIDATOR
function isEmailValid(req: Request, res: Response, next: NextFunction) {
	const email: string = req.body.email;
	if (email !== undefined) {
		return next();
	}
	handler.errorHandler({ message: "invalid email", data: {}, status: 400 }, res);
}
function isPasswordValid(req: Request, res: Response, next: NextFunction) {
	const password: string = req.body.password;
	if (password !== undefined) {
		return next();
	}
	handler.errorHandler({ message: "invalid password", data: {}, status: 400 }, res);
}
function isNameValid(req: Request, res: Response, next: NextFunction) {
	const name: string = req.body.name;
	if (name !== undefined) {
		return next();
	}
	handler.errorHandler({ message: "invalid name", data: {}, status: 400 }, res);
}

async function isEmailExist(req: Request, res: Response, next: NextFunction) {
	const email: string = req.body.email;
	const user: User | null = await authRepository.getUser(email);
	if (!user) {
		return next();
	}
	handler.errorHandler({ message: "desired email already exist", data: {}, status: 400 }, res);
}

export default {
	isEmailValid,
	isPasswordValid,
	isNameValid,
	isEmailExist,
};
