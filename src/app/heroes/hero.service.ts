import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HEROES } from './mock-heroes';
import { MessageService } from '../message.service';
import { Hero } from '../core/interface/hero';

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero | undefined> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    if (!!hero) {
      this.messageService.add(`HeroService: fetched hero id=${id}`);
    } else {
      this.messageService.add(`HeroService: Hero id=${id} not found`);
    }
    return of(hero);
  }
}