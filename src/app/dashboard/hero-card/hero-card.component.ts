import { Weapon } from 'src/app/core/interface/weapon';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from 'src/app/core/interface/hero';
import { Armour } from 'src/app/core/interface/armour';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent {
  @Input() hero: Hero | undefined;
  @Input() weapons: Weapon[] | undefined;
  @Input() armours: Armour[] | undefined;
  @Input() isActive: boolean = false;
  @Output() toggleHero = new EventEmitter<boolean>();
  @Output() updateWeapon = new EventEmitter<number>();
  @Output() updateArmour = new EventEmitter<number>();

  /**
   * handle click on select | armour
   * @param e 
   */
   clickSelect(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  changeWeapon(e: any): void {
    this.updateWeapon.emit(+e.target.value);
  }

  changeArmour(e: any): void {
    this.updateArmour.emit(+e.target.value);
  }
}
