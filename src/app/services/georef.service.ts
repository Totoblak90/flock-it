import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetPorUbicacionRes, GetProvinciasRes } from '../interfaces/provincias';

/**
 * Servicio para obtener la data de las provincias
 */
@Injectable({
  providedIn: 'root',
})
export class GeorefService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Pido la información de las provincias
   * @returns Observable<GetProvinciasRes>
   */
  public getProvinces(): Observable<GetProvinciasRes> {
    return this.httpClient.get<GetProvinciasRes>(
      `${environment.api_base_url}/provincias`
    );
  }

  /**
   * Busco la provincia que haga match con el nombre
   * @param term
   * @returns Observable<GetProvinciasRes>
   */
  public getProvinciaPorNombre(term: string): Observable<GetProvinciasRes> {
    let params = new HttpParams();
    params = params.append('nombre', term);

    return this.httpClient.get<GetProvinciasRes>(
      `${environment.api_base_url}/provincias`,
      { params }
    );
  }

  /**
   * Pido la información de la ubicación seleccionada
   * @returns Observable<GetPorUbicacionRes>
   */
  public getPorUbicacion(
    latitud: number,
    longitud: number
  ): Observable<GetPorUbicacionRes> {
    return this.httpClient.get<GetPorUbicacionRes>(
      `${environment.api_base_url}/ubicacion?lat=-${latitud}&lon=${longitud}`
    );
  }
}
