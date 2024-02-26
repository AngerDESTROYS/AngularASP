import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');
      if (category) {
        this.productService.getProductsByCategory(category).subscribe({
          next: (data: Product[]) => {
            this.products = data;
            console.log(this.products);
          },
          error: (response) => {
            console.log(response);
          },
        });
      } else {
        this.productService.getProducts().subscribe({
          next: (data: Product[]) => {
            this.products = data;
            console.log(this.products);
          },
          error: (response) => {
            console.log(response);
          },
        });
      }
    });
  }

  truncateDescription(description: string, maxLength: number): string {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    } else {
      return description;
    }
  }
}
