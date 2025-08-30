import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto, ProductoCreateDto, ProductoUpdateDto } from '../models';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8000/api/v1/productos';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleProductError(error, 'obtener productos');
          return throwError(() => error);
        })
      );
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleProductError(error, 'obtener producto');
          return throwError(() => error);
        })
      );
  }

  createProducto(producto: ProductoCreateDto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleProductError(error, 'crear producto');
          return throwError(() => error);
        })
      );
  }

  updateProducto(id: number, producto: ProductoUpdateDto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleProductError(error, 'actualizar producto');
          return throwError(() => error);
        })
      );
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleProductError(error, 'eliminar producto');
          return throwError(() => error);
        })
      );
  }
}