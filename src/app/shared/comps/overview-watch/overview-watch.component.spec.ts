import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWatchComponent } from './overview-watch.component';

describe('OverviewWatchComponent', () => {
  let component: OverviewWatchComponent;
  let fixture: ComponentFixture<OverviewWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewWatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
