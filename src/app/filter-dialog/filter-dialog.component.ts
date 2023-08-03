import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Router } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  constructor(
    private router: Router,

    public dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  minValue: number = 500;
  maxValue: number = 700;
  options: Options = {
    floor: 500,
    ceil: 700,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>₦</b>' + value;
        case LabelType.High:
          return '<b>₦</b> ' + value;
        default:
          return '₦' + value;
      }
    },
  };

  ngOnInit(): void {}

  // closeDialog() {
  //   this.dialogRef.close(0);
  // }

  price() {
    // this.closeDialog();

    this.dialogRef.closeAll();

    this.router.navigate(['/filter']);
  }

  activeBrand: String = 'OANDO';
  sortBy: String = 'CHEAPEST';
  typeP: String = 'PETROL';
  address = new FormControl('');
  typeF(v: any) {
    this.typeP = v;
  }

  activate(v: any) {
    this.activeBrand = v;
  }

  sortByF(v: any) {
    this.sortBy = v;
  }

  useLocation() {
    this.address.setValue('Oando Filling Station, Ikeja, Lagos');
  }
}
