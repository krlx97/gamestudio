import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {SyncProductsComponent} from './sync-products.component'

describe('SyncProductsComponent', () => {
  let component:SyncProductsComponent
  let fixture:ComponentFixture<SyncProductsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SyncProductsComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncProductsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
