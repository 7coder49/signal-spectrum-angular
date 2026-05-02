import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalService } from '../../services/signal';
import { SignalLog } from '../../models/signal.model';

@Component({
  selector: 'app-waterfall-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #waterfallCanvas></canvas>`,
  styles: [`
    :host { display: block; width: 100%; height: 100%; overflow: hidden; background: #000; }
    canvas { width: 100%; height: 100%; }
  `]
})
export class WaterfallViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('waterfallCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private intervalId: any;
  private signals: SignalLog[] = [];

  constructor(private signalService: SignalService) {}

  ngOnInit() {
    this.startPolling();
  }

  ngAfterViewInit() {
    this.initCanvas();
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  private startPolling() {
    this.intervalId = setInterval(() => {
      this.signalService.getLiveSpectrum().subscribe(data => {
        this.signals = data;
        this.drawRow();
      });
    }, 1000);
  }

  private drawRow() {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.width;
    const h = canvas.height;

    // Shift existing image down
    const imageData = this.ctx.getImageData(0, 0, w, h - 2);
    this.ctx.putImageData(imageData, 0, 2);

    // Draw new row at top
    const rowHeight = 2;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, w, rowHeight);

    this.signals.forEach(sig => {
      // Map frequency (e.g. 400-500 MHz) to x-position
      const x = ((sig.frequency - 420) / 30) * w; 
      const intensity = Math.min(255, Math.max(0, (sig.signal_strength + 110) * 3));
      
      // Color based on intensity (Blue -> Cyan -> Green -> Red)
      this.ctx.fillStyle = this.getColor(intensity);
      this.ctx.fillRect(x, 0, 4, rowHeight);
    });
  }

  private getColor(intensity: number): string {
    if (intensity < 64) return `rgb(0, 0, ${intensity * 4})`;
    if (intensity < 128) return `rgb(0, ${(intensity - 64) * 4}, 255)`;
    if (intensity < 192) return `rgb(0, 255, ${255 - (intensity - 128) * 4})`;
    return `rgb(${(intensity - 192) * 4}, 255, 0)`;
  }
}
