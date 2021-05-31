import { Component, OnInit } from '@angular/core';
import { Armour } from '../core/interface/armour';
import { BaseWearable } from '../base-wearable/base-wearable';
import { ArmourService } from './armour.service';

@Component({
  selector: 'app-armour',
  templateUrl: './armour.component.html',
  styleUrls: ['./armour.component.css']
})
export class ArmourComponent implements OnInit, BaseWearable {
  armours: Armour[] | undefined;

  constructor(
    private readonly armourService: ArmourService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  /**
   * get armours list for show armours list
   */
   getList(): void {
    this.armourService.getArmours()
    .subscribe((armours: Armour[]) => this.armours = armours);
  }
}
