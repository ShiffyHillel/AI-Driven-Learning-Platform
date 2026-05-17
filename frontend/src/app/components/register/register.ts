import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  name = '';
  phone = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  register() {
    if (!this.name || !this.phone) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.apiService.registerUser(this.name, this.phone).subscribe({
      next: (user) => {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.name);
        this.router.navigate(['/learn']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = 'User already exists. Please use a different phone number.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}