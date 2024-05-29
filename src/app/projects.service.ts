// src/app/project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3001/Projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateProject(project: any): Observable<any> {
    console.log(project);
    return this.http.put<any>(`${this.apiUrl}/${project.id}`, project);
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}