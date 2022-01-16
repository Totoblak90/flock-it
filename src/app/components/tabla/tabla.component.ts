import { Component, Input, OnInit } from '@angular/core';
import { Provincia, Ubicacion } from '../../interfaces/provincias';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  @Input() public set provinciasClasses(provincias: Provincia[]) {
    if (provincias.length && this.provincias) {
      provincias.forEach((provincia, index) => {
        index % 2 === 0
          ? (provincia.class = 'primary')
          : (provincia.class = 'secondary');

        this.provincias.push(provincia);
      });
    }
  }
  @Input() public set ubicacionClasses(ubicacion: Ubicacion) {
    if (ubicacion) {
      +ubicacion.provincia.id % 2 === 0
        ? (ubicacion.class = 'primary')
        : (ubicacion.class = 'secondary');
      this.ubicacion = ubicacion;
    }
  }
  @Input() public isSearchingByProvincia: boolean;
  @Input() public isSearchingByUbicacion: boolean;

  public provincias: Provincia[] = [];
  public ubicacion: Ubicacion;

  constructor() {}

  ngOnInit() {}
}
