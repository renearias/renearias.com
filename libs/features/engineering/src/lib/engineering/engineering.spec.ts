import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Engineering } from './engineering';

describe('Engineering', () => {
  let component: Engineering;
  let fixture: ComponentFixture<Engineering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Engineering],
    }).compileComponents();

    fixture = TestBed.createComponent(Engineering);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
