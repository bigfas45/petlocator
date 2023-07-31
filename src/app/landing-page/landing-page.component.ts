import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthModalComponent } from '../modals/auth-modal/auth-modal.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}


  ngOnInit(): void {
  }

  openAuthModal() {
    const outcome = this.dialog.open(AuthModalComponent, {
      height: '574px',
      width: '406px',
    });
  }

  proceedToHome () {
    this.router.navigate(['/home']);
  }

}
