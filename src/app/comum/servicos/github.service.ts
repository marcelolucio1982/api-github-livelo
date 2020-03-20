import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../dtos/usuario';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JsonConvert, ValueCheckingMode, OperationMode } from 'json2typescript';
import { Repositorio } from '../dtos/repositorio';
import { Paginacao } from '../dtos/paginacao';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  jsonConvert: JsonConvert;

  api: string;

  constructor(private http: HttpClient) {

    this.api = 'https://api.github.com';

    this.jsonConvert = new JsonConvert();
    this.jsonConvert.ignorePrimitiveChecks = false;
    this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
  }

  obterUsuariosPaginado(paginacao: Paginacao<Usuario>, qtdeUsuariosPagina?: number): Observable<Paginacao<Usuario>> {

    qtdeUsuariosPagina = qtdeUsuariosPagina ? qtdeUsuariosPagina : 10;

    let params: HttpParams = new HttpParams();
    params = params.set('per_page', qtdeUsuariosPagina.toString());
    params = params.set('since', paginacao.pagina.toString());

    return this.http
      .get<any>(this.api + '/users', { params, observe: 'response' })
      .pipe(map(resposta => {

        const proximaPagina = this.obterProximaPagina(resposta.headers);

        const novaPaginacao = new Paginacao<Usuario>();
        novaPaginacao.dados = this.jsonConvert.deserializeArray(resposta.body, Usuario);
        novaPaginacao.paginaAnterior = paginacao.pagina;
        novaPaginacao.pagina = paginacao.proximaPagina;
        novaPaginacao.proximaPagina = proximaPagina;

        return novaPaginacao;
      }));
  }

  obterUsuarioPorNome(nomeUsuario: string): Observable<Usuario> {

    return this.http
      .get<any>(this.api + '/users/' + nomeUsuario)
      .pipe(map(resposta => this.jsonConvert.deserializeObject(resposta, Usuario)));
  }

  obterRepositorios(urlRepositorio: string): Observable<Array<Repositorio>> {

    return this.http
      .get<any>(urlRepositorio)
      .pipe(map(resposta => this.jsonConvert.deserializeArray(resposta, Repositorio)));
  }

  private obterProximaPagina(headers: HttpHeaders): number {

    const links = headers.get('Link');

    // formato do header Link
    // <http://.../users?per_page=10&since=47>; rel="next", <http://.../users{?since}>; rel="first"
    const relProximaPagina = links.split(',').find(val => {
      return val.indexOf('rel="next"') > 0;
    });

    // removendo <http://.../users?per_page=10&since=47>; rel="next"
    let url = relProximaPagina.split(';')[0];

    // removendo caracteres
    url = url.replace('>', '').replace('<', '');

    const buscaParams = new URLSearchParams(url);

    return parseInt(buscaParams.get('since'), 10);
  }
}
