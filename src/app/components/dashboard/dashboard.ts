import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterfallViewerComponent } from '../waterfall-viewer/waterfall-viewer';
import { MetricCardsComponent } from '../metric-cards/metric-cards';
import { OccupancyChartsComponent } from '../occupancy-charts/occupancy-charts';
import { AIInsightsComponent } from '../ai-insights/ai-insights';
import { PlaybackControlsComponent } from '../playback-controls/playback-controls';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    WaterfallViewerComponent, 
    MetricCardsComponent, 
    OccupancyChartsComponent, 
    AIInsightsComponent,
    PlaybackControlsComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {}
