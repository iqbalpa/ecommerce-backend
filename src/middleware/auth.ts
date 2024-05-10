import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function userAuth(req: Request, res: Response, next: NextFunction) {
	const authenticationToken = req.headers["authorization"];
	console.log(authenticationToken);

	if (authenticationToken !== undefined) {
		const decodedToken = verifyToken(authenticationToken);
		req.user = decodedToken.user;
		console.log(`req.user:\n${JSON.stringify(req.user)}`);

		// decodedToken contains id, email, role, name (see createToken function in src/utils/jwt)
		console.log(`decoded token:\n${JSON.stringify(decodedToken)}`);
		if (decodedToken) {
			// moving to the next middleware
			return next();
		}
	}

	// if the authorization token is invalid or missing returning a 401 error
	res.status(401).send("Unauthorized");
}

export function adminAuth(req: Request, res: Response, next: NextFunction) {
	const authenticationToken = req.headers["authorization"];

	if (authenticationToken !== undefined) {
		const decodedToken = verifyToken(authenticationToken);

		if (decodedToken.role === "ADMIN") {
			return next();
		}
	}

	// if the authorization token is invalid or missing returning a 401 error
	res.status(401).send("Unauthorized");
}
