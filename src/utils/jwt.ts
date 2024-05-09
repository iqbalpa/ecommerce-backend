import { User } from "../models/user";
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const createToken = (user: User) => {
	const token = jwt.sign(
		{
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
		},
		JWT_SECRET,
		{
			expiresIn: JWT_EXPIRES_IN,
		}
	);
	return token;
};

export const verifyToken = (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
};
