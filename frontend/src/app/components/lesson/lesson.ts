import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { Prompt } from '../../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lesson',
  standalone: true,
imports: [MatCardModule, MatButtonModule, MatDividerModule, DatePipe],  templateUrl: './lesson.html',
  styleUrl: './lesson.css'
})
export class LessonComponent implements OnInit {
  lesson: Prompt | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const saved = localStorage.getItem('lastLesson');
    if (!saved) {
      this.router.navigate(['/learn']);
      return;
    }
    this.lesson = JSON.parse(saved);
  }

  learnMore() {
    this.router.navigate(['/learn']);
  }

  goToHistory() {
    this.router.navigate(['/history']);
  }
}