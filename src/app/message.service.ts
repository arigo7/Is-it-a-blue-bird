// The service exposes its cache of messages and two methods: one to add() a message to the cache and another to clear() the cache

// I possibly  need to create another service that calls vision api??? 
// https://angular.io/guide/http start from app/config.service.ts(excerpt)

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
