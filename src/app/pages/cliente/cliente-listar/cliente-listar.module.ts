import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { ClienteListarRoutingModule } from './cliente-listar-routing.module';
import { ClienteListarComponent } from './cliente-listar/cliente-listar.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [ClienteListarComponent],
    imports: [
        CommonModule,
        ClienteListarRoutingModule,
        FormsModule,
        IonicModule,
        ExploreContainerComponentModule,
        ComponentsModule
    ]
})
export class ClienteListarModule { }
