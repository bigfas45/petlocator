import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const { backendUrl, googleMapsApiKey } = environment;
@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  locationsNearby(
    longitude: number,
    latitude: number,
    option: string
  ): Observable<any> {
    return this.http
      .get(
        `${backendUrl}/${option}?longitude=${longitude}&latitude=${latitude}`
      )
      .pipe(catchError(this.handleError));
  }

  getNearby(

  ): Observable<any> {
    return this.http
      .get(
        `https://crowdfo-63ff986763ab.herokuapp.com/api/v1/products?longitude=3.409565824020248&latitude=6.4297428551366975`
      )
      .pipe(catchError(this.handleError));
  }

  addressToCoordinates(address: string): any {
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsApiKey}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  reverseGeocoding(lng: number, lat: number): any {
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`
      )
      .pipe(catchError(this.handleError));
  }
}
