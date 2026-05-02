import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalService } from '../../services/signal';
import { OccupancyStats } from '../../models/signal.model';

@Component({
  selector: 'app-metric-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metric-cards.html',
  styleUrls: ['./metric-cards.css']
})
export class MetricCardsComponent implements OnInit {
  stats?: OccupancyStats;

  constructor(private signalService: SignalService) {}

  ngOnInit() {
    this.fetchStats();
    setInterval(() => this.fetchStats(), 5000);
  }

  fetchStats() {
    this.signalService.getOccupancyAnalytics().subscribe(data => {
      this.stats = data;
    });
  }
}
