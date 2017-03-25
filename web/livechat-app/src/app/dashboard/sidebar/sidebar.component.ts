import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  options = [
    {label: 'CZATY', selected: true, url: 'chats'},
    {label: 'USTAWIENIA', url: 'settings'},
    {label: 'STATYSTYKI', url: 'statistics'},
    {label: 'WYLOGUJ', url: 'logout'}
  ];

  constructor(private route: ActivatedRoute,
              private router: Router, private cookieService: CookieService) {
  }

  ngOnInit() {
  }

  select(optionLabel) {
    _.find(this.options, ['selected', true]).selected = false;
    _.find(this.options, ['label', optionLabel]).selected = true;
    let selectedUrl = _.find(this.options, ['selected', true]).url;
    if (selectedUrl === 'logout') {
      this.cookieService.removeAll();
      this.router.navigate(['']);
    } else {
      this.router.navigate([selectedUrl], {relativeTo: this.route});
    }
  }

}
