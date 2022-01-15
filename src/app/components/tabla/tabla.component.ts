import { Component, Input, OnInit } from '@angular/core';
import { Provincia, Ubicacion } from '../../interfaces/provincias';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  @Input() public provincias: Provincia[];
  @Input() public ubicacion: Ubicacion;
  @Input() public isSearchingByProvincia: boolean;
  @Input() public isSearchingByUbicacion: boolean;

  constructor() {}

  ngOnInit() {}
}
