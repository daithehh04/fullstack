import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.CLIENT_ID_GITHUB,
      clientSecret: process.env.CLIENT_SECRET_GITHUB,
    }),
    GoogleProvider({
      clientId: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "Enter your email",
          required: true,
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter your password",
          required: true,
        },
      },
      async authorize(credentials) {
        const user = JSON.parse(credentials.user).metadata
        if (JSON.parse(credentials.user).status === 200) {
          return user.user
        }
        console.log("user::", user.user)
      },
    }),
  ],
}
