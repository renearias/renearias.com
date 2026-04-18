import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Writing } from './writing';

describe('Writing', () => {
  let component: Writing;
  let fixture: ComponentFixture<Writing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Writing],
    }).compileComponents();

    fixture = TestBed.createComponent(Writing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
