
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, from } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ChatRoomService } from 'src/app/core/services/chat-room.service';
import { ChatRoom, Message } from 'src/utils/interfaces';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrls: ['./single-room.component.css']
})
export class SingleRoomComponent implements OnInit, AfterViewChecked {
  // Elemento del DOM para el contenedor de mensajes.
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  // Observable que contiene la información de la sala de chat actual.
  chatRoom$: Observable<ChatRoom | null>;
  
  // Observable que contiene los mensajes de la sala de chat.
  messages$: Observable<Message[]>;
  
  // Formulario para enviar mensajes.
  formMessaje!: FormGroup;
  
  // Maneja las suscripciones para limpiar al destruir el componente.
  private subscriptions: Subscription = new Subscription();
  
  // ID de la sala de chat actual.
  private roomId: string = '';
  
  // Nombre de usuario actual.
  username: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private chatRoomService: ChatRoomService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    // Inicializa el formulario para enviar mensajes.
    this.formMessaje = this.fb.group({
      newMessage:['', [Validators.required]],
    });
    
    // Inicializa el observable de mensajes con el servicio de la sala de chat.
    this.messages$ = this.chatRoomService.messages$;
    
    // Inicializa el observable de la sala de chat con un observable vacío.
    this.chatRoom$ = new Observable<ChatRoom | null>();
  }

  // Método del ciclo de vida de Angular, se ejecuta al inicializar el componente.
  ngOnInit(): void {
    // Obtiene el ID de la sala de chat desde los parámetros de la ruta.
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    
    // Si se obtiene un ID válido de la sala de chat, carga la información y mensajes de esa sala.
    if (this.roomId) {
      this.chatRoom$ = from(this.chatRoomService.getChatRoomById(this.roomId));
      this.chatRoomService.loadExistingMessages(this.roomId);
      this.chatRoomService.listenForMessages(this.roomId);
    }

    // Suscribe al observable de usuario para obtener el nombre de usuario actual.
    this.subscriptions.add(
      this.authService.user$.subscribe((data) => {
        console.log(data);
        this.username = this.authService.username;
      })
    );
  }

  // Método del ciclo de vida de Angular, se ejecuta después de cada detección de cambios en la vista.
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  // Método para desplazar el contenedor de mensajes al fondo.
  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.log(err);
    }
  }

  // Método para enviar un mensaje a la sala de chat actual.
  sendMessage() {
    if(this.formMessaje.status === "VALID"){
      let newMessaje = this.formMessaje.value.newMessage;
      if (newMessaje.trim()) {
        console.log(this.username);
        if (this.username) {
          this.chatRoomService.sendMessage(this.roomId, newMessaje, this.username);
          this.formMessaje.reset();
        } else {
          console.error('User does not have a display name');
        }
      }
    } else {
      alert('Invalid value');
    }
  }

  // Método del ciclo de vida de Angular, se ejecuta al destruir el componente.
  ngOnDestroy(): void {
    // Cancela todas las suscripciones para evitar fugas de memoria.
    this.subscriptions.unsubscribe();
  }
}
