import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
// import { EmptyRouteComponent } from './empty-route/empty-route.component';
// import { SidebarModule } from 'ng-sidebar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table' 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DetailsPageComponent } from './details-page/details-page.component';
import { PriceFormComponent } from './price-form/price-form.component';
import { MapComponent } from './map/map.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import { FilterResultComponent } from './filter-result/filter-result.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthModalComponent } from './modals/auth-modal/auth-modal.component'

const { googleMapsApiKey } = environment;

@NgModule({
  declarations: [
    AppComponent,
   HomeComponent,
   DetailsPageComponent,
   PriceFormComponent,
   MapComponent,
   FilterDialogComponent,
   FilterResultComponent,
   LandingPageComponent,
   AuthModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSliderModule,
    NgxSliderModule,
    // SidebarModule,
    AgmCoreModule.forRoot({
      apiKey: googleMapsApiKey
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }