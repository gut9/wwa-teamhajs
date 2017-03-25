import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class QuestionsService {

  constructor(private http: Http) {
  }

  private HOST = 'http://172.18.199.167:8000/';

  saveQuestion(question: string, answer: string, offerId: string): Promise<any> {
    return this.http.post(`${this.HOST}api/getFrequentlyAskedQuestions/`, {
      question: question,
      answer: answer,
      offerId: offerId,
      userId: '34873768'
    })
      .map(r => r)
      .toPromise();
  }

}
