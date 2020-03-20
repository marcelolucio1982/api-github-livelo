import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../comum/dtos/usuario';
import { GithubService } from '../comum/servicos/github.service';
import { MatDialog } from '@angular/material';
import { DialogRepositorioComponent } from './dialog-repositorio/dialog-repositorio.component';
import { IsLoadingService } from '@service-work/is-loading';
import { Paginacao } from '../comum/dtos/paginacao';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  colunas: string[] = ['avatar', 'login', 'acoes'];

  usuarios: Array<Usuario>;

  paginacao: Paginacao<Usuario>;

  form: FormGroup;

  @ViewChild('formDirective', { static: false })
  private formDirective: NgForm;

  constructor(
    protected dialog: MatDialog,
    private formBuilder: FormBuilder,
    private gitHubService: GithubService,
    private rota: ActivatedRoute,
    private loadingService: IsLoadingService) {

    this.form = formBuilder.group({
      usuario: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit() {

    this.paginacao = new Paginacao();

    this.rota.params.subscribe(params => {
      const usuario = params.usuario;
      if (!usuario) {
        this.iniciar();
      } else {
        this.form.get('usuario').setValue(usuario);
        this.consultar();
      }
    });

  }

  iniciar() {
    this.usuarios = [];

    this.paginacao = new Paginacao<Usuario>();
    this.paginacao.pagina = 0;

    this.obterTodosUsuarios(this.paginacao);
  }

  obterTodosUsuarios(paginacao: Paginacao<Usuario>) {

    const subscricao = this.gitHubService.obterUsuariosPaginado(paginacao).subscribe(
      resposta => {
        this.paginacao = resposta;
        this.usuarios = resposta.dados;
      },
      erro => {
        console.error(erro);
        alert('Erro na consulta a API de usuários do GitHub');
      });

    this.loadingService.add(subscricao, {
      key: 'usuarios'
    });
  }

  consultar() {

    const subscricao = this.gitHubService.obterUsuarioPorNome(this.form.get('usuario').value).subscribe(
      resposta => {
        this.usuarios = [resposta];
        this.paginacao = new Paginacao();
      },
      erro => {
        console.error(erro);
        alert('Erro na consulta a API de usuários do GitHub');
      });

    this.loadingService.add(subscricao, {
      key: 'usuarios'
    });
  }

  limpar() {

    this.formDirective.resetForm();

    this.form.reset();

    this.iniciar();
  }

  abrirModal(urlRepositorio: string, usuarioSelecionado: Usuario) {

    urlRepositorio = urlRepositorio.replace('{/owner}{/repo}', '');

    this.dialog.open(DialogRepositorioComponent, {
      width: '800px',
      data: {
        url: urlRepositorio,
        usuario: usuarioSelecionado
      }
    });

  }

  proxima() {

    const paginar = new Paginacao<Usuario>();
    paginar.pagina = this.paginacao.proximaPagina;

    this.obterTodosUsuarios(paginar);
  }

  isLoading(): boolean {
    return this.loadingService.isLoading({ key: 'usuarios' });
  }
}
