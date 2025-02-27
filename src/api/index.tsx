import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const clientInstance = axios.create({
  baseURL: "https://admin.puzzly.site/admin/v1",
  timeout: 1000,
});

// 로그인
export const login = async (loginId: string, password: string) => {
  try {
    const response = await clientInstance.post(`/auth/login`, {
      loginId,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "로그인 실패");
    }
  }
};

export interface UserProfileValidationResponse {
  userId: number;
  description: string;
  nickname: string;
  name: string;
  birthdate: string;
  phoneNumber: string;
  joinDate: string;
  profileStatus: string;
  rejectImage: boolean;
  rejectDescription: boolean;
}

export interface UserProfileValidationResponses {
  status: string;
  message: string;
  data: UserProfileValidationResponseData;
}

export interface UserProfileValidationResponseData {
  content: UserProfileValidationResponse[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

// 유저 데이터 가져오기
export const getUserDatas = async (
  page: number = 1,
  size: number = 10
): Promise<UserProfileValidationResponseData> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    clientInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    const response = await clientInstance.get<UserProfileValidationResponses>(
      `/users`,
      { params: { page, size } }
    );

    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "유저 데이터 불러오기 실패"
      );
    }
    throw new Error("유저 데이터 불러오기 중 알 수 없는 오류 발생");
  }
};

// 사용자 프로필 거절 사유 갱신
export const updateProfileStatus = async (
  userId: number,
  rejectImage: boolean,
  rejectDescription: boolean
) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    clientInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    const response = await clientInstance.post(`/users/${userId}/profile`, {
      rejectImage,
      rejectDescription,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "프로필 상태 변경 실패");
    }
    throw new Error("프로필 상태 변경 중 알 수 없는 오류 발생");
  }
};

export const getUserById = async (userId: number) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    clientInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    const response = await clientInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "유저 데이터 불러오기 실패"
      );
    }
    throw new Error("유저 데이터 불러오기 중 알 수 없는 오류 발생");
  }
};

const getBlockDatas = async (page: number = 1, size: number = 10) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    clientInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    const response = await clientInstance.get<BlockedValidationResponses>(
      `/blocks`,
      {
        params: { page, size },
      }
    );

    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "유저 데이터 불러오기 실패"
      );
    }
    throw new Error("유저 데이터 불러오기 중 알 수 없는 오류 발생");
  }
};

export interface BlockedUser {
  blockedUserId: number; // 차단된 사용자 ID
  blockedUserNickname: string; // 차단된 사용자 닉네임
  blockedUserName: string; // 차단된 사용자 이름
  blockedUserBirthdate: string; // 차단된 사용자의 생년월일 (yyyy-MM-dd 형식)

  blockingUserId: number; // 차단한 사용자 ID
  blockingUserNickname: string; // 차단한 사용자 닉네임
  blockingUserName: string; // 차단한 사용자 이름

  blockedDate: string; // 차단된 날짜 (yyyy-MM-dd 형식)
}

export interface BlockedResponseData {
  content: BlockedUser[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export interface BlockedValidationResponses {
  status: string;
  message: string;
  data: BlockedResponseData;
}

export interface ReportedUser {
  userId: number; // 유저 ID
  nickName: string; // 유저 닉네임
  name: string; // 유저 이름
  birthdate: string; // 유저 생년월일 (yyyy-MM-dd 형식)
  totalReportedCnt: number; // 유저가 리포트된 총 횟수
  latestReportedReason: string; // 가장 최근에 리포트된 이유
}

interface ReportedResponseData {
  content: ReportedUser[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

interface ReportedValidationResponses {
  status: string;
  message: string;
  data: ReportedResponseData;
}

const getReportedDatas = async (page: number = 1, size: number = 10) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    clientInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    const response = await clientInstance.get<ReportedValidationResponses>(
      `/reports`,
      {
        params: { page, size },
      }
    );

    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "유저 데이터 불러오기 실패"
      );
    }
    throw new Error("유저 데이터 불러오기 중 알 수 없는 오류 발생");
  }
};

export const getReportDetail = async (
  userId: number,
  page: number = 1,
  size: number = 10
) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    clientInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    const response =
      await clientInstance.get<ReportedDetailValidationResponses>(
        `/reports/users/${userId}`,
        {
          params: { page, size },
        }
      );
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "유저 데이터 불러오기 실패"
      );
    }
    throw new Error("유저 데이터 불러오기 중 알 수 없는 오류 발생");
  }
};

interface ReportDetail {
  cnt: number;
  reason: string;
  reportedDate: string;
}

interface ReportedDetailResponseData {
  content: ReportDetail[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

interface ReportedDetailValidationResponses {
  status: string;
  message: string;
  data: ReportedDetailResponseData;
}

export const useReportedDetailQuery = (
  userId: number,
  page: number,
  size: number = 10
) => {
  return useQuery<ReportedDetailResponseData, Error>({
    queryKey: ["reports", userId, page],
    queryFn: async () => getReportDetail(userId, page, size),
  });
};

export const useReportedQuery = (page: number, size: number = 10) => {
  return useQuery<ReportedResponseData, Error>({
    queryKey: ["reports", page],
    queryFn: async () => getReportedDatas(page, size),
  });
};

export const useBlockQuery = (page: number, size: number = 10) => {
  return useQuery<BlockedResponseData, Error>({
    queryKey: ["blocks", page],
    queryFn: async () => getBlockDatas(page, size),
  });
};

export const useUserQuery = (page: number, size: number = 10) => {
  return useQuery<UserProfileValidationResponseData, Error>({
    queryKey: ["users", page],
    queryFn: async () => getUserDatas(page, size),
  });
};
