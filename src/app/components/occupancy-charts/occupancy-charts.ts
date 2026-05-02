import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalService } from '../../services/signal';

@Component({
  selector: 'app-occupancy-charts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cyber-card chart-panel">
      <h3 class="cyber-title">Band Utilization</h3>
      <div class="band-list">
        <div *ngFor="let band of bands" class="band-item">
          <div class="band-label">
            <span>{{ band.name }}</span>
            <span>{{ band.value }}%</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill" [style.width.%]="band.value" 
                 [ngClass]="band.value > 70 ? 'critical' : band.value > 40 ? 'warning' : 'safe'"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-panel { padding: 1rem; border-left: 2px solid var(--accent-cyan); }
    .band-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
    .band-label { display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 5px; }
    .progress-bg { height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 2px; }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }
    .safe { background: var(--accent-green); }
    .warning { background: var(--accent-yellow); }
    .critical { background: var(--accent-red); }
  `]
})
export class OccupancyChartsComponent implements OnInit {
  bands = [
    { name: '433 MHz ISM', value: 0 },
    { name: '137 MHz NOAA', value: 0 },
    { name: '1090 MHz ADSB', value: 0 },
    { name: '2.4 GHz WiFi', value: 0 }
  ];

  constructor(private signalService: SignalService) {}

  ngOnInit() {
    this.updateCharts();
    setInterval(() => this.updateCharts(), 5000);
  }

  updateCharts() {
    this.signalService.getOccupancyAnalytics().subscribe(data => {
      this.bands.forEach(b => {
        // Randomize slightly around the real occupancy for visual effect
        b.value = Math.min(100, Math.max(0, Math.floor(data.average_occupancy * 100 + (Math.random() * 20 - 10))));
      });
    });
  }
}
