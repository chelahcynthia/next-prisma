import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import{z} from "zod";
import { error } from "console";

const schema = z.object({
    email: z.string().email(),
    full_name: z.string().min(1),
    password: z.string().min(8),
    phone_number: z.string().min(10),
});

export default async function name(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        // validate inputs
        const validatedData = schema.safeParse(req.body);
        if(!validatedData.success) {
            return res.status(400).json({ success: false, errors: validatedData.error.errors});
        }

        const {email, full_name, password, phone_number} = validatedData.data;

        try {
            // check if email exists
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                return res.status(400).json({success:false, error: "Email already exists, friend!"})
            }

            // hash the password
            const password_hash = await bcrypt.hash(password, 10);

            // save user to the db
            const user = await prisma.user.create({
                data: {
                    email,
                    full_name,
                    password_hash,
                    phone_number,
                },
            });

            // respond to the client
            return res.status(201).json({
                success: true,
                message: "User registered successfuly",
                data: user,
            });
        } catch (error) {
            console.error("Error creating user:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                
            }
        }
    }
    
}
