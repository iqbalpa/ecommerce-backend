import { Router, Request, Response } from "express";
// Service
import authService from "./auth.service";
// DTO
import { UserRequest, UserResponse } from "./dto/user.dto";
import { AdminRequest, AdminResponse } from "./dto/admin.dto";
// Middleware
import authMiddleware from "../middleware/auth";
import inputValidatorMiddleware from "./validator/inputValidator";
// Utils
import handler from "../utils/handler";

const authRouter = Router();

authRouter.post(
	"/register",
	inputValidatorMiddleware.isEmailValid,
	inputValidatorMiddleware.isPasswordValid,
	inputValidatorMiddleware.isNameValid,
	async (req: Request, res: Response) => {
		const userData: UserRequest = {
			email: req.body.email,
			name: req.body.name,
			password: req.body.password,
		};
		const user: UserResponse = await authService.registerUser(userData);
		handler.successHandler({ message: "user registered", data: user, status: 201 }, res);
	}
);

authRouter.post(
	"/login",
	inputValidatorMiddleware.isEmailValid,
	inputValidatorMiddleware.isPasswordValid,
	async (req: Request, res: Response) => {
		const email: string = req.body.email;
		const password: string = req.body.password;
		const data: { ur: UserResponse; token: string } | string = await authService.loginUser(email, password);
		if (typeof data === "string") {
			handler.errorHandler({ message: data, data: data, status: 404 }, res);
		} else {
			handler.successHandler(
				{ message: "login success", data: { user: data.ur, token: data.token }, status: 200 },
				res
			);
		}
	}
);

authRouter.get(
	"/user-detail",
	authMiddleware.userAuth,
	inputValidatorMiddleware.isEmailValid,
	async (req: Request, res: Response) => {
		const email: string = req.user.email;
		const user: UserResponse | string = await authService.getUserDetail(email);
		if (typeof user === "string") {
			handler.errorHandler({ message: user, data: user, status: 404 }, res);
		} else {
			handler.successHandler({ message: "user detail retrieved", data: user, status: 200 }, res);
		}
	}
);

authRouter.put(
	"/update",
	authMiddleware.userAuth,
	authMiddleware.manageAccountAuth,
	inputValidatorMiddleware.isEmailValid,
	inputValidatorMiddleware.isPasswordValid,
	inputValidatorMiddleware.isNameValid,
	async (req: Request, res: Response) => {
		const email: string = req.body.email;
		const userData: UserRequest = {
			email: req.body.email,
			name: req.body.name,
			password: req.body.password,
		};
		const updatedUser: UserResponse = await authService.updateUser(email, userData);
		handler.successHandler({ message: "user updated", data: updatedUser, status: 200 }, res);
	}
);

authRouter.delete(
	"/delete",
	authMiddleware.userAuth,
	authMiddleware.manageAccountAuth,
	inputValidatorMiddleware.isEmailValid,
	inputValidatorMiddleware.isPasswordValid,
	inputValidatorMiddleware.isNameValid,
	async (req: Request, res: Response) => {
		const email: string = req.body.email;
		const deletedUser: UserResponse = await authService.deleteUser(email);
		handler.successHandler({ message: "user deleted", data: deletedUser, status: 200 }, res);
	}
);

authRouter.post(
	"/register-admin",
	inputValidatorMiddleware.isEmailValid,
	inputValidatorMiddleware.isPasswordValid,
	async (req: Request, res: Response) => {
		const adminData: AdminRequest = {
			email: req.body.email,
			password: req.body.password,
		};
		const admin: AdminResponse = await authService.registerAdmin(adminData);
		handler.successHandler({ message: "admin registered", data: admin, status: 201 }, res);
	}
);

export default authRouter;
