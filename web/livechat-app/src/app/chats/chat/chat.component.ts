import {Component, HostBinding, OnInit} from '@angular/core';
import {QuestionsService} from "../../services/questions.service";

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

  constructor(private questionService: QuestionsService) {
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

  openFaq() {
    this.isFaqTurnedOn = true;
  }

  closeFaq() {
    this.isFaqTurnedOn = false;
  }

<<<<<<< HEAD
  openEditAnswer(question: string) {
    this.questionToEdit = question;
    this.isEditAnswerTurnedOn = true;
  }

  closeEditAnswer() {
    this.isEditAnswerTurnedOn = false;
  }

  saveQuestion() {
    this.questionService.saveQuestion(this.questionToEdit, this.answer)
      .then(() => this.closeEditAnswer());
  }
=======
  copyAnswer(faqElement) {
    this.messages.push({text: faqElement.answer, isClient: false});
  }

>>>>>>> 5eb84feeaaa5d9b98f35d3dd2759da536339ba39
}
