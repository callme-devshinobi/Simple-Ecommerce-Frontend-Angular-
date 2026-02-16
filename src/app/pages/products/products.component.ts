import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.route.queryParams.subscribe(params => {
        const category = params['category'];
  
        if (category) {
          this.filteredProducts = this.products.filter(p => p.category === category);
        } else {
          this.filteredProducts = this.products;
        }
      });

    });
  }

}