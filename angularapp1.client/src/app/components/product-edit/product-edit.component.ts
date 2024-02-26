import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {
  productDetails: Product = {
    id: 1,
    title: 'Shop item template',
    price: 45.0,
    discountPrice: 40.0,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    image: 'https://dummyimage.com/600x700/dee2e6/6c757d.jpg',
    category: 'jewelery',
  };
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.productService.getProduct(+id).subscribe({
            next: (response) => {
              this.productDetails = response;
            },
          });
        }
      },
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.productDetails.id, this.productDetails).subscribe({
      next: (product) => {
        this.toastr.success('Updated Successfully');
        this.router.navigate(['products']);
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.toastr.error('Error');
      },
    });
  }
}
