// Services are a way to share information among classes that don't know each other (message service and inject it in two places)
// 1. in HeroService which uses the service to send a message
// 2. In MessagesComponent which displays that message and also displays the ID when user clicks a hero

// Dependency injection - services or objects that a class needs to perform its function
// DI - design pattern in which a class requests dependencies from external sources rather than creating them.

// DI framework provides dependencies to a class upon instantiation - use Angular DI to increase flexibility and modularity in application

// add addl mssges to hero service

import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
// import Observable and 'of' symbols from RxJS.
// one of the classes in RxJS - later tutorial HttpClient methods return RxJS
// for now simulating getting data from server with RxJS of() function
import { Observable, of } from 'rxjs';

//  inject MessageService into HeroService, 1st import MessageService
import { MessageService } from '../message.service';

// @Injectable () specifies that this class can be used in the DI system. The metadata, 'providedIn: 'root'' (makes) means 'HeroService' is visible throughout the app

// must make HeroService available to DI system before it can be injected into HeroesComponent by registering a provider (can create/deliver a service, in this case instantiates HeroService class to provide the service)
@Injectable({

  //declares that this service should be created by the root app injector
  // by default, 'ng generate service' registers provider with 'root injector' for service by including  (providedIn):
  providedIn: 'root'
  //  ^^ creates single, shared instance of HeroService and injects it into any class that asks for it - optimizing app by removing the service if it's not used at all too
  // adding this to the root app injector makes it available throughout app, available to all classes  as long as they have lookup token 
})
export class HeroService {

  // parameter declares private messageService property which will inject the singleton MessageService into that property when it creates HeroService
  // typical "service in service" scenario: injecting MessageService into HeroService into HeroesComponent
  constructor(private messageService: MessageService) { }

  // add getHeroes method to return the mock heroes
// HeroService.getHeroes() method has a synchronous signature, implying - HeroService can fetch heroes synchronously
  // getHeroes(): Hero[] { 
  //   return HEROES; }

  // P4. replace getHeroes() with:
  // getHeroes() send a message when heroes are fetched
  getHeroes(): Observable<Hero[]> {
    // of(HEROES) returns and Observable<Hero[]> that emits a single value (an array of mock heroes)
    const heroes = of(HEROES);
    // P4 Send message from heroService:
    this.messageService.add('UploadPictureService: upload picture')
    return heroes;
  }
  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists
    // Error handling will be added in the next step of the tutorial
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
