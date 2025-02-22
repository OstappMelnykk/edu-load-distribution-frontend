import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IWorkload} from '../interfaces/workload.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkloadService {

  private apiUrl = `${environment.apiBaseUrl}/workload`;

  constructor(private http: HttpClient) {}

  getWorkloads(): Observable<IWorkload[]> {
    return this.http.get<IWorkload[]>(`${this.apiUrl}/get`);
  }

  getWorkload(id: string): Observable<IWorkload> {
    return this.http.get<IWorkload>(`${this.apiUrl}/get/${id}`);
  }

  createWorkload(workload: IWorkload): Observable<IWorkload> {
    return this.http.post<IWorkload>(`${this.apiUrl}/create`, workload);
  }

  updateWorkload(id: string, workload: IWorkload): Observable<IWorkload> {
    return this.http.put<IWorkload>(`${this.apiUrl}/update/${id}`, workload);
  }

  deleteWorkload(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.apiUrl}/delete/${id}`);
  }

  deleteAllWorkloads(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/delete`);
  }
}
