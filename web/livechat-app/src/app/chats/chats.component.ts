import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.less']
})
export class ChatsComponent implements OnInit {
  @HostBinding('style.flex-grow') flexGrow = 1;

  constructor() {
  }

  ngOnInit() {
  }

}
