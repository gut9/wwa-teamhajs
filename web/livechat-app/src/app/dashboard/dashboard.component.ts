import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.router.navigate(['chats'], {relativeTo: this.route});
  }

  ngOnInit() {
  }

}
