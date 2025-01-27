import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    // configure auth providers
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              throw new Error("Please enter your email and password")
            }
    
            // Find user by email
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email
              }
            })
    
            // Check if user exists and password is correct
            if (!user || !user.password_hash) {
              throw new Error("No user found with this email")
            }
    
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password_hash
            )
    
            if (!isPasswordValid) {
              throw new Error("Invalid password")
            }
    
            // Return user object without password
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.full_name
            }
          }
        })
      ],
}