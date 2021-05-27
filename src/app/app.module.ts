import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module';
import { WeaponComponent } from './weapon/weapon.component';
import { WeaponDetailComponent } from './weapon/weapon-detail/weapon-detail.component';
import { ArmourComponent } from './armour/armour.component';
import { ArmourDetailComponent } from './armour/armour-detail/armour-detail.component';
import { HeroCardComponent } from './dashboard/hero-card/hero-card.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    WeaponComponent,
    WeaponDetailComponent,
    ArmourComponent,
    ArmourDetailComponent,
    HeroCardComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
