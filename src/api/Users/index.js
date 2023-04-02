import apiClient from "../apiClient";

// 전체 이용자 수 불러오기
export const getUsersCount = () => {
  return apiClient.get("/users/count");
};

// 나의 정보 불러오기
export const getUsersMe = () => {
  return apiClient.get(`/users/me`);
};

// 나의 추가 정보 불러오기 [좋아요, 리뷰 개수, 별점]
export const getUsersMeInfo = () => {
  return apiClient.get(`/users/me/info`);
};
// data: averageScore: null, reviewCount: 0, likeCount: 0

// 유저목록 불러오기 /limit는 최소 20이상이여야 합니다
export const getUsers = (page, limit) => {
  return apiClient.get(`/users?page=${page}&limit=${limit}`);
};