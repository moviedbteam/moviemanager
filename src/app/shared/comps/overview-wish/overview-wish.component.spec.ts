import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWishComponent } from './overview-wish.component';

describe('OverviewWishComponent', () => {
  let component: OverviewWishComponent;
  let fixture: ComponentFixture<OverviewWishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewWishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
