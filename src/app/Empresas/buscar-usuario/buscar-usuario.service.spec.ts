import { TestBed } from '@angular/core/testing';

import { BuscarUsuarioService } from './buscar-usuario.service';

describe('BuscarUsuarioService', () => {
  let service: BuscarUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
