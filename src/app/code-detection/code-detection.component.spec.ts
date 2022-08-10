import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeDetectionComponent } from './code-detection.component';

describe('CodeDetectionComponent', () => {
  let component: CodeDetectionComponent;
  let fixture: ComponentFixture<CodeDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeDetectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
