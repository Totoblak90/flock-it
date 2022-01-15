import { Component, Input, OnInit } from '@angular/core';
import { Provincia } from '../../interfaces/provincias';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  @Input() public provincias: Provincia[];
  @Input() public isSearchingByProvincia: boolean = true;

  constructor() {}

  ngOnInit() {}
}
