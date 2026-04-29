export interface User {
  id: string;
  name: string | null;
  email: string;
//   image: string | null;
}

export interface Room {
  id: string;
  userA: User;
  userB: User;
  updatedAt: string;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  roomId: string;
  createdAt: string;
  sender: User;
}