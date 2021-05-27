import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { WeaponComponent } from './weapon/weapon.component';
import { WeaponDetailComponent } from './weapon/weapon-detail/weapon-detail.component';
import { ArmourComponent } from './armour/armour.component';
import { ArmourDetailComponent } from './armour/armour-detail/armour-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'weapons', component: WeaponComponent },
  { path: 'weapons/:id', component: WeaponDetailComponent },
  { path: 'armours', component: ArmourComponent },
  { path: 'armours/:id', component: ArmourDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
