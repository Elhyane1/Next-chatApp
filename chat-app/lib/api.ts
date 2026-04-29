import { Room, Message, User } from "@/types";

export async function getContacts(): Promise<User[]> {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
}

export async function getOrCreateRoom(otherUserId: string): Promise<Room> {
  const res = await fetch("/api/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otherUserId }),
  });
  if (!res.ok) throw new Error("Failed to create room");
  return res.json();
}

export async function getMessages(roomId: string): Promise<Message[]> {
  const res = await fetch(`/api/rooms/${roomId}/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}