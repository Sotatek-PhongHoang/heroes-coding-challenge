import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Weapon } from 'src/app/core/interface/weapon';
import { WeaponService } from '../weapon.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit, OnDestroy {
  weapon: Weapon | undefined;
  $unSubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWeapon();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
  }

  /**
   * get weapon detail
   */
  getWeapon(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.weaponService.getWeapon(id)
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(weapon => this.weapon = weapon);
  }

  goBack(): void {
    this.location.back();
  }
}
