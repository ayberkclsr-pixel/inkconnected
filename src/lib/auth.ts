import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/giris",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email ve şifre gereklidir");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { artistProfile: true },
        });

        if (!user) {
          throw new Error("Kullanıcı bulunamadı");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          throw new Error("Hatalı şifre");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          artistProfileId: user.artistProfile?.id || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.artistProfileId = (user as any).artistProfileId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).artistProfileId = token.artistProfileId;
      }
      return session;
    },
  },
};
