import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasActualesComponent } from './ofertas-actuales.component';

describe('OfertasActualesComponent', () => {
  let component: OfertasActualesComponent;
  let fixture: ComponentFixture<OfertasActualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertasActualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasActualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
