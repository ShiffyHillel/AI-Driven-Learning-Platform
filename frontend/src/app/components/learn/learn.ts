import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ApiService, Category, SubCategory } from '../../services/api.service';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './learn.html',
  styleUrl: './learn.css'
})
export class LearnComponent implements OnInit {
  categories: Category[] = [];
  subCategories: SubCategory[] = [];

  selectedCategory = '';
  selectedSubCategory = '';
  prompt = '';
  errorMessage = '';
  isLoading = false;

  private userId = localStorage.getItem('userId') || '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getCategories(this.userId).subscribe({
      next: (categories) => this.categories = categories,
      error: () => this.errorMessage = 'Failed to load categories'
    });
  }

  onCategoryChange() {
    this.selectedSubCategory = '';
    this.subCategories = [];

    this.apiService.getSubCategories(this.userId, this.selectedCategory).subscribe({
      next: (subCategories) => this.subCategories = subCategories,
      error: () => this.errorMessage = 'Failed to load sub-categories'
    });
  }

  sendPrompt() {
    if (!this.selectedCategory || !this.selectedSubCategory || !this.prompt) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const topic = this.subCategories.find(s => s.id === this.selectedSubCategory)?.name || '';

    this.apiService.sendPrompt(
      this.userId,
      this.selectedCategory,
      this.selectedSubCategory,
      topic,
      this.prompt
    ).subscribe({
      next: (result) => {
        localStorage.setItem('lastLesson', JSON.stringify(result));
        this.router.navigate(['/lesson']);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Failed to get lesson. Please try again.';
      }
    });
  }
}