import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexmodalComponent } from './connexmodal.component';

describe('ConnexmodalComponent', () => {
  let component: ConnexmodalComponent;
  let fixture: ComponentFixture<ConnexmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnexmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnexmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
