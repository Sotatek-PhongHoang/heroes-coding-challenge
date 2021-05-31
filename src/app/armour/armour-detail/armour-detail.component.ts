import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Armour } from 'src/app/core/interface/armour';
import { ArmourService } from '../armour.service';

@Component({
  selector: 'app-armour-detail',
  templateUrl: './armour-detail.component.html',
  styleUrls: ['./armour-detail.component.css']
})
export class ArmourDetailComponent implements OnInit, OnDestroy {
  armour: Armour | undefined;
  $unSubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private armourService: ArmourService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getArmour();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
  }

  /**
   * get armour detail
   */
  getArmour(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.armourService.getArmour(id)
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(armour => this.armour = armour);
  }

  goBack(): void {
    this.location.back();
  }
}
