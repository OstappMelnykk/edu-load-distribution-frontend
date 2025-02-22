import { Routes } from '@angular/router';
import {LoginComponent} from './modules/auth/login/login.component';
import {RegisterComponent} from './modules/auth/register/register.component';
import {SubjectListComponent} from './modules/subjects/subject-list/subject-list.component';
import {TeacherListComponent} from './modules/teachers/teacher-list/teacher-list.component';
import {WorkloadListComponent} from './modules/workloads/workload-list/workload-list.component';
import {DashboardComponent} from './modules/dashboard/dashboard/dashboard.component';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard] // Захист маршруту
  },
  {
    path: 'subjects',
    component: SubjectListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'teachers',
    component: TeacherListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'workloads',
    component: WorkloadListComponent,
    canActivate: [authGuard]
  }
];
