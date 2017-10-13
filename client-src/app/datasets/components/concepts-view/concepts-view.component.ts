import {
  Component, OnInit, Input, Output,
  EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import { Concept } from '../../models';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-concepts-view',
  templateUrl: './concepts-view.component.html',
  styleUrls: ['./concepts-view.component.scss']
})
export class ConceptsViewComponent implements OnInit, OnChanges {

  @Input() concepts: Concept[];
  conceptsBuffer: Concept[];

  @Output() conceptChange: EventEmitter<Concept[]> = new EventEmitter<Concept[]>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.concepts && changes.concepts.currentValue) {
      this.conceptsBuffer = changes.concepts.currentValue.map(
        c => Object.assign({}, c)
      );
    }
  }

  onSubmit(): void {
    this.conceptChange.emit(this.conceptsBuffer);
  }

  onImageSelected(file: File, concept: Concept): void {
    const fr = new FileReader();
    fr.onload = () => {
      concept.image = fr.result;
    };
    fr.readAsDataURL(file);
  }

  onClearChanges(): void {
    this.conceptsBuffer = this.concepts.map(
      c => Object.assign({}, c)
    );
  }

  hasChanged(): boolean {
    return !isEqual(this.concepts, this.conceptsBuffer);
  }

  trackByIndex(index, item): any {
    return index;
  }

}
