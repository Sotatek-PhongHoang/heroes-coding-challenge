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

  it('Draw a konva ring', () => {
    expect(service.drawRing(0, 0, 50, 'red')).toEqual(jasmine.any(Konva.Ring));
  });

  it('Draw a konva hero group', () => {
    const exHero = HEROES[0];
    expect(service.drawHero(exHero, 0, 0, 100, 100, layer)).toEqual(jasmine.any(Konva.Group));
  });

  it('Draw a konva group background', () => {
    expect(service.drawBackground(100, 100, '', layer)).toEqual(jasmine.any(Konva.Group));
  });

  it('Draw a konva Arc', () => {
    expect(service.drawArc(50, 50, 50, 'red', 180, 'id')).toEqual(jasmine.any(Konva.Arc));
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
