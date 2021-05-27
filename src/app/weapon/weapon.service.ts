import { WEAPONS } from './mock-weapons';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Weapon } from '../core/interface/weapon';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(private readonly messageService: MessageService) { }

  /**
   * get weapon list
   * @returns weapon list
   */
  getWeapons(): Observable<Weapon[]> {
    const weapons = of(WEAPONS);
    this.messageService.add('WeaponService: fetched weapons');
    return weapons;
  }

  /**
   * get weapon detail
   * @param id weapon id
   * @returns weapon detail
   */
  getWeapon(id: number): Observable<Weapon | undefined> {
    const weapon = WEAPONS.find(ele => ele.id === id)!;
    if (!!weapon) {
      this.messageService.add(`WeaponService: fetched weapon id=${id}`);
    } else {
      this.messageService.add(`WeaponService: Weapon id=${id} not found`);
    }
    
    return of(weapon);
  }
}
