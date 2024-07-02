import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ChatRoomService } from 'src/app/core/services/chat-room.service';
import { Message } from 'src/utils/interfaces/message.interface';

@Component({
  selector: 'app-atomic-chat-room',
  templateUrl: './atomic-chat-room.component.html',
  styleUrls: ['./atomic-chat-room.component.css']
})
export class AtomicChatRoomComponent implements OnInit, AfterViewChecked ,OnChanges {


  @Input() dinamicRoomId: string = ''; // ID dinámico de la sala de chat.
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages$: Observable<Message[]>; // Observable que contiene los mensajes.
  formMessaje!: FormGroup; // Formulario para enviar mensajes.
  username: string | null = null; // Nombre de usuario del remitente.

  constructor(
    private chatRoomService: ChatRoomService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.messages$ = this.chatRoomService.messages$; // Suscripción a los mensajes de la sala de chat.
    this.formMessaje = this.fb.group({
      newMessage: ['', [Validators.required]], // Campo del formulario para el nuevo mensaje.
    });
  }

  // Este método se ejecuta cuando cambian los valores de las propiedades de entrada.
  ngOnChanges(changes: SimpleChanges): void {
    if (this.dinamicRoomId) {
      this.chatRoomService.loadExistingMessages(this.dinamicRoomId); // Cargar mensajes existentes.
      this.chatRoomService.listenForMessages(this.dinamicRoomId); // Escuchar nuevos mensajes.
    }

    // Obtener el nombre de usuario del servicio de autenticación.
    this.authService.user$.subscribe((data) => {
      this.username = this.authService.username;
    });
  }

  // Este método se ejecuta una vez que el componente ha sido inicializado.
  ngOnInit(): void {}

  // Este método se ejecuta después de que la vista del componente ha sido verificada.
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  // Este método desplaza el contenedor de mensajes hacia abajo.
  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      // Manejar cualquier error durante el desplazamiento.
    }
  }

  // Este método envía un nuevo mensaje.
  sendMessage(): void {
    if (this.formMessaje.valid) {
      const newMessage = this.formMessaje.value.newMessage;
      if (newMessage.trim()) {
        if (this.username) {
          this.chatRoomService.sendMessage(this.dinamicRoomId, newMessage, this.username); // Enviar el mensaje.
          this.formMessaje.reset(); // Reiniciar el formulario.
        } else {
          console.error('User does not have a display name'); // Error si el usuario no tiene un nombre de usuario.
        }
      }
    } else {
      alert('Invalid value'); // Alerta si el valor del formulario no es válido.
    }
  }

}
