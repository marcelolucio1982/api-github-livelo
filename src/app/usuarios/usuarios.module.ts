import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { RouterModule } from '@angular/router';
import {
  MatInputModule, MatFormFieldModule,
  MatCardModule, MatButtonModule,
  MatIconModule, MatTableModule, MatDialogModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogRepositorioComponent } from './dialog-repositorio/dialog-repositorio.component';

export const rotas = [
  {
    path: '',
    component: UsuariosComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [UsuariosComponent, DialogRepositorioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(rotas),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogRepositorioComponent
  ]
})
export class UsuariosModule { }
