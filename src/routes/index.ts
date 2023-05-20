import { Application } from "express";
import routesMovies from "./movies.routes";

const AppRoutes = (app: Application) => {
  app.use("/movies", routesMovies());
};

export default AppRoutes;
