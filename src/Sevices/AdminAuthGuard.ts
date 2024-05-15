import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('isAdmin') === 'true') {
      return true; // Allow activation if user is admin and localStorage is available
    } else {
      this.router.navigate(['/Shop']); // Redirect to notfound page if not admin or localStorage is not available
      return false;
    }
  }
}
