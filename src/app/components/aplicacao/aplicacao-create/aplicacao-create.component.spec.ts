import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacaoCreateComponent } from './aplicacao-create.component';

describe('AplicacaoCreateComponent', () => {
  let component: AplicacaoCreateComponent;
  let fixture: ComponentFixture<AplicacaoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AplicacaoCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AplicacaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
