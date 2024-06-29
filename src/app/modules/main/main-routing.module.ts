import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path:'',component:MainComponent,
    children:[
      {
        path:'',
        redirectTo:'charts'
      },
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
      {
        path: 'video',
            loadChildren: () => import('../video/video.module')
              .then((m) => m.VideoModule
            ),
      },
      {
        path: '**', 
        redirectTo: 'charts',
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
