import {Component, HostBinding, OnInit} from '@angular/core';
import {QuestionsService} from '../../services/questions.service';
import {ActivatedRoute} from '@angular/router';
import {WebsocketService} from '../../services/websocket.service';

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
  faq = [
    {question: 'Jaki jest zapłon?', answer: 'Super zapłon, pozdrawiam.'},
    {question: 'Czy samochód był bity?', answer: 'Super zapłon, pozdrawiam.'},
    {question: 'Jakie to jest rocznik?', answer: '2000 rocznik kierowniku.'},
    {question: 'Którym jest Pan właścicielem?', answer: 'Drugim.'}
  ];
  messageToSend = '';
  isFaqTurnedOn = false;
  isEditAnswerTurnedOn = false;
  questionToEdit = '';
  answer = '';

  constructor(private webSocketService: WebsocketService,
              private route: ActivatedRoute,
              private questionService: QuestionsService) {
    this.webSocketService.subject().subscribe(res => {
      let response = JSON.parse(res.data);
      if (this.route.snapshot.params['clientId'] === response.authorId) {
        this.messages.push({text: response.message, isClient: false});
      }
      // uthorId
      //   :
      //   "12312"
      // clientId
      //   :
      //   "34873768"
      // message
      //   :
      //   "Dupa, nie doszlo"
    })
  }

  ngOnInit() {
  }

  onKeyPressed($event) {
    if ($event.key === 'Enter') {
      this.submitMessage();
    }
  }

  private submitMessage() {
    this.webSocketService.send({
      userId: '34873768',
      clientId: this.route.snapshot.params['clientId'],
      auctionId: this.route.snapshot.params['auctionId'],
      message: this.messageToSend
    });
    this.messages.push({text: this.messageToSend, isClient: false});
    this.messageToSend = '';
  }

  openFaq() {
    this.isFaqTurnedOn = true;
  }

  closeFaq() {
    this.isFaqTurnedOn = false;
  }


  openEditAnswer(question: string) {
    this.questionToEdit = question;
    this.isEditAnswerTurnedOn = true;
  }

  closeEditAnswer() {
    this.isEditAnswerTurnedOn = false;
  }

  saveQuestion() {
    this.questionService.saveQuestion(this.questionToEdit, this.answer, this.route.snapshot.params['auctionId'])
      .then(() => this.closeEditAnswer());
  }

  copyAnswer(faqElement) {
    this.messages.push({text: faqElement.answer, isClient: false});
  }

}
