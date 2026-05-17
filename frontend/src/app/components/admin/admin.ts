import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { ApiService, User, Prompt } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatProgressSpinnerModule, MatDividerModule, DatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  prompts: Prompt[] = [];
  isLoading = true;

  displayedUserColumns = ['name', 'phone', 'createdAt'];
  displayedPromptColumns = ['userId', 'prompt', 'createdAt'];

  private adminId = 'admin';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.apiService.getAllPrompts().subscribe({
          next: (prompts) => {
            this.prompts = prompts;
            this.isLoading = false;
          }
        });
      }
    });
  }
}