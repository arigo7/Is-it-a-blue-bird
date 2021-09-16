// hero property must be an Input property, annotated with the @Input() decorator, because the external HeroesComponent will bind to it, so we need to import Input
import { Component, OnInit, Input } from '@angular/core';
// P3. template binds to the component's hero property which is of type Hero.
import { Hero } from '../hero';
//  P5 for the Routable HeroDetailComponent
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../heroes/hero.service';

// This component only receives a hero object through its hero property and displays it.
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  // HeroDetailComponent template (html) binds to the component's hero property which is of type Hero.
  // hero property, preceded by the @Input() decorator
  // hero property must be an Input property  (@Input() in front of it), because the external HeroesComponent will bind to it like this 
  // <app-hero-detail [hero]="selectedHero"></app-hero-detail>
  @Input() hero?: Hero;

  // P5 inject the ActivatedRoute, HeroService, and Location services into the constructor, saving their values in private fields:
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back()
  }

}
