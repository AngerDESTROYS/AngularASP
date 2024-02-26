import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductAddComponent } from './product-add.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/models/product';

describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    // Create a spy object for ProductService
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['addProduct']);

    await TestBed.configureTestingModule({
      declarations: [ProductAddComponent],
      imports: [RouterTestingModule, FormsModule, ToastrModule.forRoot()],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        ToastrService
      ]
    }).compileComponents();

    // Get the services injected into the component
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    toastrService = TestBed.inject(ToastrService);

    // Create component and fixture
    fixture = TestBed.createComponent(ProductAddComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product successfully', () => {
    // Mock product data
    const mockProduct: Product = {
      id: 1,
      title: 'Test Product',
      description: 'Test Description',
      price: 50,
      discountPrice: 45,
      category: 'Test Category',
      image: 'test-image.jpg'
    };

    // Set addProductRequest to mockProduct
    component.addProductRequest = mockProduct;

    // Mock the addProduct method of ProductService to return an observable of the mockProduct
    productService.addProduct.and.returnValue(of(mockProduct));

    // Call the addProduct method
    component.addProduct();

    // Expect toastr success to be called with 'Added Successfully' message
    expect(toastrService.success).toHaveBeenCalledWith('Added Successfully');

    // Expect router navigate to have been called with ['products']
    expect((component as any).router.navigate).toHaveBeenCalledWith(['products']);
  });

  it('should handle error while adding product', () => {
    // Mock product data
    const mockProduct: Product = {
      id: 1,
      title: 'Test Product',
      description: 'Test Description',
      price: 50,
      discountPrice: 45,
      category: 'Test Category',
      image: 'test-image.jpg'
    };

    // Set addProductRequest to mockProduct
    component.addProductRequest = mockProduct;

    // Mock the addProduct method of ProductService to return an error observable
    productService.addProduct.and.returnValue(throwError('Error'));

    // Call the addProduct method
    component.addProduct();

    // Expect toastr error to be called
    expect(toastrService.error).toHaveBeenCalled();
  });
});
