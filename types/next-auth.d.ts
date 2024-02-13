import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      token_api: string;
      name: string;
      username: string;
      token_type: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    token_api: string;
    username: string;
    name: string;
    token_type: string;
  }
}
