import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { otherUserId } = await req.json();
  const myId = session.user.id;

  const [firstId, secondId] = [myId, otherUserId].sort();

  const room = await prisma.room.upsert({
    where: {
      userAId_userBId: {
        userAId: firstId,
        userBId: secondId,
      },
    },
    update: {},
    create: {
      userAId: firstId,
      userBId: secondId,
    },
    include: {
      userA: { select: { id: true, name: true } },
      userB: { select: { id: true, name: true } },
      messages: {
        orderBy: { createdAt: "asc" },
        include: { sender: { select: { id: true, name: true } } },
      },
    },
  });

  return NextResponse.json(room);
}