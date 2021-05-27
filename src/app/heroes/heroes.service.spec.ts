
import { TestBed } from '@angular/core/testing';
import { Hero } from '../core/interface/hero';
import { HeroService } from './hero.service';
import { HEROES } from './mock-heroes';


describe('Weapon service', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return mock weapon array', () => {
    service.getHeroes().subscribe((heroes: Hero[]) => {
      expect(heroes).toEqual(HEROES);
    })
  });

  it('should be return weapon detail', () => {
    const mockHero = HEROES[0];
    service.getHero(mockHero.id).subscribe((hero: Hero | undefined) => {
      expect(hero).toEqual(mockHero);
    })
  })

  it('should be return undefined', () => {
    service.getHero(-1).subscribe((hero: Hero | undefined) => {
      expect(hero).toEqual(undefined);
    })
  })
});
