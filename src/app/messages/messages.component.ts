// MessagesComponent should display all messages, including the message sent by the HeroService when it fetches heroes

import { Component, OnInit } from '@angular/core';

// 1st import MessageService
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  
// Angular will inject the singleton MessageService into that property when it creates the MessagesComponent
// property messageService must be public because you're going to bind to it in the template - Angular only binds to public component properties
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }
  onFileChanged(event:any) {
    const file = event.target.files[0]
    console.log(file)
  }

}
