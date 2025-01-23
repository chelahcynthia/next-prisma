import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'test@test.com'},
        update: {},
        create: {
            email: 'test@test.com',
            name: 'Test User',
            password: '$2y$12$GBfcgD6XwaMferSOdYGiduw3Awuo95QAPhxFE0oNJ.Ds8qj3pzEZy'
        }
    })
    console.log({ user });
    
}