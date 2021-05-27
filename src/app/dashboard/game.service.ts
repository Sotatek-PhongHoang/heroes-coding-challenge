import { Injectable } from '@angular/core';
import Konva from 'konva';
import { BehaviorSubject } from 'rxjs';
import { Hero } from '../hero';

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

  constructor() { }
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
      innerRadius: radius - 3,
      outerRadius: radius,
      fill: color,
      strokeWidth: 0
    })
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
      y: 20
    });
    
    // const circlebg = this.drawRing(x, y, imgWidth / 2, COLOR_HEALTH.BACKGROUND);
    const colorHealth = hero.health >= 50 ? COLOR_HEALTH.SAFE : COLOR_HEALTH.DANGER;
    const circle = this.drawRing(x, y, imgWidth / 2, colorHealth);

    heroHroup.add(imageGroup, circle);
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
