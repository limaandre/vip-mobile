import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';

import { ProdutoFormRoutingModule } from './produto-form-routing.module';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { BrMaskerModule } from 'br-mask';

@NgModule({
    declarations: [ProdutoFormComponent],
    imports: [
        CommonModule,
        ProdutoFormRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        BrMaskerModule,
        ComponentsModule
    ]
})
export class ProdutoFormModule { }
