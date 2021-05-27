import { Injectable } from '@angular/core';
import Konva from 'konva';
import { BehaviorSubject } from 'rxjs';
import { Hero } from '../core/interface/hero';

const COLOR_HEALTH = {
  SAFE: '#198754',
  DANGER: '#dc3545',
  BACKGROUND: '#ccc'
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  heroesPlaying = new BehaviorSubject<Hero[]>([]);
  updateGame = new BehaviorSubject<boolean>(false);
  drawAgain = false;

  constructor() { }

  updateHeroesPlaying(hero: Hero[], drawAgain?: boolean) {
    this.drawAgain = !!drawAgain;
    this.heroesPlaying.next(hero);
  }

  /**
   * Draw a ring
   * @param x: x position
   * @param y: y position
   * @param radius: radius of outer ring
   * @param color: color ring
   * @returns Konva Ring object
   */
  drawRing(x: number, y: number, radius: number, color: string): Konva.Ring {
    return new Konva.Ring({
      x,
      y,
      innerRadius: radius - 6,
      outerRadius: radius,
      fill: color,
      strokeWidth: 0
    })
  }

  /**
   * draw a konva arc
   * @param x 
   * @param y 
   * @param radius 
   * @param color 
   * @param angle 
   * @param id 
   * @returns 
   */
  drawArc(x: number, y: number, radius: number, color: string, angle: number, id: string) {
    return new Konva.Arc({
      x,
      y,
      innerRadius: radius - 6,
      outerRadius: radius,
      angle,
      fill: color,
      strokeWidth: 0,
      rotation: -90,
      clockwise: true,
      id
    });
  }

  /**
   * get angle of arc
   * @param number 
   * @param total 
   * @returns 
   */
  getAngle(number: number, total: number, ratio: number) {
    return number / total * 360 * ratio;
  }

  /**
   * draw an image
   * @param imageSrc 
   * @param config
   * @param group 
   * @param layer 
   */
  drawImage(imageSrc: string, config: {x: number, y: number, width: number, height: number}, group: Konva.Group, layer: Konva.Layer) {
    Konva.Image.fromURL(imageSrc, (image: any) => {
      image.setAttrs(config);
      group.add(image);
      layer.batchDraw();
    });
  }

  /**
   * Draw a hero to canvas
   * @param hero: hero object
   * @param x: x position
   * @param y: y position
   * @param imgWidth: image width
   * @param imgHeight: image height
   * @returns: hero as Konva group
   */
  drawHero(hero: Hero, x: number, y: number, imgWidth: number, imgHeight: number, layer: Konva.Layer): Konva.Group {
    const heroGroupId = `hero-${hero.id}`;
    const imageGroup = new Konva.Group({
      clipFunc: (ctx) => {
        ctx.arc(x, y, imgWidth / 2, 0, Math.PI * 2, false);
        ctx.arc(x, y, imgWidth / 2, 0, Math.PI * 2, false);
      }
    });

    const imageConfig = {
      x: x - imgWidth / 2,
      y: y - imgHeight / 2,
      width: imgWidth,
      height: imgHeight
    };
    this.drawImage(hero.imageSrc, imageConfig, imageGroup, layer);

    const heroHroup = new Konva.Group({
      x: 20,
      y: 20,
      id: heroGroupId 
    });
    
    const circlebg = this.drawRing(x, y, imgWidth / 2, COLOR_HEALTH.BACKGROUND);
    const colorHealth = hero.playingHealth! >= 50 ? COLOR_HEALTH.SAFE : COLOR_HEALTH.DANGER;
    const angle = this.getAngle(hero.playingHealth!, hero.health + hero.armour.health, -1);
    const circle = this.drawArc(x, y, imgWidth / 2, colorHealth, angle, `${heroGroupId}-arc`);

    heroHroup.add(imageGroup, circlebg, circle);
    return heroHroup;
  }

  /**
   * draw background of canvas
   * @param width
   * @param height 
   * @param imageSrc 
   * @param layer 
   * @returns 
   */
  drawBackground(width: number, height: number, imageSrc: string, layer: Konva.Layer): Konva.Group {
    const imageGroup = new Konva.Group({
      x: 0,
      y: 0
    });
    const imageConfig = {
      x: 0,
      y: 0,
      width,
      height
    };
    this.drawImage(imageSrc, imageConfig, imageGroup, layer);

    return imageGroup;
  }
}
