import { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
	console.log("\n===== Request Logger =====");
	console.log(`${req.method} request made to ${req.path}`);
	console.log(`Headers:\n ${JSON.stringify(req.headers)}`);
	console.log(`Body:\n ${JSON.stringify(req.body)}`);
	console.log("==========================\n");
	next();
}
