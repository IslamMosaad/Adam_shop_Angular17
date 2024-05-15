import { Component } from '@angular/core';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { AdminPromocodesComponent } from '../admin-promocodes/admin-promocodes.component';
import { AdminProuductsComponent } from '../admin-prouducts/admin-prouducts.component';
import { AdminCategoriesComponent } from '../admin-categories/admin-categories.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminOrdersComponent,AdminPromocodesComponent,AdminProuductsComponent,AdminProfileComponent,AdminCategoriesComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
