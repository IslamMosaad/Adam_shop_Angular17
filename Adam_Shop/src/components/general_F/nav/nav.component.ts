
import { Component,OnInit,OnDestroy } from '@angular/core';
import { SliderComponent } from '../../home_f/slider/slider.component';
import {Router, RouterLink, RouterLinkActive ,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [SliderComponent,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  router:Router=new Router();
isHomePage:boolean=(this.router.url==='/');




ngOnInit(): void {
  this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  ).subscribe((event: NavigationEnd) => {
    this.isHomePage = event.url === '/';

  });


}






}
