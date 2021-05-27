import { ARMOURS } from './armour/mock-armour';
import { Hero } from './hero';
import { WEAPONS } from './weapon/mock-weapons';

export const HEROES: Hero[] = [
  { id: 11, name: 'Dr Nice', health: 100, weapon: WEAPONS[0], armour: ARMOURS[0], imageSrc: '../../assets/images/hero1.png' },
  { id: 12, name: 'Narco', health: 80, weapon: WEAPONS[0], armour: ARMOURS[0], imageSrc: '../../assets/images/hero2.png' },
  { id: 13, name: 'Bombasto', health: 90, weapon: WEAPONS[1], armour: ARMOURS[1], imageSrc: '../../assets/images/hero3.png' },
  { id: 14, name: 'Celeritas', health: 110, weapon: WEAPONS[2], armour: ARMOURS[2], imageSrc: '../../assets/images/hero4.png' },
  { id: 15, name: 'Magneta', health: 100, weapon: WEAPONS[1], armour: ARMOURS[1], imageSrc: '../../assets/images/hero5.png' },
  { id: 16, name: 'RubberMan', health: 100, weapon: WEAPONS[3], armour: ARMOURS[3], imageSrc: '../../assets/images/hero6.png' },
  { id: 17, name: 'Dynama', health: 100, weapon: WEAPONS[1], armour: ARMOURS[1], imageSrc: '../../assets/images/hero7.png' },
  { id: 18, name: 'Dr IQ', health: 100, weapon: WEAPONS[0], armour: ARMOURS[0], imageSrc: '../../assets/images/hero8.png' },
  { id: 19, name: 'Magma', health: 100, weapon: WEAPONS[4], armour: ARMOURS[2], imageSrc: '../../assets/images/hero9.png' },
  { id: 20, name: 'Tornado', health: 100, weapon: WEAPONS[0], armour: ARMOURS[0], imageSrc: '../../assets/images/hero10.png' }
];
