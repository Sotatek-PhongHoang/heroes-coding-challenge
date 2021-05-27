
import { TestBed } from '@angular/core/testing';
import { Armour } from '../core/interface/armour';
import { ArmourService } from './armour.service';
import { ARMOURS } from './mock-armour';

describe('Armour service', () => {
  let service: ArmourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmourService);
  });

  it('Init armour service', () => {
    expect(service).toBeTruthy();
  });

  it('Get armour list', () => {
    service.getArmours().subscribe((armours: Armour[]) => {
      expect(armours).toEqual(ARMOURS);
    })
  });

  describe('Get detail armour by id', () => {
    it('Get armour detail by existed id', () => {
      const mockArmour = ARMOURS[0];
      service.getArmour(mockArmour.id).subscribe((armour: Armour | undefined) => {
        expect(armour).toEqual(mockArmour);
      })
    })
  
    it('Get armour detail by not existed id', () => {
      service.getArmour(-1).subscribe((armour: Armour | undefined) => {
        expect(armour).toEqual(undefined);
      })
    })
  })
});
