import { Response } from "express";

interface HandlerData {
	message: string;
	data: {};
	status: number;
}

function successHandler(handlerData: HandlerData, res: Response) {
	res.status(handlerData.status).json({
		status: "SUCCESS",
		message: handlerData.message,
		data: handlerData.data,
	});
}

function errorHandler(handlerData: HandlerData, res: Response) {
	res.status(handlerData.status).json({
		status: "ERROR",
		message: handlerData.message,
		data: handlerData.data,
	});
}

export default {
	successHandler,
	errorHandler,
};
