import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any[] = [];
featuredProducts: any[] = [];
discountProducts: any[] = [];



constructor(private productService: ProductService,private router: Router) {}

ngOnInit() {
  this.productService.getProducts().subscribe((data: any[]) => {
    this.products = data;

    // Random Featured Products
    this.featuredProducts = this.getRandomProducts(this.products, 4);

    // Remove featured from list
    const remainingProducts = this.products.filter(p =>
      !this.featuredProducts.some(fp => fp.id === p.id)
    );

    // Random Discount Products (different from featured)
    this.discountProducts = this.getRandomProducts(remainingProducts, 4);
  });
}

getRandomProducts(array: any[], count: number) {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
}
goToCategory(category: string) {
  this.router.navigate(['/products'], { queryParams: { category } });
}

}