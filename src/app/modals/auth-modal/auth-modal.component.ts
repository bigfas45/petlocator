import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AuthModalComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  openDialog() {
    this.onCancel();
    //@ts-ignore
    
  }

  proceedWithGoogle () {
    location.href ='https://crowdfo-63ff986763ab.herokuapp.com/api/v1/auth/google';
  }

}
