import {
  useGetCurrentUser,
  useSignIn,
  useSignOut,
  useSignUp,
} from "@/services/authServices";
import { ApiResponse, User, SignInForm, SignUpForm } from "@/types/types";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createContext, ReactNode, useContext } from "react";

interface AuthContext {
  signUpMutation: UseMutationResult<
    ApiResponse,
    AxiosError<ApiResponse>,
    SignUpForm
  >;
  signInMutation: UseMutationResult<
    ApiResponse,
    AxiosError<ApiResponse>,
    SignInForm
  >;
  signOutMutation: UseMutationResult<
    ApiResponse,
    AxiosError<ApiResponse>,
    void
  >;
  currentUserQuery: UseQueryResult<User | null>;
}

const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const signUpMutation = useSignUp();
  const signInMutation = useSignIn();
  const signOutMutation = useSignOut();
  const currentUserQuery = useGetCurrentUser();

  return (
    <AuthContext.Provider
      value={{
        signUpMutation,
        signInMutation,
        signOutMutation,
        currentUserQuery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within AuthContextProvider");
  }
  return context;
};
