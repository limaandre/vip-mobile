import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { ClienteFormRoutingModule } from './cliente-form-routing.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
    declarations: [ClienteFormComponent],
    imports: [
        CommonModule,
        ClienteFormRoutingModule,
        FormsModule,
        IonicModule,
        ExploreContainerComponentModule,
        ComponentsModule
    ]
})
export class ClienteFormModule { }
