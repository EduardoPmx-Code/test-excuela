import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SourceVideo, trackSubtitle } from 'src/utils/interfaces';
import videojs from 'video.js';


@Component({
  selector: 'app-atomic-video',
  templateUrl: './atomic-video.component.html',
  styleUrls: ['./atomic-video.component.css']
})

export class AtomicVideoComponent implements  OnChanges {
  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  player!:any
  @Input() sources!:Array<SourceVideo>
  @Input() tracks!:Array<trackSubtitle>
  


  constructor() { }
  
  // Este método se ejecuta cuando cambian los valores de las propiedades de entrada.
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.tracks);
    this.createVideo();
  }

  // Este método crea y configura el reproductor de video utilizando video.js.
  createVideo() {
    this.player = videojs(this.videoPlayer.nativeElement, {
      controls: true, // Mostrar controles del reproductor.
      autoplay: false, // No reproducir automáticamente.
      preload: 'auto', // Precargar el video.
      sources: [this.sources[0]], // Inicia con la primera calidad.
      controlBar: {
        children: [
          'playToggle', // Botón de reproducción/pausa.
          'volumePanel', // Control de volumen.
          'currentTimeDisplay', // Mostrar el tiempo actual.
          'progressControl', // Barra de progreso.
          'durationDisplay', // Mostrar la duración del video.
          'subsCapsButton', // Botón de subtítulos.
          'fullscreenToggle' // Botón de pantalla completa.
        ]
      },
      tracks: this.tracks // Agregar subtítulos.
    });

    // Manejar el evento de cambio de resolución.
    this.player.on('resolutionchange', () => {
      console.log('Resolution changed to', this.player.currentResolution().label);
    });

    // Establecer las dimensiones del reproductor de video.
    this.videoPlayer.nativeElement.style.width = '360px';
    this.videoPlayer.nativeElement.style.height = 'auto';
    this.videoPlayer.nativeElement.style.maxWidth = '360px';
    this.videoPlayer.nativeElement.style.maxHeight = '360px';
  }

  // Este método cambia la calidad del video manteniendo el tiempo actual y el estado de reproducción.
  changeQuality(source: { src: string, type: string, label: string }): void {
    const currentTime = this.player.currentTime(); // Obtener el tiempo actual.
    const isPaused = this.player.paused(); // Verificar si el video está pausado.
    this.player.src(source); // Cambiar la fuente del video.
    this.player.currentTime(currentTime); // Establecer el tiempo actual.
    if (!isPaused) {
      this.player.play(); // Reproducir el video si no estaba pausado.
    }
  }

  // Este método se ejecuta cuando el componente se destruye.
  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose(); // Liberar los recursos del reproductor.
    }
  }
}
