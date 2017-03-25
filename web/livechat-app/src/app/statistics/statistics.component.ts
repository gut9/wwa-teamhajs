import {Component, OnInit} from '@angular/core';
import {Color} from "ng2-charts";
import {StatisticsService} from "../services/statistics.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less']
})
export class StatisticsComponent implements OnInit {

  hours = [];
  auctions = [];

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barBorderColor: Array<Color> = [{
    backgroundColor: '#4CAF50',
    hoverBackgroundColor: '#2E7D32'
  }];
  public barChartData: any[] = [];

  constructor(private statisticsService: StatisticsService, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.getAuctions();
    this.getHours();
    this.setLabel();
  }

  setLabel() {
    for (let i = 0; i <= 24; i++) {
      let string = i + ":00";
      this.barChartLabels.push(string);
    }
  }

  getHours() {
    this.hours = this.route.snapshot.data['statistics'];
    this.barChartData.push({data: this.hours, label: 'Ilość wiadomości'});
  }

  private getAuctions() {
    this.statisticsService.getStatistics().then(res => {
      this.auctions = res;
    });
  }
}
