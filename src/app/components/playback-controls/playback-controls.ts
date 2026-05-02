import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playback-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="playback-bar">
      <button class="control-btn">◀◀</button>
      <button class="control-btn active">LIVE</button>
      <button class="control-btn">▶▶</button>
      <select class="speed-selector">
        <option>x10</option>
        <option>x50</option>
        <option>x100</option>
      </select>
    </div>
  `,
  styles: [`
    .playback-bar { display: flex; gap: 10px; align-items: center; }
    .control-btn { 
      background: transparent; border: 1px solid var(--border-color); 
      color: var(--text-secondary); cursor: pointer; padding: 4px 8px; font-size: 0.7rem;
    }
    .control-btn.active { color: var(--accent-cyan); border-color: var(--accent-cyan); }
    .speed-selector { 
      background: var(--bg-dark); color: var(--accent-cyan); border: 1px solid var(--border-color); 
      font-size: 0.7rem; 
    }
  `]
})
export class PlaybackControlsComponent {}
