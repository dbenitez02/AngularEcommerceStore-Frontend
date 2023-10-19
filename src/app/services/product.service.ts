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
   * Building url based on category, page, and size.
   * @param theCategoryId 
   * @param pageNumber 
   * @param pageSize 
   * @returns 
   */
  getProductListPaginate(theCategoryId: number, pageNumber: number, pageSize: number): Observable<GetResponseProducts> {
    const serachUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(serachUrl);
  
  }

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
   * 
   * @param keyword 
   * @returns 
   */
  searchProducts(keyword: string) {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  /**
   * 
   * @param pageNumber 
   * @param pageSize 
   * @param keyword 
   * @returns 
   */
  searchProductsPaginate(keyword: string, pageNumber: number, pageSize: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
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

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page : {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}


interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
