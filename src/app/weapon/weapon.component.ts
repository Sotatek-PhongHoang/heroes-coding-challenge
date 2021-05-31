import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseWearable } from '../base-wearable/base-wearable';
import { Weapon } from '../core/interface/weapon';
import { WeaponService } from './weapon.service';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit, BaseWearable, OnDestroy {
  weapons: Weapon[] = [];
  $unSubscribe = new Subject();

  constructor(private weaponService: WeaponService) { }
  
  ngOnInit() {
    this.getList();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
  }


  /**
   * get weapons list for show weapon list
   */
  getList(): void {
    this.weaponService.getWeapons()
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe(weapons => this.weapons = weapons);
  }
}
