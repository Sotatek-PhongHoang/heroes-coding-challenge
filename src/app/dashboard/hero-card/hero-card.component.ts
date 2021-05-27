import { Weapon } from 'src/app/core/interface/weapon';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from 'src/app/hero';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent {
  @Input() hero: Hero | undefined;
  @Input() weapons: Weapon[] | undefined;
  @Input() isActive: boolean = false;
  @Output() toggleHero = new EventEmitter<boolean>();
  @Output() updateWeapon = new EventEmitter<number>()

  /**
   * handle click on select weapon
   * @param e 
   */
  clickWeapon(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  changeWeapon(e: any): void {
    this.updateWeapon.emit(+e.target.value);
  }
}
