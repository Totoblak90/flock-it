import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  BuscadorOptions,
  parametrosParaBuscarPorUbicacion,
} from '../interfaces/buscador';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  @Output() isSearchingBy: EventEmitter<BuscadorOptions> = new EventEmitter();
  @Output() onBuscadorProvinciasPorNombre: EventEmitter<string> =
    new EventEmitter();
  @Output()
  onBuscarPorUbicacion: EventEmitter<parametrosParaBuscarPorUbicacion> = new EventEmitter();

  public tipoDeBuscador: BuscadorOptions = 'provincias';
  private parametrosParaBuscar: parametrosParaBuscarPorUbicacion = {
    latitud: undefined,
    longitud: undefined,
  };

  constructor() {}

  ngOnInit() {}

  public selectInputType(value: BuscadorOptions): void {
    this.tipoDeBuscador = value;
    this.isSearchingBy.emit(value);
  }

  public buscarProvinciasPorNombre(term: string | number): void {
    this.onBuscadorProvinciasPorNombre.emit(term.toString());
  }

  public buscarProvinciasPorUbicacion(
    term: string | number,
    propiedad: 'latitud' | 'longitud'
  ): void {
    term = +term;
    this.fillParametrosParaBuscarPorUbicacion(term, propiedad);

    if (
      this.parametrosParaBuscar?.latitud &&
      this.parametrosParaBuscar?.longitud
    ) {
      this.onBuscarPorUbicacion.emit(this.parametrosParaBuscar);
    }
  }

  private fillParametrosParaBuscarPorUbicacion(term: number, propiedad: 'latitud' | 'longitud'): void {
    if (propiedad == 'latitud' && term) {
      this.parametrosParaBuscar.latitud = term;
    } else if (propiedad === 'latitud' && !term) {
      this.parametrosParaBuscar.latitud = undefined;
    } else if (propiedad === 'longitud' && term) {
      this.parametrosParaBuscar.longitud = term;
    } else if (propiedad === 'longitud' && !term) {
      this.parametrosParaBuscar.longitud = undefined;
    }
  }
}
