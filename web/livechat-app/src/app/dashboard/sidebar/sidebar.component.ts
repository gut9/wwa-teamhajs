import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  options = [
    {label: 'CHATY', selected: true, url: 'chats'},
    {label: 'AUKCJE', url: 'auctions'},
    {label: 'USTAWIENIA', url: 'settings'},
    {label: 'STATYSTYKI', url: 'statistics'},
    {label: 'WYLOGUJ', url: 'logout'}
  ];

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  select(optionLabel) {
    _.find(this.options, ['selected', true]).selected = false;
    _.find(this.options, ['label', optionLabel]).selected = true;
    let selectedUrl = _.find(this.options, ['selected', true]).url;
    this.router.navigate([selectedUrl], {relativeTo: this.route});

  }

}
