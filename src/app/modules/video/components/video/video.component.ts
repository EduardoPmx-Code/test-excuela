import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SourceVideo, trackSubtitle } from 'src/utils/interfaces';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
   // Array de fuentes de video con diferentes calidades.  
  sources: Array<SourceVideo> = [
    { src: '../../../../../assets/videos/4072331-hd_1920_1080_30fps.mp4', type: 'video/mp4', label: '720p' },
    { src: '../../../../../assets/videos/5490419-hd_1920_1080_25fps.mp4', type: 'video/mp4', label: '480p' }
  ];
   // Array de pistas de subtítulos.
  tracks:Array<trackSubtitle>=[
    {
      src: '../../../../../assets/subtitulos/subtitles.vtt',
      kind: 'subtitles',
      srclang: 'es',
      label: 'Español'
    }
  ]
 

  constructor() { }
  ngOnInit(): void {
   
  }
  
}
