export interface SignalLog {
  timestamp: string;
  frequency: number;
  signal_strength: number;
  bandwidth: number;
  modulation_type: string;
  source_station: string;
  occupancy_level: number;
  anomaly_confidence: number;
}

export interface AnomalyEvent {
  timestamp: string;
  frequency: number;
  description: string;
  confidence: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface OccupancyStats {
  average_occupancy: number;
  peak_frequency: number;
  signal_count: number;
  status: 'QUIET' | 'OPTIMAL' | 'CONGESTED';
}

export interface AIInsights {
  insights: string[];
}
