"use client";
import { useReducer, ReactNode } from "react";
import AuthContext from "@/contexts/Auth/index";
import { authReducer } from "@/reducers/Auth";
import { AuthState, LoginResponse, Action, User } from "./types";
import { LOGIN, USER } from "@/apiConstants";
import useApi from "@/hooks/useApi";
import { UserType } from "@/types/UserTypes";

const initialState: AuthState = {
  user: null,
  error: null,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const api = useApi();
  const [state, dispatch] = useReducer<
    (state: AuthState, action: Action) => AuthState
  >(authReducer, initialState);

  const login = async (email: string, password: string) => {
    try {
      const { id, access_token: token } =
        ((await api.post(LOGIN, {
          email,
          remember: true,
          password,
        })) as LoginResponse) || {};

      window.localStorage.setItem("token", token);
      await setUser(id);
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data || "An unknown error occurred",
      });
    }
  };

  const setUser = async (id: number) => {
    try {
      const data = (await api.get(`${USER}/${id}`)) as User;
      if (!Object.values(UserType).includes(data?.type)) {
        throw new Error("Invalid user type");
      }

      // @ts-ignore
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch user data",
      });
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const isAuthenticated = window.localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{ state, login, logout, setUser, isAuthenticated } as any}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
