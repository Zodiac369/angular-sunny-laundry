import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { icon, LatLng, LatLngExpression, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {
  // Entrée: commande associée à la carte
  @Input() order!: Order;

  // Propriété pour déterminer si la carte est en mode lecture seule
  @Input() readonly = false;

  // Constantes pour définir l'icône du marqueur et la position par défaut
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngExpression = [13.75, 21.62];

  // Référence à l'élément DOM contenant la carte Leaflet
  @ViewChild('map', {static:true}) mapRef!: ElementRef;
  map!: Map; // Instance de la carte Leaflet
  currentMarker!: Marker; // Marqueur actuel sur la carte

  constructor(private locationService: LocationService) { }

  // Méthode appelée lorsqu'il y a des changements dans les entrées du composant
  ngOnChanges(): void {
    if(!this.order) return; // Si la commande n'est pas définie, arrête la fonction
    this.initializeMap(); // Initialise la carte

    // Si en mode lecture seule et la position est définie, affiche la position
    if(this.readonly && this.order.addressLatLng){
      this.showLocationOnReadonlyMode();
    }
  }

  // Affiche la position sur la carte en mode lecture seule
  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.order.addressLatLng!); // Place le marqueur à la position
    m.setView(this.order.addressLatLng!, this.MARKER_ZOOM_LEVEL); // Centre la carte sur la position

    // Désactive les interactions avec la carte
    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  // Initialise la carte Leaflet
  initializeMap(){
    if(this.map) return; // Si la carte est déjà initialisée, arrête la fonction

    // Crée une nouvelle instance de la carte Leaflet et la centre sur une position par défaut
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    // Ajoute un fond de carte OpenStreetMap à la carte
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    // Ajoute un événement de clic sur la carte pour placer un marqueur à l'endroit cliqué
    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  // Obtient la position actuelle de l'utilisateur et centre la carte sur cette position
  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL) // Centre la carte sur la position
        this.setMarker(latlng) // Place un marqueur à la position
      }
    })
  }

  // Place un marqueur sur la carte à la position spécifiée
  setMarker(latlng:LatLngExpression){
    this.addressLatLng = latlng as LatLng; // Met à jour la position de l'adresse dans l'objet order
    if(this.currentMarker)
    {
      this.currentMarker.setLatLng(latlng); // Met à jour la position du marqueur
      return;
    }

    // Crée un nouveau marqueur à la position spécifiée et l'ajoute à la carte
    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    // Ajoute un événement de glissement au marqueur pour mettre à jour la position de l'adresse
    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  // Met à jour la position de l'adresse dans l'objet order avec une précision de 8 décimales après la virgule
  set addressLatLng(latlng: LatLng){
    if(!latlng.lat.toFixed) return;

    // Arrondit les coordonnées avec une précision de 8 décimales après la virgule
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng; // Met à jour la position de l'adresse dans l'objet order
  }

  // Récupère la position de l'adresse depuis l'objet order
  get addressLatLng(){
    return this.order.addressLatLng!;
  }
}
