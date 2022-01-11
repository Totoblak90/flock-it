import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from './header-title/header-title.component';



@NgModule({
  declarations: [HeaderTitleComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderTitleComponent]
})
export class SharedModule { }
