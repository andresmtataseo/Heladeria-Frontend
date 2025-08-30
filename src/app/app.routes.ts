import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CatalogoComponent } from './features/productos/pages/catalogo/catalogo.component';
import { DetalleComponent } from './features/productos/pages/detalle/detalle.component';
import { GestionProductosComponent } from './features/productos/pages/gestion/gestion.component';
import { GestionCategoriasComponent } from './features/categorias/pages/gestion/gestion.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'producto/:id', component: DetalleComponent },
  { path: 'admin/productos', component: GestionProductosComponent },
  { path: 'admin/categorias', component: GestionCategoriasComponent },
  { path: '**', redirectTo: '/home' }
];
