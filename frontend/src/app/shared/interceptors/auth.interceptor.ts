import {
  HttpRequest,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>, 
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Get the auth token from localStorage
  const token = localStorage.getItem('token');
  
  if (token) {
    // Clone the request and add the token to the Authorization header
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Forward the cloned request instead of the original request
    return next(authRequest);
  }
  
  // If no token, just forward the original request
  return next(request);
}; 