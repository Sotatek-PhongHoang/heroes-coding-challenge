import { Armour } from './armour';
import { Weapon } from './weapon';
export interface Hero {
  id: number;
  name: string;
  health: number;
  weapon: Weapon;
  armour: Armour;
  imageSrc: string;
  playingHealth?: number;
}
