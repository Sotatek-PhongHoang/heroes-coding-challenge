import { Component, OnInit } from '@angular/core';
import { Armour } from '../core/interface/armour';
import { ArmourService } from './armour.service';

@Component({
  selector: 'app-armour',
  templateUrl: './armour.component.html',
  styleUrls: ['./armour.component.css']
})
export class ArmourComponent implements OnInit {
  armours: Armour[] | undefined;

  constructor(
    private readonly armourService: ArmourService
  ) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  /**
   * get armours
   */
   getWeapons(): void {
    this.armourService.getArmours()
    .subscribe((armours: Armour[]) => this.armours = armours);
  }
}
