import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ChatRoomService } from 'src/app/core/services/chat-room.service';
import { ChatRoom } from 'src/utils/interfaces';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
 // Observable que contiene la lista de salas de chat.
 chatRooms$: Observable<ChatRoom[]>;
 // Formulario para crear una nueva sala de chat.
 createNewRoom!: FormGroup;
 // Maneja las suscripciones para limpiar al destruir el componente.
 private subscriptions: Subscription = new Subscription();
 // ID de la sala dinámica.
 dinamicRoomId = '';
 // Indicador de carga.
 loader = false;
 // Indicador para mostrar o ocultar el chat.
 showChat = false;
 // ID de la sala actual.
 roomId: any;

 constructor(
   private authService: AuthService,
   private router: Router,
   private chatRoomService: ChatRoomService,
   private fb: FormBuilder
 ) {
   // Inicializa el formulario para crear una nueva sala.
   this.createNewRoom = this.fb.group({
     newRoomName: ['', [Validators.required]],
   });
   // Asigna el observable de salas de chat.
   this.chatRooms$ = this.chatRoomService.chatRooms$;
 }

 // Método para cerrar sesión y redirigir a la página principal.
 logOut() {
   this.authService.logout();
   this.router.navigate(['main']);
 }

 // Método del ciclo de vida de Angular, se ejecuta al inicializar el componente.
 ngOnInit(): void {
   this.loader = true;
   // Carga todas las salas de chat.
   this.chatRoomService.loadAllChatRooms();
   // Se suscribe al observable de salas de chat para manejar los datos.
   this.chatRooms$.subscribe(data => {
     console.log(data);
     this.loader = false;
   });
 }

 // Método del ciclo de vida de Angular, se ejecuta al destruir el componente.
 ngOnDestroy(): void {
   // Cancela todas las suscripciones para evitar fugas de memoria.
   this.subscriptions.unsubscribe();
 }

 // Método para crear una nueva sala de chat.
 async createRoom() {
   let roomName = this.createNewRoom.value.newRoomName;
   const roomId = await this.chatRoomService.createChatRoom(roomName);
 }

 // Método para unirse a una sala de chat existente.
 joinRoom(roomId: string) {
   this.router.navigate(['main', 'chat', 'rooms', 'single-room', roomId]);
 }

 // Método para establecer la sala dinámica actual y mostrar el chat.
 setDinamicRoom(id: string) {
   console.log(id);
   this.dinamicRoomId = id;
   this.showChat = true;
 }

 // Método para cerrar el chat.
 closeChat() {
   this.showChat = false;
 }

}
