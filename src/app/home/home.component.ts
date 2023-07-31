import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    public rest: RestService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  data: boolean = false;

  ngOnInit() {}

  categorySelect() {}

  onSet() {
    this.data = !this.data;
  }

  redirect() {
    console.log("fffff");
    
    this.router.navigate(['/details']);
  }

  showSidebar: boolean = false;

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}