import {Component, OnInit} from '@angular/core';
import {Color} from "ng2-charts";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less']
})
export class StatisticsComponent implements OnInit {

  data = [
    {
      auction: "Prosto z niemiec VW",
      views: 1000,
      messages: 200
    },
    {
      auction: "Cos tam tam  VW",
      views: 500,
      messages: 10
    },
    {
      auction: "Prosto prosto prosot",
      views: 1000,
      messages: 200
    },
    {
      auction: "Prostasdo z niemiead c VW",
      views: 11500,
      messages: 359
    },
  ];

  constructor() {
  }

  ngOnInit() {
    this.getDataLabel();
    this.getData();
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barBorderColor: Array<Color> = [{
    backgroundColor: 'green',
    hoverBackgroundColor: 'purple'
  }];

  public barChartData: any[] = [];

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  getDataLabel() {
    for (let i = 0; i <= 24; i++) {
      let string = i + ":00";
      this.barChartLabels.push(string);
    }
  }

  getData() {
    let mockData = [];
    for (let i = 0; i <= 24; i++) {
      let a = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
      mockData.push(a);
    }
    this.barChartData.push({data: mockData, label: 'Ilość wiadomości'});
  }

}
