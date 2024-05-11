import { Request, Response, NextFunction } from "express";
import jwtUtils from "../utils/jwt";
import handler from "../utils/handler";

// user authorization
function userAuth(req: Request, res: Response, next: NextFunction) {
	const authenticationToken = req.headers["authorization"];
	if (authenticationToken !== undefined) {
		const decodedToken = jwtUtils.verifyToken(authenticationToken);
		req.user = decodedToken.userData;
		if (decodedToken) {
			return next();
		}
	}
	handler.errorHandler({ message: "unauthorized", status: 401, data: "unauthorized" }, res);
}

// admin authorization
function adminAuth(req: Request, res: Response, next: NextFunction) {
	const authenticationToken = req.headers["authorization"];
	if (authenticationToken !== undefined) {
		const decodedToken = jwtUtils.verifyToken(authenticationToken);
		req.admin = decodedToken.userData;
		if (req.admin.role === "ADMIN") {
			return next();
		}
	}
	handler.errorHandler({ message: "unauthorized", status: 401, data: "unauthorized" }, res);
}

// user can update and delete their own account
function manageAccountAuth(req: Request, res: Response, next: NextFunction) {
	const currentUserEmail: string = req.user.email;
	const targetUserEmail: string = req.body.email;
	if (currentUserEmail === targetUserEmail) {
		return next();
	}
	handler.errorHandler(
		{ message: "you have no permission to manage this account", status: 401, data: "unauthorized" },
		res
	);
}

// =================================================== INPUT VALIDATOR
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
	userAuth,
	adminAuth,
	manageAccountAuth,
	isEmailValid,
	isPasswordValid,
	isNameValid,
};
