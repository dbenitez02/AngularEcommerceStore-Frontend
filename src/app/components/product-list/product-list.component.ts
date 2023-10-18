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
  previousCategoryId: number = 1;

  // For pagination
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string ="";

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

    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    this.productService.searchProductsPaginate(keyword, this.pageNumber - 1, this.pageSize).subscribe(this.processResult());

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

    // Check if there is a different categoryId from the previous one
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;  
    }

    this.previousCategoryId = this.currentCategoryId;

    // Get products based on categoryId
    this.productService.getProductListPaginate(this.currentCategoryId, this.pageNumber - 1, this.pageSize).subscribe(this.processResult());
  }

  /**
   * Update page based on size user selected
   * @param pageSize 
   */
  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listProducts();

  }

  /**
   * 
   * @returns Return pagination metadata for searching products
   */
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.pageNumber + 1;
      this.pageSize = data.pageSize;
      this.totalElements = data.totalElements;
    }
  }
}
