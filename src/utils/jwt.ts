import { Admin, User } from "@prisma/client";
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const createToken = (user: User | Admin) => {
	const userData: User | Admin = {
		...user,
		password: "",
	};
	const token = jwt.sign({ userData }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
	return token;
};

const verifyToken = (token: string) => {
	const decoded = jwt.verify(token, JWT_SECRET);
	return decoded;
};

export default {
	createToken,
	verifyToken,
};
