import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart!: Cart;

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }

   
   removeFromCart(cartItem: CartItem) {
     this.cartService.removeFromCart(cartItem.product.id);
    }
    
    changeQuantity(cartItem: CartItem, quantityInString: string) {
      const quantity = parseInt(quantityInString);
      this.cartService.changeQuantity(cartItem.product.id, quantity);
    }
    
    ngOnInit(): void {
    }
}
