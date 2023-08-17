import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthModalComponent } from '../modals/auth-modal/auth-modal.component';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private restService: RestService
  ) {}

  data: any;
  serializedData: any = '';

  token: any = '';

  ngOnInit(): void {
    this.getClosest();

  this.serializedData = localStorage.getItem('userData');
  this.token = this.serializedData;

  // console.log(this.token);
  }

  openAuthModal() {
    const outcome = this.dialog.open(AuthModalComponent, {
      height: '574px',
      width: '406px',
    });
  }

  proceedToHome() {
    this.router.navigate(['/home']);
  }



  getClosest() {
    this.restService.getNearby().subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
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
