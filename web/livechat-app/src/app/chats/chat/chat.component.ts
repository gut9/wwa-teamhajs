import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  @HostBinding('style.flex-grow') flexGrow = 1;

  messages = [
    {text: 'Czy mógłby Pan mi odpowiedzieć na pytanie?', isClient: true},
    {text: 'Owszem, bardzo proszę ', isClient: false},
    {text: 'Jakim spalaniem charakteryzuje się Pańskie auto?', isClient: true},
    {text: 'Wyjątkowo małym', isClient: false},
    {text: 'A jaki ma silnik?', isClient: true},
    {text: 'Wyjątkowo sprawny', isClient: false},
  ];
  messageToSend = '';

  constructor() {
  }

  ngOnInit() {
  }

  onKeyPressed($event) {
    if ($event.key === 'Enter') {
      this.submitMessage();
    }
  }

  private submitMessage() {
    this.messages.push({text: this.messageToSend, isClient: false});
    this.messageToSend = '';
  }

}
