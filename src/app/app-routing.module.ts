import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: './usuarios/usuarios.module#UsuariosModule'
  },
  {
    path: ':usuario',
    loadChildren: './usuarios/usuarios.module#UsuariosModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
