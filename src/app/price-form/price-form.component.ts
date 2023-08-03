import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

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
  constructor(private router: Router) {}

  serializedData: any = '';

  token: any = '';

  // // Deserialize the data back into an object
  // data = JSON.parse(serializedData);

  name = new FormControl('', [Validators.required]);
  priceInNaira = new FormControl('', [Validators.required]);
  description = new FormControl('');
  address = new FormControl('');

  formOne = new FormGroup({
    name: this.name,
    priceInNaira: this.priceInNaira,
    description: this.description,
    address: this.address,
  });

  ngOnInit(): void {
    this.getCurrentLocation();

    this.serializedData = localStorage.getItem('userData');
    this.token = JSON.parse(this.serializedData);


    console.log(this.token);
    
  }

  proceedWithGoogle() {
    location.href =
      'https://crowdfo-63ff986763ab.herokuapp.com/api/v1/auth/google';
  }

  addressText = '';

  useLocation() {
    this.address.setValue('Oando Filling Station, Ikeja, Lagos');
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

  // initial center position for the map
  lat: number = 0;
  lng: number = 0;

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log(position);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          // this.locationsNearby(this.lng, this.lat, this.selectedOption);
          // this.rest
          //   .reverseGeocoding(this.lng, this.lat)
          //   .subscribe((response: any) => {
          //     const currentLocation = response.results[0].formatted_address;
          //     const result  = currentLocation.split(', ');
          //     this.currentAddress = `${result[result.length - 2]}, ${result[result.length - 1]}`
          //   });
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
        this.router.navigate(['/home']);

  }
}
