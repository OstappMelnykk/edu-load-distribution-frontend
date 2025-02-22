import { Injectable } from '@angular/core';
import {ISubject} from '../interfaces/subject.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = `${environment.apiBaseUrl}/subject`;

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<ISubject[]> {
    return this.http.get<ISubject[]>(`${this.apiUrl}/get`);
  }

  getSubject(id: string): Observable<ISubject> {
    return this.http.get<ISubject>(`${this.apiUrl}/get/${id}`);
  }

  createSubject(subject: ISubject): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.apiUrl}/create`, subject);
  }

  updateSubject(id: string, subject: ISubject): Observable<{ id: string }> {
    return this.http.put<{ id: string }>(`${this.apiUrl}/update/${id}`, subject);
  }

  deleteSubject(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.apiUrl}/delete/${id}`);
  }

  deleteAllSubjects(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/delete`);
  }

}
