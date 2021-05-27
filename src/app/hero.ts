import { Armour } from './core/interface/armour';
import { Weapon } from './core/interface/weapon';
export interface Hero {
  id: number;
  name: string;
  health: number;
  weapon: Weapon;
  armour: Armour;
  imageSrc: string;
}
