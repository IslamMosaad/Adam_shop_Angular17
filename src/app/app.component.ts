import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet ,NavigationEnd} from '@angular/router';
import { NavComponent } from '../components/general_F/nav/nav.component';
import { FooterComponent } from '../components/general_F/footer/footer.component';
import { TopBarComponent } from '../components/general_F/top-bar/top-bar.component';
import { filter } from 'rxjs';
import { AdminComponent } from '../components/Admin_f/admin/admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,FooterComponent,TopBarComponent,AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Islam_Shop';
  router:Router=new Router();
  isAdminPage:boolean=(this.router.url.includes('/Admin'));


ngOnInit(): void {
  this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  ).subscribe((event: NavigationEnd) => {
    this.isAdminPage = event.url.includes('/Admin');
    //redirect if i want
  });

}


}
