import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss'],
})
export class FilterResultComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public rest: RestService
  ) {}

  ngOnInit(): void {
    this.getClosest()
  }

  redirect() {
    this.router.navigate(['/details']);
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

  nData: any

  getClosest() {
    this.rest.getNearby().subscribe({
      next: (res) => {
        console.log(res.data);
        this.nData = res.data.productsNearby;
      },
      error: ({ error }) => {
        console.log(error);

        //  if (error.appName || error.appURL || error.appURL ) {
        //    this.controlForm.setErrors({credentials: true})
        //  }
      },
    });
  }
}
