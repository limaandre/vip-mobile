import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'cliente-listar',
    loadChildren: () => import('./pages/cliente/cliente-listar/cliente-listar.module').then( m => m.ClienteListarModule)
  },
  {
    path: 'cliente-form',
    loadChildren: () => import('./pages/cliente/cliente-form/cliente-form.module').then( m => m.ClienteFormModule)
  },
  {
    path: 'produto-listar',
    loadChildren: () => import('./pages/produto/produto-listar/produto-listar.module').then( m => m.ProdutoListarModule)
  },
  {
    path: 'produto-form',
    loadChildren: () => import('./pages/produto/produto-form/produto-form.module').then( m => m.ProdutoFormModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
