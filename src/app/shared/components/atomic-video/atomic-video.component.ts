import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SourceVideo, trackSubtitle } from 'src/utils/interfaces';
import videojs from 'video.js';


@Component({
  selector: 'app-atomic-video',
  templateUrl: './atomic-video.component.html',
  styleUrls: ['./atomic-video.component.css']
})

export class AtomicVideoComponent implements  AfterViewInit,OnChanges {
  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  player!:any
  @Input() sources!:Array<SourceVideo>
  @Input() tracks!:Array<trackSubtitle>
  


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
   // throw new Error('Method not implemented.');
   console.log(this.tracks)
   this.createVideo()
  }
  ngAfterViewInit(): void {
   // throw new Error('Method not implemented.');
  }

  createVideo(){
    this.player = videojs(this.videoPlayer.nativeElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      sources: [this.sources[0]], // Inicia con la primera calidad
      controlBar: {
        children: [
          'playToggle',
          'volumePanel',
          'currentTimeDisplay',
          'progressControl',
          'durationDisplay',
          'subsCapsButton',
          'fullscreenToggle'
        ]
      },
      tracks: this.tracks
    });

    this.player.on('resolutionchange', () => {
      console.log('Resolution changed to', this.player.currentResolution().label);
    });
    this.videoPlayer.nativeElement.style.width = '360px';
    this.videoPlayer.nativeElement.style.height = 'auto';
    this.videoPlayer.nativeElement.style.maxWidth = '360px';
    this.videoPlayer.nativeElement.style.maxHeight = '360px';
  }
  changeQuality(source: { src: string, type: string, label: string }): void {
    const currentTime = this.player.currentTime();
    const isPaused = this.player.paused();
    this.player.src(source);
    this.player.currentTime(currentTime);
    if (!isPaused) {
      this.player.play();
    }
  }



  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
