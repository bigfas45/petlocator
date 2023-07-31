import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.scss'],
})
export class PriceFormComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  back() {
    this.router.navigate(['/']);
  }
}
