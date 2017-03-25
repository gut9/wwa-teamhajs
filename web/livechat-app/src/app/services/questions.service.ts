import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class QuestionsService {

  constructor(private http: Http) {
  }

  private HOST = 'http://172.18.199.167:8000/';

  // TODO: added URL

  saveQuestion(question: string, answer: string): Promise<any> {
    return this.http.post(this.HOST + '??', {
      question: question,
      answer: answer
    })
      .map(r => r.json())
      .toPromise();
  }

}
