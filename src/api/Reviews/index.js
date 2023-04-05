import apiClient from "../apiClient";

// ******** get *********

// 영화 리뷰 목록 조회
export const getReviewsMovie = (movieId) => {
  return apiClient.get(`/reviews/movie/${movieId}`);
};

// 리뷰 수 구하기
export const getReviewsCount = () => {
  return apiClient.get("/reviews/count");
};

// 리뷰목록 불러오기
export const getReviews = (page, limit, name) => {
  return apiClient.get(`/reviews`, {
    params: {
      page,
      limit,
      name,
    },
  });
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

// ******** patch *********

// 영화 리뷰 수정
export const patchReview = (reviewId) => {
  return apiClient.patch(`/reviews/${reviewId}`);
};