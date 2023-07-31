import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  zoom: number = 15;
  markers: marker[] = [{ lat: 6.450899668730424, lng: 3.413215345889619, label: 'Oando Filling Station', draggable: false}];
  dataSource: marker[] = [];
  isLoading = false;

  // initial center position for the map
  lat: number = 0;
  lng: number = 0;

  resetDataSource() {
    this.dataSource = [];
    this.markers = []
  }


  adjustZoom () {
    const body = document.getElementsByTagName('body')
    if (body[0].offsetWidth <= 500) {
        this.zoom = 13;
      }
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log(position)
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
}

interface marker {
  lat: number;
  lng: number;
  label?: string | any;
  draggable: boolean;
  position?: number;
}
