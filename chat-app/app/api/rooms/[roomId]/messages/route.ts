import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params; // 👈 unwrap first
  const messages = await prisma.message.findMany({
    where: { roomId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(messages);
}