import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    // check to see if the route has a keyword parameter ex: /search/?={value}
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProduct();
    }
  }
  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    
    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

    handleListProduct() {
          // Check if "id" parameter is available
    const hasCategoyrId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoyrId) {
        // get the id and convert it into a number using the + symbol
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 1;
    }

    // Get products based on categoryId
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      })
  }
}
