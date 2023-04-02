import apiClient from "../apiClient";

// 나의 정보 불러오기
export const getUsersMe = () => {
  return apiClient.get(`/users/me`);
};

// 나의 추가 정보 불러오기 [좋아요, 리뷰 개수, 별점]
export const getUsersMeInfo = () => {
  return apiClient.get(`/users/me/info`);
};
// data: averageScore: null, reviewCount: 0, likeCount: 0
