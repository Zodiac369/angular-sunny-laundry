import { Injectable } from '@angular/core';
import { Service } from '../shared/models/Service';

@Injectable({
  providedIn: 'root'
})
export class PrestationsService {
  private services: Service[] = [
    { name: 'Nettoyage à sec', price: 10 },
    { name: 'Repassage', price: 15 },
    // Ajoutez d'autres services avec leurs prix ici
  ];

  constructor() { }

  // Fonction pour obtenir le prix d'un service à partir de son nom
  getServicePrice(serviceName: string): number {
    const service = this.services.find(service => service.name === serviceName);
    return service ? service.price : 0; // Si le service est trouvé, retournez son prix, sinon retournez 0
  }
}
