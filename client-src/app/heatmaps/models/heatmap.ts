import { DataFilterResponse } from '../../datasets/models';

export class Heatmap {
  heatMapId: number;
  projectId: number;
  concept: string;
  filters: DataFilterResponse[];
}
