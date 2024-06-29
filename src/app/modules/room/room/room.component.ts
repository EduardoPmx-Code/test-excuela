import { Component, OnInit } from '@angular/core';
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
  chatRooms$: Observable<ChatRoom[]>;
  newRoomName: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(private authService:AuthService,
              private router:Router,
              private chatRoomService:ChatRoomService
  ) {
    this.chatRooms$ = this.chatRoomService.chatRooms$;
   }

  logOut(){
    this.authService.logout()
    this.router.navigate(['main'])
  }

  ngOnInit(): void {
    this.chatRoomService.loadAllChatRooms();
    this.chatRooms$.subscribe(data=>{
      console.log(data)
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async createRoom() {
    if (this.newRoomName.trim()) {
      const roomId = await this.chatRoomService.createChatRoom(this.newRoomName);
      this.router.navigate(['main','chat','rooms','single-room', roomId]);
    }
  }

  joinRoom(roomId: string) {
    this.router.navigate(['main','chat','rooms','single-room', roomId]);
  }

}
