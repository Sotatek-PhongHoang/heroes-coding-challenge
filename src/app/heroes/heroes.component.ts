import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Hero } from '../core/interface/hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  $unSubscribe = new Subject();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe(heroes => this.heroes = heroes);
  }
}
