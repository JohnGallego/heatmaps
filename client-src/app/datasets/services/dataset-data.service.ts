import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Dataset, Concept, Respondent, DataFilter, DataFilterResponse } from '../models';
import { HeatPoint } from '../../heatmaps/models/heat-point';
import { forOwn, isEqual, groupBy } from 'lodash';
import * as papa from 'papaparse';

const ID_CHECK = /^[iI][dD]$/;
const CONCEPT_CHECK = /^concept$/i;
const X_CHECK = /^[xX]\d+$/;
const Y_CHECK = /^[yY]\d+$/;

@Injectable()
export class DatasetDataService {

  private readonly API_PATH = environment.api.datasets;

  constructor(private http: Http) { }

  loadDataset(projectId: number): Observable<Dataset> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.API_PATH}/${projectId}`, options)
      .map(res => this.mapJsonDataset(res));
  }

  updateDataset(projectId: number, dataset: Dataset): Observable<Dataset> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.API_PATH}/${projectId}`,
      Object.assign({}, {
        datasetId: dataset.datasetId || null,
        projectId: dataset.projectId || projectId,
        data: JSON.stringify({
          concepts: dataset.concepts,
          dataFilters: dataset.dataFilters,
          respondents: dataset.respondents
        })
      }), options)
      .map(res => this.mapJsonDataset(res));
  }

  mapJsonDataset(res: any): Dataset {
    const response = res.json();
    const data = JSON.parse(response.data);
    return Object.assign({}, <Dataset>{
      datasetId: response.datasetId,
      projectId: response.projectId,
      concepts: data.concepts,
      dataFilters: data.dataFilters,
      respondents: data.respondents
     });
  }

  processFile(file: File, projectId: number): Observable<Dataset> {
    return Observable.create(observer => {
      const dataset: Dataset = new Dataset();
      let respondents: Respondent[];

      papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: results => {

          respondents = results.data.map(result => {

            let respondent = new Respondent();

            forOwn(result, (value, key) => {
              respondent = this.mapToRespondent(key.trim(), value.trim(), respondent);
            });

            return this.validateRespondent(respondent);
          });

          dataset.projectId = projectId;
          dataset.concepts = this.compileConcepts(respondents);
          dataset.dataFilters = this.compileFilters(respondents);
          dataset.respondents = respondents;

          observer.next(dataset);
          observer.complete();
        }
      });
    });
  }

  private mapToRespondent(key: string, value: string, respondent: Respondent): Respondent {
    const mappedRespondent = Object.assign({}, respondent);

    if (ID_CHECK.test(key)) {
      /** Check ID */

      mappedRespondent.russellId = value;

    } else if (CONCEPT_CHECK.test(key)) {
      /** Check CONCEPT */

      mappedRespondent.concepts.push(value);

    } else if (X_CHECK.test(key)) {
      /** Check X */

      const rank: number = +key.substring(1, key.length);
      let heatPoint: HeatPoint = mappedRespondent.heatPoints.filter(hp => hp.rank === rank)[0];
      if (!heatPoint) {
        heatPoint = { x: +value, y: null, rank };
        mappedRespondent.heatPoints.push(heatPoint);
      } else {
        heatPoint.x = +value;
      }

    } else if (Y_CHECK.test(key)) {
      /** Check Y */

      const rank: number = +key.substring(1, key.length);
      let heatPoint: HeatPoint = mappedRespondent.heatPoints.filter(hp => hp.rank === rank)[0];
      if (!heatPoint) {
        heatPoint = <HeatPoint>{ heatPointId: null, x: null, y: +value, rank };
        mappedRespondent.heatPoints.push(heatPoint);
      } else {
        heatPoint.y = +value;
      }

    } else {
      /** Check FILTER */

      const filter = new DataFilterResponse();
      filter.name = key;
      filter.value = value;
      mappedRespondent.dataFilters.push(filter);

    }

    return mappedRespondent;
  }

  private validateRespondent(respondent: Respondent): Respondent {
    const validRespondent: Respondent = Object.assign({}, respondent);

    // Filter out x:0 or y:0
    validRespondent.heatPoints = validRespondent.heatPoints.filter(hp => hp.x !== 0 || hp.y !== 0);

    return validRespondent;
  }

  private compileConcepts(respondents: Respondent[]): Concept[] {
    return respondents
      .map(r => r.concepts)
      .reduce((acc, value) => acc.concat(value), [])
      .filter((value, index, collection) => collection.indexOf(value) === index)
      .map(name => <Concept>{ name, image: null  });
  }

  private compileFilters(respondents: Respondent[]): DataFilter[] {
    const filters: DataFilter[] = [];
    const groups = groupBy(respondents
      .map(r => r.dataFilters)
      .reduce((acc, value) => acc.concat(value), []),
      'name');

    forOwn(groups, (dataFilterResponses, group) => {
      const filter = new DataFilter();
      filter.name = group;
      filter.options = dataFilterResponses
        .map(filterResponse => filterResponse.value)
        .filter((value, index, collection) => collection.indexOf(value) === index);
      filters.push(filter);
    });

    return filters;
  }

  changeConcepts(changedConcepts: Concept[], dataset: Dataset): Observable<Dataset> {
    return Observable.create(observer => {

      let concepts = [...dataset.concepts];
      let respondents = [...dataset.respondents];

      for (let i = 0, len = changedConcepts.length; i < len; i++) {
        if (!isEqual(changedConcepts[i], concepts[i])) {
          respondents = Object.assign([], respondents.map(r => Object.assign({}, r, {
            concepts: r.concepts.map(c => c === concepts[i].name ? changedConcepts[i].name : c)
          })));
          concepts = [
            ...concepts.slice(0, i),
            Object.assign({}, changedConcepts[i]),
            ...concepts.slice(i + 1)
          ];
        }
      }

      observer.next(Object.assign({}, dataset, {
        concepts: concepts,
        respondents: respondents
      }));

    });
  }

  changeFilters(changedFilters: DataFilter[], dataset: Dataset): Observable<Dataset> {
    return Observable.create(observer => {

      let filters = [...dataset.dataFilters];
      let respondents = [...dataset.respondents];

      for (let i = 0, filtersLen = changedFilters.length; i < filtersLen; i++) {
        for (let x = 0, optionsLen = changedFilters[i].options.length; x < optionsLen; x++) {

          // If option does not match update respondents and filter object.
          if (changedFilters[i].options[x] !== filters[i].options[x]) {
            respondents = respondents.map(r => Object.assign({}, r, {
              dataFilters: r.dataFilters
                .map(f => f.name === filters[i].name && f.value === filters[i].options[x] ?
                  Object.assign({}, f, { value: changedFilters[i].options[x] }) : f)
            }));

            filters = [
              ...filters.slice(0, i),
              Object.assign({}, filters[i], {
                options: [
                  ...filters[i].options.slice(0, x),
                  changedFilters[i].options[x],
                  ...filters[i].options.slice(x + 1)
                ]
              }),
              ...filters.slice(i + 1)
            ];
          }

        }
      }

      observer.next(Object.assign({}, dataset, {
        dataFilters: filters,
        respondents: respondents
      }));

    });
  }

}
