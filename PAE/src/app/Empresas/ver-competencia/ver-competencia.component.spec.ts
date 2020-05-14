import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCompetenciaComponent } from './ver-competencia.component';

describe('VerCompetenciaComponent', () => {
  let component: VerCompetenciaComponent;
  let fixture: ComponentFixture<VerCompetenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCompetenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCompetenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
