import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  // Méthode intercept pour intercepter les requêtes HTTP sortantes
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Récupération des informations utilisateur actuelles
    const user = this.userService.currentUser;

    // Vérification si l'utilisateur possède un token d'authentification
    if (user.token) {
      // Si un token est présent, ajoute aux en-têtes de la requête sortante
      request = request.clone({
        setHeaders: {
          access_token: user.token
        }
      });
    }
    // Passe la requête modifiée au prochain intercepteur ou au gestionnaire HTTP
    return next.handle(request);
  }
}

