import { ARMOURS } from './mock-armour';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Armour } from '../core/interface/armour';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class ArmourService {

  constructor(
    private readonly messageService: MessageService
  ) { }

  /**
   * get armour list
   * @returns armour list
   */
  getArmours(): Observable<Armour[]> {
    const armours = of(ARMOURS);
    this.messageService.add('Armour Service: fetched armours');
    return armours;
  }

  /**
   * get armour detail
   * @param id: armour id
   * @returns armour detail
   */
  getArmour(id: number): Observable<Armour | undefined> {
    const armour = ARMOURS.find(ele => ele.id === id)!;
    if (!!armour) {
      this.messageService.add(`Armour Service: fetched armour id=${id}`);
    } else {
      this.messageService.add(`Armour Service: Armour id=${id} not found`);
    }
    
    return of(armour);
  }
}
