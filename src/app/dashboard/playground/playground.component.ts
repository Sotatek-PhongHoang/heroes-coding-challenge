import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Konva from 'konva';
import { fromEvent, Subject } from 'rxjs';
import { Hero } from 'src/app/core/interface/hero';
import { GameService } from '../game.service';
import { takeUntil } from 'rxjs/operators';
import { cloneData } from 'src/app/core/utils/utils';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('playground') playgroundRef!: ElementRef;
  stage: Konva.Stage | undefined;
  layer: Konva.Layer | undefined;
  layerBg: Konva.Layer | undefined;
  imageSize = {
    width: 0,
    height: 0
  };
  playGroundSize = {
    width: 0,
    height: 0
  }
  $unSubscribe = new Subject();
  numberCol = 5; // number hero in row
  gameInterval: any;
  isPlaying: boolean = false;

  constructor(
    private readonly gameService: GameService,
    private readonly messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.gameService.$addHeroPlaying
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe((hero: Hero) => {
      const { width, height } = this.imageSize;
      const x = Math.floor(Math.random() * (this.playGroundSize.width - width)) + (width / 2);
      const y = Math.floor(Math.random() * (this.playGroundSize.height - height)) + (width / 2);
      this.layer?.add(this.gameService.drawHero(hero, x, y, width, height, this.layer));
      this.initGame();
    });

    this.gameService.$removeHeroPlaying
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe((hero: Hero) => {
      (this.layer?.find(`#hero-${hero.id}`)[0] as Konva.Group).destroy();
      if (this.gameService.heroesPlaying.length < 2) {
        clearInterval(this.gameInterval);
        this.isPlaying = false;
      }
    });

    this.windowResize();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
    clearInterval(this.gameInterval);
  }

  ngAfterViewInit(): void {
    this.initPlayGround();
  }

  /**
   * init playground
   */
  initPlayGround(): void {
    const width = this.playgroundRef.nativeElement.offsetWidth;
    const height = this.playgroundRef.nativeElement.offsetHeight;
    this.imageSize.width = this.imageSize.height = (width - 10 * 5 - 40) / this.numberCol;
    this.playGroundSize = { width, height };
    
    this.stage = new Konva.Stage({
      container: 'playground',
      width: width,
      height: height
    });
    this.layerBg = new Konva.Layer();
    this.layer = new Konva.Layer();
    this.stage.add(this.layerBg);
    this.stage.add(this.layer);
    this.layerBg?.add(this.gameService.drawBackground(width, height, 'assets/images/background.jpg', this.layerBg));
  }

  /**
   * init fighting
   */
  initGame(): void {
    if (this.gameService.heroesPlaying.length >= 2 && !this.isPlaying) {
      this.isPlaying = true;
      this.gameInterval = setInterval(() => {
        let totalDamge = 0;
        this.gameService.heroesPlaying.forEach((hero: Hero) => {
          totalDamge += hero.weapon.damage;
        });
        
        this.gameService.heroesPlaying.forEach((hero: Hero) => {
          let damageReceived = totalDamge - hero.weapon.damage;
          if (hero.armourHealth! - damageReceived > 0) {
            hero.armourHealth = hero.armourHealth! - damageReceived;
          } else {
            damageReceived -= hero.armourHealth!;
            hero.armourHealth = 0;
          }
          

          if (hero.armourHealth <= 0) {
            hero.health = hero.health - damageReceived > 0 ? hero.health - damageReceived : 0;
          }

          const arcAngle = this.gameService.getAngle(hero.health + hero.armourHealth, hero.totalHealth, -1);
          (this.layer?.find(`#hero-${hero.id}-arc`)[0] as Konva.Arc).angle(arcAngle);
          if (hero.health <= 50) {
            (this.layer?.find(`#hero-${hero.id}-arc`)[0] as Konva.Arc).fill('#dc3545')
          }

          if (hero.health <= 0) {
            this.gameService.removeHeroPlaying(hero);
          }
  
          return hero;
        });
      }, 1000);
    }
  }

  fitStageIntoParentContainer() {
    if (!!this.playgroundRef) {
      const width = this.playgroundRef.nativeElement.offsetWidth;
      const height = this.playgroundRef.nativeElement.offsetHeight;
      this.imageSize.width = this.imageSize.height = (width - 10 * 5 - 40) / this.numberCol;
      this.layerBg?.clear();
      
      this.stage?.width(width);
      this.stage?.height(height);
      this.layerBg?.add(this.gameService.drawBackground(width, height, 'assets/images/background.jpg', this.layerBg));  
      
    }
  }

  windowResize() {
    fromEvent(window, 'resize').subscribe(() => {
      this.fitStageIntoParentContainer();
    })
  }
}
