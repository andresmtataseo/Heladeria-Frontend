import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map(productos => productos.map(p => this.mapBackendToFrontend(p))),
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleProductError(error, 'obtener productos');
          return throwError(() => error);
        })
      );
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map(producto => this.mapBackendToFrontend(producto)),
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleProductError(error, 'obtener producto');
          return throwError(() => error);
        })
      );
  }

  createProducto(producto: ProductoCreateDto): Observable<Producto> {
    // Mapear campos del frontend al formato del backend
    const backendProducto = {
      ...producto,
      categoria_id: producto.categoriaId,
      imagen_url: producto.imageUrl
    };
    
    // Eliminar campos del frontend que no usa el backend
    delete (backendProducto as any).categoriaId;
    delete (backendProducto as any).imageUrl;
    
    return this.http.post<any>(this.apiUrl, backendProducto)
      .pipe(
        map(producto => this.mapBackendToFrontend(producto)),
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleProductError(error, 'crear producto');
          return throwError(() => error);
        })
      );
  }

  updateProducto(id: number, producto: ProductoUpdateDto): Observable<Producto> {
    // Mapear campos del frontend al formato del backend
    const backendProducto = {
      ...producto,
      categoria_id: producto.categoriaId,
      imagen_url: producto.imageUrl
    };
    
    // Eliminar campos del frontend que no usa el backend
    delete (backendProducto as any).categoriaId;
    delete (backendProducto as any).imageUrl;
    
    return this.http.put<any>(`${this.apiUrl}/${id}`, backendProducto)
      .pipe(
        map(producto => this.mapBackendToFrontend(producto)),
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

  private mapBackendToFrontend(backendProducto: any): Producto {
    return {
      ...backendProducto,
      categoriaId: backendProducto.categoria_id,
      imageUrl: backendProducto.imagen_url,
      fechaCreacion: new Date(backendProducto.fecha_creacion),
      fechaActualizacion: new Date(backendProducto.fecha_actualizacion)
    };
  }
}