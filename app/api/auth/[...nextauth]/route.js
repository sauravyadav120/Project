import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { connectToDb } from "@/lib/connect";
import User from "@/models/user";

const handler=NextAuth({
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            async authorize(credentials){
                if(!credentials.email || !credentials.password) throw new Error("Credentials are necessary!")
                try {
                    await connectToDb()
                    const user = await User.findOne({email:credentials.email})
                    if(!user) return null
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                    if(!isPasswordCorrect) return null
                    return {...user._doc,_id:user._id.toString()}
                } catch (error) {
                    throw new Error(error)
                }
            },
            
        })
    ],
    callbacks:{
        async jwt({ token, session, user }) {
            if (user) {
              token.userId = user._id; // Assuming user._id contains the user ID
            }
            return token;
          },
          session({ session, user, token }) {
            if (token.userId) {
              session.user.id = token.userId;
            }
            return session;
          },
    },
    session:{
        strategy:"jwt",

    },
    secret:process.env.NEXTAUTH_SECRET,
})


export {handler as GET, handler as POST}