import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { SingleRoomComponent } from './components/single-room/single-room.component';

const routes: Routes = [
  {
    path:'',
    component:RoomComponent,
  },
  {path:'single-room/:id',component:SingleRoomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
