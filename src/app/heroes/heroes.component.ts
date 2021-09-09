// always import Component from Angular core library 
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// importing mock heroes
import { HEROES } from '../mock-heroes';


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
  // first, hero is a string
  // hero = 'Windstorm';
  
  // changed to hero is an object
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  // <li *ngFor="let hero of heroes"> replaces the hard coding of Windstorm - 

  heroes = HEROES;
  // '?' what is this again?
  // rename component's hero property to selectedHero but don't assign it, no selected hero when app starts
  selectedHero?: Hero;

  constructor() { }

  // lifecycle hook - it's a good place for a component to fetch its initial data (initialization logic)
  // ngOnInit(): void {
  // }
  ngOnInit() {
  }

  // onSelect() method assigns the clicked hero from the template to the component's selectedHero
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
