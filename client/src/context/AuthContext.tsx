import {
  useGetCurrentUser,
  useSignIn,
  useSignOut,
  useSignUp,
} from "@/services/authServices";
import { SignInForm, SignUpForm } from "@/types/types";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

interface AuthContext {
  signUpMutation: UseMutationResult<any, Error, SignUpForm, unknown>;
  signInMutation: UseMutationResult<any, Error, SignInForm, unknown>;
  signOutMutation: UseMutationResult<any, Error, void, unknown>;
  currentUserQuery: UseQueryResult<any, Error>;
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
