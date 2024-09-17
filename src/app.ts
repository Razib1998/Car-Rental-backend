import express, { Request, Response } from "express";
import globalErrorHandler from "./app/Middlewares/GlobalErrorHandler";
import { UserRoutes } from "./app/modules/Auth/auth.route";

const app = express();
// Parsers

app.use(express.json());

app.use("/api/auth", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level!");
});

app.use(globalErrorHandler);

export default app;
