import {UserType} from "@/types/UserTypes";

export interface AuthState {
  user: User | null;
  error: string | null;
}

export interface User {
  id: number;
  type: UserType;
  firstName: string | null;
  lastName: string | null;
  avatarImage: string | null;
  phoneNumber: string | null;
  verificationCode: number;
}

export type Action =
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_ERROR"; payload: string };

export interface LoginResponse {
  access_token: string;
  id: number;
}
