import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmovieComponent } from './detailmovie.component';

describe('DetailmovieComponent', () => {
  let component: DetailmovieComponent;
  let fixture: ComponentFixture<DetailmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailmovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
