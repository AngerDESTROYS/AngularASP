import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  addProductRequest: Product = {
    id: 1,
    title: 'Shop item template',
    price: 45.0,
    discountPrice: 40.0,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    image: 'https://dummyimage.com/600x700/dee2e6/6c757d.jpg',
    category: 'jewelery',
  };
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addProduct() {
    this.productService.addProduct(this.addProductRequest).subscribe({
      next: (product) => {
        console.log('Product added successfully:', product);
        this.toastr.success('Added Successfully');
        this.router.navigate(['products']);
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.toastr.error('Error');
      },
    });
  }
}
