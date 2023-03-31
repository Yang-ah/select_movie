import apiClient from "../apiClient";

// 영화목록 불러오기
export const getMovies = () => {
  return apiClient.get("/movies");
};

// 영화 전체 개수 불러오기
export const getMoviesCount = () => {
  return apiClient.get("/movies/count");
};

// 내가 좋아요 한 영화 불러오기
export const getMoviesMeLike = (id) => {
  return apiClient.get(`/movies/me/like`);
};

// 영화 장르별로 불러오기
export const getMoviesGenre = () => {
  return apiClient.get(`/movies/genre`);
};

// top10 영화 불러오기
export const getMoviesTop = () => {
  return apiClient.get(`/movies/top`);
};

// 연관된 영화 불러오기
export const getMoviesRelated = (id) => {
  return apiClient.get(`/movies/${id}/related`);
};

// 영화 장르별로 불러오기22 ?
export const getMoviesCategory = () => {
  return apiClient.get(`/movies/category`);
};

// 영화 자세히 불러오기
export const getMovie = (id) => {
  return apiClient.get(`/movies/${id}/detail`);
};

// 영화 카테고리 불러오기
export const getMovieCategories = (id) => {
  return apiClient.get(`/movies/categories`);
};
