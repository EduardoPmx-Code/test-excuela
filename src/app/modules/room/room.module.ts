import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room/room.component';
import { SingleRoomComponent } from './components/single-room/single-room.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoomComponent,
    SingleRoomComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    FormsModule
  ]
})
export class RoomModule { }
