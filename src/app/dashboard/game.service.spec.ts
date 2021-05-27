import { GameService } from './game.service';
import { TestBed } from '@angular/core/testing';
import Konva from 'konva';
import { HEROES } from '../mock-heroes';

describe('Game service', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should draw konva ring', () => {
    expect(service.drawRing(0, 0, 50, 'red')).toEqual(jasmine.any(Konva.Ring));
  });

  it('should draw konva group hero', () => {
    const exHero = HEROES[0];
    const layer = new Konva.Layer();
    expect(service.drawHero(exHero, 0, 0, 100, 100, layer)).toEqual(jasmine.any(Konva.Group));
  });

  it('should draw konva group background', () => {
    const layer = new Konva.Layer();
    expect(service.drawBackground(100, 100, '', layer)).toEqual(jasmine.any(Konva.Group));
  });
});
