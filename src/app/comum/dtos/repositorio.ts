import { JsonObject, JsonProperty, JsonConverter, JsonCustomConvert } from 'json2typescript';
import * as moment from 'moment';
import { Usuario } from './usuario';

@JsonObject('Repositorio')
export class Repositorio {

    @JsonProperty('name', String)
    nome: string = undefined;

    @JsonProperty('full_name', String)
    nomeCompleto: string = undefined;

    @JsonProperty('html_url', String)
    url: string = undefined;

    @JsonProperty('language', String, true)
    linguagem: string = undefined;

    @JsonProperty('created_at', String)
    dataCriacao: Date = undefined;

    @JsonProperty('owner', Usuario)
    proprietario: Usuario = undefined;

}

@JsonConverter
export class ConversorData implements JsonCustomConvert<Date | null>  {

    serialize(date: Date | null): any {
        return null;
    }

    deserialize(date: string): Date | null {
        if (date === null || date === '' || typeof date !== 'string') {
            return null;
        }

        const d = moment(date, 'YYYY-MM-DDT00:00:00.000').toDate();

        return d;
    }
}
