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


  @Input() dinamicRoomId: string = '';
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages$: Observable<Message[]>;
  formMessaje!: FormGroup;
  username: string | null = null;

  constructor(
    private chatRoomService: ChatRoomService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.messages$ = this.chatRoomService.messages$;
    this.formMessaje = this.fb.group({
      newMessage: ['', [Validators.required]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.dinamicRoomId) {
      this.chatRoomService.loadExistingMessages(this.dinamicRoomId);
      this.chatRoomService.listenForMessages(this.dinamicRoomId);
    }

    this.authService.user$.subscribe((data) => {
      this.username = this.authService.username;
    });
  }

  ngOnInit(): void {
  
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage(): void {
    if (this.formMessaje.valid) {
      const newMessage = this.formMessaje.value.newMessage;
      if (newMessage.trim()) {
        if (this.username) {
          this.chatRoomService.sendMessage(this.dinamicRoomId, newMessage, this.username);
          this.formMessaje.reset();
        } else {
          console.error('User does not have a display name');
        }
      }
    } else {
      alert('Invalid value');
    }
  }

}
