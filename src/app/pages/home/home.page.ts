import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { GeorefService } from '../../services/georef.service';
import {
  GetProvinciasRes,
  Provincia,
  GetPorUbicacionRes,
  Ubicacion,
} from '../../interfaces/provincias';
import { AlertService } from '../../services/alert.service';
import { BuscadorOptions, parametrosParaBuscarPorUbicacion } from '../../components/interfaces/buscador';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public getProvinciasRes: GetProvinciasRes;
  public getUbicacionRes: GetPorUbicacionRes;
  public provincias: Provincia[] = [];
  public ubicacion: Ubicacion;
  public isSearchingByProvincia: boolean = true;
  public isSearchingByUbicacion: boolean = false;

  private destroy$: Subject<boolean> = new Subject();

  public get user(): User {
    return this.authService.getUser();
  }

  constructor(
    private authService: AuthService,
    private geoRefService: GeorefService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getProvinces();
  }

  private getProvinces(): void {
    this.geoRefService
      .getProvinces()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.getProvinciasRes = res;
          this.provincias = res.provincias;
          this.provincias.sort((a, b) => {
            if (a.nombre > b.nombre) {
              return 1;
            } else if (a.nombre < b.nombre) {
              return -1;
            } else {
              return 0;
            }
          });
        },
        error: (err) => this.alertService.noConectionAlert(err),
      });
  }

  private getProvinciasByName(term: string): void {
    this.geoRefService
      .getProvinciaPorNombre(term)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => (this.provincias = res.provincias),
        error: (err) => this.alertService.noConectionAlert(err),
      });
  }

  private getUbicacionData(latitud: number, longitud: number): void {
    this.geoRefService
      .getPorUbicacion(latitud, longitud)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res)
          this.getUbicacionRes = res;
          this.ubicacion = res?.ubicacion;
          console.log(this.ubicacion);
        },
        error: (err) => this.alertService.noConectionAlert(err),
      });
  }

  public cambiarTipoDeTabla(value: BuscadorOptions) {
    if (value === 'provincias') {
      this.isSearchingByProvincia = true;
      this.isSearchingByUbicacion = false;
      this.getProvinces();
    } else if (value === 'ubicacion') {
      this.isSearchingByProvincia = false;
      this.isSearchingByUbicacion = true;
    }
  }

  public buscarProvinciasPorNombre(term: string) {
    if (!term) {
      this.provincias = this.getProvinciasRes.provincias;
      return;
    }

    this.getProvinciasByName(term);
  }

  // Este array siempre va a tener 2 posiciones
  public buscarPorUbicacion(event: parametrosParaBuscarPorUbicacion): void {
    this.getUbicacionData(event.latitud, event.longitud);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
