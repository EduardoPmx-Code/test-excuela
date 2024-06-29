import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';
import { ChatComponent } from '../chat/components/chat/chat.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path:'',
    component:AuthComponent,
    children:[
      {path:'', redirectTo:'login'},
      {
      path:'login',
      component:LoginComponent
    },
    {
      path:'register',
      component:RegisterComponent
    }]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
