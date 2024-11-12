import {Injectable} from '@angular/core';
import {Apollo, gql, MutationResult, QueryRef} from 'apollo-angular';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client';

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {

  constructor(private apollo: Apollo) { }

  // Método para realizar consultas
  query<T>(query: string, variables?: { [key: string]: any }): Observable<ApolloQueryResult<T>> {
    return this.apollo.query<T>({
      query: gql`${query}`,
      variables,
    });
  }

  // Método para realizar mutaciones
  mutate<T>(mutation: string, variables?: { [key: string]: any }): Observable<MutationResult<T>> {
    return this.apollo.mutate<T>({
      mutation: gql`${mutation}`,
      variables,
    });
  }

  // Método para realizar consultas en tiempo real
  watchQuery<T>(query: string, variables?: { [key: string]: any }): QueryRef<T> {
    return this.apollo.watchQuery<T>({
      query: gql`${query}`,
      variables,
    });
  }
}
