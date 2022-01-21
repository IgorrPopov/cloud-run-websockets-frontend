import { v4 as uuidv4 } from 'uuid';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Component } from '@angular/core';
import { ChatService } from './chat.service';

const config: any = { 
  url: 'https://test-app-kbsq3z36sa-uc.a.run.app/', 
  options: { 
    query: { 
      userId: uuidv4(),
    },
  } 
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
class AppComponent {
  userId = config.options.query.userId;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.sendMessage(this.userId);

    this.chatService.getNewMessage().subscribe((userId: string) => {
      const message = this.userId === userId ? 
        `=> You joined the session, welcome! %c (id: ${userId})` : 
        `=> New user has joined the session! %c (id: ${userId})`;
      console.log(
        `%c ${message}`, 
        'background: #90ee90; color: white; font-size: 16px', 
        'background: #90ee90; color: black; font-size: 16px'
      );
    });

    this.chatService.getNewMessage().subscribe((userId: string) => {
      const message = `=> User has left the session! %c (id: ${userId})`;

      console.log(
        `%c ${message}`, 
        'background: #90ee90; color: white; font-size: 16px', 
        'background: #90ee90; color: black; font-size: 16px'
      );
    });
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }