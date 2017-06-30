import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoUrlComponent } from './edit-info-url.component';

describe('EditInfoUrlComponent', () => {
  let component: EditInfoUrlComponent;
  let fixture: ComponentFixture<EditInfoUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInfoUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
