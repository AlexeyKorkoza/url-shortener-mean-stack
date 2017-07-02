import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlsByTagComponent } from './urls-by-tag.component';

describe('UrlsByTagComponent', () => {
  let component: UrlsByTagComponent;
  let fixture: ComponentFixture<UrlsByTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlsByTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlsByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
