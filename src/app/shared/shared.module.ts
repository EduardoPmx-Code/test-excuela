import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomicChartComponent } from './components/atomic-chart/atomic-chart.component';
import { AtomicVideoComponent } from './components/atomic-video/atomic-video.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AtomicChatRoomComponent } from './components/atomic-chat-room/atomic-chat-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AtomicChartComponent,
    AtomicVideoComponent,
    LoaderComponent,
    AtomicChatRoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    AtomicChartComponent,
    AtomicVideoComponent,
    LoaderComponent,
    AtomicChatRoomComponent
  ]
})
export class SharedModule { }
