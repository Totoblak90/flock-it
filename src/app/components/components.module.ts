import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from './buscador/buscador.component';
import { IonicModule } from '@ionic/angular';
import { TablaComponent } from './tabla/tabla.component';



@NgModule({
  declarations: [BuscadorComponent, TablaComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [BuscadorComponent, TablaComponent]
})
export class ComponentsModule { }
