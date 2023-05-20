import { Movie } from "../entities";

export interface PaginationReturnService<T> {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: T[];
}

export interface QueryParamsMovies {
  page: number;
  perPage: number;
  sort: "id" | "price" | "duration";
  order: "asc" | "desc";
}
