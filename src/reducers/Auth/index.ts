import { AuthState, Action } from "@/providers/Auth/types";

export const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        error: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

