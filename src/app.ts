import "express-async-errors";
import express, { Application, json } from "express";
import AppRoutes from "./routes";
import errorHandlerMiddleware from "./middlewares/errorHandle.middleware";

const app: Application = express();
const PORT = 3000;

app.use(json());

AppRoutes(app);

app.use(errorHandlerMiddleware);

export default app;
