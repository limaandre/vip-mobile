import { ListaDetalhesComponent } from './lista-detalhes/lista-detalhes.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HeaderComponent,
    ListaDetalhesComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ListaDetalhesComponent
  ],
})
export class ComponentsModule {}
