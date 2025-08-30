import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';

export interface ApiError {
  code: number;
  message: string;
  details?: any;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private notificationService: NotificationService) { }


  /**
   * Maneja errores HTTP y muestra notificaciones apropiadas
   */
  handleHttpError(error: HttpErrorResponse, context?: string): ApiError {
    const apiError: ApiError = {
      code: error.status,
      message: this.getErrorMessage(error),
      details: error.error,
      timestamp: new Date().toISOString()
    };

    // Log del error para debugging
    console.error('HTTP Error:', {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      error: error.error,
      context,
      extractedMessage: apiError.message
    });

    // Mostrar notificación al usuario
    this.showErrorNotification(apiError, context);

    return apiError;
  }

  /**
   * Extrae el mensaje de error más apropiado del HttpErrorResponse
   */
  private getErrorMessage(error: HttpErrorResponse): string {
    // Si el servidor devuelve un mensaje específico
    if (error.error && typeof error.error === 'object') {
      if (error.error.detail) {
        return error.error.detail;
      }
      if (error.error.message) {
        return error.error.message;
      }
      if (error.error.error) {
        return error.error.error;
      }
    }

    // Si el error es una cadena
    if (error.error && typeof error.error === 'string') {
      return error.error;
    }

    // Mensajes por código de estado
    switch (error.status) {
      case 400:
        return 'Solicitud incorrecta. Verifique los datos enviados.';
      case 401:
        return 'No autorizado. Inicie sesión nuevamente.';
      case 403:
        return 'Acceso denegado. No tiene permisos para esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 409:
        return 'Conflicto. El recurso ya existe o está en uso.';
      case 422:
        return 'Datos de entrada no válidos.';
      case 500:
        return 'Error interno del servidor. Intente más tarde.';
      case 503:
        return 'Servicio no disponible. Intente más tarde.';
      case 0:
        return 'No se pudo conectar con el servidor. Verifique su conexión.';
      default:
        return `Error del servidor (${error.status}): ${error.statusText || 'Error desconocido'}`;
    }
  }

  /**
   * Muestra una notificación de error al usuario
   */
  private showErrorNotification(apiError: ApiError, context?: string): void {
    const title = this.getErrorTitle(apiError.code, context);
    
    this.notificationService.error(
      title,
      apiError.message,
      7000 // 7 segundos para errores
    );
  }

  private getErrorTitle(statusCode: number, context?: string): string {
    const baseTitle = context ? `Error en ${context}` : 'Error';

    switch (statusCode) {
      case 400:
        return `${baseTitle} - Datos Incorrectos`;
      case 401:
        return 'Error de Autenticación';
      case 403:
        return 'Acceso Denegado';
      case 404:
        return `${baseTitle} - No Encontrado`;
      case 409:
        return `${baseTitle} - Conflicto`;
      case 422:
        return `${baseTitle} - Validación`;
      case 500:
        return 'Error del Servidor';
      case 503:
        return 'Servicio No Disponible';
      case 0:
        return 'Error de Conexión';
      default:
        return baseTitle;
    }
  }

  handleCategoryError(error: HttpErrorResponse, operation: string): ApiError {
    const context = `Error al ${operation}`;
    return this.handleHttpError(error, context);
  }

  handleProductError(error: HttpErrorResponse, operation: string): ApiError {
    const context = `Error al ${operation}`;
    return this.handleHttpError(error, context);
  }

  showSuccess(title: string, message: string): void {
    this.notificationService.success(title, message, 4000);
  }

  showWarning(title: string, message: string): void {
    this.notificationService.warning(title, message, 5000);
  }

  showInfo(title: string, message: string): void {
    this.notificationService.info(title, message, 4000);
  }
}
