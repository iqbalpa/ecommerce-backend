import { Router, Request, Response } from "express";
import { UserRequest, UserResponse } from "./dto/user.dto";
import { AdminRequest, AdminResponse } from "./dto/admin.dto";
import { userAuth } from "../middleware/auth";
import authService from "./auth.service";

const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
	const userData: UserRequest = {
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
	};
	const user: UserResponse = await authService.registerUser(userData);
	res.status(201).json({
		message: "user registered",
		data: user,
	});
});

authRouter.post("/login", async (req: Request, res: Response) => {
	const email: string = req.body.email;
	const password: string = req.body.password;
	const data: { ur: UserResponse; token: string } | string = await authService.loginUser(email, password);
	if (typeof data === "string") {
		res.status(404).json({ error: data });
	} else {
		res.status(200).json({
			data: data.ur,
			token: data.token,
		});
	}
});

authRouter.get("/user-detail", userAuth, async (req: Request, res: Response) => {
	const email: string = req.user.email;
	const user: UserResponse | string = await authService.getUserDetail(email);
	if (typeof user === "string") {
		res.status(404).json({ error: user });
	} else {
		res.status(200).json({
			message: "use detailed retrieved",
			data: user,
		});
	}
});

authRouter.put("/update", userAuth, async (req: Request, res: Response) => {
	const email: string = req.body.email;
	const userData: UserRequest = {
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
	};
	const updatedUser: UserResponse = await authService.updateUser(email, userData);
	res.status(200).json({
		message: "user updated",
		data: updatedUser,
	});
});

authRouter.delete("/delete", userAuth, async (req: Request, res: Response) => {
	const email: string = req.body.email;
	const deletedUser: UserResponse = await authService.deleteUser(email);
	res.status(200).json({
		message: "user deleted",
		data: deletedUser,
	});
});

authRouter.post("/register-admin", async (req: Request, res: Response) => {
	const adminData: AdminRequest = {
		email: req.body.email,
		password: req.body.password,
	};
	const admin: AdminResponse = await authService.registerAdmin(adminData);
	res.status(200).json({
		message: "admin registered",
		data: admin,
	});
});

export default authRouter;
