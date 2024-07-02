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
  private firestore: Firestore = inject(Firestore); // Inyección del servicio de Firestore.
  private auth: Auth = inject(Auth); // Inyección del servicio de autenticación.
  private chatRoomsSubject: BehaviorSubject<ChatRoom[]> = new BehaviorSubject<ChatRoom[]>([]); // BehaviorSubject para manejar las salas de chat.
  private messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]); // BehaviorSubject para manejar los mensajes.
  chatRooms$: Observable<ChatRoom[]> = this.chatRoomsSubject.asObservable(); // Observable para las salas de chat.
  messages$: Observable<Message[]> = this.messagesSubject.asObservable(); // Observable para los mensajes.

  constructor() { }

  // Método para crear una nueva sala de chat.
  async createChatRoom(name: string): Promise<string> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated'); // Error si el usuario no está autenticado.
    }

    const chatRoom: ChatRoom = {
      id: uuidv4(), // Generar un ID único para la sala de chat.
      name: name, // Nombre de la sala de chat.
      ownerId: currentUser.uid, // ID del propietario de la sala de chat.
      createdAt: new Date() // Fecha de creación.
    };

    await setDoc(doc(this.firestore, 'chatRooms', chatRoom.id), chatRoom); // Guardar la sala de chat en Firestore.
    this.loadAllChatRooms(); // Cargar todas las salas de chat.
    return chatRoom.id; // Retornar el ID de la sala de chat.
  }

  // Método para cargar todas las salas de chat.
  async loadAllChatRooms() {
    const q = query(collection(this.firestore, 'chatRooms'));
    const querySnapshot = await getDocs(q);
    const chatRooms: ChatRoom[] = [];
    querySnapshot.forEach((doc) => {
      chatRooms.push(doc.data() as ChatRoom); // Agregar cada sala de chat al arreglo.
    });
    this.chatRoomsSubject.next(chatRooms); // Actualizar el BehaviorSubject con las salas de chat.
    console.log(chatRooms);
  }

  // Método para obtener una sala de chat por su ID.
  async getChatRoomById(roomId: string): Promise<ChatRoom | null> {
    const docRef = doc(this.firestore, 'chatRooms', roomId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ChatRoom; // Retornar la sala de chat si existe.
    } else {
      return null; // Retornar null si la sala de chat no existe.
    }
  }

  // Método para enviar un mensaje en una sala de chat.
  async sendMessage(roomId: string, content: string, username: string) {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated'); // Error si el usuario no está autenticado.
    }

    const message: Message = {
      id: uuidv4(), // Generar un ID único para el mensaje.
      roomId: roomId, // ID de la sala de chat.
      userId: currentUser.uid, // ID del usuario que envía el mensaje.
      username: username, // Nombre de usuario del remitente.
      content: content, // Contenido del mensaje.
      timestamp: new Date() // Marca de tiempo.
    };

    await addDoc(collection(this.firestore, 'messages'), message); // Guardar el mensaje en Firestore.
  }

  // Método para escuchar mensajes en tiempo real en una sala de chat.
  listenForMessages(roomId: string) {
    const q = query(collection(this.firestore, 'messages'), where('roomId', '==', roomId), orderBy('timestamp'));
    return onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data() as Message); // Agregar cada mensaje al arreglo.
      });
      this.messagesSubject.next(messages); // Actualizar el BehaviorSubject con los mensajes.
    });
  }

  // Método para cargar mensajes existentes en una sala de chat.
  async loadExistingMessages(roomId: string): Promise<void> {
    const q = query(collection(this.firestore, 'messages'), where('roomId', '==', roomId), orderBy('timestamp'));
    const querySnapshot = await getDocs(q);
    const messages: Message[] = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data() as Message); // Agregar cada mensaje al arreglo.
    });
    this.messagesSubject.next(messages); // Actualizar el BehaviorSubject con los mensajes.
  }
}
