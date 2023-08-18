import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingsHistComponent } from './readings-hist.component';

describe('ReadingsHistComponent', () => {
  let component: ReadingsHistComponent;
  let fixture: ComponentFixture<ReadingsHistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingsHistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingsHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
