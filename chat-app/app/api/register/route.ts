import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const { email, password, name } = await req.json();
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return new Response("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    return Response.json(user);
}