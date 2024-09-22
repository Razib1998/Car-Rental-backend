import express, { Request, Response } from "express";
import globalErrorHandler from "./app/Middlewares/GlobalErrorHandler";
import { AuthRoutes } from "./app/modules/Auth/auth.route";
import { CarRoutes } from "./app/modules/Car/car.route";
import { BookingsRoutes } from "./app/modules/Bookings/bookings.route";

const app = express();
// Parsers

app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/cars", CarRoutes);
app.use("/api/bookings", BookingsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level!");
});

app.use(globalErrorHandler);

export default app;
