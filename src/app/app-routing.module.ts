import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { PriceFormComponent } from './price-form/price-form.component';
import { MapComponent } from './map/map.component';
import { FilterResultComponent } from './filter-result/filter-result.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'get-started',
    pathMatch: 'full',
  },
  {
    path: 'get-started',
    component: LandingPageComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'details',
    component: DetailsPageComponent,
  },
  {
    path: 'map',
    component: MapComponent
  },

  {
    path: 'price',
    component: PriceFormComponent
  },

  {
    path: 'filter',
    component: FilterResultComponent
  },

  { path: '**', component: EmptyRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule {}
