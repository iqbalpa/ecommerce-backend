import express, { Request, Response } from "express";
import { requestLogger } from "./middleware/logger";
import authRouter from "./auth/auth.controller";
import productRouter from "./product/product.controller";
import { userAuth } from "./middleware/auth";

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/product", productRouter, userAuth);

export default app;
