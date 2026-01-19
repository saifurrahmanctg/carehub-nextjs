import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const nextAuthHandler = NextAuth.default || NextAuth;
const handler = nextAuthHandler(authOptions);

export { handler as GET, handler as POST };
export { authOptions }; // Re-export for convenience
