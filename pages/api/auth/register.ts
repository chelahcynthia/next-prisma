import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt"
import { error } from "console";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST' ) {
        const {email, full_name, password, phone_number} = req.body;
        // validate the input
        if(!email || !full_name || !password || !phone_number){
            return res.status(400).json({error: "All fields are required, friend!"});
        }

        try{
            // hash password
            const password_hash = await bcrypt.hash(password, 10)
        }
     
    }
    
}