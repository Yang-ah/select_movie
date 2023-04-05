import apiClient from '../apiClient';

// 영화목록 불러오기
export const getMovies = (page, limit, title) => {
  return apiClient.get(`/movies`, {
    params: {
      page,
      limit,
      title,
    },
  });
};

// 영화 전체 개수 불러오기
export const getMoviesCount = () => {
  return apiClient.get('/movies/count');
};

// 내가 좋아요 한 영화 불러오기
export const getMoviesMeLike = () => {
  return apiClient.get(`/movies/me/like`);
};

// 영화 장르별로 불러오기
export const getMoviesGenre = (page = 1, genreId) => {
  return apiClient.get(`/movies/genre`, {
    params: {
      page,
      genreId,
      limit: 20,
    },
  });
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

// 영화 좋아요 생성
export const postMovieLike = (id) => {
  return apiClient.post(`/movies/${id}/like`);
};

// 영화 좋아요 삭제
export const deleteMovieLike = (id) => {
  return apiClient.delete(`/movies/${id}/like`);
};

// 영화 수정하기
export const patchMovie = (id, body) => {
  return apiClient.patch(`/movies/${id}`,body);
};
