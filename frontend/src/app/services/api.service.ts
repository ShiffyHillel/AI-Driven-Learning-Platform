import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://127.0.0.1:5000/api';

export interface User {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Prompt {
  id: string;
  userId: string;
  categoryId: string;
  subCategoryId: string;
  prompt: string;
  response: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  private getHeaders(userId: string): HttpHeaders {
    return new HttpHeaders({ 'X-User-Id': userId });
  }

  // Users
  registerUser(name: string, phone: string): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/users`, { name, phone },
      { headers: this.getHeaders(phone) }
    );
  }

  // Categories
  getCategories(userId: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${BASE_URL}/categories`,
      { headers: this.getHeaders(userId) }
    );
  }

  getSubCategories(userId: string, categoryId: string): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${BASE_URL}/categories/${categoryId}/sub-categories`,
      { headers: this.getHeaders(userId) }
    );
  }

  // Prompts
  sendPrompt(userId: string, categoryId: string, subCategoryId: string, topic: string, prompt: string): Observable<Prompt> {
    return this.http.post<Prompt>(`${BASE_URL}/prompts`,
      { categoryId, subCategoryId, topic, prompt },
      { headers: this.getHeaders(userId) }
    );
  }

  getHistory(userId: string): Observable<Prompt[]> {
    return this.http.get<Prompt[]>(`${BASE_URL}/prompts/history`,
      { headers: this.getHeaders(userId) }
    );
  }
}