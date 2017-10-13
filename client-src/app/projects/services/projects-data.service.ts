import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Project } from '../models/project';

@Injectable()
export class ProjectsDataService {

  private readonly API_PATH = environment.api.projects;

  constructor(private http: Http) { }

  public loadProjects(): Observable<Project[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.API_PATH}/`, options)
      .map(res => res.json() || []);
  }

  public addProject(project: Project): Observable<Project> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.API_PATH}/`, project, options)
      .map(res => res.json());
  }

  public updateProject(project: Project): Observable<Project> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.API_PATH}/${project.projectId}`, project, options)
      .map(res => res.json());
  }

  public activateProject(id: number): Observable<Project> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.API_PATH}/${id}`, options)
      .map(res => res.json() || []);
  }

}
