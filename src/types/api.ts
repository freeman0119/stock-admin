// 通用响应接口
export interface ApiResponse<T = null> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

// 用户信息接口
export interface UserInfo {
  id: string;
  username: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
}

// 登录响应数据接口
export interface LoginResponseData {
  token: string;
  userInfo: UserInfo;
}