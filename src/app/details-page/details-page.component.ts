import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  markers: marker[] = [{ lat: 6.450899668730424, lng: 3.413215345889619, label: 'Oando Filling Station', draggable: false}];

  back() {
    this.router.navigate(['/']);
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string | any;
  draggable: boolean;
  position?: number;
}
