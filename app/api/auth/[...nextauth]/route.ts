import NextAuth from "next-auth/next";
import { AuthOptions } from "./AuthOptions";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
