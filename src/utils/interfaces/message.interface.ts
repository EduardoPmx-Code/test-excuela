export interface Message {
    id: string;
    roomId: string;
    userId: string;
    username: string;
    content: string;
    timestamp: Date;
  }