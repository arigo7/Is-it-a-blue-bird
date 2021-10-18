// always import Component from Angular core library 
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from './hero.service';

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
  // with this declaration
  heroes: Hero[] = [];

  // Add private heroService parameter of type HeroService to constructor
  // could call getHeroes() in constructor but it's not best practice - reserve constructor for minimal initialization (wiring constructor parameters to properties)
  // constructor shouldn't do anything, specially calling a function that makes HTTP requests to a remote server as a real data service would
  // private heroService: HeroService is the dependency injection token (this is the way to inject the class aka class dependency)

  //  P5 - pronniing away dead code
  constructor(private heroService: HeroService 
    ) { }


  // lifecycle hook - it's a good place for a component to fetch its initial data (initialization logic)
  // ngOnInit(): void {
  // }
  // P4. call getHeroes() inside ngOnInit which then Angular will call at appropriate time after constructing HeroesComponent instance
  ngOnInit() {
    this.getHeroes();
  }


  // P4 method retrieves heroes from service
  // synchronous signature - (meaning)  HeroService fetches heroes synchronously  and HeroesComponent consumes getHeroes() result as if heroes could be fetched synchronously        

  // Observable.subscribe() is the critical difference
  // waits for the Observable to emit the array of heroes (could happen now, or several min from now)
  // subscribe() passes the emitted array to the callback, which sets the component's heroes property 
  // asynchronous approach will work when HeroService requests heroes from server

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes)
  }
  

}
