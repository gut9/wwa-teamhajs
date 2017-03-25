import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  @HostBinding('style.flex-grow') flexGrow = 1;

  constructor() {
  }

  ngOnInit() {
  }

}
