import { Request, Response } from "express";
import {
  createMovieService,
  deleteMovieService,
  listMoviesService,
  updateMoviesService,
} from "../services/movies.service";
import { QueryParamsMovies } from "../interfaces/pagination";

const createMovieController = async (req: Request, res: Response) => {
  const movie = await createMovieService(req.body);

  return res.status(201).json(movie);
};

const listMoviesController = async (req: Request, res: Response) => {
  const {
    page = 1,
    perPage = 5,
    sort = "id",
    order = "asc",
  } = req.query as unknown as QueryParamsMovies;

  const movies = await listMoviesService(
    Number(perPage),
    Number(page),
    sort,
    order
  );

  return res.json(movies);
};

const updateMoviesController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const movieUpdate = await updateMoviesService(Number(id), req.body);

  return res.json(movieUpdate);
};

const deleteMovieController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteMovieService(Number(id));

  return res.status(204).json();
};

export {
  createMovieController,
  listMoviesController,
  updateMoviesController,
  deleteMovieController,
};
