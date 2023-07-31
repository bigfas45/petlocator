import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    public rest: RestService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  data: boolean = false;

  ngOnInit() {}

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

  redirect() {
    console.log('fffff');

    this.router.navigate(['/details']);
  }

  price() {
    this.router.navigate(['/price']);
  }

  showSidebar: boolean = false;

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}