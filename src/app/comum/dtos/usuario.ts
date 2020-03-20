import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Usuario')
export class Usuario {

    @JsonProperty('id', Number)
    id: number = undefined;

    @JsonProperty('login', String)
    login: string = undefined;

    @JsonProperty('avatar_url', String)
    avatar: string = undefined;

    @JsonProperty('html_url', String)
    url: string = undefined;

    @JsonProperty('starred_url', String)
    urlEstrelas: string = undefined;

    @JsonProperty('repos_url', String)
    urlRepositorios: string = undefined;
}
