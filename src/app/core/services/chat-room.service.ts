import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, QuerySnapshot, addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatRoom, Message } from 'src/utils/interfaces';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private chatRoomsSubject: BehaviorSubject<ChatRoom[]> = new BehaviorSubject<ChatRoom[]>([]);
  private messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  chatRooms$: Observable<ChatRoom[]> = this.chatRoomsSubject.asObservable();
  messages$: Observable<Message[]> = this.messagesSubject.asObservable();

  constructor() { }
  async createChatRoom(name: string): Promise<string> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const chatRoom: ChatRoom = {
      id: uuidv4(),
      name: name,
      ownerId: currentUser.uid,
      createdAt: new Date()
    };

    await setDoc(doc(this.firestore, 'chatRooms', chatRoom.id), chatRoom);
    this.loadAllChatRooms();
    return chatRoom.id;
  }

  async loadAllChatRooms() {
    const q = query(collection(this.firestore, 'chatRooms'));
    const querySnapshot = await getDocs(q);
    const chatRooms: ChatRoom[] = [];
    querySnapshot.forEach((doc) => {
      chatRooms.push(doc.data() as ChatRoom);
    });
    this.chatRoomsSubject.next(chatRooms);
    console.log(chatRooms)
  }

  async getChatRoomById(roomId: string): Promise<ChatRoom | null> {
    const docRef = doc(this.firestore, 'chatRooms', roomId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ChatRoom;
    } else {
      return null;
    }
  }

  async sendMessage(roomId: string, content: string, username: string) {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    

    const message: Message = {
      id: uuidv4(),
      roomId: roomId,
      userId: currentUser.uid,
      username: username,
      content: content,
      timestamp: new Date()
    };

    await addDoc(collection(this.firestore, 'messages'), message);
  }

  listenForMessages(roomId: string) {
    const q = query(collection(this.firestore, 'messages'), where('roomId', '==', roomId), orderBy('timestamp'));
    return onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data() as Message);
      });
      this.messagesSubject.next(messages);
    });
  }
  async loadExistingMessages(roomId: string): Promise<void> {
    const q = query(collection(this.firestore, 'messages'), where('roomId', '==', roomId), orderBy('timestamp'));
    const querySnapshot = await getDocs(q);
    const messages: Message[] = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data() as Message);
    });
    this.messagesSubject.next(messages);
  }
}
