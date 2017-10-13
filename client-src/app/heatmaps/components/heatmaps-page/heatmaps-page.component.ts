import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as h337 from 'heatmap.js';

import { Heatmap } from '../../models';
import * as fromHeatmaps from '../../store';
import * as actions from '../../store/actions';
import * as fromProjects from '../../../projects/store';
import * as projectActions from '../../../projects/store/collection.actions';
import * as datasetActions from '../../../datasets/store/actions';
import { Project } from '../../../projects/models';

export interface Point {
  x: number;
  y: number;
  value?: number;
}

export interface Word {
  index: number;
  word: string;
  element: HTMLElement;
  x: number;
  y: number;
  width: number;
  height: number;
  points: Point[];
}

@Component({
  selector: 'app-heatmaps-page',
  templateUrl: './heatmaps-page.component.html',
  styleUrls: ['./heatmaps-page.component.css']
})
export class HeatmapsPageComponent implements OnInit {

  @ViewChild('heatmap') heatmapElem: ElementRef;
  private DATA_CAPTURE = /[^[\{]+(?=}})/g;

  heatmaps$: Observable<Heatmap[]>;
  projectEditing$: Observable<Project>;

  concept: string;
  data: string;
  mappedData: number[];
  mappedConcept = '';
  words: Word[] = [];

  private routeSubscription: Subscription;

  constructor(private store: Store<fromHeatmaps.State>, private route: ActivatedRoute) {
    this.routeSubscription = route.params
      .map(params => {
        this.store.dispatch(new projectActions.EditAction(+params.id));
        this.store.dispatch(new datasetActions.LoadAction(+params.id));
        return new actions.LoadAction(+params.id);
      }).subscribe(store);
    this.heatmaps$ = this.store.select(fromHeatmaps.getCollection);
    this.projectEditing$ = this.store.select(fromProjects.getProjectsEditingEntity);
  }

  ngOnInit() {
  }

  onSubmit(): void {

  }

  conceptChanged($event): void {
    let i = 0;
    this.mappedConcept = this.concept.split(' ')
      .map((word, index) => {
        if (word === '|') {
          return '<br/><br/>';
        }
        const output = `<span class="word word-${i + 1}">${word}</span>`;
        i++;
        return output;
      }).join(' ');

  }

  dataChanged($event): void {
    const d = this.data.match(this.DATA_CAPTURE).join(',');
    this.mappedData = d.split(',').map(hp => parseInt(hp, 10));
  }

  render(): void {

    const div: HTMLDivElement = this.heatmapElem.nativeElement as HTMLDivElement;
    const heatmapInstance = h337.create({
      container: this.heatmapElem.nativeElement,
      maxOpacity: .9,
      minOpacity: 0,
      radius: 30,
      gradient: {
        '0': 'Navy',
        '0.25': 'Blue',
        '0.5': 'Green',
        '0.75': 'Yellow',
        '1': 'Red'
      }
    });

    this.words = this.concept.split(' ')
      .filter(w => w !== '|')
      .reduce(
      (accumulation, word, index) => {
        const element = document.querySelector(`.word-${index + 1}`);

        if (!element) console.log(index, word);

        const parentRec = document.querySelector('.mat-card').getBoundingClientRect();
        const rec = element.getBoundingClientRect();
        const spacing = rec.width / (Math.floor((rec.width / 25) + 1));
        const wordPoints = [];
        const x = (rec.left - parentRec.left);
        const y = rec.top - parentRec.top + (rec.height / 2);

        for (let i = 0; i < Math.floor(rec.width / 25); i++) {
          wordPoints.push({
            x: Math.round((x + (spacing * (i + 1))) * 100) / 100,
            y
          });
        }

        accumulation.push({
          index: index + 1,
          word,
          element,
          x: rec.left - parentRec.left,
          y: rec.top - parentRec.top,
          width: rec.width,
          height: rec.height,
          points: wordPoints
        });
        return accumulation;
      }, []);

    console.log(this.words);

    const points = [];

    let max = 1;

    for (let i = 0, len = this.mappedData.length; i < len; i++) {
      const word = this.words[this.mappedData[i] - 1];

      const existingPoints = points.filter(p => word.points.filter(wp => wp.x === p.x && wp.y === p.y).length);

      if (existingPoints.length) {

        for (let x = 0; x < existingPoints.length; x++) {
          existingPoints[x].value += 1;
          if (existingPoints[x].value > max) {
            max = existingPoints[x].value;
          }
        }

      } else {
        for (let x = 0; x < word.points.length; x++) {
          points.push({
            x: word.points[x].x,
            y: word.points[x].y,
            value: 1
          });
        }
      }
    }

    // heatmap data format
    const data = {
      max: max,
      data: points
    };

    console.log(data);
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
    heatmapInstance.repaint();
    console.log(heatmapInstance);
  }

}
