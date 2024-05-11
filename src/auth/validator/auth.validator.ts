import { Request } from "express";

const isEmailValid = (req: Request): boolean => {
	if (req.body.email === undefined) {
		return false;
	}
	return true;
};

const isPasswordValid = (req: Request): boolean => {
	if (req.body.password === undefined) {
		return false;
	}
	return true;
};

const isNameValid = (req: Request): boolean => {
	if (req.body.name === undefined) {
		return false;
	}
	return true;
};

export default {
	isEmailValid,
	isPasswordValid,
	isNameValid,
};
