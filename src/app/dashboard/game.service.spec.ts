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

  describe('Check function draw ring', () => {
    it('Check Outer radius is bigger than inner radius', () => {
      const konvaRing = service.drawRing(100, 100, 100, '#ccc');
      expect(konvaRing.outerRadius() > konvaRing.innerRadius()).toBe(true);
    });

    it('Check Outer radius is 6 units bigger than inner radius', () => {
      const konvaRing = service.drawRing(100, 100, 100, '#ccc');
      expect(konvaRing.outerRadius() - konvaRing.innerRadius()).toEqual(6);
    });

    it('Check Outer radius at least 6', () => {
      const konvaRing = service.drawRing(100, 100, 5, '#ccc');
      expect(konvaRing.outerRadius()).toEqual(6);
    });

    it('Check Inner radius is not negative', () => {
      const konvaRing = service.drawRing(100, 100, 5, '#ccc');
      expect(konvaRing.outerRadius()).toBeGreaterThanOrEqual(0);
    });
  })

  describe('Check function draw arc', () => {
    it('Check Outer radius is bigger than inner radius', () => {
      const konvaArc = service.drawArc(100, 100, 100, '#ccc', 180, 'id');
      expect(konvaArc.outerRadius() > konvaArc.innerRadius()).toBe(true);
    });

    it('Check Outer radius is 6 units bigger than inner radius', () => {
      const konvaArc = service.drawArc(100, 100, 100, '#ccc', 180, 'id');
      expect(konvaArc.outerRadius() - konvaArc.innerRadius()).toEqual(6);
    });

    it('Check Outer radius at least 6', () => {
      const konvaArc = service.drawArc(100, 100, 3, '#ccc', 180, 'id');
      expect(konvaArc.outerRadius()).toEqual(6);
    });

    it('Check Inner radius is not negative', () => {
      const konvaArc = service.drawArc(100, 100, 3, '#ccc', 180, 'id');
      expect(konvaArc.outerRadius()).toBeGreaterThanOrEqual(0);
    });
  })
});
