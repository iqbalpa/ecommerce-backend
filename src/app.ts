import express, { Request, Response } from "express";
import { requestLogger } from "./middleware/logger";
import authRouter from "./routes/auth";

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.use("/auth", authRouter);

export default app;
