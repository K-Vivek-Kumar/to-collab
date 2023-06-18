import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token, user }) {
      if (user) {
        session.user.username = user.name
          .split(" ")
          .join("")
          .toLocaleLowerCase();

        session.user.uid = token.sub;
      }

      return session;
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@iith.ac.in");
      }
      return true;
    },
  },
});
