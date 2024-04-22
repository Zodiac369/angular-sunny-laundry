import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  
  // Définition d'une nouvelle commande
  order: Order = new Order();
  // Formulaire de validation pour le processus de paiement
  checkoutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router
  ) {
    // Récupération du panier et initialisation de la commande avec les détails du panier
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
   }

  ngOnInit(): void {
    // Récupération des informations utilisateur pour pré-remplir le formulaire de paiement
    let {name, address} = this.userService.currentUser;
    // Création du formulaire avec pré-remplissage des champs nom et adresse
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  // Raccourci pour accéder facilement aux contrôles du formulaire
  get fc(){
    return this.checkoutForm.controls;
  }

  // Crée une nouvelle commande et vérifie la validité du formulaire avant de soumettre
  createOrder() {
    // Vérification de la validité du formulaire
    if (this.checkoutForm.invalid) {
      // Affichage d'un message d'avertissement si des champs sont invalides
      this.toastrService.warning('Remplissez tous les champs', 'Champs Non Valide');
      return;
    }
  
    // Vérification de la localisation sur la carte
    if (!this.order.addressLatLng) {
      this.toastrService.warning('Localisez-vous sur la carte', 'Localisation');
      return;
    }
  
    // Assignation des valeurs du formulaire à la commande
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;
  
    // Appel du service pour créer une commande
    this.orderService.create(this.order).subscribe({
      next: () => {
        // Redirection vers la page de paiement en cas de succès
        this.router.navigateByUrl('/payment');
      },
      error: (errorResponse) => {
        // Affichage d'un message d'erreur en cas d'échec de la création de commande
        this.toastrService.error(errorResponse.error, 'Erreur lors de la Validation');
      }
    });
  }
  

}
