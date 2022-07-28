import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineUsageComponent } from './offline-usage.component';

describe('OfflineUsageComponent', () => {
  let component: OfflineUsageComponent;
  let fixture: ComponentFixture<OfflineUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfflineUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
