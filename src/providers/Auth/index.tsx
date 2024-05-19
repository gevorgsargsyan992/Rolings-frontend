"use client";
import { useReducer, ReactNode } from "react";
import AuthContext from "@/contexts/Auth/index";
import { authReducer } from "@/reducers/Auth";
import { AuthState, LoginResponse, Action } from "./types";
import { LOGIN, USER } from "@/apiConstants";
import useApi from "@/hooks/useApi";

const initialState: AuthState = {
  isAuthenticated: false,
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

      localStorage.setItem("token", token);
      await setUser(id);
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data || "An unknown error occurred",
      });
    }
  };

  const setUser = async (id: number) => {
    const data = await api.get(`${USER}/${id}`);
    dispatch({ type: "LOGIN_SUCCESS", payload: data as any });
  };

  const logout = () => {
    const data = dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout } as any}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
