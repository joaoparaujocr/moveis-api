import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMoviesController,
  updateMoviesController,
} from "../controllers/movies.controller";
import { movieCreated, movieUpdate } from "../schemas/movie";
import validatedMiddleware from "../middlewares/validated.middleware";

const routes = Router();

const routesMovies = () => {
  routes.post("/", validatedMiddleware(movieCreated), createMovieController);
  routes.get("/", listMoviesController);
  routes.patch(
    "/:id",
    validatedMiddleware(movieUpdate),
    updateMoviesController
  );
  routes.delete("/:id", deleteMovieController);

  return routes;
};

export default routesMovies;
