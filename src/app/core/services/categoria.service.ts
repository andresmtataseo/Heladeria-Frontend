import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria, CategoriaCreateDto, CategoriaUpdateDto } from '../models';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = `${environment.apiUrl}${environment.endpoints.categorias}`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleCategoryError(error, 'obtener categorías');
          return throwError(() => error);
        })
      );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleCategoryError(error, 'obtener categoría');
          return throwError(() => error);
        })
      );
  }

  createCategoria(categoria: CategoriaCreateDto): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleCategoryError(error, 'crear categoría');
          return throwError(() => error);
        })
      );
  }

  updateCategoria(id: number, categoria: CategoriaUpdateDto): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleCategoryError(error, 'actualizar categoría');
          return throwError(() => error);
        })
      );
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleCategoryError(error, 'eliminar categoría');
          return throwError(() => error);
        })
      );
  }
}