import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUrlComponent } from './info-url.component';

describe('InfoUrlComponent', () => {
  let component: InfoUrlComponent;
  let fixture: ComponentFixture<InfoUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
