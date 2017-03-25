import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.less']
})
export class ChatSidebarComponent implements OnInit {

  chatHeaders = [
    {
      id : 1,
      login: 'janek12',
      auctionName: 'Passat w gazie',
      lastMessage: 'Dzień dobry, chciałbym zadać pytanie dotyczące spalania',
      isRead: true,
    },
    {
      id : 2,
      login: 'janek12',
      auctionName: 'Passat w gazie',
      lastMessage: 'Dzień dobry, chciałbym zadać pytanie dotyczące spalania',
      isRead: false,
    },
    {
      id : 3,
      login: 'janek12',
      auctionName: 'Passat w gazie',
      lastMessage: 'Dzień dobry, chciałbym zadać pytanie dotyczące spalania',
      isRead: true,
    },
    {
      id : 4,
      login: 'janek12',
      auctionName: 'Passat w gazie',
      lastMessage: 'Dzień dobry, chciałbym zadać pytanie dotyczące spalania',
      isRead: false,
    },
    {
      id : 5,
      login: 'janek12',
      auctionName: 'Passat w gazie',
      lastMessage: 'Dzień dobry, chciałbym zadać pytanie dotyczące spalania',
      isRead: true,
    }
  ];

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  openChat(chatId) {
    this.router.navigate([chatId], {relativeTo: this.route});
  }

}
