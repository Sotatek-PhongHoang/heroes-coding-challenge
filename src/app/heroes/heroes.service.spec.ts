
import { TestBed } from '@angular/core/testing';
import { Hero } from '../core/interface/hero';
import { HeroService } from './hero.service';
import { HEROES } from './mock-heroes';


describe('Heroes service', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('Init heroes service', () => {
    expect(service).toBeTruthy();
  });

  it('Get hero list', () => {
    service.getHeroes().subscribe((heroes: Hero[]) => {
      expect(heroes).toEqual(HEROES);
    })
  });

  describe('Get hero detail', () => {
    it('Get hero detail by existed id', () => {
      const mockHero = HEROES[0];
      service.getHero(mockHero.id).subscribe((hero: Hero | undefined) => {
        expect(hero).toEqual(mockHero);
      })
    })
  
    it('Get hero detail by not existed id', () => {
      service.getHero(-1).subscribe((hero: Hero | undefined) => {
        expect(hero).toEqual(undefined);
      })
    })
  })
});
