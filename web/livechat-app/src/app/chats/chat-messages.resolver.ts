import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MessagesService} from '../services/messages.service';

@Injectable()
export class ChatMessagesResolver implements Resolve<any> {

    constructor(private messagesService: MessagesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.messagesService.getMessages();
    }

}
