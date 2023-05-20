import { AppDataSource } from "../data-source";
import Movie from "../entities/movies.entities";
import AppError from "../error";
import { MoviePayload } from "../interfaces/movie";
import { PaginationReturnService } from "../interfaces/pagination";
import "dotenv/config";

const createMovieService = async (payload: MoviePayload): Promise<Movie> => {
  const movieRepo = AppDataSource.getRepository(Movie);
  const nameAlreadyExists = await movieRepo.exist({
    where: {
      name: payload.name,
    },
  });

  if (nameAlreadyExists) {
    throw new AppError("Movie already exists.", 409);
  }

  const movie = movieRepo.create(payload);
  const movieSave = await movieRepo.save(movie);
  return movieSave;
};

const listMoviesService = async (
  perPage: number,
  page: number,
  sort: "id" | "price" | "duration",
  order: "asc" | "desc"
): Promise<PaginationReturnService<Movie>> => {
  const movieRepo = AppDataSource.getRepository(Movie);
  const total = await movieRepo.count();
  const perPageFormat =
    perPage > 5 || perPage <= 0 || isNaN(perPage) ? 5 : perPage;
  const pageFormat = isNaN(page)
    ? 1
    : total - page * perPageFormat < 0
    ? Math.ceil(total / perPageFormat)
    : page <= 0
    ? 1
    : page;
  const prevPageNumber = pageFormat - 1 <= 0 ? null : pageFormat - 1;
  const nextPageNumber =
    pageFormat + 1 <= Math.ceil(total / perPageFormat) ? pageFormat + 1 : null;
  const [data] = await movieRepo.findAndCount({
    skip: (pageFormat - 1) * perPageFormat,
    take: perPageFormat,
    order: {
      [sort]: order,
    },
  });

  return {
    prevPage: prevPageNumber
      ? `${process.env.HOST}/movies/?page=${prevPageNumber}${
          perPageFormat ? `&perPage=${perPageFormat}` : ""
        }`
      : null,
    nextPage: nextPageNumber
      ? `${process.env.HOST}/movies/?page=${nextPageNumber}${
          perPageFormat ? `&perPage=${perPageFormat}` : ""
        }`
      : null,
    count: perPageFormat,
    data,
  };
};

const updateMoviesService = async (id: number, payload: MoviePayload) => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const nameAlreadyExists = await movieRepository.exist({
    where: {
      name: payload.name,
    },
  });

  if (nameAlreadyExists) {
    throw new AppError("Name already exist.", 409);
  }

  const movie = await movieRepository.findOne({
    where: {
      id,
    },
  });

  if (!movie) {
    throw new AppError("Movie not found.", 404);
  }

  const movieUpdate = {
    ...movie,
    ...payload,
  };

  const result = await movieRepository.save(movieUpdate);

  return result;
};

const deleteMovieService = async (id: number) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const result = await movieRepository.delete({
    id,
  });

  if (!result.affected || result.affected < 1) {
    throw new AppError("Movie not found.", 404);
  }

  return result;
};

export {
  createMovieService,
  listMoviesService,
  updateMoviesService,
  deleteMovieService,
};
