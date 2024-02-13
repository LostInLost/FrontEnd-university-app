import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const AuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60 * 24,
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, session }) {
      return {
        ...token,
        ...session,
      };
    },
    session({ session, token }) {
      session.user = token;

      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        user_email: {
          label: "Username",
          type: "text",
          placeholder: "Input your username or email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const csrf = await fetch(process.env.NEXT_URL_API + '/sanctum/csrf-cookie')
        // const setCookieHeader = res.headers
        const res = await fetch("http://localhost:8000/api/auth", {
          method: "POST",
          //   cache: "no-store",
          headers: {
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_email: credentials?.user_email,
            password: credentials?.password,
          }),
        });

        if (!res.ok && res.status !== 200) return null;

        const result = await res.json();
        const user = {
          id: result.id,
          username: result.username,
          name: result.name,
          token_type: result.token_type,
          token_api: result.token,
        };

        return user;
      },
    }),
  ],
};
