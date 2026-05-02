import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalService } from '../../services/signal';
import { AnomalyEvent } from '../../models/signal.model';

@Component({
  selector: 'app-anomaly-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anomaly-feed.html',
  styleUrls: ['./anomaly-feed.css']
})
export class AnomalyFeedComponent implements OnInit {
  anomalies: AnomalyEvent[] = [];

  constructor(private signalService: SignalService) {}

  ngOnInit() {
    this.signalService.getAnomalyFeed().subscribe(data => {
      this.anomalies = data;
    });
  }
}
