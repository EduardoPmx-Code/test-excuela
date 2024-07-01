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
  chatRooms$: Observable<ChatRoom[]>;
  createNewRoom!:FormGroup //newRoomName: string = '';
  private subscriptions: Subscription = new Subscription();
  dinamicRoomId='';
  loader = false;
  showChat = false;
  roomId: any;

  constructor(private authService:AuthService,
              private router:Router,
              private chatRoomService:ChatRoomService,
              private fb:FormBuilder
  ) {

    this.createNewRoom =this.fb.group({
      newRoomName: ['', [Validators.required]],
    })
    this.chatRooms$ = this.chatRoomService.chatRooms$;
   }

  logOut(){
    this.authService.logout()
    this.router.navigate(['main'])
  }

  ngOnInit(): void {
    this.loader = true;
    this.chatRoomService.loadAllChatRooms();
    this.chatRooms$.subscribe(data=>{
      console.log(data)
      this.loader = false
    })
    //this.loader = false
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async createRoom() {
   let roomName =  this.createNewRoom.value.newRoomName

      const roomId = await this.chatRoomService.createChatRoom(roomName);
      //this.router.navigate(['main','chat','rooms','single-room', roomId]);
    
  }

  joinRoom(roomId: string) {
    this.router.navigate(['main','chat','rooms','single-room', roomId]);
  }

  setDinamicRoom(id: string) {
    console.log(id);
    this.dinamicRoomId = id;
    this. showChat = true
  }
  closeChat(){
    this.showChat = false;
  }

}
