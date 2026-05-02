import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalService } from '../../services/signal';
import { SignalLog } from '../../models/signal.model';

@Component({
  selector: 'app-log-explorer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-explorer.html',
  styleUrls: ['./log-explorer.css']
})
export class LogExplorerComponent implements OnInit {
  logs: SignalLog[] = [];

  constructor(private signalService: SignalService) {}

  ngOnInit() {
    this.signalService.getSignalLogs().subscribe(data => {
      this.logs = data;
    });
  }
}
