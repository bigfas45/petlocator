import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { RestService } from '../services/rest.service';


export class AnErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.scss'],
})
export class PriceFormComponent implements OnInit {
  constructor(public zone: NgZone, private router: Router, public rest: RestService) {}

  serializedData: any = '';
  token: any = '';
  name = new FormControl('', [Validators.required]);
  priceInNaira = new FormControl('', [Validators.required]);
  description = new FormControl('');
  address = new FormControl('');
  venueName = new FormControl('', [Validators.required])
  address2: Object;
  establishmentAddress: Object;
  formattedAddress: string;
  formattedEstablishmentAddress: string;
  currentAddress: string = '';
  addressText = '';
  venue: string = '';
  // initial center position for the map
  lat: number = 0;
  lng: number = 0;

  phone: string;
  formOne = new FormGroup({
    name: this.name,
    priceInNaira: this.priceInNaira,
    venueName: this.venueName,
    address: this.address,
  });

  useLocationIsClicked: boolean = false;

  ngOnInit(): void {
    this.getCurrentLocation();

    this.serializedData = localStorage.getItem('userData');

    // console.log(this.serializedData);

    this.token = this.serializedData;

    // console.log(this.token);

    this.getClosest();
    this.getFuleType()
  }

  getFormData () {
    const granularAddress = this.address.value.split(', ');
    const payload = {
      name: this.name.value,
      venueName: this.venueName.value,
      priceInNaira: this.priceInNaira.value,
      address: this.address.value,
      state: granularAddress[granularAddress.length - 2],
      country: granularAddress[granularAddress.length -1],
      latitude: this.lat,
      longitude: this.lng,
    }
    return payload;
  }

  addProduct () {
    const payload = this.getFormData();
    this.rest.addProduct(payload).subscribe((response: any) => {
    })
  }

  proceedWithGoogle() {
    const payload = this.getFormData();
    localStorage.setItem('newLocation', JSON.stringify(payload));
     location.href = 'https://crowdfo-63ff986763ab.herokuapp.com/api/v1/auth/google';
  }

  useLocation() {
    this.useLocationIsClicked = true;
    this.getCurrentLocation()
    this.address.setValue(this.currentAddress);
  }

  getAddress(place: object) {
    this.address.setValue(place['formatted_address']);
  
    //this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
    this.rest.addressToCoordinates(place['formatted_address']).subscribe((response) => {
      if (response.results[0]) {
        this.lat = response.results[0].geometry.location.lat;
        this.lng = response.results[0].geometry.location.lng;
      } else {
        console.log('Location not found');
      }
    })
  }

  proceed() {}

  numbersOnly(event: any) {
    const pattern = /[0-9]/;
    if (
      !pattern.test(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowLeft'
    ) {
      event.preventDefault();
    }
  }

  matcher = new AnErrorStateMatcher();

  back() {
    this.router.navigate(['/home']);
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.rest
            .reverseGeocoding(this.lng, this.lat)
            .subscribe((response: any) => {
              const currentLocation = response.results[0].formatted_address;
              this.currentAddress = currentLocation;
            });
        }
      });
    }
  }
  items = [
    {
      name: 'Petrol/PMS',
      id: '122',
    },
    {
      name: 'Kerosine',
      id: '124',
    },
    {
      name: 'Cooking Gas',
      id: '126',
    },
  ];

  createPrice() {
    this.addProduct()
    this.router.navigate(['/home']);
  }

  brands: any = [];
  fuleType: any = []

  getClosest() {
    this.rest.getBrand().subscribe({
      next: (res) => {
        this.brands = res.brands;
      },
      error: ({ error }) => {
        console.log(error);
      },
    });
  }

  selectFuelType(fuleType: any) {
    this.name.setValue(fuleType.name);
  }

  selectFillingStation(brand: any) {
    this.venueName.setValue(brand.name);
  }

  getFuleType() {
    this.rest.getFuleType().subscribe({
      next: (res) => {
        this.fuleType = res.items;
      },
      error: ({ error }) => {
        console.log(error);
      },
    });
  }
}
