import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  @Output() onBuscadorProvinciasPorNombre: EventEmitter<string> =
    new EventEmitter();

  public inputType: string = 'search';

  constructor() {}

  ngOnInit() {}

  public selectInputType(value: IonSelect): void {
    console.log(value);
  }

  public buscarProvinciasPorNombre(term: string | number) {
    this.onBuscadorProvinciasPorNombre.emit(term.toString());
  }
}
