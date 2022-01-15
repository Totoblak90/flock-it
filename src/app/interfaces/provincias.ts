export interface GetProvinciasRes {
  cantidad: number;
  inicio: number;
  parametros: {};
  provincias: Provincia[];
  total: number;
}

export interface Provincia {
  centroide: GeoLocacion;
  id: string;
  nombre: string;
}

export interface GeoLocacion {
  lat: number;
  lon: number;
}

export interface GetPorUbicacionRes {
  parametros: ParametrosPorUbicacion;
  ubicacion: Ubicacion;
}

export interface ParametrosPorUbicacion {
  lat: number;
  lon: number;
}

export interface Ubicacion {
  lat: number;
  lon: number;
  departamento: UbicacionMunicipioProvinciaDepartamento;
  municipio: UbicacionMunicipioProvinciaDepartamento;
  provincia: UbicacionMunicipioProvinciaDepartamento;
}

export interface UbicacionMunicipioProvinciaDepartamento {
  id: string;
  nombre: string;
}
