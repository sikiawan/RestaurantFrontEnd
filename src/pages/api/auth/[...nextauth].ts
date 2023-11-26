import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, name, role } = credentials as {
          email: string;
          name: string;
          role : string;
        };
        // perform you login logic
        // find out user from db
        if (email == "" || role == "" || name === "") {
          throw new Error("invalid credentials");
        }
        // if everything is fine
        return {
          id: "1234",
          name: name,
          email: email,
          image: role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    jwt(params) {
      // update token
      // if (params.user?.role) {
      //   params.token.role = params.user.role;
      // }
      // return final_token
      debugger;
      return params.token;
    },
  },
};

export default NextAuth(authOptions);
