import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUrlComponent } from './create-url.component';

describe('CreateUrlComponent', () => {
  let component: CreateUrlComponent;
  let fixture: ComponentFixture<CreateUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
