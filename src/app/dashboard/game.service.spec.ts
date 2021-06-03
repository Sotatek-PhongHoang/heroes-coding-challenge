import { GameService } from './game.service';
import { TestBed } from '@angular/core/testing';
import Konva from 'konva';
import { HEROES } from '../heroes/mock-heroes';

describe('Game service', () => {
  let service: GameService;
  const layer = new Konva.Layer();
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('Init game service', () => {
    expect(service).toBeTruthy();
  });
  
  describe('Get angle for draw arc', () => {
    it('Get all circle', () => {
      expect(service.getAngle(100, 100, 1)).toEqual(360);
    });

    it('Get all circle follow counter-clockwise', () => {
      expect(service.getAngle(100, 100, -1)).toEqual(-360);
    });

    it('Get a half circle', () => {
      expect(service.getAngle(50, 100, 1)).toEqual(180);
    });

    it('Get a quarter circle', () => {
      expect(service.getAngle(25, 100, 1)).toEqual(90);
    });

    it('Get angle is rezo', () => {
      expect(service.getAngle(0, 100, 1)).toEqual(0);
    });
  });
});
