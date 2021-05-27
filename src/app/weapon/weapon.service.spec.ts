
import { TestBed } from '@angular/core/testing';
import { Weapon } from '../core/interface/weapon';
import { WEAPONS } from './mock-weapons';
import { WeaponService } from './weapon.service';

describe('Weapon service', () => {
  let service: WeaponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeaponService);
  });

  it('Init weapon service', () => {
    expect(service).toBeTruthy();
  });

  it('Get weapon list', () => {
    service.getWeapons().subscribe((weapons: Weapon[]) => {
      expect(weapons).toEqual(WEAPONS);
    })
  });

  describe('Get weapon detail', () => {
    it('Get weapon detail by existed id', () => {
      const mockWeapon = WEAPONS[0];
      service.getWeapon(mockWeapon.id).subscribe((weapon: Weapon | undefined) => {
        expect(weapon).toEqual(mockWeapon);
      })
    })
  
    it('Get weapon detail by not existed id', () => {
      service.getWeapon(-1).subscribe((weapon: Weapon | undefined) => {
        expect(weapon).toEqual(undefined);
      })
    })
  })
});
