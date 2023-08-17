import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import jwtDecode from 'jwt-decode';
import { NavigationExtras, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    public restService: RestService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  urlParams: any;
  myParam: any;
  address = new FormControl('');

  data: boolean = false;

  nData: any;
  newLocation: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userInfo: any;
    // initial center position for the map
    lat: number = 0;
    lng: number = 0;
    currentAddress: string;

  ngOnInit() {
    this.getClosest();
    this.urlParams = new URLSearchParams(window.location.search);
    this.myParam = this.urlParams.get('token');
    this.userInfo = jwtDecode(this.myParam);

    if (!this.myParam) {
      console.log('not to be null', this.myParam);
    } else {
      console.log(' to be null', this.myParam);
      localStorage.setItem('userData', this.myParam);
    }

    const newLocationInStore = localStorage.getItem('newLocation');
    if (newLocationInStore !== null) {
      this.restService.addProduct(JSON.parse(newLocationInStore)).subscribe((response => {
        localStorage.removeItem('newLocation');
        this.openSnackBar('Item added successfully')
      }), error => {
        this.openSnackBar(error.error.message);
        console.log(error.error.message)
      })
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'snack-bar',
    });
  }

  getAddress(place: object) {
    this.address = place['formatted_address'];
    //this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }

  categorySelect() {
    const catDialogSub = this.dialog.open(FilterDialogComponent, {
      data: { selectedCat: '' },
      disableClose: true,
      backdropClass: 'blurred',
    });
    catDialogSub.afterClosed().subscribe((response) => {
      if (response) {
      }
    });
  }

  onSet() {
    this.data = !this.data;
  }

  redirect(data: any) {
    console.log('fffff', data);

    const navigationExtras: NavigationExtras = {
      queryParams: {
        key1: JSON.stringify(data),
        // Add more key-value pairs as needed
      },
    };

    this.router.navigate(['/details'], navigationExtras);
  }

  price() {
    this.router.navigate(['/price']);
  }

  showSidebar: boolean = false;

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  showFiller: Boolean = false;

  SidenavAutosizeExample() {
    this.showFiller = false;
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
              this.nData = res.data.productsNearby;
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

  useLocation() {
    this.address.setValue('Oando Filling Station, Ikeja, Lagos');
  }
}