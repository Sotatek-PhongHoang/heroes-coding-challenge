import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  heroesPlaying: Hero[] = [];
  imageSize = {
    width: 0,
    height: 0
  };
  $unSubscribe = new Subject();
  numberCol = 5; // number hero in row
  gameInterval: any;
  isPlaying: boolean = false;

  constructor(
    private readonly gameService: GameService,
    private readonly messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.gameService.updateGame
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe(value => {
      if (value) {
        this.isPlaying = false;
        clearInterval(this.gameInterval);
      }
    });

    this.gameService.heroesPlaying
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe((heroes: Hero[]) => {
      if (this.playgroundRef) {
        this.heroesPlaying = heroes;
        if (this.gameService.drawAgain) {
          this.drawHeroes(heroes);
        }
      }
    });

    this.windowResize();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
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
    
    this.stage = new Konva.Stage({
      container: 'playground',
      width: width,
      height: height
    });
    this.layerBg = new Konva.Layer();
    this.stage.add(this.layerBg);
    this.layerBg?.add(this.gameService.drawBackground(width, height, 'assets/images/background.jpg', this.layerBg));
  }

  /**
   * draw heroes list
   * @param heroes: heroes list
   */
  drawHeroes(heroes: Hero[] = []): void {
    if (this.layer) {
      this.layer?.destroy();
    }

    this.layer = new Konva.Layer();
    heroes.forEach((hero: Hero, index: number) => {
      const heroClone = cloneData(hero);
      const { width, height } = this.imageSize;
      const { x, y } = this.initPosition(index, width, height);
      this.layer?.add(this.gameService.drawHero(heroClone, x, y, width, height, this.layer));
    });
    this.stage?.add(this.layer);
    if (this.heroesPlaying.length >= 2 && !this.isPlaying) {
      this.isPlaying = true;
      this.messageService.add('Game status: Game start');
      this.initGame();
    }
  }

  /**
   * init position of hero
   * @param index: index of hero
   * @param imgWidth: hero img width
   * @param imgHeight: hero img heigh
   * @returns: position of hero
   */
  initPosition(index: number, imgWidth: number, imgHeight: number): { x: number, y: number } {
    return {
      x: (imgWidth + 10) * (index % this.numberCol) + imgWidth / 2,
      y: (imgWidth + 10) * (Math.floor(index / this.numberCol)) + imgHeight / 2
    }
  }

  /**
   * init fighting
   */
  initGame(): void {
    this.gameInterval = setInterval(() => {
      let totalDamge = 0;
      let drawAgain = false;
      this.heroesPlaying?.forEach((hero: Hero) => {
        totalDamge += hero.weapon.damage;
      });
      
      const heroesAfterFight = this.heroesPlaying.map((hero: Hero) => {
        const heroClone: Hero = cloneData(hero);
        heroClone.playingHealth = heroClone.playingHealth! + heroClone.weapon.damage - totalDamge;
        const arcAngle = this.gameService.getAngle(heroClone.playingHealth, heroClone.health + heroClone.armour.health);
        (this.layer?.find(`#hero-${heroClone.id}-arc`)[0] as Konva.Arc).angle(arcAngle);
        
        if (heroClone.playingHealth <= 0 || (heroClone.playingHealth < 50 && hero.playingHealth! >= 50)) {
          drawAgain = true;
        }

        return heroClone;
      });
      
      this.heroesPlaying = heroesAfterFight.filter((hero: Hero ) => hero.playingHealth! > 0);
      const heroesDie = heroesAfterFight.filter((hero: Hero ) => hero.playingHealth! <= 0);
      if (heroesDie.length) {
        this.messageService.add(`Dashboard: Remove hero ${heroesDie.map(hero => hero.name).join(', ')}`);  
      }

      if (this.heroesPlaying.length < 2) {
        clearInterval(this.gameInterval);
        this.messageService.add('Game status: Game stop')
        this.isPlaying = false;
      }
      this.gameService.updateHeroesPlaying(this.heroesPlaying, drawAgain);
    }, 1000);
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
