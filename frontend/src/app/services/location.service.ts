import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet'; // Importe le type LatLngLiteral de Leaflet
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  // Méthode pour obtenir la position géographique actuelle de l'utilisateur
  getCurrentLocation(): Observable<LatLngLiteral>{
    return new Observable((observer) => {
      // Vérifie si la géolocalisation est prise en charge par le navigateur
      if(!navigator.geolocation) return;

      // Utilise la méthode getCurrentPosition() du navigateur pour obtenir la position actuelle de l'utilisateur
      return navigator.geolocation.getCurrentPosition(
        // En cas de succès émet la position sous forme d'objet LatLngLiteral
        (pos) => {
          observer.next({
            lat: pos.coords.latitude, 
            lng: pos.coords.longitude 
          })
        },
        // En cas d'erreur
        (error) => {
          observer.error(error);
        }
      )
    })
  }
}
