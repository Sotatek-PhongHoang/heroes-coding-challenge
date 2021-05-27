
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return mock weapon array', () => {
    service.getWeapons().subscribe((weapons: Weapon[]) => {
      expect(weapons).toEqual(WEAPONS);
    })
  });

  it('should be return weapon detail', () => {
    const mockWeapon = WEAPONS[0];
    service.getWeapon(mockWeapon.id).subscribe((weapon: Weapon | undefined) => {
      expect(weapon).toEqual(mockWeapon);
    })
  })

  it('should be return undefined', () => {
    service.getWeapon(-1).subscribe((weapon: Weapon | undefined) => {
      expect(weapon).toEqual(undefined);
    })
  })
});
