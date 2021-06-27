import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs/tabs.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    TabsComponent,
    HeaderComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    TabsComponent,
    HeaderComponent
  ],
})
export class ComponentsModule {}
