import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  /**
   * Grab entire listing based on categoryId.
   * @param theCategoryId 
   * @returns 
   */
  getProductList(theCategoryId: number): Observable<Product[]> {
    const serachUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(serachUrl);
  
  }

  /**
   * Grabs list of current categories in database
   * @returns 
   */
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  /**
   * Searches for items based on keyword typed by user
   * @param keyword 
   * @returns 
   */
  searchProducts(keyword: string) {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
    return this.getProducts(searchUrl);
  }

  /**
   * Grabs details of a single product when clicked on.
   * @param productId 
   * @returns 
   */
  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  /**
   * Method for searching specific groups of products.
   * @param searchUrl
   * @returns 
   */
  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}


interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}