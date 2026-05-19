import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  LOGIN,
  REFRESH_ACCESS_TOKEN,
} from "@/features/auth/graphql/mutation.gql";
import type {
  LoginMutation,
  LoginMutationVariables,
  RefreshAccessTokenMutation,
  RefreshAccessTokenMutationVariables,
  UserMembership,
} from "@/generated/graphql";
import { getApolloErrorMessage } from "@/utils/getApolloErrorMessage";

import { getApolloClient } from "../apollo/ApolloClient";

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const { data } = await getApolloClient().mutate<
      RefreshAccessTokenMutation,
      RefreshAccessTokenMutationVariables
    >({
      mutation: REFRESH_ACCESS_TOKEN,
      variables: { refreshToken: token.refreshToken },
      fetchPolicy: "network-only",
    });

    const payload = data?.refreshAccessToken;
    if (!payload?.user?.id) throw new Error("Сэргээх токен буруу байна");

    return {
      ...token,
      id: payload.user.id,
      name: payload.user.name ?? "",
      email: payload.user.email ?? "",
      phone: payload.user.phone ?? "",
      isPlatformAdmin: payload.user.isPlatformAdmin,
      memberships: payload.user.memberships as UserMembership[],
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      accessTokenExpiresAt: Number(payload.accessTokenExpiresAt),
    };
  } catch (error) {
    console.error("[NextAuth] Token refresh failed:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "medistock-front-local-secret",
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      name: "Нэвтрэх мэдээлэл",
      credentials: {
        email: { label: "И-мэйл", type: "email" },
        password: { label: "Нууц үг", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { data } = await getApolloClient().mutate<
            LoginMutation,
            LoginMutationVariables
          >({
            mutation: LOGIN,
            variables: {
              input: {
                email: credentials.email,
                password: credentials.password,
              },
            },
            fetchPolicy: "network-only",
          });

          const payload = data?.login;
          if (!payload?.user?.id) return null;

          return {
            id: payload.user.id,
            name: payload.user.name ?? "",
            email: payload.user.email ?? "",
            phone: payload.user.phone ?? null,
            isPlatformAdmin: payload.user.isPlatformAdmin,
            memberships: payload.user.memberships as UserMembership[],
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            accessTokenExpiresAt: Number(payload.accessTokenExpiresAt),
          };
        } catch (error) {
          throw new Error(
            getApolloErrorMessage(error, "Нэвтрэх үед алдаа гарлаа."),
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (Date.now() < (token.accessTokenExpiresAt as number)) return token;
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        phone: token.phone as string,
        isPlatformAdmin: token.isPlatformAdmin as boolean,
        memberships: token.memberships as UserMembership[],
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.accessTokenExpiresAt = token.accessTokenExpiresAt as number;
      return session;
    },
  },
  pages: { signIn: "/login" },
};
