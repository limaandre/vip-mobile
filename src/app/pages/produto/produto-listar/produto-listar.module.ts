import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { ProdutoListarRoutingModule } from './produto-listar-routing.module';
import { ProdutoListarComponent } from './produto-listar/produto-listar.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [ProdutoListarComponent],
    imports: [
        CommonModule,
        ProdutoListarRoutingModule,
        FormsModule,
        IonicModule,
        ExploreContainerComponentModule,
        ComponentsModule
    ]
})
export class ProdutoListarModule { }
