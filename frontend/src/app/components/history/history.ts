import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { ApiService, Prompt } from '../../services/api.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatProgressSpinnerModule, DatePipe],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class HistoryComponent implements OnInit {
  prompts: Prompt[] = [];
  isLoading = true;
  errorMessage = '';

  private userId = localStorage.getItem('userId') || '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getHistory(this.userId).subscribe({
      next: (prompts) => {
        this.prompts = prompts;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load history';
        this.isLoading = false;
      }
    });
  }

  learnMore() {
    this.router.navigate(['/learn']);
  }
}