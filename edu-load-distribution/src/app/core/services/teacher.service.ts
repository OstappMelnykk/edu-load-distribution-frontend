import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ITeacher} from '../interfaces/teacher.interface';
import {ITeacherWorkload} from '../interfaces/teacher-workload.interface';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = `${environment.apiBaseUrl}/teacher`;

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<ITeacher[]> {
    return this.http.get<ITeacher[]>(`${this.apiUrl}/get`);
  }

  getTeacher(id: string): Observable<ITeacher> {
    return this.http.get<ITeacher>(`${this.apiUrl}/get/${id}`);
  }

  getTeacherWorkloads(id: string): Observable<ITeacherWorkload[]> {
    return this.http.get<ITeacherWorkload[]>(`${this.apiUrl}/get/${id}/workloads`);
  }

  createTeacher(teacher: ITeacher): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.apiUrl}/create`, teacher,);
  }

  updateTeacher(id: string, teacher: ITeacher): Observable<{ id: string }> {
    return this.http.put<{ id: string }>(`${this.apiUrl}/update/${id}`, teacher);
  }

  deleteTeacher(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.apiUrl}/delete/${id}`);
  }

  deleteAllTeachers(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/delete`);
  }
}
