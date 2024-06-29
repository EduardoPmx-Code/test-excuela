
import { Component, OnInit } from '@angular/core';
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
export class SingleRoomComponent implements OnInit {
  chatRoom$: Observable<ChatRoom | null>;
  messages$: Observable<Message[]>;
  newMessage: string = '';
  private subscriptions: Subscription = new Subscription();
  private roomId: string = '';
  username: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private chatRoomService: ChatRoomService,
    private authService: AuthService
  ) {
    this.messages$ = this.chatRoomService.messages$;
    this.chatRoom$ = new Observable<ChatRoom | null>();
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    if (this.roomId) {
      this.chatRoom$ = from(this.chatRoomService.getChatRoomById(this.roomId));
      this.chatRoomService.loadExistingMessages(this.roomId);
      this.chatRoomService.listenForMessages(this.roomId);
    }

    this.subscriptions.add(
      this.authService.user$.subscribe((data) => {
        console.log(data)
        this.username = this.authService.username;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      console.log(this.username)
      if (this.username) {
        
        this.chatRoomService.sendMessage(this.roomId, this.newMessage, this.username);
        this.newMessage = '';
      } else {
        console.error('User does not have a display name');
      }
    }
  }
  

}
