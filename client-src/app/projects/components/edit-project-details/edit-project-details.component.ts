import {
  Component, OnInit, Input, OnChanges,
  SimpleChanges, Output, EventEmitter
} from '@angular/core';
import { isEqual } from 'lodash';

import { Project } from '../../models';

@Component({
  selector: 'app-edit-project-details',
  templateUrl: './edit-project-details.component.html',
  styleUrls: ['./edit-project-details.component.scss']
})
export class EditProjectDetailsComponent implements OnInit, OnChanges {

  @Input() project: Project;
  @Output() update: EventEmitter<Project> = new EventEmitter<Project>();
  edit: Project;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project) {
      this.edit = Object.assign({}, changes.project.currentValue);
    }
  }

  onSubmit(): void {
    this.update.emit(this.edit);
  }

  hasChanged(): boolean {
    return !isEqual(this.edit, this.project);
  }

}
