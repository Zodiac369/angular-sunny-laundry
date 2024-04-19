import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  isSubmitted = false;

  returnUrl = '';

    constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Création du formulaire avec champs et validators
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword:['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(4)]]
    },{
      // Validation pour s'assurer que les mots de passe correspondent
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    })

    // Récupère l'URL de retour du paramètre query
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  // Récupere des contrôles de formulaire pour un accès facile dans le template
  get fc() {
    return this.registerForm.controls;
  }

  // Submit du formulaire
  submit(){
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    // Création de l'objet user à partir des valeurs du formulaire (fv)
    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    };

    // Appel du service pour enregistrer le user
    this.userService.register(user).subscribe(_ => {
      // Redirection vers l'URL de retour après l'enregistrement réussi
      this.router.navigateByUrl(this.returnUrl)
    })
  }

}
