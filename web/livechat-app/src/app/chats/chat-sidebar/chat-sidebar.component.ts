import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {WebsocketService} from '../../services/websocket.service';
import {ConversationsService} from '../../services/conversations.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.less']
})
export class ChatSidebarComponent implements OnInit {

  chatHeaders = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private websocketService: WebsocketService,
              private conversationsService: ConversationsService) {
    conversationsService.getConversations()
      .then(res => {
        this.chatHeaders = res;
        this.chatHeaders[0].selected = true;
        this.router.navigate([this.chatHeaders[0].clientId], {relativeTo: this.route});
      });
    // this.websocketService.subject().subscribe(
    //   res => {
    //     let msg = JSON.parse(res.data);
    //   }
    // );
  }

  ngOnInit() {
  }

  openChat(chatId) {
    _.find(this.chatHeaders, ['selected', true]).selected = false;
    _.find(this.chatHeaders, ['clientId', chatId]).selected = true;
    this.router.navigate([chatId], {relativeTo: this.route});
  }

  isSelected(chatId) {
    return _.find(this.chatHeaders, ['clientId', chatId]).selected;
  }

  wasRead(chatId) {
    return _.find(this.chatHeaders, ['clientId', chatId]).wasRead;
  }

}
