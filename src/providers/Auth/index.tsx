"use client";
import { useReducer, ReactNode, useState } from "react";
import AuthContext from "@/contexts/Auth/index";
import { authReducer } from "@/reducers/Auth";
import { AuthState, LoginResponse, Action, User } from "./types";
import { LOGIN, USER } from "@/apiConstants";
import useApi from "@/hooks/useApi";
import { UserType } from "@/types/UserTypes";

export const initialState: AuthState = {
  user: null,
  error: null,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const api = useApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { id, access_token: token } =
        ((await api.post(LOGIN, {
          email,
          remember: true,
          password,
        })) as LoginResponse) || {};

      window.localStorage.setItem("token", token);
      await setUser(id);
      setLoading(false);
      return true;
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data || "An unknown error occurred",
      });
      setLoading(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const setUser = async (id: number) => {
    try {
      const data = (await api.get(`${USER}/${id}`)) as User;
      if (!Object.values(UserType).includes(data?.type)) {
        throw new Error("Invalid user type");
      }

      // @ts-ignore
      window.localStorage.setItem("user", JSON.stringify(data));
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
    window.localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const isAuthenticated =
    typeof window !== "undefined"
      ? !!window.localStorage.getItem("token")
      : false;

  const getUserData = () => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  };

  return (
    <AuthContext.Provider
      value={
        {
          state,
          login,
          logout,
          setUser,
          isAuthenticated,
          loading,
          getUserData,
        } as any
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
