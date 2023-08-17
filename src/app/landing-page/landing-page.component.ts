import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthModalComponent } from '../modals/auth-modal/auth-modal.component';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private restService: RestService
  ) {}

  data: any;
  serializedData: any = '';

  token: any = '';
  // initial center position for the map
  lat: number = 0;
  lng: number = 0;
  currentAddress: string;

  ngOnInit(): void {
    this.getClosest();

  this.serializedData = localStorage.getItem('userData');
  this.token = this.serializedData;

  // console.log(this.token);
  }

  openAuthModal() {
    const outcome = this.dialog.open(AuthModalComponent, {
      height: '574px',
      width: '406px',
    });
  }

  proceedToHome() {
    this.router.navigate(['/home']);
  }



  getClosest() {
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.restService.getNearby(this.lng, this.lat).subscribe({
              next: (res) => {
                this.data = res.data.productsNearby;
              },
              error: ({ error }) => {
                console.log(error);
        
              },
            });
            this.restService
              .reverseGeocoding(this.lng, this.lat)
              .subscribe((response: any) => {
                const currentLocation = response.results[0].formatted_address;
                this.currentAddress = currentLocation;
              });
          }
        });
      }
    
    
  }
}
