import { Component, OnInit } from '@angular/core';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router, RouterOutlet ,NavigationEnd} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  isAdminPage: boolean = false;
  isUserAdmin: boolean | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAdminPage = event.url.includes('/Admin');
      this.isUserAdmin = localStorage.getItem('isAdmin') === 'true';

      if (this.isAdminPage && !this.isUserAdmin) {

        this.router.navigate(['/notfound']);
      }
    });
  }
}
