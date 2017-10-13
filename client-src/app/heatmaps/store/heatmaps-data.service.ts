import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Heatmap } from '../models';

@Injectable()
export class HeatmapsDataService {

  private readonly API_PATH = environment.api.heatMaps;

  constructor(private http: Http) { }

  loadHeatmaps(projectId: number): Observable<Heatmap[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.API_PATH}/${projectId}`, options)
      .map(res => res.json());
  }

}
