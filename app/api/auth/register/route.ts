import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try{
        let body;
        try {
            body = await request.json()
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid JSON' },
                { status: 400 }
            )
        }
        
        const { email, full_name, password, phone_number} = body

        // validations
        if (!email || !full_name || !password || !phone_number) {
            return NextResponse.json(
                { error: 'Missing required fields'},
                { status: 400}
            )
        }
        // check if user already exist
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        
        if (existingUser) {
            return NextResponse.json(
              { error: 'User with this email already exists' },
              { status: 400 }
            )
          }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 12)
        // create new user
        const user = await prisma.user.create({
            data: {
              email,
              full_name,
              password_hash: hashedPassword,
              phone_number,
            },
        })
        // remove password from response
        const { password_hash, ...userWithoutPassword } = user
        return NextResponse.json({
            user: userWithoutPassword,
            message: 'User created successfully',
        })

    }catch(error) {
        console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}