import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { error } from "console";

export async function POST(request: Request) {
    try{
        const body = await request.json()
        const { email, full_name, password, phone_number} = body

        // validations
        if (!email || !full_name || !password || !phone_number) {
            return NextResponse.json(
                { error: 'Missing required fields'},
                { status: 400}
            )
        }

    }catch(error) {

    }
}