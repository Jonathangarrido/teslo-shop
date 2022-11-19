import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "../../../database"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Correo:',
          type: 'email',
          placeholder: 'corre@google.com'
        },
        password: {
          label: 'Contraseña:',
          type: 'password',
          placeholder: 'contraseña'
        }
      },
      // @ts-ignore
      async authorize(credentials){
        return await dbUsers.checkUserEmailPassword(credentials?.email!, credentials?.password!)
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // Custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  session: {
    maxAge: 2592000, // 30d
    strategy: 'jwt',
    updateAge: 86400 // cada día
  },

  // Callbacks
  callbacks: {
    async jwt({ token, account, user }) {

      if(account){
        token.accessToken = account.access_token

        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email!, user?.name!)
            break;

          case 'credentials':
            token.user = user
            break;
        }
      }

      return token
    },
    async session({session, token, user}:any){
      session.accessToken = token.accessToken

      session.user = token.user

      return session
    },
  }
})