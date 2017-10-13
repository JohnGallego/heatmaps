import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import 'heatmap.js';
import * as h337 from 'heatmap.js/build/heatmap.js';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit, AfterViewInit {

  @ViewChild('heatmap') heatmap: ElementRef;
  @ViewChild('canvasmap') canvasmap: ElementRef;

  public canvasWidth = 250;
  public canvasHeight = 250;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const ctx: CanvasRenderingContext2D = (this.canvasmap.nativeElement as HTMLCanvasElement).getContext('2d');
    const img: HTMLImageElement = new Image();
    const config = {
      container: this.heatmap.nativeElement,
      radius: 10,
      maxOpacity: .5,
      minOpacity: 0,
      blur: .75
    };
    const heatmapInstance = h337.create(config);
    heatmapInstance.setData({
      max: 100,
      min: 0,
      data: [
        { x: 30, y: 100, value: 50 },
        { x: 20, y: 155, value: 25 },
        { x: 50, y: 43, value: 75 },
        { x: 100, y: 22, value: 60 },
        { x: 240, y: 233, value: 53 },
        { x: 25, y: 122, value: 11 },
        { x: 37, y: 55, value: 34 },
        { x: 87, y: 56, value: 21 },
        { x: 72, y: 11, value: 3 },
        { x: 55, y: 10, value: 18 },
      ]
    });
    img.onload = () => {
      (this.canvasmap.nativeElement as HTMLCanvasElement).width = img.naturalWidth;
      (this.canvasmap.nativeElement as HTMLCanvasElement).height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };
    img.src = heatmapInstance.getDataURL();
    console.log(heatmapInstance);
  }

}
