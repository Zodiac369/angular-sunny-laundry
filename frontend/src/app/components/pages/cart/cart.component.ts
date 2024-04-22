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
  cart!: Cart; // Déclaration d'une variable pour contenir le panier

  constructor(private cartService: CartService) {
    // Abonnement à l'observable du service de panier pour mettre à jour le panier
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart; // Mettre à jour le panier lorsque des changements sont détectés
    })
  }

  // Méthode pour retirer un article du panier
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.product.id);
  }
  
  // Méthode pour changer la quantité d'un article dans le panier
  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.product.id, quantity);
  }
  
  ngOnInit(): void {
    
  }
}
