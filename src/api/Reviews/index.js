import apiClient from "../apiClient";

// ******** get *********

// 영화 리뷰 목록 조회
export const getReviewsMovie = (movieId) => {
  return apiClient.get(`/reviews/movie/${movieId}`);
};


// ******** post *********

// 영화 리뷰 생성
export const createReview = (movieId, body) => {
  return apiClient.post(`/reviews/${movieId}`, body);
};

// 영화 리뷰의 '댓글' 생성
export const createReviewComment = (reviewId, body) => {
  return apiClient.post(`/reviews/${reviewId}/comments`, body);
};

// ******** delete *********

// 영화 리뷰 삭제
export const deleteReview = (reviewId) => {
  return apiClient.delete(`/reviews/${reviewId}`);
};

// 영화 리뷰의 '댓글' 삭제
export const deleteReviewComment = (commentId) => {
  return apiClient.delete(`/reviews/comments/${commentId}`);
};

// 리뷰 수 구하기
export const getReviewsCount = () => {
  return apiClient.get("/reviews/count");
};

// 리뷰목록 불러오기 /limit는 최소 20이상이여야 합니다
export const getReviews = (page, limit) => {
  return apiClient.get(`/reviews?page=${page}&limit=${limit}`);
};