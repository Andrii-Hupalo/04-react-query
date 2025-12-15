import axios from "axios";
import { Movie } from "../types/movie";

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_BASE_URL = "https://api.themoviedb.org/3";
const ACCSESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCSESS_TOKEN}`,
  },
});

export async function fetchMovies(
  query: string,
  page: number
): Promise<TMDBResponse> {
  const { data } = await axiosInstance.get<TMDBResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  });

  return data;
}
