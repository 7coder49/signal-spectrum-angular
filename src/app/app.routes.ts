import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { LogExplorerComponent } from './components/log-explorer/log-explorer';
import { AnomalyFeedComponent } from './components/anomaly-feed/anomaly-feed';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logs', component: LogExplorerComponent },
  { path: 'anomalies', component: AnomalyFeedComponent },
];
