import { AuthState } from "@/providers/Auth/types";

export const authReducer = (state : AuthState, action: any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
