import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GithubService } from 'src/app/comum/servicos/github.service';
import { Repositorio } from 'src/app/comum/dtos/repositorio';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
  selector: 'app-dialog-repositorio',
  templateUrl: './dialog-repositorio.component.html',
  styleUrls: ['./dialog-repositorio.component.scss']
})
export class DialogRepositorioComponent implements OnInit {

  colunas: string[] = ['nome', 'nomeCompleto', 'linguagem', 'dataCriacao', 'url'];

  repositorios: Array<Repositorio>;

  constructor(
    public dialogRef: MatDialogRef<DialogRepositorioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gitHubService: GithubService,
    private loadingService: IsLoadingService) { }

  ngOnInit() {

    const subscricao = this.gitHubService.obterRepositorios(this.data.url).subscribe(
      resposta => {
        this.repositorios = resposta;
      },
      erro => {
        console.error(erro);
        alert('Erro na consulta a API de repositórios do GitHub');
      });
    this.loadingService.add(subscricao, {
      key: 'repositorios'
    });
  }


  fechar(): void {
    this.dialogRef.close();
  }

  isLoading(): boolean {
    return this.loadingService.isLoading({ key: 'repositorios' });
  }
}
