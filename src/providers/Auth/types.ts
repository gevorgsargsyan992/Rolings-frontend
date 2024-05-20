export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

export interface User {
  id: number;
  type: number;
  firstName: string;
  lastName: string;
  avatarImage: null;
  phoneNumber: string;
  verificationCode: number;
}

export type Action =
  | { type: "LOGIN_SUCCESS"; payload: number }
  | { type: "LOGOUT" }
  | { type: "SET_ERROR"; payload: string };

export interface LoginResponse {
  access_token: string;
  id: number;
}
