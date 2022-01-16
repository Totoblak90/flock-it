import { Component, Input } from '@angular/core';
import { Provincia, Ubicacion } from '../../interfaces/provincias';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent {
  @Input() public provincias: Provincia[] = [];
  @Input() public ubicacion: Ubicacion;
  @Input() public isSearchingByProvincia: boolean;
  @Input() public isSearchingByUbicacion: boolean;

  public noUbicacionMessage: string =
    'No encontramos ningún resultado. Probá escribiendo otros valores!';

  public checkUbicacionisEmpty(): boolean {
    return (
      this.isSearchingByUbicacion &&
      this.ubicacion &&
      !this.ubicacion?.departamento?.id &&
      !this.ubicacion?.departamento?.nombre &&
      !this.ubicacion?.municipio?.id &&
      !this.ubicacion?.municipio?.nombre &&
      !this.ubicacion?.provincia?.id &&
      !this.ubicacion?.provincia?.nombre
    );
  }
}
