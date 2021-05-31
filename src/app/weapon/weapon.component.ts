import { Component, OnInit } from '@angular/core';
import { BaseWearable } from '../base-wearable/base-wearable';
import { Weapon } from '../core/interface/weapon';
import { WeaponService } from './weapon.service';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit, BaseWearable {
  weapons: Weapon[] = [];

  constructor(private weaponService: WeaponService) { }

  ngOnInit() {
    this.getList();
  }

  /**
   * get weapons list for show weapon list
   */
  getList(): void {
    this.weaponService.getWeapons()
    .subscribe(weapons => this.weapons = weapons);
  }
}
