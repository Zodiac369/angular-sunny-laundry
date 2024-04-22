import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router){

  }

  // Méthode pour vérifier si l'utilisateur est authentifié avant d'accéder à la route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Vérifie si un token d'authentification est présent dans l'objet currentUser du service UserService
    if(this.userService.currentUser.token) return true;
    
    // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion avec un paramètre returnUrl
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    
    // Retourne false pour bloquer l'accès à la route actuelle
    return false;
  }
}
