import { Router, Request, Response } from "express";
import { User } from "../models/user";
import { UserRequest, UserResponse } from "../dto/user";
import { hashPassword, verifyPassword } from "../utils/auth";
import { createToken } from "../utils/jwt";
import { createUser, getUser, updateUser, deleteUser } from "../services/auth";
import { userAuth } from "../middleware/auth";

const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
	const hashedPassword: string = await hashPassword(req.body.password);
	const userData: UserRequest = {
		email: req.body.email,
		name: req.body.name,
		password: hashedPassword,
		role: req.body.role,
	};
	const newUser: User = await createUser(userData);
	const userResponse: UserResponse = {
		id: newUser.id,
		email: newUser.email,
		name: newUser.name,
		role: newUser.role,
		createdAt: newUser.createdAt,
		updatedAt: newUser.updatedAt,
	};
	res.json(userResponse).status(201);
});

authRouter.post("/login", async (req: Request, res: Response) => {
	const email: string = req.body.email;
	const password: string = req.body.password;
	const user: User | null = await getUser(email);
	if (!user) {
		res.status(404).send("User not found");
	} else {
		const isValid: boolean = await verifyPassword(password, user.password);
		if (!isValid) {
			res.status(401).send("Invalid password");
		} else {
			const token: string = createToken(user);
			const userResponse: UserResponse = {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			};
			res.json({ userResponse, token }).status(200);
		}
	}
});

authRouter.get("/user-detail", userAuth, async (req: Request, res: Response) => {
	const email: string = req.body.email;
	const user: User | null = await getUser(email);
	if (!user) {
		res.status(404).send("User not found");
	} else {
		const userResponse: UserResponse = {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
		res.json(userResponse).status(200);
	}
});

authRouter.put("/update/:id", userAuth, async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id);
	const userData: UserRequest = {
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
		role: req.body.role,
	};
	const updatedUser: User = await updateUser(id, userData);
	const userResponse: UserResponse = {
		id: updatedUser.id,
		email: updatedUser.email,
		name: updatedUser.name,
		role: updatedUser.role,
		createdAt: updatedUser.createdAt,
		updatedAt: updatedUser.updatedAt,
	};
	res.json(userResponse).status(200);
});

authRouter.delete("/delete/:id", userAuth, async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id);
	const deletedUser: User = await deleteUser(id);
	const userResponse: UserResponse = {
		id: deletedUser.id,
		email: deletedUser.email,
		name: deletedUser.name,
		role: deletedUser.role,
		createdAt: deletedUser.createdAt,
		updatedAt: deletedUser.updatedAt,
	};
	res.json(userResponse).status(200);
});

export default authRouter;
