import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../../core/interface/hero';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeaponService } from 'src/app/weapon/weapon.service';
import { Weapon } from 'src/app/core/interface/weapon';
import { ArmourService } from 'src/app/armour/armour.service';
import { Armour } from 'src/app/core/interface/armour';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  hero: Hero | undefined;
  weapons: Weapon[] | undefined;
  armours: Armour[] | undefined;
  $unSubscribe = new Subject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly heroService: HeroService,
    private readonly location: Location,
    private readonly weaponService: WeaponService,
    private readonly armourService: ArmourService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
    this.getArmours();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  /**
   * get weapons list for weapon select
   */
   getWeapons(): void {
    this.weaponService.getWeapons()
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(weapons => this.weapons = weapons);
  }

  /**
   * get armours list armour select
   */
   getArmours(): void {
    this.armourService.getArmours()
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe((armours: Armour[]) => this.armours = armours);
  }

  /**
   * handle change hero weapon
   * @param e 
   */
  changeWeapon(e: any) {
    const id = +e.target.value;
    const weapon = this.weapons?.find((ele: Weapon) => ele.id === id);
    this.heroService.updateHero({...this.hero, weapon} as Hero).subscribe((hero: Hero | undefined) => {
      this.afterHeroUpdated('weapon', hero);
    });
  }

  /**
   * handle change hero armour
   * @param e 
   */
   changeArmour(e: any) {
    const id = +e.target.value;
    const armour = this.armours?.find((ele: Armour) => ele.id === id);
    this.heroService.updateHero({...this.hero, armour} as Hero).subscribe((hero: Hero | undefined) => {
      this.afterHeroUpdated('armour', hero);
    });
  }

  afterHeroUpdated(wearable: string, hero: Hero | undefined) {
    if (hero) {
      this.hero = hero;
      this.messageService.add(`Hero Service: Update ${this.hero?.name} ${wearable} success`)
    } else {
      this.messageService.add(`Hero Service: Update ${this.hero?.name} ${wearable} error`)
    }
  }
}
