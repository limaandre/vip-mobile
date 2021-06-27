import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs/tabs.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    TabsComponent,
    HeaderComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    TabsComponent,
    HeaderComponent
  ],
})
export class ComponentsModule {}
