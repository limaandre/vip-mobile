import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { ProdutoFormRoutingModule } from './produto-form-routing.module';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [ProdutoFormComponent],
    imports: [
        CommonModule,
        ProdutoFormRoutingModule,
        FormsModule,
        IonicModule,
        ExploreContainerComponentModule,
        ComponentsModule
    ]
})
export class ProdutoFormModule { }
