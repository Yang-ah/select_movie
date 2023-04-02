import apiClient from "../apiClient";

// 영화 리뷰 목록 조회
export const getReviewsMovie = (movieId) => {
  return apiClient.get(`/reviews/movie/${movieId}`);
};

//

export const createReview = (movieId, body) => {
  return apiClient.get(`/reviews/${movieId}`, body);
};

/*
{
  "content": "string",
  "score": 0,
}

*/
