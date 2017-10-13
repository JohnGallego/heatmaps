import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as h337 from 'heatmap.js';
import * as fromExcel from './data';

interface Point {
  x: number;
  y: number;
  value?: number;
}

interface Word {
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
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, AfterViewInit {

  @ViewChild('heatmap') heatmapElem: ElementRef;

  /* tslint:disable */
  contentText = `The National Association of REALTORS® (NAR) is a membership organization comprised of over 1 million real estate professionals. NAR is an unrivaled advocate and resource in the real estate market for its members and their clients, and only members of NAR can call themselves REALTORS®. Leveraging over 100 years of experience, NAR and REALTORS® advocate for and protect the rights of property buyers and sellers in the U.S., and around the world. The National Association of REALTORS® is the only organization dedicated to improving the ability to own property. Only REALTORS® are backed by NAR’s proprietary and robust data &amp; analytics, technology assets and valued partnerships. Armed with this extensive knowledge and set of tools, REALTORS® effectively reduce risk and uncertainty for their clients. With the most comprehensive real estate resources and professional training in the market, and a deep network-wide commitment to NAR’s ‘Code of Ethics’, REALTORS® are uniquely qualified to advise consumers to make confident real estate decisions, empowering them to achieve their ambitions of property ownership.`;

  contentText2 = `The National Association of REALTORS® (NAR) is a membership organization comprised of over 1 million real estate professionals. NAR is an unrivaled advocate and resource in the real estate market for its members and their clients, and only members of NAR can call themselves REALTORS®. Leveraging over 100 years of experience, NAR and REALTORS® advocate for and protect the rights of property buyers and sellers in the U.S., and around the world. The National Association of REALTORS® is the only organization dedicated to improving the ability to own property. REALTORS® are your neighbors. They are highly engaged and active participants in the communities they serve, and are equipped with in-depth knowledge of the local community, real estate market and property values. This insight, coupled with the extensive resources provided by NAR, enables REALTORS® to uniquely understand their clients’ needs, and effectively educate and shepherd them through all aspects of the buying and selling process. By providing expertise, local knowledge and the highest standard of training and professionalism in the industry, NAR and REALTORS® help communities flourish and thrive, neighborhood by neighborhood and block by block.`;

  contentText3 = `The National Association of REALTORS® (NAR) is a membership organization comprised of over 1 million real estate professionals. NAR is an unrivaled advocate and resource in the real estate market for its members and their clients, and only members of NAR can call themselves REALTORS®. Leveraging over 100 years of experience, NAR and REALTORS® advocate for and protect the rights of property buyers and sellers in the U.S., and around the world. The National Association of REALTORS® is the only organization dedicated to improving the ability to own property. NAR and REALTORS® understand that buying and selling property is so much more than a transaction - it’s a key, and often deeply emotional, milestone in life. On-line real estate platforms are only helpful for certain aspects of the buying and selling process. That’s why it’s important to work one-on-one with a person who can fully understand and represent their clients’ needs and concerns, as well as their hopes and dreams. With the most comprehensive resources, data, and professional training in the market, NAR uniquely equips REALTORS® with the tools and expertise they need to give their clients the tailored advice and attention necessary to successfully guide them through all facets of the complex transaction. In a world that is increasingly automated and impersonal, NAR understands that real estate still is, and always will be, a people-focused business.`;

  contentText4 = `The National Association of REALTORS® (NAR) is a membership organization comprised of over 1 million real estate professionals. NAR is an unrivaled advocate and resource in the real estate market for its members and their clients, and only members of NAR can call themselves REALTORS®. Leveraging over 100 years of experience, NAR and REALTORS® advocate for and protect the rights of property buyers and sellers in the U.S., and around the world. The National Association of REALTORS® is the only organization dedicated to improving the ability to own property.`;

  mappedContent = this.contentText4.split(' ').map((word, index) => `<span class="word word-${index + 1}">${word}</span>`).join(' ');
  words: Word[] = [];

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

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


        // enter n keys between 0 and 1 here
        // for gradient color customization
        //'.2': 'blue',
        //'.4': 'green',
        //'.5': 'yellow',
        //'.7': 'orange',
        //'1': 'red'
      }
    });

    this.words = this.contentText4.split(' ')
      .reduce(
        (accumulation, word, index) => {
          const element = document.querySelector(`.word-${index + 1}`);
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
    const heatPoints = [
      ...fromExcel.Concept1Appeal.filter(v => v <= this.words.length),
      ...fromExcel.Concept2Appeal.filter(v => v <= this.words.length),
      ...fromExcel.Concept3Appeal.filter(v => v <= this.words.length)
    ];

    const heatPoints2 = [
      ...fromExcel.Concept1Unnapeal.filter(v => v <= this.words.length),
      ...fromExcel.Concept2Unnappeal.filter(v => v <= this.words.length),
      ...fromExcel.Concept3Unnapeal.filter(v => v <= this.words.length)
    ];

    let max = 1;

    for (let i = 0, len = heatPoints2.length; i < len; i++) {
      const word = this.words[heatPoints2[i] - 1];

      const existingPoints = points.filter(p => word.points.filter(wp => wp.x === p.x && wp.y === p.y).length);

      if (existingPoints.length) {

        for (let i = 0; i < existingPoints.length; i++) {
          existingPoints[i].value += 1;
          if (existingPoints[i].value > max) {
            max = existingPoints[i].value;
          }
        }

      } else {
        for (let i = 0; i < word.points.length; i++) {
          points.push({
            x: word.points[i].x,
            y: word.points[i].y,
            value: 1
          });
        }
      }
    }

    // heatmap data format
    var data = {
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

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
}
