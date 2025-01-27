import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from 'bcrypt';


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST' ) {
        const {email, full_name, password, phone_number} = req.body;

    }
    // hash the password
    const password_hash =  await bcrypt.hash(password, 10)
}