// class is similar to the HeroesComponent class

import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../heroes/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

// defines a heroes array property
heroes: Hero[] = [];

  // The constructor expects Angular to inject the HeroService into a private heroService property
  constructor(private heroService: HeroService
    ) { }

  // ngOnInit() lifecycle hook calls getHeroes()
  ngOnInit() {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
  }


