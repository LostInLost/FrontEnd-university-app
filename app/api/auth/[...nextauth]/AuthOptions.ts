import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const AuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60 * 24,
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user, session }) {
      return {
        ...session,
        ...token,
        ...user,
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
        const csrf = await fetch(
          process.env.NEXT_PUBLIC_URL_API + "/api/sanctum/csrf-cookie",
          {
            credentials: "include",
          }
        );

        const cookies = csrf.headers.getSetCookie();

        let sessionKey;
        let xsrfToken;
        cookies.forEach((cookie: string) => {
          if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1];
          }
          if (cookie.startsWith("laravel_session=")) {
            sessionKey = cookie.split("=")[1];
          }
        });

        const headers = new Headers({
          "Content-Type": "application/json",
        });

        if (sessionKey) {
          headers.append("laravel_session", sessionKey);
        }

        if (xsrfToken) {
          headers.append("X-XSRF-TOKEN", xsrfToken);
        }
        const res = await fetch("http://127.0.0.1:8000/api/auth", {
          method: "POST",
          //   cache: "no-store",
          credentials: "include",
          headers: headers,
          body: JSON.stringify({
            user_email: credentials?.user_email,
            password: credentials?.password,
          }),
        });
        // console.log(await res.json());
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
