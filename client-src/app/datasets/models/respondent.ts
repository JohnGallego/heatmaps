import { DataFilterResponse } from './data-filter-response';
import { HeatPoint } from '../../heatmaps/models/heat-point';

export class Respondent {
  russellId: string;
  concepts: string[];
  dataFilters: DataFilterResponse[];
  heatPoints: HeatPoint[];

  constructor() {
    this.concepts = [];
    this.dataFilters = [];
    this.heatPoints = [];
  }
}
