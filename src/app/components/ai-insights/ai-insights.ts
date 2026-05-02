import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalService } from '../../services/signal';

@Component({
  selector: 'app-ai-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-insights.html',
  styleUrls: ['./ai-insights.css']
})
export class AIInsightsComponent implements OnInit {
  insights: string[] = [];

  constructor(private signalService: SignalService) {}

  ngOnInit() {
    this.fetchInsights();
    setInterval(() => this.fetchInsights(), 10000);
  }

  fetchInsights() {
    this.signalService.getAIInsights().subscribe(data => {
      this.insights = data.insights;
    });
  }
}
