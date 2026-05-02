import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignalLog, AnomalyEvent, OccupancyStats, AIInsights } from '../models/signal.model';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getLiveSpectrum(): Observable<SignalLog[]> {
    return this.http.get<SignalLog[]>(`${this.apiUrl}/live/`);
  }

  getOccupancyAnalytics(): Observable<OccupancyStats> {
    return this.http.get<OccupancyStats>(`${this.apiUrl}/analytics/occupancy/`);
  }

  getAnomalyFeed(): Observable<AnomalyEvent[]> {
    return this.http.get<AnomalyEvent[]>(`${this.apiUrl}/anomalies/`);
  }

  getSignalLogs(limit: number = 100, skip: number = 0): Observable<SignalLog[]> {
    return this.http.get<SignalLog[]>(`${this.apiUrl}/logs/?limit=${limit}&skip=${skip}`);
  }

  getAIInsights(): Observable<AIInsights> {
    return this.http.get<AIInsights>(`${this.apiUrl}/insights/`);
  }
}
