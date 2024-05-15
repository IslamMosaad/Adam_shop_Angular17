import { ViewEncapsulation,OnInit,ChangeDetectorRef,Injectable,Component,  NgZone } from '@angular/core';
import { RouterLink, RouterLinkActive  } from '@angular/router';
import { CartItemService } from './../../../Sevices/CartItemService';
import { ICartItemDTO } from '../../../Interfaces/Interfaces';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-top-bar',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit{

  cartItemsNumber:number = 0;
  cartItems:ICartItemDTO[] = [];
  constructor(private cartItemService: CartItemService,private cdr: ChangeDetectorRef, private ngZone: NgZone) {

  }


  ngOnInit(): void {
    // Subscribe to the event
    this.cartItemService.cartItemsUpdated.subscribe((cartItems: ICartItemDTO[]) => {
      this.cartItems = cartItems;
      this.cartItemsNumber = this.cartItems.length;
      this.cdr.detectChanges();
    });

    this.updateNumberOfCartItems();
  }


  updateNumberOfCartItems(): void {
    this.ngZone.run(() => {
      this.cartItemService.GetCartItems().subscribe({
        next: (res) => {
          console.log(res);
          this.cartItems = (res as ICartItemDTO[]);
          this.cartItemsNumber = this.cartItems.length;
          console.log(this.cartItemsNumber);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log(error);
        }
      });
    });
  }




}
