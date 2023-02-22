import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsheetComponent } from './detailsheet.component';

describe('DetailsheetComponent', () => {
  let component: DetailsheetComponent;
  let fixture: ComponentFixture<DetailsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
