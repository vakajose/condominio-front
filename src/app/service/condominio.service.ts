import { Injectable } from '@angular/core';
import {GraphQLService} from './graph-ql.service';
import {Observable} from 'rxjs';
import {CondominioModel} from '../models/condominios/condominio.model';
import {ApolloQueryResult} from '@apollo/client';
import {MutationResult} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {

  constructor(private graphqlService: GraphQLService) { }

  // Consulta para obtener todos los condominios
  getCondominios(): Observable<ApolloQueryResult<CondominioModel>> {
    const query = `
      query {
        condominios {
          id
          nombre
          direccion
        }
      }
    `;
    return this.graphqlService.query<CondominioModel>(query);
  }

  // Mutación para registrar un nuevo condominio
  registrarCondominio(nombre: string, direccion: string): Observable<MutationResult<CondominioModel>> {
    const mutation = `
      mutation($nombre: String!, $direccion: String!) {
        registrarCondominio(nombre: $nombre, direccion: $direccion) {
          id
          nombre
          direccion
        }
      }
    `;
    return this.graphqlService.mutate<CondominioModel>(mutation, { nombre, direccion });
  }
}
