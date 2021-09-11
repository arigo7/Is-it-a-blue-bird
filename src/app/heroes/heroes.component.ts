// always import Component from Angular core library 
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// importing mock heroes
// P4 delete this because HeroService substitutes it (with injection)
// import { HEROES } from '../mock-heroes';

import { HeroService } from './hero.service';
// to send and display msg each time user clicks on a hero, showing history of user's selections - which will help with Routing

import { MessageService } from '../message.service';




// and annotate Component class with @Component which is a decorator function that specifies teh Angular metadata for the component
@Component({
  // app-heroes matches the name o HTML element that ids component within a parent component's template
  // metadata properties for the component
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

// always export component class so it can be imported elsewhere
export class HeroesComponent implements OnInit {
  
  // '?' what is this again?
  // rename component's hero property to selectedHero but don't assign it, no selected hero when app starts
  selectedHero?: Hero;

  // first, hero is a string
  // hero = 'Windstorm';
  
  // changed to hero is an object
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  // <li *ngFor="let hero of heroes"> replaces the hard coding of Windstorm - 

  // P4 Replacing this definition of  heroes property (HEROES mock-heroes.ts)
  // heroes = HEROES;

  // with this declaration
  heroes: Hero[] = [];



  // Add private heroService parameter of type HeroService to constructor
  // could call getHeroes() in constructor but it's not best practice - reserve constructor for minimal initialization (wiring constructor parameters to properties)
  // constructor shouldn't do anything, specially calling a function that makes HTTP requests to a remote server as a real data service would
  // private heroService: HeroService is the dependency injection token (this is the way to inject the class aka class dependency)
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  // lifecycle hook - it's a good place for a component to fetch its initial data (initialization logic)
  // ngOnInit(): void {
  // }
  // P4. call getHeroes() inside ngOnInit which then Angular will call at appropriate time after constructing HeroesComponent instance
  ngOnInit() {
    this.getHeroes();
  }

  // onSelect() method assigns the clicked hero from the template to the component's selectedHero
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  // P4 method retrieves heroes from service
  // synchronous signature - (meaning)  HeroService fetches heroes synchronously  and HeroesComponent consumes getHeroes() result as if heroes could be fetched synchronously        
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  // Observable.subscribe() is the critical difference
  // waits for the Observable to emit the array of heroes (could happen now, or several min from now)
  // subscribe() passes the emitted array to the callback, which sets the component's heroes property 
  // asynchronous approach will work when HeroService requests heroes from server

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes)
  }
  

}
