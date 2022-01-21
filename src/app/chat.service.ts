import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
    // this.socket.on('connection', () => {

    // });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  getNewMessage(): Observable<string> {
    return this.socket.fromEvent('newMessage');
  }

  userLeft(): Observable<string> {
    return this.socket.fromEvent('userLeft');
  }
}
