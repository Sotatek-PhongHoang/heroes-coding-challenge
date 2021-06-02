import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Weapon } from '../core/interface/weapon';
import { cloneData } from '../core/utils/utils';
import { Hero } from '../core/interface/hero';
import { WeaponService } from '../weapon/weapon.service';
import { GameService } from './game.service';
import { MessageService } from '../message.service';
import { HeroService } from '../heroes/hero.service';
import { Armour } from '../core/interface/armour';
import { ArmourService } from '../armour/armour.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  weapons: Weapon[] = [];
  armours: Armour[] = [];
  $unSubscribe = new Subject();

  constructor(
    private readonly heroService: HeroService,
    private readonly weaponService: WeaponService,
    public readonly gameService: GameService,
    private readonly messageService: MessageService,
    private readonly armourService: ArmourService
  ) { }

  ngOnInit() {
    this.getHeroes();
    this.getWeapons();
    this.getArmours();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
    this.gameService.heroesPlaying = [];
  }

  /**
   * get heroes
   */
  getHeroes(): void {
    this.heroService.getHeroes()
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(heroes => this.heroes = heroes);
  }

  /**
   * get weapons
   */
  getWeapons(): void {
    this.weaponService.getWeapons()
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(weapons => this.weapons = weapons);
  }

  /**
   * check hero active
   * @param id: hero id
   * @returns: is active
   */
  isActive(id: number): boolean {
    return !!this.gameService.heroesPlaying.find(hero => hero.id === id);
  }

  /**
   * Toggle hero playing
   * @param status: is playing
   * @param id: hero id
   */
  toggleHero(status: boolean, hero: Hero): void {
    if (status) {
      this.gameService.addHeroPlaying(hero);
      this.messageService.add(`Dashboard: Adding hero ${hero.name}`);
    } else {
      this.gameService.removeHeroPlaying(hero);
      this.messageService.add(`Dashboard: Remove hero ${hero.name}`);
    }
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
      this.gameService.heroesPlaying.forEach((hero: Hero) => {
        if (hero.id === this.heroes[index].id) {
          hero.weapon = weapon;
        }
      })
    }
  }

  /**
   * get armours list armour select
   */
  getArmours(): void {
    this.armourService.getArmours()
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe((armours: Armour[]) => this.armours = armours);
  }
}
