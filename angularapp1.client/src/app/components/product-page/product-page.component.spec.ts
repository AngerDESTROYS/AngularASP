import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ProductPageComponent } from './product-page.component';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProduct', 'getProductsByCategory']);
    productServiceSpy.getProduct.and.returnValue(of({ id: 1, title: 'Test Product', image: 'test.jpg', price: 50, description: 'Test description', category: 'Test category' }));
    productServiceSpy.getProductsByCategory.and.returnValue(of([
      { id: 2, title: 'Related Product 1', image: 'related1.jpg', price: 40, description: 'Related description 1', category: 'Test category' },
      { id: 3, title: 'Related Product 2', image: 'related2.jpg', price: 30, description: 'Related description 2', category: 'Test category' }
    ]));

    await TestBed.configureTestingModule({
      declarations: [ProductPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } } },
        { provide: ProductService, useValue: productServiceSpy }
      ],
      imports: [ToastrModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
