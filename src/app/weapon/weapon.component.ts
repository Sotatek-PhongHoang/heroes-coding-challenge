import { Component, OnInit } from '@angular/core';
import { Weapon } from '../core/interface/weapon';
import { WeaponService } from './weapon.service';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit {
  weapons: Weapon[] = [];

  constructor(private weaponService: WeaponService) { }

  ngOnInit() {
    this.getWeapons();
  }

  /**
   * get weapons
   */
  getWeapons(): void {
    this.weaponService.getWeapons()
    .subscribe(weapons => this.weapons = weapons);
  }
}
