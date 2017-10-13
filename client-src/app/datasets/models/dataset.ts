import { Concept } from './concept';
import { DataFilter } from './data-filter';
import { Respondent } from './respondent';

export class Dataset {
  datasetId: number;
  projectId: number;
  concepts: Concept[];
  dataFilters: DataFilter[];
  respondents: Respondent[];

  constructor() {
    this.concepts = [];
    this.dataFilters = [];
    this.respondents = [];
  }
}
