import { Component, OnInit, Input } from '@angular/core';
import { Dataset } from '../../models';

@Component({
  selector: 'app-dataset-details',
  templateUrl: './dataset-details.component.html',
  styleUrls: ['./dataset-details.component.scss']
})
export class DatasetDetailsComponent implements OnInit {

  @Input() dataset: Dataset;

  constructor() { }

  ngOnInit() {
  }

}
