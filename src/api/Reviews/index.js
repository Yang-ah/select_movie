import apiClient from "../apiClient";

// 영화 리뷰 목록 조회
export const getReviewsMovie = (movieId) => {
  return apiClient.get(`/reviews/movie/${movieId}`);
};

// 리뷰 수 구하기
export const getReviewsCount = () => {
  return apiClient.get("/reviews/count");
};

// 리뷰목록 불러오기 /limit는 최소 20이상이여야 합니다
export const getReviews = (page, limit) => {
  return apiClient.get(`/reviews?page=${page}&limit=${limit}`);
};