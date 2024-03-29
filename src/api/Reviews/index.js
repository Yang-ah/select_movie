import apiClient from '../apiClient';

// ******** get *********

// 영화 리뷰 목록 조회
export const getReviewsMovie = (movieId, orderBy = 'CREATED_AT') => {
  return apiClient.get(`/reviews/movie/${movieId}`, {
    params: { orderBy },
  });
};

// 리뷰 수 구하기
export const getReviewsCount = () => {
  return apiClient.get('/reviews/count');
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

// 리뷰 자세히 보기
export const getReviewDetail = (movieId) => {
  return apiClient.get(`/reviews/${movieId}/detail`);
};

// 내 리뷰 보기
export const getMyReview = (movieId) => {
  return apiClient.get(`/reviews/movie/${movieId}/me`);
};

//내 리뷰 목록 보기
export const getReviewMe = () => {
  return apiClient.get(`/reviews/me`);
};
export const getReviewsMe = (page = 1, limit) => {
  return apiClient.get(`/reviews/me/paging`, {
    params: {
      page,
      limit,
    },
  });
};

//유저 리뷰 보기
export const getReviewsUser = (userId) => {
  return apiClient.get(`/reviews/users/${userId}`);
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

// 영화 리뷰의 '좋아요' 생성
export const createReviewLike = (reviewId) => {
  return apiClient.post(`/reviews/${reviewId}/like`);
};

// 영화 리뷰의 '싫어요' 생성
export const createReviewHate = (reviewId) => {
  return apiClient.post(`/reviews/${reviewId}/hate`);
};

// ******** delete *********

// 영화 리뷰 삭제
export const deleteReview = (reviewId) => {
  return apiClient.delete(`/reviews/${reviewId}`);
};

// 영화 리뷰 삭제 (관리자)
export const deleteReviewAdmin = (reviewId) => {
  return apiClient.delete(`/reviews/${reviewId}/admin`);
};

// 영화 리뷰의 '댓글' 삭제
export const deleteReviewComment = (commentId) => {
  return apiClient.delete(`/reviews/comments/${commentId}`);
};

// 영화 리뷰의 '좋아요' 삭제
export const deleteReviewLike = (reviewId) => {
  return apiClient.delete(`/reviews/${reviewId}/like`);
};

// 영화 리뷰의 '싫어요' 삭제
export const deleteReviewHate = (reviewId) => {
  return apiClient.delete(`/reviews/${reviewId}/hate`);
};

// ******** patch *********

// 영화 리뷰 수정
export const patchReview = (reviewId, body) => {
  return apiClient.patch(`/reviews/${reviewId}`, body);
};

// 영화 리뷰 수정 (관리자)
export const patchReviewAdmin = (reviewId, body) => {
  return apiClient.patch(`/reviews/${reviewId}/admin`, body);
};

// 영화 리뷰 댓글 수정
export const patchReviewComment = (commentId, body) => {
  return apiClient.patch(`/reviews/comments/${commentId}`, body);
};
