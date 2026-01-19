import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise, { dbConnect } from "@/lib/dbConnect";

import bcrypt from "bcryptjs";

const credentialsConfig = CredentialsProvider.default || CredentialsProvider;
const googleConfig = GoogleProvider.default || GoogleProvider;

export const authOptions = {
  providers: [
    credentialsConfig({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password");
        }

        await clientPromise;
        const usersCollection = dbConnect("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Handle case where user registered with social login but tries with password
        if (!user.password) {
          throw new Error("Please log in with Google");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          nid: user.nid,
          contact: user.contact,
          role: user.role || "user",
        };
      },
    }),
    googleConfig({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await clientPromise;
        const usersCollection = dbConnect("users");

        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await usersCollection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            role: "user",
            createdAt: new Date(),
          });
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      // Always fetch latest data from DB to keep role in sync
      if (token.email) {
        await clientPromise;
        const usersCollection = dbConnect("users");
        const dbUser = await usersCollection.findOne({ email: token.email });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role || "user";
          token.nid = dbUser.nid;
          token.contact = dbUser.contact;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.nid = token.nid;
        session.user.contact = token.contact;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

