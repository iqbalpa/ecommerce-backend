import { Request, Response, NextFunction } from "express";
import handler from "../../utils/handler";

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

export default {
	isEmailValid,
	isPasswordValid,
	isNameValid,
};
