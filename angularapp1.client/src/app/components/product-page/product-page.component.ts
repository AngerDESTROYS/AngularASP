import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  productDetails: Product = {
    id: 0,
    title: '',
    image: '',
    price: 0,
    description: '',
    category: '',
  };

  relatedProducts: Product[] = [
    {
      image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
      title: 'Fancy Product',
      price: 40.0 - 80.0,
      id: 1,
      category: 'smth',
      description: 'smth',
    },
    {
      image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
      title: 'Special Item',
      price: 18.0,
      id: 2,
      category: 'smth',
      description: 'smth',
      sale: true,
    },
    {
      image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
      title: 'Sale Item',
      price: 25.0,
      id: 3,
      category: 'smth',
      description: 'smth',
      sale: true,
    },
    {
      image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
      title: 'Popular Item',
      price: 40.0,
      id: 4,
      category: 'smth',
      description: 'smth',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        let id = params.get('id');

        if (id) {
          this.productService.getProduct(+id).subscribe({
            next: (response) => {
              this.productDetails = response;

              this.productService
                .getProductsByCategory(response.category)
                .subscribe({
                  next: (newProds) => {
                    this.relatedProducts = newProds.filter(
                      (product) => product.id !== this.productDetails.id
                    );
                    console.log(newProds);
                  },
                });
            },
          });
        }
      },
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(+id).subscribe({
      next: (response) => {
        this.toastr.success('Item deleted successfully.');
        this.router.navigate(['products']);
      },
      error: (error) => {
        this.toastr.error('Error')
        console.error(error);
      }
    });
  }
}
