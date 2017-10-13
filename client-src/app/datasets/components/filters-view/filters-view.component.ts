import {
  Component, OnInit, Input, Output,
  EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import { DataFilter } from '../../models';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-filters-view',
  templateUrl: './filters-view.component.html',
  styleUrls: ['./filters-view.component.scss']
})
export class FiltersViewComponent implements OnInit, OnChanges {

  @Input() filters: DataFilter[];
  filtersBuffer: DataFilter[];

  @Output() filtersChange: EventEmitter<DataFilter[]> = new EventEmitter<DataFilter[]>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filters && changes.filters.currentValue) {
      this.filtersBuffer = changes.filters.currentValue.map(
        c => Object.assign({}, { name: c.name, options: [...c.options] })
      );
    }
  }

  onSubmit(): void {
    this.filtersChange.emit(this.filtersBuffer);
  }

  onClearChanges(): void {
    this.filtersBuffer = this.filters.map(
      c => Object.assign({}, { name: c.name, options: [...c.options] })
    );
  }

  hasChanged(): boolean {
    return !isEqual(this.filters, this.filtersBuffer);
  }

  trackByIndex(index, item): any {
    return index;
  }

}
