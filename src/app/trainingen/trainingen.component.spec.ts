import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingenComponent } from './trainingen.component';

describe('TrainingenComponent', () => {
  let component: TrainingenComponent;
  let fixture: ComponentFixture<TrainingenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
