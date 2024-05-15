import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss',
  host:{ngSkipHydration: 'true'}
})
export class VendorComponent {

}
