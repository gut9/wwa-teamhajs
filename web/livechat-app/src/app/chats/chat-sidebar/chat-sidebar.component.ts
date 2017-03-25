import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.less']
})
export class ChatSidebarComponent implements OnInit {

  chatHeaders = [
    {
      id: 1,
      login: 'janek12',
      auctionName: 'Passat w gazie',
      lastMessage: 'Dzień dobry, chciałbym zadać pytanie dotyczące spalania',
      isRead: true,
      selected: true
    },
    {
      id: 2,
      login: 'janek12',
      auctionName: 'Passat w gazie',
      lastMessage: 'Dzień dobry, chciałbym zadać pytanie dotyczące spalania',
      isRead: false,
      selected: false
    },
    {
      id: 3,
      login: 'janek12',
      auctionName: 'Passat w gazie',
      lastMessage: 'Dzień dobry, chciałbym zadać pytanie dotyczące spalania',
      isRead: true,
      selected: false
    },
    {
      id: 4,
      login: 'janek12',
      auctionName: 'Passat w gazie',
      lastMessage: 'Dzień dobry, chciałbym zadać pytanie dotyczące spalania',
      isRead: false,
      selected: false
    },
    {
      id: 5,
      login: 'janek12',
      auctionName: 'Passat w gazie',
      lastMessage: 'Dzień dobry, chciałbym zadać pytanie dotyczące spalania',
      isRead: true,
      selected: false
    }
  ];

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.chatHeaders[0].selected = true;
    this.router.navigate([this.chatHeaders[0].id], {relativeTo: this.route});
  }

  ngOnInit() {
  }

  openChat(chatId) {
    _.find(this.chatHeaders, ['selected', true]).selected = false;
    _.find(this.chatHeaders, ['id', chatId]).selected = true;
    this.router.navigate([chatId], {relativeTo: this.route});
  }

  isSelected(chatId) {
    return _.find(this.chatHeaders, ['id', chatId]).selected;
  }

}
