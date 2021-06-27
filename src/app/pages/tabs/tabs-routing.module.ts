import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: '',
                loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'cliente-listar',
                loadChildren: () => import('../cliente/cliente-listar/cliente-listar.module').then(m => m.ClienteListarModule)
            },
            {
                path: 'cliente-form',
                loadChildren: () => import('../cliente/cliente-form/cliente-form.module').then(m => m.ClienteFormModule)
            },
            {
                path: 'cliente-form/:id',
                loadChildren: () => import('../cliente/cliente-form/cliente-form.module').then(m => m.ClienteFormModule)
            },
            {
                path: 'produto-listar',
                loadChildren: () => import('../produto/produto-listar/produto-listar.module').then(m => m.ProdutoListarModule)
            },
            {
                path: 'produto-form',
                loadChildren: () => import('../produto/produto-form/produto-form.module').then(m => m.ProdutoFormModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule { }
