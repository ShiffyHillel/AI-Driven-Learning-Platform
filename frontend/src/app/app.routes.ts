import { Routes } from '@angular/router';
import { SiteComponent } from './components/site/site';

export const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { 
        path: 'register', 
        loadComponent: () => import('./components/register/register').then(m => m.RegisterComponent) 
      },
      { 
        path: 'learn', 
        loadComponent: () => import('./components/learn/learn').then(m => m.LearnComponent) 
      },
      { 
        path: 'lesson', 
        loadComponent: () => import('./components/lesson/lesson').then(m => m.LessonComponent) 
      },
      { 
        path: 'history', 
        loadComponent: () => import('./components/history/history').then(m => m.HistoryComponent) 
      },
    ]
  },
  { path: '**', redirectTo: 'register' }
];