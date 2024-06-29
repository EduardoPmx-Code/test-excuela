import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AutoLoginGuard } from 'src/app/core/guards/auto-login.guard';

const routes: Routes = [
  {
    path:'',component:ChatComponent,
    children:[
      {
        path:'',
        redirectTo:'auth'
      },
      {
        path:'auth',
        loadChildren: () => import('../auth/auth.module')
          .then((m) => m.AuthModule
        ),
        canLoad: [AutoLoginGuard]
      },
      {
        path:'rooms',
        loadChildren: () => import('../room/room.module')
          .then((m) => m.RoomModule
        ),
        canLoad: [AuthGuard]
      },
      {
        path: '**', 
        redirectTo: 'auth',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
