import { TestBed } from '@angular/core/testing';
import { CondominioService } from './condominio.service';


import { of } from 'rxjs';
import {GraphQLService} from './graph-ql.service';
import {ApolloQueryResult} from '@apollo/client';
import {MutationResult} from 'apollo-angular';

describe('CondominioService', () => {
  let service: CondominioService;
  let graphqlServiceSpy: jasmine.SpyObj<GraphQLService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GraphQLService', ['query', 'mutate']);

    TestBed.configureTestingModule({
      providers: [
        CondominioService,
        { provide: GraphQLService, useValue: spy }
      ]
    });
    service = TestBed.inject(CondominioService);
    graphqlServiceSpy = TestBed.inject(GraphQLService) as jasmine.SpyObj<GraphQLService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch condominios using query method', (done: DoneFn) => {
    const mockData: ApolloQueryResult<any> = {
      data: {
        condominios: [
          { id: '1', nombre: 'Condominio A', direccion: 'Calle 1' },
          { id: '2', nombre: 'Condominio B', direccion: 'Calle 2' }
        ]
      },
      loading: false,
      networkStatus: 7
    };
    graphqlServiceSpy.query.and.returnValue(of(mockData));

    service.getCondominios().subscribe(result => {
      expect(result).toEqual(mockData);
      expect(graphqlServiceSpy.query).toHaveBeenCalledOnceWith(jasmine.any(String));
      done();
    });
  });

  it('should call registrarCondominio mutation with correct variables', (done: DoneFn) => {
    const mockResponse: MutationResult<any> = {
      data: {
        registrarCondominio: {nombre: 'Condominio Test', direccion: 'Calle Test 123' }
      },
      loading: false,
      errors: undefined,
      extensions: undefined,
    };
    graphqlServiceSpy.mutate.and.returnValue(of(mockResponse));

    service.registrarCondominio('Condominio Test', 'Calle Test 123').subscribe(result => {
      expect(result).toEqual(mockResponse);
      expect(graphqlServiceSpy.mutate).toHaveBeenCalledWith(jasmine.any(String), {
        nombre: 'Condominio Test',
        direccion: 'Calle Test 123'
      });
      done();
    });
  });
});
