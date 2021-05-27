import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Weapon } from '../core/interface/weapon';
import { cloneData } from '../core/utils/utils';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { WeaponService } from '../weapon/weapon.service';
import { GameService } from './game.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  weapons: Weapon[] = [];
  heroesPlaying: Hero[] = [];
  $unSubscribe = new Subject();

  constructor(
    private readonly heroService: HeroService,
    private readonly weaponService: WeaponService,
    private readonly gameService: GameService,
    private readonly messageService: MessageService
  ) { }

  ngOnInit() {
    this.heroesPlaying = this.gameService.heroesPlaying.value || [];
    this.getHeroes();
    this.getWeapons();
    this.gameService.heroesPlaying
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe((heroes: Hero[]) => {
      this.heroesPlaying = heroes;
    });
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
  }

  /**
   * get heroes
   */
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  /**
   * get weapons
   */
  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  /**
   * check hero active
   * @param id: hero id
   * @returns: is active
   */
  isActive(id: number): boolean {
    return !!this.heroesPlaying.find(hero => hero.id === id);
  }

  /**
   * Toggle hero playing
   * @param status: is playing
   * @param id: hero id
   */
  toggleHero(status: boolean, hero: Hero): void {
    if (status) {
      const heroClone: Hero = cloneData(hero);
      heroClone.playingHealth =  heroClone.health + heroClone.armour?.health;
      this.heroesPlaying.push(heroClone);
      this.messageService.add(`Dashboard: Adding hero ${heroClone.name}`);
    } else {
      this.heroesPlaying = this.heroesPlaying.filter(ele => ele.id !== hero.id);
      this.messageService.add(`Dashboard: Remove hero ${hero.name}`);
    }
    this.gameService.updateHeroesPlaying(this.heroesPlaying, true);
  }

  /**
   * update weapon
   * @param id 
   * @param index 
   */
  updateWeapon(id: number, index: number): void {
    const weapon = this.weapons.find((ele: Weapon) => ele.id === id);
    if (weapon) {
      this.heroes[index].weapon = weapon;
      const hero = this.heroesPlaying.find((hero: Hero) => hero.id === this.heroes[index].id);
      if (hero) {
        hero.weapon = weapon;
        this.gameService.updateGame.next(true);
        this.gameService.updateHeroesPlaying(this.heroesPlaying, true)
      }
      this.messageService.add(`Dashboard: Update ${this.heroes[index].name}'s weapon to ${weapon.name}`)
    }
  }
}
