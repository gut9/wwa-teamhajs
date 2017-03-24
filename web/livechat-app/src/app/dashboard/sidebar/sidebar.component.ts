import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  options = [
    {label: 'CHATY', selected: true},
    {label: 'AUKCJE'},
    {label: 'USTAWIENIA'},
    {label: 'STATYSTYKI'},
    {label: 'WYLOGUJ'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
