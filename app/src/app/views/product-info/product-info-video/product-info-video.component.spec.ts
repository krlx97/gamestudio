import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoVideoComponent } from './product-info-video.component';

describe('ProductInfoVideoComponent', () => {
  let component: ProductInfoVideoComponent;
  let fixture: ComponentFixture<ProductInfoVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfoVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
