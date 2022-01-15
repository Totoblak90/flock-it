import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { GeorefService } from '../../services/georef.service';
import { GetProvinciasRes, Provincia } from '../../interfaces/provincias';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public getProvinciasRes: GetProvinciasRes;
  public provincias: Provincia[] = [];
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

  public buscarProvinciasPorNombre(term: string) {
    if (!term) {
      this.provincias = this.getProvinciasRes.provincias;
      return;
    }

    this.geoRefService
      .getProvinciaPorNombre(term)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => (this.provincias = res.provincias),
        error: (err) => this.alertService.noConectionAlert(err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
