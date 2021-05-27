
import { TestBed } from '@angular/core/testing';
import { Armour } from '../core/interface/armour';
import { ArmourService } from './armour.service';
import { ARMOURS } from './mock-armour';

describe('Game service', () => {
  let service: ArmourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return mock armour array', () => {
    service.getArmours().subscribe((armours: Armour[]) => {
      expect(armours).toEqual(ARMOURS);
    })
  });

  it('should be return armour detail', () => {
    const mockArmour = ARMOURS[0];
    service.getArmour(mockArmour.id).subscribe((armour: Armour | undefined) => {
      expect(armour).toEqual(mockArmour);
    })
  })

  it('should be return undefined', () => {
    service.getArmour(-1).subscribe((armour: Armour | undefined) => {
      expect(armour).toEqual(undefined);
    })
  })
});
