import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path:'',component:MainComponent,
    children:[
      {
        path: 'charts',
            loadChildren: () => import('../charts/charts.module')
              .then((m) => m.ChartsModule
            ),
      },
      {
        path: 'chat',
            loadChildren: () => import('../chat/chat.module')
              .then((m) => m.ChatModule
            ),
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
