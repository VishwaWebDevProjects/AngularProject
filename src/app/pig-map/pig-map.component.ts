import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-pig-map',
  templateUrl: './pig-map.component.html',
  styleUrls: ['./pig-map.component.css']
})
export class PigMapComponent implements AfterViewInit {
  private map;
  
  constructor(private http: HttpClient){}
  
  ngAfterViewInit(): void {
    
    this.map = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidnZhMTYiLCJhIjoiY2xiOTNuaWdyMDBtbTNxczJjYzlyeW96bCJ9.P_CIEcLJMwBxX-ZuUiocFA', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    this.http.get<Object>('https://272.selfip.net/apps/hlvQ3jZ0kh/collections/locationCollection/documents/').subscribe((data:any)=>{
        let pigLocInfos = data;
        for (let i = 0; i < pigLocInfos.length; i++) {
          L.marker([pigLocInfos[i].data.locLat, pigLocInfos[i].data.locLong]).addTo(this.map).
          bindPopup("<b>" + pigLocInfos[i].data.locName + "</b><br/>" + pigLocInfos[i].data.count + " pigs reported.").openPopup();
        }
    })
  }

}