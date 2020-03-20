import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRepositorioComponent } from './dialog-repositorio.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Usuario } from 'src/app/comum/dtos/usuario';

const data = {
  usuario: new Usuario(),
  url: 'http://mock'
};

describe('DialogRepositorioComponent', () => {
  let component: DialogRepositorioComponent;
  let fixture: ComponentFixture<DialogRepositorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [

        MatTableModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ],
      declarations: [DialogRepositorioComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRepositorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
