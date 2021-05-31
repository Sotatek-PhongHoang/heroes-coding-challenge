import { Component, OnDestroy, OnInit } from '@angular/core';
import { Armour } from '../core/interface/armour';
import { BaseWearable } from '../base-wearable/base-wearable';
import { ArmourService } from './armour.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-armour',
  templateUrl: './armour.component.html',
  styleUrls: ['./armour.component.css']
})
export class ArmourComponent implements OnInit, BaseWearable, OnDestroy {
  armours: Armour[] | undefined;
  $unSubscribe = new Subject();

  constructor(
    private readonly armourService: ArmourService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
  }

  /**
   * get armours list for show armours list
   */
   getList(): void {
    this.armourService.getArmours()
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe((armours: Armour[]) => this.armours = armours);
  }
}
