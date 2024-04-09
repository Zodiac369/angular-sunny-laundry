import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStoeage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }


  login(userLogin: IUserLogin): Observable<User> {
    // Pipe est utilisé pour enchaîner des opérateurs de transformation sur le flux de données retourné par la requête 
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe( 
      // Tap permet d'effectuer des effets de bord lorsqu'un nouvel élément est émis dans le flux sans modifier l'élément lui-même
      tap({
        // Si la requete est un succès la fonction next de tap est appelée
        next: (user) =>{
          this.setUserToLocalStrorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bienvue chez Sunny Laundry ${user.name} !`,
            'Connexion réussie avec succès'
          )
        },
        // Si elle échoue c'est la focntion error de tap qui est appelé, la notification d'erreur
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Connexion échouée.');
        }
      })
    )
  }

  logout() {
    this.userSubject.next(new User()); // Nouvel objet User vide et le passe à travers userSubject
    localStorage.removeItem(USER_KEY); // Supprime l'élément stocké localStroage du navigateur sous la clé USER_KEY
    window.location.reload(); // Refresh la page
  }

  private setUserToLocalStrorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user)); // Convertit avant de stocker
  }

  private getUserFromLocalStoeage(): User{
    const userJson = localStorage.getItem(USER_KEY); // Récupère les infos du localStorage
    if(userJson) return JSON.parse(userJson) as User; // Si valeur trouvé, parse en Jjson et la retorune en tant qu'objet User
    return new User(); // Si aucune valeur ou erreur elle retourne un objet user vide 
  }

}
